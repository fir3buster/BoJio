const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const database = require("../db/db");

const db = database.pool;

// getting allUsers profile only admin
const getAllUsers = async (req, res) => {
    try {
        console.log("inside Controller");
        const users = await db.query(
            `SELECT 
                up.id, 
                up.email, 
                up.profile_name, 
                up.first_name, 
                up.last_name, 
                up.profile_picture_url, 
                up.bio, 
                up.gender, 
                up.role, 
                admin_user_data.user_id, 
                admin_user_data.is_active 
            FROM 
                user_profiles up 
            JOIN
                admin_user_data
            ON 
                up.id = admin_user_data.user_id 
            WHERE 
                admin_user_data.is_active = TRUE;`
        );

        // console.log(users.rows, typeof users.rows);
        res.status(200).json(users.rows);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ status: "error", msg: "error getting users" });
    }
};

// registering user
const register = async (req, res) => {
    const colors = [
        "deepOrange",
        "deepPurple",
        "teal",
        "indigo",
        "red",
        "blue",
        "green",
        "orange",
        "pink",
        "yellow",
    ];
    const client = await db.connect(); 
    try {
        await client.query("BEGIN");

        const email = req.body.email;
        const role = req.body.role || "user";
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const profileName = (firstName[0] + lastName[0]).toUpperCase();
        const profileColor = getRandomItem(colors);
        const location = req.body.location;

        // check for duplicate
        const auth = await client.query(
            "SELECT COUNT(*) FROM user_profiles WHERE email = $1;",
            [email]
        );

        const auth_count = parseInt(auth.rows[0].count);

        if (auth_count > 0) {
            await client.query("ROLLBACK"); // rollback if duplicate found
            return res
                .status(400)
                .json({ status: "error", msg: "duplicate email" });
        }

        const hash = await bcrypt.hash(req.body.password, 12);

        // Insert user_profile into user_profiles table
        const userResult = await client.query(
            "INSERT INTO user_profiles(email, hashed_password, first_name, last_name, profile_name, profile_picture_url, role, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;",
            [
                email,
                hash,
                firstName,
                lastName,
                profileName,
                profileColor,
                role,
                location,
            ]
        );
        console.log(userResult.rows);

        if (userResult.rows.length === 0) {
            await client.query("ROLLBACK");
            return res
                .status(400)
                .json({ status: "error", msg: "id not found!" });
        }

        // Insert into admin_user_data using the same client
        await client.query(
            "INSERT INTO admin_user_data(user_id, is_active) VALUES ($1, $2);",
            [userResult.rows[0].id, true]
        );

        await client.query("COMMIT"); //commit the transaction

        res.status(200).json({ status: "ok", msg: "user created" });
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback on error
        console.error(error.message);
        res.status(400).json({ status: "error", msg: "invalid registration" });
    } finally {
        client.release();
    }
};

const login = async (req, res) => {
    try {
        // console.log("inside login controller");
        // check if email already registered
        const email = req.body.email;
        const password = req.body.password;

        const auth = await db.query(
            `SELECT *
            FROM user_profiles
            JOIN admin_user_data 
                ON user_profiles.id = admin_user_data.user_id 
            WHERE is_active = true      
            AND email = $1;`,
            [email]
        );

        console.log(auth.rows);
        if (auth.rows.length === 0) {
            console.log("in if statement");
            return res
                .status(400)
                .json({ status: "error", msg: "not authorized" });
        }

        const auth_content = auth.rows[0];

        // result returning boolean (true or false)
        const result = await bcrypt.compare(
            password,
            auth_content.hashed_password
        );

        if (!result) {
            return res
                .status(401)
                .json({ status: "error", msg: "login failed" });
        }

        const claims = {
            id: auth_content.user_id,
            email: auth_content.email,
            role: auth_content.role,
        };

        const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
            expiresIn: "20m",
            jwtid: uuidv4(),
        });

        const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
            expiresIn: "30d",
            jwtid: uuidv4(),
        });

        // console.log(access, refresh)
        res.json({ access, refresh });
    } catch (error) {
        console.error(error.messages);
        res.status(400).json({ status: "error", msg: "login failed" });
    }
};

const refresh = async (req, res) => {
    try {
        const refresh = req.body.refresh;

        const decoded = jwt.verify(refresh, process.env.REFRESH_SECRET);

        const claims = {
            email: decoded.email,
            role: decoded.role,
        };

        const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
            expiresIn: "20m",
            jwtid: uuidv4(),
        });

        res.json({ access });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ status: "error", msg: "refreshing token" });
    }
};

// helper functions
function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

module.exports = { getAllUsers, register, login, refresh };

const database = require("../db/db");

const db = database.pool;

//-----------------------------------------USER PROFILE--------------------------------------------

// getting all Active Users profile
const getAllActiveUsers = async (req, res) => {
    try {
        console.log("inside Controller");
        const users = await db.query(
            `SELECT *
            FROM user_profiles
            JOIN admin_user_data 
                ON user_profiles.id = admin_user_data.user_id 
            WHERE is_active = true      
            ORDER BY user_profiles.id ASC;`
        );
        console.log(users.rows, typeof users.rows);
        res.status(200).json(users.rows);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ status: "error", msg: "error getting users" });
    }
};

// getting user profile by id
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await db.query(
            "SELECT * FROM user_profiles WHERE id = $1;",
            [userId]
        );
        res.status(200).json(user.rows);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ status: "error", msg: "error getting user" });
    }
};

// update user profile
const updateUserProfile = async (req, res) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN");

        const id = req.params.id;
        const updatedFields = [];
        const updatedParams = [];
        let placeholderCount = 0;

        // check if specific fields are provided in the request body
        if ("email" in req.body) {
            placeholderCount++;
            updatedFields.push(`email=$${placeholderCount}`);
            updatedParams.push(req.body.email);
        }

        if ("profile_name" in req.body) {
            placeholderCount++;
            updatedFields.push(`profile_name=$${placeholderCount}`);
            updatedParams.push(req.body.profile_name);
        }

        if ("first_name" in req.body) {
            placeholderCount++;
            updatedFields.push(`first_name=$${placeholderCount}`);
            updatedParams.push(req.body.first_name);
        }

        if ("last_name" in req.body) {
            placeholderCount++;
            updatedFields.push(`last_name=$${placeholderCount}`);
            updatedParams.push(req.body.last_name);
        }

        if ("profile_picture_url" in req.body) {
            placeholderCount++;
            updatedFields.push(`profile_picture_url=$${placeholderCount}`);
            updatedParams.push(req.body.profile_picture_url);
        }

        if ("bio" in req.body) {
            placeholderCount++;
            updatedFields.push(`bio=$${placeholderCount}`);
            updatedParams.push(req.body.bio);
        }

        if ("gender" in req.body) {
            placeholderCount++;
            updatedFields.push(`gender=$${placeholderCount}`);
            updatedParams.push(req.body.gender);
        }

        if (updatedFields.length === 0) {
            await client.query("ROLLBACK");
            return res
                .status(400)
                .json({ status: "error", msg: "no fields to update" });
        }
        // add the id parameter to the list
        placeholderCount++;
        updatedParams.push(id);

        // Join the updates into a single string, separated by commas
        const updatedFieldsQuery = updatedFields.join(", ");

        // // Execute the SQL query with parameterized inputs
        await client.query(
            `UPDATE user_profiles SET ${updatedFieldsQuery} WHERE id = $${placeholderCount};`,
            updatedParams
        );

        await client.query("COMMIT");

        res.json({ status: "ok", msg: "user profile updated successfully" });
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback on error
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error updating user profile",
        });
    } finally {
        client.release();
    }
};

// --------------------------------FOLLOWERS-----------------------------------------------------
// getting all following by id (getting all the people that user is following)
const getFollowingUsersById = async (req, res) => {
    try {
        const id = req.params.id;

        const following = await db.query(
            `SELECT following_id, user_profiles.*, admin_user_data.is_active
            FROM 
                user_followers
                INNER JOIN admin_user_data
                    ON admin_user_data.user_id = user_followers.following_id
                INNER JOIN user_profiles
                    ON user_profiles.id = user_followers.following_id
            WHERE 
                user_followers.follower_id = $1
                AND user_followers.is_active = true
                AND admin_user_data.is_active = true;`,
            [id]
        );

        res.status(200).json(following.rows);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting all following users",
        });
    }
};

// getting all followers by id (getting all the people that user is followed by)
const getFollowersById = async (req, res) => {
    try {
        const id = req.params.id;

        const followers = await db.query(
            `SELECT follower_id, user_profiles.*, admin_user_data.is_active
            FROM 
                user_followers
                INNER JOIN admin_user_data
                    ON admin_user_data.user_id = user_followers.follower_id
                INNER JOIN user_profiles
                    ON user_profiles.id = user_followers.follower_id
            WHERE 
                user_followers.following_id = $1
                AND user_followers.is_active = true
                AND admin_user_data.is_active = true;`,
            [id]
        );

        res.status(200).json(followers.rows);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting all followers",
        });
    }
};

// update followers
const updateFollower = async (req, res) => {
    const client = await db.connect();
    try {
        console.log("inside updatefollower");
        await client.query("BEGIN");

        const followingId = req.body.following_id;
        const followerId = req.body.follower_id;

        //check if already in database
        const data = await client.query(
            `SELECT * FROM user_followers WHERE following_id=$1 AND follower_id=$2;`,
            [followingId, followerId]
        );

        console.log(data.rows);
        if (data.rows.length === 0) {
            console.log("new user_follower data");
            await client.query(
                `INSERT INTO user_followers(following_id, follower_id) VALUES ($1, $2);`,
                [followingId, followerId]
            );
        } else if (data.rows.length === 1) {
            let newIsActive = "";
            console.log("to update user_follower data");
            if (data.rows[0].is_active === true) {
                newIsActive = false;
            } else if (data.rows[0].is_active === false) {
                newIsActive = true;
            } else {
                await client.query("ROLLBACK");
                console.log("undefined value");
                res.status(400).json({
                    status: "error",
                    msg: "undefined value in is_active",
                });
            }
            await client.query(
                `UPDATE user_followers SET is_active=$1 WHERE following_id = $2 and follower_id = $3;`,
                [newIsActive, followingId, followerId]
            );
        } else {
            await client.query("ROLLBACK");
            console.log("Multiple data detected!");
            res.status(400).json({
                status: "error",
                msg: "multiple data detected!",
            });
        }

        await client.query("COMMIT");

        res.status(200).json({
            status: "ok",
            msg: "successfully add/remove followers data",
        });
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback on error
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error updating follower",
        });
    } finally {
        client.release();
    }
};

// --------------------------------SPORTS CARD----------------------------------------------
/*
NTRP RATING = 1.0 - 2.0 (beginner)
NTRP RATING = 2.5 - 4.0 (intermediate)
NTRP RATING = 4.5 - 5.5 (advanced)
NTRP RATING = 6.0 - 7.0 (professional)
*/

// get sports card based on user
const getAllSportsCardsByUserId = async (req, res) => {
    try {
        const userId = req.params.user_id;

        const sportsCards = await db.query(
            "SELECT * FROM sports_cards WHERE user_id = $1;",
            [userId]
        );

        res.status(200).json(sportsCards.rows);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting sports cards",
        });
    }
};

// creating sport card based on user
const addSportCard = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const sportType = req.body.sport_type;
        const skillLevel = req.body.skill_level || 'beginner';
        const skillRate = req.body.skill_rate || 'unrated';
        
        await db.query(
            `INSERT INTO sports_cards (user_id, sport_type, skill_level, skill_rate ) VALUES ($1, $2, $3, $4);`,
            [userId, sportType, skillLevel, skillRate]
        );

        res.status(200).json({
            status: "ok",
            msg: "add sport card successfully",
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error creating sport card",
        });
    }
};

// update sport card based on user
const updateSportCardById = async (req, res) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN");

        const id = req.params.id;
        const sportType = req.body.sport_type;

        // check if sport card is in database
        const sportCard = await client.query(
            `SELECT * FROM sports_cards WHERE id = $1 AND sport_type = $2 ;`,
            [id, sportType]
        );

        console.log(sportCard.rows)

        if (sportCard.rows.length === 0) {
            await client.query("ROLLBACK");
            console.log("no sport card found");
            return res
                .status(400)
                .json({ status: "error", msg: "no sport card found" });
        }

        const updatedFields = [];
        const updatedParams = [];

        let placeholderCount = 0;

        // check if specific fields are provided in the request body
        if ("skill_level" in req.body) {
            placeholderCount++;
            updatedFields.push(`skill_level=$${placeholderCount}`);
            updatedParams.push(req.body.skill_level);
        }

        if ("skill_rate" in req.body) {
            placeholderCount++;
            updatedFields.push(`skill_rate=$${placeholderCount}`);
            updatedParams.push(req.body.skill_rate);
        }

        if ("user_id" in req.body) {
            placeholderCount++;
            updatedFields.push(`user_id=$${placeholderCount}`);
            updatedParams.push(req.body.user_id);
        }

        // add the id parameter to the list
        placeholderCount++;
        updatedParams.push(id);


        // Join the updates into a single string, separated by commas
        const updatedFieldsQuery = updatedFields.join(", ");

        // // Execute the SQL query with parameterized inputs
        await client.query(
            `UPDATE sports_cards SET ${updatedFieldsQuery} WHERE id=$${placeholderCount};`,
            updatedParams
        );

        await client.query("COMMIT");

        res.json({ status: "ok", msg: "sport card updated successfully" });
    } catch (error) {
        await client.query("ROLLBACK");
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error updating sport card",
        });
    } finally {
        client.release();
    }
};

//-------------------------------- ADMIN ---------------------------------------------------
// admin activate/deactivate user account
const manageUserAccountById = async (req, res) => {
    try {
        const id = req.params.id;
        let updatedField = "";
        let isActiveParam = "";

        if ("is_active" in req.body) {
            updatedField = "is_active=$1";
            isActiveParam = req.body.is_active;
        }

        await db.query(
            `UPDATE admin_user_data SET ${updatedField} WHERE user_id = $2;`,
            [isActiveParam, id]
        );

        res.status(200).json({
            status: "ok",
            msg: "user account status updated successfully",
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error updating user account status",
        });
    }
};

module.exports = {
    getAllActiveUsers,
    manageUserAccountById,
    getUserById,
    updateUserProfile,
    getFollowingUsersById,
    getFollowersById,
    updateFollower,
    getAllSportsCardsByUserId,
    addSportCard,
    updateSportCardById,
};

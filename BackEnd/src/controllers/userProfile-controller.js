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

        const userId = req.params.id;
        const updatedFields = [];
        const updatedParams = [];

        // check if specific fields are provided in the request body
        // if ("email" in req.body) {
        //     updatedFields.push("email=$1")
        //     updatedParams.push(req.body.email)
        // }

        if ("profile_name" in req.body) {
            updatedFields.push("profile_name=$2");
            updatedParams.push(req.body.profile_name);
        }

        if ("first_name" in req.body) {
            updatedFields.push("first_name=$3");
            updatedParams.push(req.body.first_name);
        }

        if ("last_name" in req.body) {
            updatedFields.push("last_name=$4");
            updatedParams.push(req.body.last_name);
        }

        if ("profile_pic_url" in req.body) {
            updatedFields.push("profile_pic_url=$5");
            updatedParams.push(req.body.profile_picture_url);
        }

        if ("bio" in req.body) {
            updatedFields.push("bio=$6");
            updatedParams.push(req.body.bio);
        }

        if ("gender" in req.body) {
            updatedFields.push("gender=$7");
            updatedParams.push(req.body.gender);
        }

        // add the id parameter to the list
        updatedParams.push(userId);

        // Join the updates into a single string, separated by commas
        const updatedFieldsQuery = updatedFields.join(", ");

        // // Execute the SQL query with parameterized inputs
        await client.query(
            `UPDATE user_profiles SET ${updatedFieldsQuery} WHERE id = $8;`,
            [updatedParams]
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
// getting all followee by id (getting all the people that user is following)
const getFollowingUsersById = async (req, res) => {
    try {
        const userId = req.params.id;

        const followingUsers = await db.query(
            "SELECT * FROM user_profiles WHERE follower_id = $1;",
            [userId]
        );
        res.status(200).json(followingUsers.rows);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting all following users",
        });
    }
};

// getting all followers by id (getting all the people is following the user)
const getFollowersById = async (req, res) => {
    try {
        const userId = req.params.id;

        const followers = await db.query(
            "SELECT * FROM user_profiles WHERE followee_id = $1;",
            [userId]
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
        await client.query("BEGIN");

        const userId = req.body.followee_id;
        const followerId = req.body.follower_id;

        //check if already in database
        const data = await client.query(
            `SELECT * FROM user_followers WHERE followee_id=$1 AND follower_id=$2 RETURNING is_active;`,
            [userId, followerId]
        );

        console.log(data.rows);
        if (data.rows.length === 0) {
            console.log("new user_follower data");
            await client.query(
                `INSERT INTO user_followers(followee_id, follower_id) VALUES ($1, $2);`,
                [userId, followerId]
            );
        } else if (data.rows.length === 1) {
            const newIsActive = "";
            console.log("to update user_follower data");
            if (data.rows[0].is_active === "true") {
                newIsActive = false;
            } else if (data.rows[0].is_active === "false") {
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
                `UPDATE user_followers SET is_active=$1 WHERE followee_id = $2 and following_id = $3;`,
                [newIsActive, userId, followerId]
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
NTRP RATING = 0.0 - 2.0 (beginner)
NTRP RATING = 2.5 - 4.0 (intermediate)
NTRP RATING = 4.5 - 5.5 (advanced)
NTRP RATING = 6.0 - 7.0 (professional)
*/

// get sports card based on user
const getSportsCardsById = async (req, res) => {
    try {
        const userId = req.params.id;

        const sportsCards = await db.query("SELECT * FROM sports_cards WHERE user_id = $1;", [userId])

        res.status(200).json(sportsCards.rows)
    } catch (error) {
        console.error(error.message)
        res.status(400).json({status: "error", msg: "error getting sports cards"})
    }
}

// creating sport card based on user
const addSportCardById = async (req, res) => {
    try {
        const userId = req.params.id;
        const sportType = req.body.sport_type;
        const skillLevel = req.body.skill_level;
        const skillRate = req.body.skill_rate;

        await db.query(
            `INSERT INTO sports_cards (user id, sport_type, skill_level, skill_rate ) VALUES ($1, $2, $3, $4);`,
            [userId, sportType, skillLevel, skillRate]
        );

        res.status(200).json({status: "ok", msg: "add sport card successfully"})
    } catch (error) {
        console.error(error.message)
        res.status(400).json({status: "error", msg: "error creating sport card"})
    }
}


// update sport card based on user
const updateSportCardById = async (req, res) => {
    const client = await db.connect()
    try {
        await client.query("BEGIN");

        const userId = req.params.Id;
        const sportType = req.body.sport_type;

        // check if sport card is in database
        const sportCard = await client.query("SELECT * FROM sports_cards WHERE user_id = $1 AND sport_type = $2 ;", [userId, sportType])

        if (sportCard.rows.length === 0) {
            await client.query("ROLLBACK");
            console.log("not sport card found")
            return res.status(400).json({status: "error", msg: "no sport card found"})
        }

        const updatedFields = [];
        const updatedParams = [];

        if ("sport_level" in req.body) {
            updatedFields.push("sport_level=$1")
            updatedParams.push(req.body.sport_level)
        }

        if ("sport_rate" in req.body) {
            updatedFields.push("sport_rate=$2")
            updatedParams.push(req.body.sport_rate)
        }

        // add the id parameter to the list
        updatedParams.push(userId);
        updatedParams.push(sportType)


        // Join the updates into a single string, separated by commas
        const updatedFieldsQuery = updatedFields.join(", ");

        // // Execute the SQL query with parameterized inputs
        await client.query(
            `UPDATE sports_cards SET ${updatedFieldsQuery} WHERE user_id = $3 AND sport_type = $4;`,
            [updatedParams]
        );

        await client.query("COMMIT");

        res.json({ status: "ok", msg: "sport card updated successfully" });
    } catch (error) {
        await client.query("ROLLBACK")
        console.error(error.message)
        res.status(400).json({status: "error", msg: "error updating sport card"})
    } finally {
        client.release()
    }
}

//-------------------------------- ADMIN ---------------------------------------------------
// admin activate/deactivate user account
const manageUserAccountById = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedField = "";
        const isActiveParam = "";

        if ("is_active" in req.body) {
            updatedField = "is_active=$1";
            isActiveParam = req.body.is_active;
        }

        await db.query(
            `UPDATE admin_user_data SET ${updatedField} WHERE user_id = $2;`,
            [isActiveParam, userId]
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
    getSportsCardsById,
    addSportCardById,
    updateSportCardById,
};

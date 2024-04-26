const database = require("../db/db");

const db = database.pool;

//-----------------------------------------USER PROFILE--------------------------------------------

// getting all upcoming public activities
const getAllPublicActivities = async (req, res) => {
    try {
        console.log("inside public Controller");
        const now = new Date();
        const activities = await db.query(
            `SELECT * 
            FROM activities 
            WHERE game_private = FALSE
            AND schedule > $1 
            ORDER BY schedule;`,
            [now]
        );
        console.log(activities.rows, typeof activities.rows);
        res.status(200).json(activities.rows);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting activities",
        });
    }
};

// getting activity by id
const getActivityById = async (req, res) => {
    try {
        const id = req.params.id;
        const activity = await db.query(
            `SELECT 
                a.id,
                a.title,
                a.schedule,
                a.location,
                a.sport_type,
                a.game_type,
                a.skill_level,
                a.game_private,
                aud.user_id AS player_id,
                aud.is_going AS player_is_going
            FROM activities a
            LEFT JOIN activity_user_decisions aud
                ON a.id = aud.activity_id
            WHERE a.id = $1
            AND aud.is_active = TRUE;`,
            [id]
        );

        res.status(200).json(activity.rows);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting activity",
        });
    }
};

const addActivity = async (req, res) => {
    const client = await client.connect();
    try {
        await client.query("BEGIN");

        const userId = req.body.user_id;
        const sportType = req.body.sport_type || "tennis";
        const gameType = req.body.game_type || "singles";
        const title = req.body.title || `${userId} ${gameType}`;
        const schedule = req.body.schedule;
        const location = req.body.location;
        const minPeople = req.body.min_people || 2;
        const maxPeople = req.body.max_people || 2;
        const skillLevel = req.body.skill_level || 1.0;
        const gamePrivate = req.body.game_private || FALSE;

        const activityResult = await client.query(
            `INSERT INTO activities(user_id, sport_type, game_type, title, schedule, location, min_people, max_people, skill_level, game_private) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;`,
            [
                userId,
                sportType,
                gameType,
                title,
                schedule,
                location,
                minPeople,
                maxPeople,
                skillLevel,
                gamePrivate,
            ]
        );

        if (activityResult.rows.length === 0) {
            await client.query("ROLLBACK");
            console.log("no activity added");
            return res
                .status(400)
                .json({ status: "error", msg: "error adding activity" });
        }

        // insert into activity_user_decision using the same activity id
        await client.query(
            "INSERT INTO activity_user_decisions (activity_id, user_id, is_going) VALUES ($1, $2, $3);",
            [activityResult.rows[0].id, userId, TRUE]
        );

        await client.query("COMMIT");

        res.status(200).json({ status: "ok", msg: "activity created" });
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback on error
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error adding new activity",
        });
    } finally {
        client.release();
    }
};

const updateActivityById = async (req, res) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN");

        const id = req.params.id;
        const updatedFields = [];
        const updatedParams = [];
        let placeholderCount = 0;

        if ("title" in req.body) {
            placeholderCount++;
            updatedFields.push(`title=$${placeholderCount}`);
            updatedParams.push(req.body.title);
        }

        if ("schedule" in req.body) {
            placeholderCount++;
            updatedFields.push(`schedule=$${placeholderCount}`);
            updatedParams.push(req.body.schedule);
        }

        if ("location" in req.body) {
            placeholderCount++;
            updatedFields.push(`location=$${placeholderCount}`);
            updatedParams.push(req.body.location);
        }

        if ("game_type" in req.body) {
            placeholderCount++;
            updatedFields.push(`game_type=$${placeholderCount}`);
            updatedParams.push(req.body.game_type);
        }

        if ("min_people" in req.body) {
            placeholderCount++;
            updatedFields.push(`min_people=$${placeholderCount}`);
            updatedParams.push(req.body.min_people);
        }

        if ("max_people" in req.body) {
            placeholderCount++;
            updatedFields.push(`max_people=$${placeholderCount}`);
            updatedParams.push(req.body.max_people);
        }

        if ("skill_level" in req.body) {
            placeholderCount++;
            updatedFields.push(`skill_level=$${placeholderCount}`);
            updatedParams.push(req.body.skill_level);
        }

        if ("game_private" in req.body) {
            placeholderCount++;
            updatedFields.push(`game_private=$${placeholderCount}`);
            updatedParams.push(req.body.game_private);
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

        await client.query(
            `UPDATE activities SET ${updatedFieldsQuery} WHERE id = $${placeholderCount};`,
            updatedParams
        );

        await client.query("COMMIT");

        res.json({ status: "ok", msg: "activity updated successfully" });
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback on error
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error updating activity",
        });
    } finally {
        client.release();
    }
};

const deleteActivityById = async (req, res) => {
    try {
        const id = req.params.id;

        await db.query("DELETE FROM activities WHERE id = $1;", [id]);

        res.status(200).json({ status: "ok", msg: "activity deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ status: "ok", msg: "error deleting activity" });
    }
};

module.exports = {
    getAllPublicActivities,
    getActivityById,
    addActivity,
    updateActivityById,
    deleteActivityById,
};

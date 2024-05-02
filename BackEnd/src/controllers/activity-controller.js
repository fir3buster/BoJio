const database = require("../db/db");

const db = database.pool;

// ---------------------------------------------------- Activities ----------------------------------------------------------
// getting all public activities (include all players that is invited where is_active = true))
// const getAllPublicActivities = async (req, res) => {
//     try {
//         console.log("inside public Controller");
//         const now = new Date();
//         const activities = await db.query(
//             `SELECT
//                 a.id,
//                 a.user_id,
//                 a.title,
//                 a.date,
//                 a.start_time,
//                 a.end_time,
//                 a.location,
//                 a.sport_type,
//                 a.game_type,
//                 a.min_people,
//                 a.max_people,
//                 a.skill_rate,
//                 a.game_private,
//                 a.court_booked,
//                 (
//                     SELECT
//                         ARRAY_AGG(
//                             JSON_BUILD_OBJECT(
//                                 'user_id', aud.user_id,
//                                 'email', up.email,
//                                 'profile_name', up.profile_name,
//                                 'profile_picture_url', up.profile_picture_url,
//                                 'is_going', aud.is_going,
//                                 'is_active', aud.is_active
//                             )
//                         ORDER BY
//                             CASE
//                                 WHEN aud.user_id = a.user_id THEN 0
//                                 ELSE 1
//                             END
//                         )
//                     FROM
//                         activity_user_decisions aud
//                     JOIN
//                         user_profiles up
//                     ON
//                         aud.user_id = up.id
//                     WHERE
//                         aud.activity_id = a.id
//                         AND aud.is_active = TRUE
//                 ) AS players
//             FROM
//                 activities a
//             WHERE
//                 a.game_private = FALSE
//                 AND a.date > $1
//             ORDER BY
//                 a.date;`,
//             [now]
//         );
//         console.log(activities.rows, typeof activities.rows);
//         res.status(200).json(activities.rows);
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).json({
//             status: "error",
//             msg: "error getting activities",
//         });
//     }
// };

// have to exclude the activites that the active user has joined
const getAllPublicActivities = async (req, res) => {
    try {
        console.log("inside public Controller");
        const activeUserId = req.params.user_id
        const now = new Date();
        const activities = await db.query(
            `SELECT
                a.id,
                a.user_id,
                a.title,
                a.date,
                a.start_time,
                a.end_time,
                a.location,
                a.sport_type,
                a.game_type,
                a.min_people,
                a.max_people,
                a.skill_rate,
                a.game_private,
                a.court_booked,
                (
                    SELECT
                        ARRAY_AGG(
                            JSON_BUILD_OBJECT(
                                'user_id', aud.user_id,
                                'email', up.email,
                                'profile_name', up.profile_name,
                                'profile_picture_url', up.profile_picture_url,
                                'is_going', aud.is_going,
                                'is_active', aud.is_active
                                )
                            ORDER BY
                                CASE
                                    WHEN aud.user_id = a.user_id THEN 0
                                    ELSE 1
                                END
                            )
                    FROM
                        activity_user_decisions aud
                    JOIN
                        user_profiles up
                    ON
                        aud.user_id = up.id
                    WHERE
                        aud.activity_id = a.id
                        AND aud.is_active = TRUE
                ) AS players
            FROM
                activities a
            WHERE
                a.game_private = FALSE
                AND a.date > $1
                AND a.user_id <> $2
            ORDER BY
                a.date;`,
            [now, activeUserId]
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


// getting upcoming activity by id (include all players that is invited where is_active = true))
const getUpcomingActivitiesByUserId = async (req, res) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN");
        const now = new Date();
        // const userId = req.params.user_id;
        // hardCODED at the moment
        const userId = 6;

        const activitiesId = await client.query(
            `SELECT activity_id FROM activity_user_decisions WHERE user_id = $1 AND is_active = TRUE;`,
            [userId]
        );

        if (activitiesId.rows.length === 0) {
            await client.query("ROLLBACK");
            console.log("no activities");
            return res
                .status(400)
                .json({ status: "error", msg: "error getting activities" });
        }

        const ids = activitiesId.rows.map((item) => item.activity_id);
        console.log(ids);

        const activities = await client.query(
            `SELECT
                a.id,
                a.user_id,
                a.title,
                a.date,
                a.start_time,
                a.end_time,
                a.location,
                a.sport_type,
                a.game_type,
                a.min_people,
                a.max_people,
                a.skill_rate,
                a.game_private,
                a.court_booked,
                (
                    SELECT
                        ARRAY_AGG(
                            JSON_BUILD_OBJECT(
                                'user_id', aud.user_id,
                                'email', up.email,
                                'profile_name', up.profile_name,
                                'profile_picture_url', up.profile_picture_url,
                                'is_going', aud.is_going,
                                'is_active', aud.is_active
                            )
                        ORDER BY
                            CASE
                                WHEN aud.user_id = a.user_id THEN 0
                                ELSE 1
                            END
                        )
                    FROM
                        activity_user_decisions aud
                    JOIN
                        user_profiles up
                    ON
                        aud.user_id = up.id
                    WHERE
                        aud.activity_id = a.id
                        AND aud.is_active = TRUE    
                ) AS players
            FROM
                activities a
            WHERE
                a.id = ANY($1)
                AND a.date > $2
            ORDER BY
                a.date;`,
            [ids, now]
        );

        await client.query("COMMIT");

        console.log(activities.rows, typeof activities.rows);
        res.status(200).json(activities.rows);
    } catch (error) {
        await client.query("ROLLBACK");
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting activities",
        });
    } finally {
        client.release();
    }
};

// getting upcoming activity by id (include all players that is invited where is_active = true)
const getPastActivitiesByUserId = async (req, res) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN");
        const now = new Date();
        // const userId = req.params.user_id;
        // HARDCODED
        const userId = 6;

        const activitiesId = await client.query(
            `SELECT activity_id FROM activity_user_decisions WHERE user_id = $1 AND is_active = TRUE;`,
            [userId]
        );

        if (activitiesId.rows.length === 0) {
            await client.query("ROLLBACK");
            console.log("no activities");
            return res
                .status(400)
                .json({ status: "error", msg: "error getting activities" });
        }

        const ids = activitiesId.rows.map((item) => item.activity_id);
        console.log(ids);

        const activities = await client.query(
            `SELECT
                a.id,
                a.user_id,
                a.title,
                a.date,
                a.start_time,
                a.end_time,
                a.location,
                a.sport_type,
                a.game_type,
                a.min_people,
                a.max_people,
                a.skill_rate,
                a.game_private,
                a.court_booked,
                (
                    SELECT
                        ARRAY_AGG(
                            JSON_BUILD_OBJECT(
                                'user_id', aud.user_id,
                                'email', up.email,
                                'profile_name', up.profile_name,
                                'profile_picture_url', up.profile_picture_url,
                                'is_going', aud.is_going,
                                'is_active', aud.is_active
                            )
                        ORDER BY
                            CASE
                                WHEN aud.user_id = a.user_id THEN 0
                                ELSE 1
                            END
                        )
                    FROM
                        activity_user_decisions aud
                    JOIN
                        user_profiles up
                    ON
                        aud.user_id = up.id
                    WHERE
                        aud.activity_id = a.id
                        AND aud.is_active = TRUE    
                ) AS players
            FROM
                activities a
            WHERE
                a.id = ANY($1)
                AND a.date < $2
            ORDER BY
                a.date;`,
            [ids, now]
        );

        await client.query("COMMIT");

        console.log(activities.rows, typeof activities.rows);
        res.status(200).json(activities.rows);
    } catch (error) {
        await client.query("ROLLBACK");
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting activities",
        });
    } finally {
        client.release();
    }
};

// getting activity by id (include all players)
const getActivityById = async (req, res) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN");
        const id = req.params.id;
        const activity = await client.query(
            `SELECT * FROM activities WHERE id = $1;`,
            [id]
        );

        if (activity.rows.length === 0) {
            await client.query("ROLLBACK");
            console.log("no activity found");
            res.status(400).json({ status: "error", msg: "no activity found" });
        }

        const players = await client.query(
            `SELECT aud.user_id, aud.is_going, aud.is_active, up.profile_name, up.profile_picture_url, up.first_name, up.last_name FROM activity_user_decisions aud
            JOIN
                user_profiles up
            ON
                aud.user_id = up.id
            WHERE
                activity_id = $1 AND is_active = TRUE
            ORDER BY
                CASE
                    WHEN user_id = $2 then 0
                    ELSE 1
                END;`,
            [id, activity.rows[0].user_id]
        );

        await client.query("COMMIT");
        console.log(players.rows[0]);
        const activityArray = activity.rows[0];
        const playersArray = players.rows;
        const activityWithPlayers = [{ ...activityArray, playersArray }];

        console.log(activityWithPlayers, typeof activityWithPlayers);
        res.status(200).json(activityWithPlayers);
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback on error
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting activity",
        });
    } finally {
        client.release();
    }
};

const addActivity = async (req, res) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN");

        const userId = req.body.user_id;
        const sportType = req.body.sport_type || "tennis";
        const gameType = req.body.game_type || "singles";
        const title = req.body.title;
        const date = req.body.date;
        const startTime = req.body.start_time;
        const endTime = req.body.end_time;
        const location = req.body.location;
        const minPeople = req.body.min_people || 2;
        const maxPeople = req.body.max_people || 2;
        const skillRate = req.body.skill_rate || "1.0";
        const gamePrivate = req.body.game_private || false;
        const courtBooked = req.body.court_booked || false;

        const activityResult = await client.query(
            `INSERT INTO activities(user_id, sport_type, game_type, title, date, start_time, end_time, location, min_people, max_people, skill_rate, game_private, court_booked) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id;`,
            [
                userId,
                sportType,
                gameType,
                title,
                date,
                startTime,
                endTime,
                location,
                minPeople,
                maxPeople,
                skillRate,
                gamePrivate,
                courtBooked,
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
            [activityResult.rows[0].id, userId, true]
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

        if ("date" in req.body) {
            placeholderCount++;
            updatedFields.push(`date=$${placeholderCount}`);
            updatedParams.push(req.body.date);
        }

        if ("start_time" in req.body) {
            placeholderCount++;
            updatedFields.push(`start_time=$${placeholderCount}`);
            updatedParams.push(req.body.start_time);
        }

        if ("end_time" in req.body) {
            placeholderCount++;
            updatedFields.push(`date=$${placeholderCount}`);
            updatedParams.push(req.body.end_time);
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

        if ("skill_rate" in req.body) {
            placeholderCount++;
            updatedFields.push(`skill_rate=$${placeholderCount}`);
            updatedParams.push(req.body.skill_rate);
        }

        if ("game_private" in req.body) {
            placeholderCount++;
            updatedFields.push(`game_private=$${placeholderCount}`);
            updatedParams.push(req.body.game_private);
        }

        if ("court_booked" in req.body) {
            placeholderCount++;
            updatedFields.push(`court_booked=$${placeholderCount}`);
            updatedParams.push(req.body.court_booked);
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

        // Check if the record exists before attempting to delete
        const checkResult = await db.query(
            "SELECT * FROM activities WHERE id = $1;",
            [id]
        );

        if (checkResult.rowCount === 0) {
            return res
                .status(404)
                .json({ status: "error", msg: "activity not found" });
        }

        await db.query("DELETE FROM activities WHERE id = $1;", [id]);

        res.status(200).json({ status: "ok", msg: "activity deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ status: "ok", msg: "error deleting activity" });
    }
};

// ---------------------------------------------------- player ----------------------------------------------------------
// add a player to the game
const addPlayer = async (req, res) => {
    try {
        const activityId = req.body.activity_id;
        const userId = req.body.user_id;
        const isGoing = req.body.is_going || false;
        const isActive = req.body.is_active || true;

        await db.query(
            `INSERT INTO activity_user_decisions (activity_id, user_id, is_going, is_active) VALUES ($1, $2, $3, $4);`,
            [activityId, userId, isGoing, isActive]
        );

        res.status(200).json({
            status: "ok",
            msg: "add player to activity successfully",
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error creating player to activity",
        });
    }
};

// update players status (either join or left)
const updatePlayerStatusById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedFields = [];
        const updatedParams = [];
        let placeholderCount = 0;
        if ("is_going" in req.body) {
            placeholderCount++;
            updatedFields.push(`is_going=$${placeholderCount}`);
            updatedParams.push(req.body.is_going);
        }

        if ("is_active" in req.body) {
            placeholderCount++;
            updatedFields.push(`is_active=$${placeholderCount}`);
            updatedParams.push(req.body.is_active);
        }

        if (updatedFields.length === 0) {
            return res
                .status(400)
                .json({ status: "error", msg: "no fields to update" });
        }

        placeholderCount++;
        updatedParams.push(id);

        const updatedFieldsQuery = updatedFields.join(", ");

        await db.query(
            `UPDATE activity_user_decisions SET ${updatedFieldsQuery} WHERE id = $${placeholderCount};`,
            updatedParams
        );

        res.json({ status: "ok", msg: "player status updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error updating player's status",
        });
    }
};

// delete player when he left the game
const deletePlayerById = async (req, res) => {
    try {
        const activityId = req.params.id;
        const userId = req.body.user_id;
        console.log(userId)
        // Check if the record exists before attempting to delete
        const checkResult = await db.query(
            "SELECT * FROM activity_user_decisions WHERE activity_id = $1 AND user_id = $2 ;",
            [activityId, userId]
        );

        if (checkResult.rowCount === 0) {
            return res
                .status(404)
                .json({ status: "error", msg: "Player not found" });
        }

        await db.query("DELETE FROM activity_user_decisions WHERE activity_id = $1 and user_id = $2;", 
            [activityId, userId]
        );

        res.status(200).json({ status: "ok", msg: "player deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ status: "error", msg: "error deleting player" });
    }
};

module.exports = {
    getAllPublicActivities,
    getUpcomingActivitiesByUserId,
    getPastActivitiesByUserId,
    getActivityById,
    addActivity,
    updateActivityById,
    deleteActivityById,
    addPlayer,
    updatePlayerStatusById,
    deletePlayerById,
};



//         // hardCODED at the moment => line 145,240

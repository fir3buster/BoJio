const express = require("express");
const router = express.Router();

const {
    getAllPublicActivities,
    getActivityById,
    addActivity,
    updateActivityById,
    deleteActivityById,
    getUpcomingActivitiesByUserId,
    getPastActivitiesByUserId,
    addPlayer,
    updatePlayerStatusById,
    deletePlayerById,
} = require("../controllers/activity-controller");

const { authUser } = require("../middleware/auth-middleware");

router.get("/public", getAllPublicActivities);
router.get("/upcoming/:user_id", getUpcomingActivitiesByUserId);
router.get("/past/:user_id", getPastActivitiesByUserId);
router.get("/:id", getActivityById);
router.post("/", addActivity);
router.put("/:id", updateActivityById);
router.delete("/:id", deleteActivityById);

router.post("/player", addPlayer);
router.put("/player/:id", updatePlayerStatusById);
router.delete("/player/:id", deletePlayerById);

module.exports = router;

// router.get("/public", authUser, getAllPublicActivities);
// router.get("/upcoming/:user_id", authUser, getUpcomingActivitiesByUserId);
// router.get("/past/:user_id", authUser, getPastActivitiesByUserId);
// router.get("/:id", authUser, getActivityById);
// router.post("/", authUser, addActivity);
// router.update("/:id", authUser, updateActivityById);
// router.delete("/:id", authUser, deleteActivityById);

// router.post("/player", authUser, addPlayer);
// router.put("/player/:id", authUser, updatePlayerStatusById);
// router.delete("/player/:id", authUser, deletePlayerById);
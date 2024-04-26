const express = require("express");
const router = express.Router();

const {
    getAllPublicActivities,
    getActivityById,
    addActivity,
    updateActivityById,
    deleteActivityById,
} = require("../controllers/activity-controller");

const { authUser } = require("../middleware/auth-middleware");

router.get("/public", getAllPublicActivities);
router.get("/:id", getActivityById);
router.post("/", addActivity);
router.put("/:id", updateActivityById);
router.delete("/:id", deleteActivityById);

module.exports = router;

// router.get("/public", authUser, getAllPublicActivities);
// router.get("/:id", authUser, getActivityById);
// router.post("/", authUser, addActivity);
// router.update("/:id", authUser, updateActivityById);
// router.delete("/:id", authUser, deleteActivityById);

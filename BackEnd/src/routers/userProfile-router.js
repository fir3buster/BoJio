const express = require("express");
const router = express.Router();

const {
    getAllActiveUsers,
    getUserById,
    updateUserProfile,
    manageUserAccountById,
    getFollowingUsersById,
    getFollowersById,
    updateFollower,
    getSportsCardsById,
    addSportCardById,
    updateSportCardById,
} = require("../controllers/userProfile-controller");

const { authAdmin, authUser } = require("../middleware/auth-middleware");

router.get("/activeusers", getAllActiveUsers);
router.put("/userAccount/:id", manageUserAccountById);
router.get("/user/:id", getUserById);
router.patch("/user/:id", updateUserProfile);

router.get("/followee/:id", getFollowingUsersById);
router.get("/follower/:id", getFollowersById);
router.put("/updatefollower", updateFollower);

router.get("/sportcard/:id", getSportsCardsById);
router.post("/sportcard/:id", addSportCardById);
router.put("/sportcard/:id", updateSportCardById)

module.exports = router;

// router.get("/activeusers", authUser, getAllActiveUsers);
// router.put("/useraccount/:id", authAdmin, manageUserAccountById);
// router.get("/user/:id", authUser, getUserById);
// router.patch("/user/:id", authUser, updateUserProfile)

// router.get("/followee/:id", authUser, getFollowingUsersById);
// router.get("/follower/:id", authUser, getFollowersById);
// router.put("/updatefollower", authUser, updateFollower);

// router.get("/sportcard/:id", authUser, getSportsCardsById);
// router.post("/sportcard/:id", authUser, addSportCardById);
// router.put("/sportcard/:id", authUser, updateSportCardById)

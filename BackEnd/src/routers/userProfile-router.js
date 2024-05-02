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
    getAllSportsCardsByUserId,
    addSportCard,
    updateSportCardById,
} = require("../controllers/userProfile-controller");

const { authAdmin, authUser } = require("../middleware/auth-middleware");

router.get("/activeusers", authUser, getAllActiveUsers);
router.get("/user/:id", authUser, getUserById);
router.patch("/user/:id", authUser, updateUserProfile);

router.get("/followee/:id", authUser, getFollowingUsersById);
router.get("/follower/:id", authUser, getFollowersById);
router.put("/updatefollower", authUser, updateFollower);

router.get("/sportcard/:user_id", authUser, getAllSportsCardsByUserId);
router.post("/sportcard", authUser, addSportCard);
router.put("/sportcard/:id", authUser, updateSportCardById);

router.put("/useraccount/:id", authAdmin, manageUserAccountById);

module.exports = router;

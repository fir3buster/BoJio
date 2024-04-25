const express = require("express");
const router = express.Router();

const { getAllUsers, register, login, refresh,  } = require("../controllers/auth-controller");
const { validateRegistrationData, validateLoginData, validateRefreshToken } = require("../validators/auth-validate");
const { errorCheck } = require("../validators/errorsCheck");
const { authAdmin } = require("../middleware/auth-middleware");


router.get("/users", getAllUsers );
router.put("/register", validateRegistrationData, errorCheck, register);
router.post("/login", validateLoginData, errorCheck, login)
router.post("/refresh", validateRefreshToken, errorCheck, refresh)

module.exports = router;


// router.get("/users", authAdmin, getAllUsers );

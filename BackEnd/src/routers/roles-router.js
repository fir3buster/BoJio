const express = require("express");
const { getAllRoles } = require("../controllers/getAllRoles-controller");

const router = express.Router();

router.get("/", getAllRoles)

module.exports = router;
const database = require("../db/db");

const db = database.pool;

const getAllRoles = async (req, res) => {
    try {
        const roles = await db.query("SELECT * FROM roles")
        res.json(roles.rows.map((item) => item.role_type));
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ status: "error", msg: "cannot get roles" });
    }
};

module.exports = { getAllRoles };
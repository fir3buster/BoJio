const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// Function to check if the database is connected
const connectDB = async () => {
    try {
        await pool.query("SELECT 1"); // A simple query to test the connection
        const result = await pool.query(
            "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
        );
        // console.log("Tables:", result.rows);
        console.log(`DB connected: ${pool.options.host}`);
    } catch (error) {
        console.error("DB connection error:", error.message);
        process.exit(1); // Exit the process with an error code
    }
};

module.exports = { connectDB, pool };

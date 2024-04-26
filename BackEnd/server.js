require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const db = require("./src/db/db");
const auth = require("./src/routers/auth-router");
const userProfile = require("./src/routers/userProfile-router")
const activity = require("./src/routers/activity-router")

// const limiter = rateLimit({
//     windowMS: 15 * 60 * 1000,
//     max: 100,
//     standardHeaders: true,
//     legacyHeaders: false,
// });

db.connectDB();

const app = express();

app.use(cors());
app.use(helmet());
// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/profile", userProfile )
app.use("/activity", activity )

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

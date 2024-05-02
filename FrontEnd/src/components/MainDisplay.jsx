import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Feed from "./Feed";
import Schedule from "./Schedule";
import Profile from "./Profile";
import Control from "./Control";
import styles from "./MainDisplay.module.css";
import Play from "./Play";
import Player from "./Player";

const MainDisplay = () => {
    return (
        <div className={styles.container}>
            <div className={styles["left-col"]}>
                <NavBar />
            </div>
            <div className={styles["center-col"]}>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/control" element={<Control />} />
                    <Route path="/play/:id" element={<Play />} />
                    <Route path="/player/:id" element={<Player />} />
                    {/* dynamic route with parameter */}
                </Routes>
            </div>
            <div className={styles["right-col"]}>
                Additional content or left empty
            </div>
        </div>
    );
};

export default MainDisplay;

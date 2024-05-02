import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from "@mui/icons-material/Feed";
import ScheduleIcon from "@mui/icons-material/PendingActions";
import ProfileIcon from "@mui/icons-material/AccountBoxTwoTone";
import PestControlIcon from "@mui/icons-material/PestControl";
import UserContext from "../context/user";
import LogoutIcon from "@mui/icons-material/Logout";

const NavBar = () => {
    const userCtx = useContext(UserContext);
    const setActiveClass = (navData) => (navData.isActive ? styles.active : "");
    const signOut = () => {
        userCtx.setAccessToken("");
        // logic to reset any states to default if necessary
        window.location.reload();
    };
    return (
        <div
            style={{
                position: "relative",
                height: "100vh",
                // border: "2px solid black",
            }}
        >
            <div className={styles.navbar}>
                <nav>
                    <ul>
                        <h1>BOJIO</h1>
                        <li>
                            <NavLink to="/home" className={setActiveClass}>
                                <Button
                                    size="large"
                                    color="primary"
                                    variant="string"
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                    }}
                                    startIcon={<HomeIcon />}
                                >
                                    Home
                                </Button>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/feed" className={setActiveClass}>
                                <Button
                                    size="large"
                                    color="primary"
                                    variant="string"
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                    }}
                                    startIcon={<FeedIcon />}
                                >
                                    Feed
                                </Button>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/schedule" className={setActiveClass}>
                                <Button
                                    size="large"
                                    color="primary"
                                    variant="string"
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                    }}
                                    startIcon={<ScheduleIcon />}
                                >
                                    Schedule
                                </Button>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" className={setActiveClass}>
                                <Button
                                    size="large"
                                    color="primary"
                                    variant="string"
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                    }}
                                    startIcon={<ProfileIcon />}
                                >
                                    Profile
                                </Button>
                            </NavLink>
                        </li>
                        <li>
                            {userCtx.role === "admin" && (
                                <NavLink
                                    to="/control"
                                    className={setActiveClass}
                                >
                                    <Button
                                        size="large"
                                        color="primary"
                                        variant="string"
                                        style={{
                                            fontSize: "1.5rem",
                                            fontWeight: "bold",
                                        }}
                                        startIcon={<PestControlIcon />}
                                    >
                                        Control
                                    </Button>
                                </NavLink>
                            )}
                        </li>
                    </ul>
                </nav>
                <Button
                    size="large"
                    color="primary"
                    variant="string"
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "14%",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        width: "100%",
                    }}
                    startIcon={<LogoutIcon />}
                    onClick={signOut}
                >
                    SignOut
                </Button>
            </div>
        </div>
    );
};

export default NavBar;

import React from 'react';
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import ScheduleIcon from '@mui/icons-material/PendingActions';
import ProfileIcon from '@mui/icons-material/AccountBoxTwoTone';

const NavBar = () => {
    const setActiveClass = (navData) => (navData.isActive ? styles.active : "");
    return (
        <div>
            <div className={styles.navbar}>
                <nav>
                    <ul>
                        <h1>BOJIO</h1>
                        <li>
                            <NavLink to="/home" className={setActiveClass}>
                                <Button size="large" color="primary" variant="string" style={{fontSize: '1.5rem', fontWeight: 'bold'}} startIcon={<HomeIcon />}>
                                    Home
                                </Button>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/feed" className={setActiveClass}>
                                <Button size="large" color="primary" variant="string" style={{fontSize: '1.5rem', fontWeight: 'bold'}} startIcon={<FeedIcon />}>
                                    Feed
                                </Button>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/schedule" className={setActiveClass}>
                                <Button size="large" color="primary" variant="string" style={{fontSize: '1.5rem', fontWeight: 'bold'}} startIcon={<ScheduleIcon />}>
                                    Schedule
                                </Button>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" className={setActiveClass}>
                                <Button size="large" color="primary" variant="string" style={{fontSize: '1.5rem', fontWeight: 'bold'}} startIcon={<ProfileIcon />}>
                                    Profile
                                </Button>
                            
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;

// import React from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import NavBar from "./NavBar";
// import Home from "./Home";  
// import Feed from "./Feed";
// import Schedule from "./Schedule";
// import Profile from "./Profile";
// import styles from "./MainDisplay.module.css";

// const MainDisplay = () => {
//     return (
//         <div>
//         {/* div className={styles.centered}> */}
//             {/* <h1>TO IMPLEMENT ROUTING HERE!!</h1> */}
//             <NavBar></NavBar>
//             <Routes>
//                 <Route
//                     path="/"
//                     element={<Navigate replace to="/home" />}
//                 ></Route>
//                 <Route path="home" element={<Home />}></Route>
//                 <Route path="feed" element={<Feed />}></Route>
//                 <Route path="schedule" element={<Schedule />}></Route>
//                 <Route path="profile" element={<Profile />}></Route>
//             </Routes>
//         </div>
//     );
// };

// export default MainDisplay;

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";  
import Feed from "./Feed";
import Schedule from "./Schedule";
import Profile from "./Profile";
import styles from "./MainDisplay.module.css";

const MainDisplay = () => {
    return (
        <div className={styles.container}>
            <div className={styles["left-col"]}>
                <NavBar />
            </div>
            <div className={styles["center-col"]}>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path="home" element={<Home />} />
                    <Route path="feed" element={<Feed />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </div>
            <div className={styles["right-col"]}>
                Additional content or left empty
            </div>
        </div>
    );
};

export default MainDisplay;

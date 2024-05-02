import React, { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import UserContext from "./context/user";
import Login from "./components/Login";
import Registration from "./components/Registration";
import MainDisplay from "./components/MainDisplay";

function App() {
    const [userCtx, setUserCtx] = useState({});
    const [accessToken, setAccessToken] = useState("");
    const [role, setRole] = useState("");
    const [showLogin, setShowLogin] = useState(true);
    const [ActiveUserId, setActiveUserId] = useState(0);
    const [displayActivity, setDisplayActivity] = useState([]);
    const [displayPlayer, setDisplayPlayer] = useState([])
    const [displayFollowings, setDisplayFollowings] = useState([]);
    const [displayFollowers, setDisplayFollowers] = useState([]);
    const [displaySportCard, setDisplaySportCard] = useState([]);
    const [isJoined, setIsJoined] = useState(false)
    const [count, setCount] = useState(0);

    return (
        <div>
            <UserContext.Provider
                value={{
                    userCtx,
                    setUserCtx,
                    accessToken,
                    setAccessToken,
                    role,
                    setRole,
                    showLogin,
                    setShowLogin,
                    ActiveUserId,
                    setActiveUserId,
                    displayActivity,
                    setDisplayActivity,
                    displayPlayer,
                    setDisplayPlayer,
                    displayFollowers,
                    setDisplayFollowers,
                    displayFollowings,
                    setDisplayFollowings,
                    displaySportCard,
                    setDisplaySportCard,
                    isJoined,
                    setIsJoined
                }}
            >
                {accessToken.length > 0 && <MainDisplay></MainDisplay>}
                {/* {<MainDisplay></MainDisplay>} */}
                {accessToken.length === 0 && showLogin && (
                    <Login setShowLogin={setShowLogin}></Login>
                )}
                {accessToken.length === 0 && !showLogin && (
                    <Registration setShowLogin={setShowLogin}></Registration>
                )}
            </UserContext.Provider>
        </div>
    );

    // return (
    //     <>
    //         <div>
    //             <a href="https://vitejs.dev" target="_blank">
    //                 <img src={viteLogo} className="logo" alt="Vite logo" />
    //             </a>
    //             <a href="https://react.dev" target="_blank">
    //                 <img
    //                     src={reactLogo}
    //                     className="logo react"
    //                     alt="React logo"
    //                 />
    //             </a>
    //         </div>
    //         <h1>Vite + React</h1>
    //         <div className="card">
    //             <button onClick={() => setCount((count) => count + 1)}>
    //                 count is {count}
    //             </button>
    //             <p>
    //                 Edit <code>src/App.jsx</code> and save to test HMR
    //             </p>
    //         </div>
    //         <p className="read-the-docs">
    //             Click on the Vite and React logos to learn more
    //         </p>
    //     </>
    // );
}

export default App;

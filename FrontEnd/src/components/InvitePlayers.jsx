// import React, { useRef, useContext, useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import useFetch from "../hooks/useFetch";
// import UserContext from "../context/user";
// import styles from "./Modal.module.css";
// import {
//     ToggleButtonGroup,
//     ToggleButton,
//     TextField,
//     Slider,
//     Button,
//     Switch,
//     Typography,
//     Divider,
//     Box,
//     Stack,
//     Tab,
//     Avatar
// } from "@mui/material";

// const Overlay = ({ onClose, fetchActivity, id }) => {
//     const userCtx = useContext(UserContext);
//     const [allUsers, setAllUsers] = useState([]);
//     const [filterUsers, setFilterUsers] = useState([]);
//     const invitedPlayerRef = useRef();
//     const isGoingRef = useRef();
//     const isActiveRef = useRef();

//     const fetchData = useFetch();

//     const players = userCtx.displayActivity[0].playersArray;
//     const playersIdArray = players.map(player => player.user_id)
//     playersIdArray.push(id)

//     const getAllActiveUsers = async () => {
//         try {
//             console.log("getting all active users");
//             const res = await fetchData(
//                 "/profile/activeusers",
//                 undefined,
//                 undefined,
//                 undefined,
//                 userCtx.accessToken
//             );

//             if (res.ok) {
//                 console.log(res.data);
//                 setAllUsers(res.data);
//                 // setAllActivities()
//             } else {
//                 alert(JSON.stringify(res.data));
//                 console.log(res.data);
//             }
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

// const addPlayer = async (userId) => {
//     try {
//         const res = await fetchData(
//             "/activity/player",
//             "POST",
//             {
//                 activity_id: id,
//                 user_id: userCtx.ActiveUserId,
//             },
//             userCtx.accessToken
//         );

//         if (res.ok) {
//             alert("Invited Players Successfully");
//             fetchActivity();
//             onClose();
//         }
//     } catch (error) {
//         alert(JSON.stringify(error.message));
//         console.log(error.message);
//     }
// };

//     if (allUsers.length > 0) {
//         const filteredUsersArray = allUsers.filter((player) => !playersIdArray.includes(player.user_id))
//         setFilterUsers(filteredUsersArray)
//     }

//     useEffect(() => {
//         getAllActiveUsers();
//     }, []);

//     return (
//         <div className={styles.backdrop}>
//             <div className={styles.modal}>
//                 {JSON.stringify(allUsers)}
//                 abc
// {filterUsers &&
//     filterUsers.map((player) => (
//         <Stack
//             direction="row"
//             spacing={2}
//             key={player.user_id}
//             id={player.user_id}
//         >
//             <Avatar
//                 sx={{ bgcolor: player.profile_picture_url }}
//             >
//                 {player.profile_name}
//             </Avatar>

//             <Box
//                 sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                 }}
//             >
//                 <Typography
//                     variant="body1"
//                     sx={{
//                         display: "inline-block",
//                         margin: "15px 3px 0 0",
//                         fontWeight: "bold",
//                     }} // Set inline and add spacing
//                 >
//                     {player.first_name}
//                 </Typography>

//                 <Typography
//                     variant="body1"
//                     sx={{
//                         display: "inline-block",
//                         fontWeight: "bold",
//                         margin: "15px 0 0 0",
//                     }} // Set inline to be on the same line
//                 >
//                     {player.last_name}
//                 </Typography>
//             </Box>

//             <Button
//                 size="large"
//                 color="primary"
//                 variant="outlined"
//                 // onClick={onClick}
//                 style={{
//                     fontSize: "0.75rem",
//                     fontWeight: "bold",
//                     width: "10%",
//                 }}
//             >
//                 Invite
//             </Button>
//         </Stack>
//     ))}
//             </div>
//         </div>
//     );
// };

// const InvitePlayers = ({ onClose, fetchActivity, id }) => {
//     return (
//         <div>
//             {ReactDOM.createPortal(
//                 <Overlay
//                     onClose={onClose}
//                     fetchActivity={fetchActivity}
//                     id={id}
//                 ></Overlay>,
//                 document.querySelector("#invitePlayerModal-root")
//             )}
//         </div>
//     );
// };

// export default InvitePlayers;

import React, { useContext, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import styles from "./Modal.module.css";
import { Avatar, Button, Box, Typography, Stack } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const Overlay = ({ onClose, getDisplayActivity, id }) => {
    const userCtx = useContext(UserContext);
    const [allUsers, setAllUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const fetchData = useFetch();

    const addPlayer = async (userId) => {
        try {
            const res = await fetchData(
                "/activity/player",
                "POST",
                {
                    activity_id: id,
                    user_id: userId,
                },
                userCtx.accessToken
            );

            if (res.ok) {
                alert("Invited Players Successfully");
                getDisplayActivity();
                onClose();
            }
        } catch (error) {
            alert(JSON.stringify(error.message));
            console.log(error.message);
        }
    };

    useEffect(() => {
        const getAllActiveUsers = async () => {
            try {
                const res = await fetchData(
                    "/profile/activeusers",
                    undefined,
                    undefined,
                    undefined,
                    userCtx.accessToken
                );

                if (res.ok) {
                    setAllUsers(res.data);
                } else {
                    console.error(JSON.stringify(res.data));
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        getAllActiveUsers();
    }, [fetchData, userCtx.accessToken]); // Only runs once when component mounts

    // Only set filtered users when `allUsers` changes and when condition is met
    useEffect(() => {
        if (allUsers.length > 0) {
            const players = userCtx.displayActivity[0].playersArray.map(
                (player) => player.user_id
            );
            players.push(id);

            const filteredUsers = allUsers.filter(
                (user) => !players.includes(user.user_id)
            );

            if (filteredUsers.length !== filterUsers.length) {
                setFilterUsers(filteredUsers);
            }
        }
    }, [allUsers, id, userCtx.displayActivity]); // Dependencies for filtering

    return (
        <div className={styles.inviteBackdrop}>
            <div className={styles.inviteModal}>
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "left",
                        // border: "2px solid red",
                    }}
                >
                    <Button
                        size="large"
                        color="primary"
                        variant="text"
                        display="inline-block"
                        style={{
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            margin: "0 0 0 -20px",
                            // border: "2px solid blue",
                            // width: "100%",
                        }}
                        onClick={onClose}
                    >
                        <KeyboardDoubleArrowLeftIcon />
                    </Button>
                    <h4>Players to Invite</h4>
                </Box>
                {filterUsers &&
                    filterUsers.map((player) => (
                        <Stack
                            direction="row"
                            spacing={2}
                            key={player.user_id}
                            id={player.user_id}
                            sx={{margin: "10px"}}
                        >
                            <Avatar
                                sx={{ bgcolor: player.profile_picture_url }}
                            >
                                {player.profile_name}
                            </Avatar>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        display: "inline-block",
                                        margin: "15px 3px 0 0",
                                        fontWeight: "bold",
                                    }} // Set inline and add spacing
                                >
                                    {player.first_name}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        display: "inline-block",
                                        fontWeight: "bold",
                                        margin: "15px 0 0 0",
                                    }} // Set inline to be on the same line
                                >
                                    {player.last_name}
                                </Typography>
                            </Box>

                            <Button
                                size="large"
                                color="primary"
                                variant="contained"
                                onClick={() => addPlayer(player.user_id)}
                                style={{
                                    fontSize: "0.7rem",
                                    fontWeight: "bold",
                                    width: "10%",
                                }}
                            >
                                Invite
                            </Button>
                        </Stack>
                    ))}
            </div>
        </div>
    );
};

const InvitePlayers = ({ onClose, getDisplayActivity, id }) => {
    return ReactDOM.createPortal(
        <Overlay
            onClose={onClose}
            getDisplayActivity={getDisplayActivity}
            id={id}
        />,
        document.querySelector("#invitePlayerModal-root")
    );
};

export default InvitePlayers;

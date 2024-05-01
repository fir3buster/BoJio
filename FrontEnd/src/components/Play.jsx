import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import moment from "moment";
import SportsTennisOutlinedIcon from "@mui/icons-material/SportsTennisOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import SportsMartialArtsOutlinedIcon from "@mui/icons-material/SportsMartialArtsOutlined";
import styles from "./Home.module.css";

const Play = () => {
    const userCtx = useContext(UserContext);
    const { id } = useParams(); // Extract the route parameter
    const [isLoading, setIsLoading] = useState(true);

    // const [title, setTitle] = useState("");
    // const [location, setLocation] = useState("");
    // const [schedule, setSchedule] = useState(""); // Date/time field
    // const [gameType, setGameType] = useState("");
    // const [minPeople, setMinPeople] = useState(0); // Slider or number input
    // const [maxPeople, setMaxPeople] = useState(0); // Slider or number input
    // const [skillLevel, setSkillLevel] = useState(""); // Text or select input
    // const [gamePrivate, setGamePrivate] = useState(false); // Toggle button
    const [showJoinGame, setShowJoinGame] = useState(false);

    const fetchData = useFetch();

    // const handleToggle = () => {
    //     setGamePrivate(!gamePrivate); // Toggle the boolean value
    // };

    // const handleSliderChange = (event, newValue, name) => {
    //     // Slider component will send a new value
    //     if (name === "minPeople") {
    //         setMinPeople(newValue);
    //     } else if (name === "maxPeople") {
    //         setMaxPeople(newValue);
    //     }
    // };

    // refetch activity if displayActivity state is none
    const fetchActivity = async () => {
        try {
            const res = await fetchData(
                "/activity/" + id,
                undefined,
                undefined,
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                console.log(res.data);
                userCtx.setDisplayActivity(res.data);
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // const handleAddActivityClick = () => {
    //     setShowCreate(true);
    // };

    const handleGetActivityClick = () => {};
    const players = userCtx.displayActivity[0].playersArray;
    // const isHost = userCtx.displayActivity[0].user_id === userCtx.ActiveUserId ? true: false;
    const isHost = userCtx.displayActivity[0].user_id === 6 ? true : false;
    const isPast = new Date(userCtx.displayActivity[0].date) < new Date() ? true : false;
    console.log(userCtx.displayActivity[0].date)
    console.log(new Date() > new Date(userCtx.displayActivity[0].date))
    console.log("CHECK past date boolean: " + isPast)
    const goingCount = players.reduce((count, player) => {
        return player.is_going ? count + 1 : count;
    }, 0);

    const invitedCount = players.reduce((count, player) => {
        return !player.is_going ? count + 1 : count;
    }, 0);

    useEffect(() => {
        if (!userCtx.displayActivity) {
            fetchActivity();
        }
    }, [id]); // Rerun if the ID changes

    // if (isLoading) {
    //     return <div>Loading...</div>; // Display loading state
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>; // Display error message
    // }

    return (
        <div
            style={{
                position: "relative",
                height: "100vh",
                // border: "2px solid black",
            }}
        >
            {/* <h1>Activity Details for ID: {id}</h1>
            {JSON.stringify(userCtx.displayActivity)}
            <hr /> */}
            {userCtx.displayActivity &&
                userCtx.displayActivity.map((item) => (
                    <div>
                        {/* <div>
                            <div>ACTIVITIES</div>
                            <div>Title: {item.title}</div>
                            <div>Location: {item.location}</div>
                            <div>Date: {item.date}</div>
                            <div>startTime: {item.start_time}</div>
                            <div>endTime: {item.end_time}</div>
                            <div>isBooked: {item.court_Booked}</div>
                            <div>GameType: {item.game_type}</div>
                            <div>Min: {item.min_player}</div>
                            <div>Max: {item.max_player}</div>
                            <div>Skill: {item.skill_rate}</div>
                            <div>Private: {item.game_private}</div>
                            <div>
                                players:{" "}
                                {item.playersArray.map((player) => (
                                    <div>{player.id}</div>
                                ))}
                            </div>
                        </div> */}
                        <div>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ margin: "15px 0 15px 0" }}
                            >
                                <SportsTennisOutlinedIcon />
                                <Typography variant="subtitle1">
                                    Tennis
                                </Typography>
                            </Stack>
                            <Typography variant="h4">{item.title}</Typography>

                            <Divider sx={{ margin: "15px 0 15px 0" }} />
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ margin: "15px 0 15px 0" }}
                            >
                                <SportsEsportsOutlinedIcon />
                                <Typography
                                    variant="body1"
                                    sx={{ margin: "10px 0 0 0" }}
                                >
                                    {item.game_private
                                        ? "Private game"
                                        : "Public game"}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ margin: "15px 0 15px 0" }}
                            >
                                <SportsMartialArtsOutlinedIcon />
                                <Typography
                                    variant="body1"
                                    sx={{ margin: "10px 0 0 0" }}
                                >
                                    {item.skill_rate
                                        ? `Restrictied to players with level ${item.skill_rate}`
                                        : "Restricted to players with level 1.0 and above"}
                                </Typography>
                            </Stack>

                            {item.court_booked ? (
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{ margin: "10px 0 10px 0" }}
                                >
                                    <StickyNote2OutlinedIcon />
                                    <Typography
                                        variant="body1"
                                        sx={{ margin: "10px 0" }}
                                    >
                                        Court Booked
                                    </Typography>
                                </Stack>
                            ) : null}

                            <Divider sx={{ margin: "15px 0 15px 0" }} />

                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ margin: "15px 0 15px 0" }}
                            >
                                <AccessTimeOutlinedIcon />
                                <Typography
                                    variant="body1"
                                    // color="text.secondary"
                                >
                                    {`${moment(item.date).format(
                                        "MMMM Do YYYY"
                                    )},
                            ${moment(item.start_time, "HH:mm:ss").format(
                                "h:mm a"
                            )} - ${moment(item.end_time, "HH:mm:ss").format(
                                        "h:mm a"
                                    )}`}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ margin: "15px 0 15px 0" }}
                            >
                                <LocationOnOutlinedIcon />
                                <Typography
                                    variant="body1"
                                    // color="text.secondary"
                                    sx={{ margin: "10px 0" }}
                                >
                                    {item.isBooked ? "Court Booked -" : null}
                                    {item.location}
                                </Typography>
                            </Stack>

                            <Divider sx={{ margin: "15px 0 15px 0" }} />

                            <Typography
                                variant="body1"
                                sx={{ margin: "10px 0 10px 0" }}
                            >
                                <span>
                                    <b>{`${goingCount}/${item.max_people} Going`}</b>
                                </span>{" "}
                                <br />
                                <span>{`Min ${item.min_people} to start`}</span>
                            </Typography>

                            <Stack direction="row" spacing={2}>
                                {item.playersArray.map((player) =>
                                    player.is_going ? (
                                        <Stack
                                            direction="column"
                                            alignItems="center"
                                            key={player.user_id}
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor:
                                                        player.profile_picture_url,
                                                    width: 50,
                                                    height: 50,
                                                }}
                                            >
                                                {player.profile_name}
                                            </Avatar>
                                            <span>
                                                {player.first_name +
                                                    " " +
                                                    player.last_name}
                                            </span>
                                        </Stack>
                                    ) : null
                                )}
                            </Stack>

                            <Box>
                                <Typography
                                    variant="body1"
                                    sx={{ margin: "10px 0 10px 0" }}
                                >
                                    <br />
                                    <b>{`Invited (${invitedCount})`}</b>
                                    <br />
                                    <div>
                                        Organiser can see all invites while
                                        others can only see theirs
                                    </div>
                                </Typography>

                                <Stack direction="row" spacing={2}>
                                    {item.playersArray.map((player) =>
                                        !player.is_going ? (
                                            <Stack
                                                direction="column"
                                                alignItems="center"
                                                key={player.user_id}
                                            >
                                                <Avatar
                                                    sx={{
                                                        bgcolor:
                                                            player.profile_picture_url,
                                                        width: 50,
                                                        height: 50,
                                                    }}
                                                >
                                                    {player.profile_name}
                                                </Avatar>
                                                <span>
                                                    {player.first_name +
                                                        " " +
                                                        player.last_name}
                                                </span>
                                            </Stack>
                                        ) : null
                                    )}
                                </Stack>
                            </Box>
                        </div>
                    </div>
                ))}
            <div>{JSON.stringify(userCtx.isJoined)}</div>
            {isPast ? (
                <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    style={{
                        position: "absolute",
                        bottom: "-15px",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        width: "100%",
                    }}
                    disabled
                >
                    JOINED
                </Button>
            ) : isHost ?  (
                <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    style={{
                        position: "absolute",
                        bottom: "-15px",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        width: "100%",
                    }}
                    // onClick={()},
                >
                    INVITE PLAYERS
                </Button>
            ) : userCtx.isJoined ? (<Button
                size="large"
                color="primary"
                variant="contained"
                style={{
                    position: "absolute",
                    bottom: "-15px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    width: "100%",
                }}
                // onClick={()},
            >
                JOINED
            </Button>) : (<Button
                    size="large"
                    color="primary"
                    variant="contained"
                    style={{
                        position: "absolute",
                        bottom: "-15px",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        width: "100%",
                    }}
                    // onClick={()},
                >
                    JOIN
                </Button>)}

            {/* {accessToken.length === 0 && showLogin && (
                    <Login setShowLogin={setShowLogin}></Login>
                )} */}

            {/* ADD A GAME */}
            {/* {showCreate && (
                <form onSubmit={handleSubmit}>
                    <h2>Organise a Game</h2>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} // Directly updating state
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)} // Direct update
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="schedule">Schedule:</label>
                        <input
                            type="datetime-local"
                            id="schedule"
                            value={schedule}
                            onChange={(e) => setSchedule(e.target.value)} // Direct update
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="gameType">Game Type:</label>
                        <input
                            type="text"
                            id="gameType"
                            value={gameType}
                            onChange={(e) => setGameType(e.target.value)} // Direct update
                        />
                    </div>
                    <div>
                        <label htmlFor="minPeople">Minimum Players:</label>
                        <input
                            type="number"
                            id="minPeople"
                            value={minPeople}
                            onChange={(e) =>
                                setMinPeople(Number(e.target.value))
                            } // Direct update
                        />
                    </div>
                    <div>
                        <label htmlFor="maxPeople">Maximum Players:</label>
                        <input
                            type="number"
                            id="maxPeople"
                            value={maxPeople}
                            onChange={(e) =>
                                setMaxPeople(Number(e.target.value))
                            } // Direct update
                        />
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={gamePrivate}
                                onChange={handleToggle} // Toggle boolean
                            />
                            Make Game Private
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )} */}
        </div>
    );
};

export default Play;

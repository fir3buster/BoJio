import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useRef } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import dayjs from 'dayjs';
import {
    ToggleButtonGroup,
    ToggleButton,
    TextField,
    Avatar,
    Button,
    Stack,
    Typography,
    Divider,
    Box,
    Switch,
    Slider,
} from "@mui/material";
import moment from "moment";
import SportsTennisOutlinedIcon from "@mui/icons-material/SportsTennisOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import SportsMartialArtsOutlinedIcon from "@mui/icons-material/SportsMartialArtsOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styles from "./Home.module.css";
import InvitePlayers from "./InvitePlayers";

const Play = () => {
    const userCtx = useContext(UserContext);
    const { id } = useParams(); // Extract the route parameter
    const [isButtonDropDown, setIsButtonDropDown] = useState(false);
    const [showUpdateActivity, setShowUpdateActivity] = useState(false);
    const [showInvitePlayers, setShowInvitePlayers] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [showJoinGame, setShowJoinGame] = useState(false);

    const dateRef = useRef("");
    const startTimeRef = useRef("");
    const endTimeRef = useRef("");
    const locationRef = useRef("");
    const [isCourtBooked, setIsCourtBooked] = useState(false);
    const titleRef = useRef("");
    const [gameType, setGameType] = useState("Singles");
    const minPeopleRef = useRef(2);
    const maxPeopleRef = useRef(2);
    const [skillRate, setSkillRate] = useState(1.0);
    const [isGamePrivate, setIsGamePrivate] = useState(false);

    const fetchData = useFetch();
    const navigate = useNavigate();

    console.log(JSON.stringify(userCtx.displayActivity));
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

    const updateActivity = async () => {
        try {
            console.log("inside updating activity");
            const res = await fetchData(
                "/activity/" + userCtx.displayActivity[0].id,
                "PUT",
                {
                    user_id: userCtx.ActiveUserId,
                    date: dateRef.current.value,
                    start_time: startTimeRef.current.value,
                    end_time: endTimeRef.current.value,
                    location: locationRef.current.value,
                    title: titleRef.current.value,
                    min_people: minPeopleRef.current.value,
                    max_people: maxPeopleRef.current.value,
                    game_type: gameType,
                    court_booked: isCourtBooked,
                    skill_rate: skillRate,
                    game_private: isGamePrivate,
                }
            );

            if (res.ok) {
                // add more here
                fetchActivity();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteActivity = async () => {
        try {
            console.log("inside Deleting activity");
            const res = await fetchData(
                "/activity/" + userCtx.displayActivity[0].id,
                "DELETE",
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                alert("Activity Deleted Successfully!")
                navigate(`/schedule`);
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
    const isPast =
        new Date(userCtx.displayActivity[0].date) < new Date() ? true : false;
    console.log(userCtx.displayActivity[0].date);
    console.log(new Date() > new Date(userCtx.displayActivity[0].date));
    console.log("CHECK past date boolean: " + isPast);
    const goingCount = players.reduce((count, player) => {
        return player.is_going ? count + 1 : count;
    }, 0);

    const invitedCount = players.reduce((count, player) => {
        return !player.is_going ? count + 1 : count;
    }, 0);

    const toggleButtonDropDown = () => {
        setIsButtonDropDown(!isButtonDropDown);
    };

    const handleUpdateActivityClick = () => {
        setShowUpdateActivity(true);
        setIsCourtBooked(userCtx.displayActivity[0].court_booked)
        // setIsCourtBooked(userCtx.displayActivity[0].court_booked)
        setIsGamePrivate(userCtx.displayActivity[0].game_private)
        setSkillRate(userCtx.displayActivity[0].skill_rate)
        setGameType(userCtx.displayActivity[0].game_type)
    };

    const handleCourtBookedChange = (event) => {
        setIsCourtBooked(event.target.checked);
    };

    const handleGameTypeChange = (event, newGameType) => {
        setGameType(newGameType);
    };

    const handleGamePrivateChange = (event) => {
        setIsGamePrivate(event.target.checked);
    };

    const handleSkillRateChange = (event, newValue) => {
        setSkillRate(newValue);
    };

    const handleInvitePlayer = () => {
        setShowInvitePlayers(true)
    }

    const handleModalClose = () => {
        setShowUpdateActivity(false);
        setShowDeleteActivity(false);
    };

    const valueText = (value) => `${value}`;

    const marks = [
        {
            value: 1.0,
            label: "1.0",
        },
        {
            value: 2.0,
            label: "2.0",
        },
        {
            value: 3.0,
            label: "3.0",
        },
        {
            value: 4.0,
            label: "4.0",
        },
        {
            value: 5.0,
            label: "5.0",
        },
        {
            value: 6.0,
            label: "6.0",
        },
        {
            value: 7.0,
            label: "7.0",
        },
    ];

    
    useEffect(() => {
        console.log(userCtx.displayActivity);
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
            {userCtx.displayActivity && !showUpdateActivity &&
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

                                <Box sx={{ flexGrow: 1 }} />
                                <div direction="column">
                                    {isHost && !isPast ? (
                                        <Button
                                            size="large"
                                            color="primary"
                                            variant="text"
                                            style={{
                                                fontSize: "0.75rem",
                                                fontWeight: "bold",
                                                width: "10%",
                                                margin: "0 -30px 0 0",
                                            }}
                                            onClick={toggleButtonDropDown}
                                        >
                                            <MoreVertIcon />
                                        </Button>
                                    ) : null}

                                    {isButtonDropDown && (
                                        <div className={styles.dropdownContainer}>
                                            <button
                                                onClick={
                                                    handleUpdateActivityClick
                                                }
                                                className={styles.dropdownItem}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={deleteActivity}
                                                className={styles.dropdownItem}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
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
                                        ? `Restrictied to players with level ${item.skill_rate} and above`
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
            {/* <div>{JSON.stringify(userCtx.isJoined)}</div> */}
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
            ) : isHost ? (
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
                    onClick={handleInvitePlayer}
                >
                    INVITE PLAYERS
                </Button>
            ) : userCtx.isJoined ? (
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
                    JOINED
                </Button>
            ) : (
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
                    JOIN
                </Button>
            )}

            {showUpdateActivity && (
                <div
                    style={{
                        position: "relative",
                        margin: "-10px -10px",
                        // height: "100%",
                        // border: "2px solid black",
                        backgroundColor: "rgb(224, 224, 224)",
                    }}
                >
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "left",
                            alignItems: "left",
                            border: "2px solid red",
                        }}
                    >
                        <Button
                            size="large"
                            color="primary"
                            variant="string"
                            display="inline-block"
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                                margin: "0 0 0 -20px",
                                // border: "2px solid blue",
                                // width: "100%",
                            }}
                            onClick={handleModalClose}
                        >
                            <KeyboardDoubleArrowLeftIcon />
                        </Button>
                        <h4>Organise Tennis Game</h4>
                    </Box>

                    <Typography variant="h6" sx={{ marginBottom: "0" }}>
                        Time & Location
                    </Typography>
                    <Stack
                        // style={{
                        //     // display: "flex",
                        //     justifyContent: "left",
                        //     alignItems: "left",
                        //     border: "2px solid blue",
                        // }}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 0 0"
                    >
                        
                        <CalendarMonthOutlinedIcon />
                        <Typography>
                            <input
                                required
                                type="date"
                                ref={dateRef}
                                defaultValue={(userCtx.displayActivity[0].date).split("T")[0]}
                            />
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 0 0"
                    >
                        <AccessTimeFilledIcon />
                        <Typography>
                            <input
                                required
                                type="time"
                                ref={startTimeRef}
                                defaultValue={
                                    userCtx.displayActivity[0].start_time
                                }
                            />
                            <span> - </span>
                            <input
                                required
                                type="time"
                                ref={endTimeRef}
                                defaultValue={
                                    userCtx.displayActivity[0].end_time
                                }
                            />
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 0 0"
                    >
                        <LocationOnIcon />
                        <TextField
                            id="outlined-basic"
                            label="Location"
                            variant="outlined"
                            required
                            inputRef={locationRef}
                            defaultValue={userCtx.displayActivity[0].location}
                        />
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="5px 0 0 0"
                    >
                        <CollectionsBookmarkIcon />
                        <Typography>
                            <span>Court booked</span>
                            <Switch
                                checked={isCourtBooked}
                                onChange={handleCourtBookedChange}
                                inputProps={{ "aria-label": "court-booked" }}
                                // defaultChecked={
                                //     userCtx.displayActivity[0].court_booked
                                // }
                            />
                        </Typography>
                    </Stack>

                    <Divider sx={{ marginTop: "15px" }} />

                    <Typography variant="h6" sx={{ margin: "10px 0 0 0" }}>
                        MeetUp Details
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 0 0"
                    >
                        <DensityMediumIcon />
                        <TextField
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            required
                            inputRef={titleRef}
                            defaultValue={userCtx.displayActivity[0].title}
                        />
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 0 0"
                    >
                        <MergeTypeIcon />
                        <ToggleButtonGroup
                            color="primary"
                            value={gameType}
                            exclusive
                            onChange={handleGameTypeChange}
                            aria-label="Platform"
                            defaultValue={userCtx.displayActivity[0].game_type}
                        >
                            <ToggleButton value="Singles">single</ToggleButton>
                            <ToggleButton value="Doubles">Doubles</ToggleButton>
                            <ToggleButton value="Socials">Socials</ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 0 0"
                    >
                        {/* <DensityMediumIcon /> */}
                        <span>Min People</span>
                        <TextField
                            id="outlined-basic"
                            label="2"
                            variant="outlined"
                            inputRef={minPeopleRef}
                            sx={{
                                width: "50px", // Set the width
                                height: "50px", // Set the height
                            }}
                            defaultValue={userCtx.displayActivity[0].min_people}
                        />
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 0 0"
                    >
                        {/* <DensityMediumIcon /> */}
                        <span>Max People</span>
                        <TextField
                            id="outlined-basic"
                            label="2"
                            variant="outlined"
                            inputRef={maxPeopleRef}
                            sx={{
                                width: "50px", // Set the width
                                height: "50px", // Set the height
                            }}
                            defaultValue={userCtx.displayActivity[0].max_people}
                        />
                    </Stack>

                    <Box
                        sx={{
                            width: 400,
                            alignItems: "center",
                            margin: "0px 10px 0 0",
                        }}
                    >
                        <p>Skill Rate: {valueText(skillRate)}</p>

                        <Slider
                            aria-label="Restricted values"
                            defaultValue={userCtx.displayActivity[0].skill_rate}
                            getAriaValueText={valueText}
                            step={0.5}
                            min={1.0}
                            max={7.0}
                            valueLabelDisplay="auto"
                            marks={marks}
                            value={skillRate}
                            onChange={handleSkillRateChange}
                            sx={{ margin: "0 10px 10px 0" }}
                        />
                    </Box>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="15px 0 15px 0"
                    >
                        <LockOpenIcon />
                        <Typography>
                            <span>Mark Game as Private</span>
                            <Switch
                                checked={isGamePrivate}
                                onChange={handleGamePrivateChange}
                                inputProps={{ "aria-label": "game-private" }}
                                // defaultChecked={
                                //     userCtx.displayActivity[0].game_private
                                // }
                            />
                        </Typography>
                    </Stack>
                    <div style={{ height:"150px" }}></div>
                    <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        style={{
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            width: "100%",
                        }}
                        onClick={updateActivity}
                    >
                        SUBMIT
                    </Button>
                </div>
            )}

            {showInvitePlayers && (
                <InvitePlayers
                    onClose={handleModalClose}
                    getDisplayActivity={fetchActivity}
                    id={id}
                >

                </InvitePlayers>
            )}

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

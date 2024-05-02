import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ActivitiesActionAreaCard from "./ActivitiesActionAreaCard";
import TabContext from "@mui/lab/TabContext";
import {
    ToggleButtonGroup,
    ToggleButton,
    TextField,
    Slider,
    Button,
    Switch,
    Typography,
    Divider,
    Box,
    Stack,
    Tab,
} from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import moment from "moment";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Schedule = () => {
    const userCtx = useContext(UserContext);

    const [value, setValue] = useState("1");
    const [upcomingActivities, setUpcomingActivities] = useState([]);
    const [pastActivities, setPastActivities] = useState([]);
    const [showAddActivity, setShowAddActivity] = useState(false);
    const [showUpdateActivity, setShowUpdateActivity] = useState(false);
    const [showDeleteActivity, setShowDeleteActivity] = useState(false);

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

    // const [showCreate, setShowCreate] = useState(false);

    const fetchData = useFetch();
    const navigate = useNavigate();

    const label = { inputProps: { "aria-label": "Size switch demo" } };
    // console.log(userCtx.ActiveUserId)
    const getAllUpcomingActivities = async () => {
        try {
            console.log("getting upcoming activities");
            const res = await fetchData(
                "/activity/upcoming/" + userCtx.activeUserId,
                undefined,
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                setUpcomingActivities(res.data);
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const getAllPastActivities = async () => {
        try {
            console.log("getting past activities");
            const res = await fetchData(
                "/activity/past/" + userCtx.activeUserId,
                undefined,
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                setPastActivities(res.data);
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // getting activity based on activity id
    const getActivityById = async (id) => {
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

    const addActivity = async () => {
        console.log("inside add activity");
        try {
            // const dateRef = dateRef.current.value;
            // const startTimeRef = startTimeRef.current.value;
            // const endTimeRef = endTimeRef.current.value;
            // const locationRef = locationRef.current.value;
            // const titleRef = titleRef.current.value;
            // const minPeopleRef = minPeopleRef.current.value;
            // const maxPeopleRef = maxPeopleRef.current.value;
            // const skillRateRef = skillRateRef.current.value;

            // console.log(dateRef, startTimeRef, endTimeRef, locationRef, titleRef, minPeopleRef, maxPeopleRef )
            const res = await fetchData(
                "/activity",
                "POST",
                {
                    user_id: userCtx.activeUserId,
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
                },
                userCtx.accessToken
            );

            if (res.ok) {
                getAllUpcomingActivities();
                getAllPastActivities();
                handleModalClose();
                dateRef.current.value = "";
                startTimeRef.current.value = "";
                endTimeRef.current.value = "";
                locationRef.current.value = "";
                titleRef.current.value = "";
                minPeopleRef.current.value = 2;
                maxPeopleRef.current.value = 2;
                setSkillRate(1.0);
                setGameType("Singles");
                setIsCourtBooked(false);
                setIsGamePrivate(false);
                alert("GAME CREATED SUCCESSFULLY!");
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleAddActivityClick = () => {
        setShowAddActivity(true);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
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

    const handleModalClose = () => {
        setShowAddActivity(false);
        setShowUpdateActivity(false);
        setShowDeleteActivity(false);
    };

    const handleActivityCardClick = async (id) => {
        try {
            await getActivityById(id);
            userCtx.setIsJoined(true);
            navigate(`/play/${id}`);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSkillRateChange = (event, newValue) => {
        setSkillRate(newValue);
    };

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

    const valueText = (value) => `${value}`;

    useEffect(() => {
        getAllUpcomingActivities();
        getAllPastActivities();
        userCtx.setIsJoined(true);
    }, [value]);

    return (
        // <div>
        //     <h1>INSIDE SCHEDULE</h1>
        //     {userCtx.ActiveUserId}
        //     <h2>upcoming activities</h2>
        //     {JSON.stringify(upcomingActivities)}
        //     <h2>Past Activities</h2>
        //     {JSON.stringify(pastActivities)}

        // </div>
        <div
            style={{
                position: "relative",
                // height: "100vh",
                // border: "2px solid black",
            }}
        >
            {!showAddActivity && (
                <>
                    <Box
                        // sx={{ width: "100%", typography: "body1", border: "2px solid" }}
                        sx={{ width: "100%", typography: "body1" }}
                    >
                        <TabContext value={value}>
                            <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                                <TabList
                                    onChange={handleChange}
                                    aria-label="schedule"
                                >
                                    <Tab
                                        label="Upcoming Activities"
                                        value="1"
                                        style={{ fontWeight: "bold" }}
                                    />
                                    <Tab
                                        label="History"
                                        value="2"
                                        style={{ fontWeight: "bold" }}
                                    />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                {upcomingActivities &&
                                    upcomingActivities.map((item) => (
                                        <ActivitiesActionAreaCard
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            date={item.date}
                                            startTime={item.start_time}
                                            endTime={item.end_time}
                                            location={item.location}
                                            isBooked={item.court_booked}
                                            skillRate={item.skill_rate}
                                            minPeople={item.min_people}
                                            maxPeople={item.max_people}
                                            players={item.players}
                                            isJoined={userCtx.isJoined}
                                            onClick={() =>
                                                handleActivityCardClick(item.id)
                                            }
                                        />
                                    ))}
                            </TabPanel>
                            <TabPanel value="2">
                                {pastActivities &&
                                    pastActivities.map((item) => (
                                        <ActivitiesActionAreaCard
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            date={item.date}
                                            startTime={item.start_time}
                                            endTime={item.end_time}
                                            location={item.location}
                                            isBooked={item.court_booked}
                                            skillRate={item.skill_rate}
                                            minPeople={item.min_people}
                                            maxPeople={item.max_people}
                                            players={item.players}
                                            isJoined={userCtx.isJoined}
                                            onClick={() =>
                                                handleActivityCardClick(item.id)
                                            }
                                        />
                                    ))}
                            </TabPanel>
                        </TabContext>
                    </Box>

                    <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        style={{
                            position: "fixed",
                            bottom: "10px",
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            width: "30%",
                        }}
                        onClick={handleAddActivityClick}
                    >
                        ORGANISE A GAME
                    </Button>
                </>
            )}

            {/* Organise a game */}
            {showAddActivity && (
                <div
                    style={{
                        position: "relative",

                        // height: "100vh",
                        border: "2px solid black",
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
                            <input required type="date" ref={dateRef} />
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
                            <input required type="time" ref={startTimeRef} />
                            <span> - </span>
                            <input required type="time" ref={endTimeRef} />
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
                            defaultValue={1.0}
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
                            />
                        </Typography>
                    </Stack>

                    <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        style={{
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            width: "100%",
                        }}
                        onClick={addActivity}
                    >
                        ORGANISE TENNIS GAME
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Schedule;

// convert database format to javascript
// const moment = require('moment');

// time = moment('14:30', 'HH:mm');
// formattedTime = time.format('hh:mm a');

// console.log(formattedTime);  // Outputs "02:30 pm"

// convert javacsript to database format
// const moment = require('moment');

// // Given a 12-hour format time with AM/PM
// let time12hr = "02:30 pm";

// // Convert to 24-hour format
// let time24hr = moment(time12hr, "hh:mm a").format("HH:mm");

// // Output the converted time
// console.log(time24hr);  // Outputs "14:30"

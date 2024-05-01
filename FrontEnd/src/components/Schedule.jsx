import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ActivitiesActionAreaCard from "./ActivitiesActionAreaCard";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { ToggleButtonGroup, ToggleButton, TextField } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import moment from "moment";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import MergeTypeIcon from "@mui/icons-material/MergeType";

const Schedule = () => {
    const userCtx = useContext(UserContext);

    const [value, setValue] = useState("1");
    const [upcomingActivities, setUpcomingActivities] = useState([]);
    const [pastActivities, setPastActivities] = useState([]);
    const [showAddActivity, setShowAddActivity] = useState(false);

    const dateRef = useRef();
    const startTimeRef = useRef();
    const endTimeRef = useRef();
    const locationRef = useRef();
    const [isCourtBooked, setIsCourtBooked] = useState(false);
    const titleRef = useRef();
    const [gameType, setGameType] = useState("Singles");
    const minPeopleRef = useRef(2);
    const maxPeopleRef = useRef(2);
    const skillRateRef = useRef();
    const isGamePrivateRef = useRef(false);

    // const [showCreate, setShowCreate] = useState(false);

    const fetchData = useFetch();
    const navigate = useNavigate();

    const label = { inputProps: { "aria-label": "Size switch demo" } };
    // console.log(userCtx.ActiveUserId)
    const getAllUpcomingActivities = async () => {
        try {
            console.log("getting upcoming activities");
            const res = await fetchData(
                "/activity/upcoming/" + userCtx.ActiveUserId,
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
                "/activity/past/" + userCtx.ActiveUserId,
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
        try {
            const dateRef = dateRef.current.value;
            const startTimeRef = startTimeRef.current.value;
            const endTimeRef = endTimeRef.current.value;
            const locationRef = locationRef.current.value;
            const titleRef = titleRef.current.value;
            const gameTypeRef = gameTypeRef.current.value;
            const minPeopleRef = minPeople.current.value;
            const maxPeopleRef = maxPeople.current.value;
            const skillRateRef = skillRateRef.current.value;
            const isGamePrivateRef = isGamePrivateRef.current.value;

            const res = await fetchData(
                "/activity",
                "POST",
                {
                    user_id: userCtx.ActiveUserId,
                    date: dateRef,
                    start_time: startTimeRef,
                    end_time: endTimeRef,
                    location: locationRef,
                    court_booked: isCourtBooked,
                    title: titleRef,
                    game_type: gameType,
                    min_people: minPeopleRef,
                    max_people: maxPeopleRef,
                    skill_rate: skillRateRef,
                    game_private: isGamePrivateRef,
                },
                userCtx.accessToken
            );

            if (res.ok) {
                getAllUpcomingActivities();
                getAllPastActivities();
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

    const handleActivityCardClick = async (id) => {
        try {
            await getActivityById(id);
            userCtx.setIsJoined(true);
            navigate(`/play/${id}`);
        } catch (error) {
            console.error(error.message);
        }
    };

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

                            // onClick={()},
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
                            <input type="date" ref={dateRef} />
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
                            <input type="time" ref={startTimeRef} />
                            <span> - </span>
                            <input type="time" ref={endTimeRef} />
                        </Typography>
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

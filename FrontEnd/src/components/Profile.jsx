import React, { useEffect, useState, useContext, useRef } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
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
    Avatar,
    Card,
    CardContent,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import styles from "./Control.module.css";

const rateArray = [
    1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0,
];

const Profile = () => {
    const userCtx = useContext(UserContext);
    const [userProfile, setUserProfile] = useState([]);
    const [sportCard, setSportCard] = useState([]);
    const [skillRate, setSkillRate] = useState(rateArray[0]);
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [showUpdateSportCard, setShowUpdateSportCard] = useState(false);

    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const genderRef = useRef();
    const locationRef = useRef();
    const bioRef = useRef();

    const fetchData = useFetch();

    const getUserProfileById = async () => {
        try {
            const res = await fetchData(
                "/profile/user/" + userCtx.activeUserId,
                undefined,
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                console.log(res.data);
                setUserProfile(res.data);
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const getSportCardByUserId = async () => {
        try {
            const res = await fetchData(
                "/profile/sportcard/" + userCtx.activeUserId,
                undefined,
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                console.log(res.data);
                setSportCard(res.data);
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const updateUserProfile = async () => {
        console.log(emailRef.current.value)
        try {
            const res = await fetchData(
                "/profile/user/" + userProfile[0].id,
                "PUT",
                {
                    email: emailRef.current.value,
                    first_name: firstNameRef.current.value,
                    last_name: lastNameRef.current.value,
                    location: locationRef.current.value,
                    bio: bioRef.current.value,
                },
                userCtx.accessToken
            );

            if (res.ok) {
                alert("User updated successfully");
                getUserProfileById();
                // handleModalClose();
                emailRef.current.value = "";
                firstNameRef.current.value = "";
                lastNameRef.current.value = "";
                locationRef.current.value = "";
                bioRef.current.value = "";
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const updateSportCard = async () => {
        try {
            const res = await fetchData(
                "/profile/sportcard/" + userCtx.activeUserId,
                "PUT",
                {
                    skill_rate: skillRate,
                },
                userCtx.accessToken
            );

            if (res.ok) {
                alert("Sport Card updated successfully");
                getSportCardByUserId();
                setSkillRate(rateArray[0]);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleUpdateUserClick = () => {
        setShowUpdateUser(true);
    };

    const handleSkillRateChange = (event) => {
        setSkillRate(event.target.value);
    };

    const handleModalClose = () => {
        setShowUpdateUser(false);
        setShowUpdateSportCard(false);
    };

    const handleUpdateUserAndSportCard = async () => {
        await updateUserProfile();
        await updateSportCard();
        handleModalClose();
    };

    useEffect(() => {
        getUserProfileById();
        getSportCardByUserId();
    }, []);

    return (
        
        <div
            style={{
                position: "flex",
                // height: "75vh",
                border: "2px solid navy",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* {JSON.stringify(userProfile)} */}
            {userProfile &&
                !showUpdateUser &&
                userProfile.map((item) => (
                    <div key={item.id}>
                        {/* abc */}
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ margin: "15px 0 15px 0" }}
                        >
                            {/* <SportsTennisOutlinedIcon /> */}
                            {/* <Typography variant="subtitle1">Profile</Typography> */}

                            <Box sx={{ flexGrow: 1 }} />
                            <div direction="column">
                                <Button
                                    size="large"
                                    color="primary"
                                    variant="text"
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "bold",
                                        width: "10%",
                                        margin: "0 -10px 0 0",
                                    }}
                                    onClick={handleUpdateUserClick}
                                >
                                    <MoreVertIcon />
                                </Button>
                            </div>
                        </Stack>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                key={item.id}
                                sx={{
                                    bgcolor: item.profile_picture_url,
                                    margin: "-20px 0 10 0",
                                    width: 150,
                                    height: 150,
                                }}
                            >
                                {item.profile_name}
                            </Avatar>
                        </Box>

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
                                {item.first_name}
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    display: "inline-block",
                                    fontWeight: "bold",
                                    margin: "15px 0 0 0",
                                }} // Set inline to be on the same line
                            >
                                {item.last_name}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "10px",
                                // border: "1px solid navy"
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    display: "inline-block",
                                    fontWeight: "bold",
                                    margin: "15px 20px 0 0",
                                }} // Set inline to be on the same line
                            >
                                <LocationOnIcon />
                                {item.location}
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    display: "inline-block",
                                    fontWeight: "bold",
                                    margin: "15px 20px 0 0",
                                }} // Set inline to be on the same line
                            >
                                <PermIdentityIcon />
                                {item.gender}
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    display: "inline-block",
                                    fontWeight: "bold",
                                    margin: "15px 0 0 0",
                                }} // Set inline to be on the same line
                            >
                                <MailTwoToneIcon />
                                {item.email}
                            </Typography>
                        </Box>

                        <Divider
                            sx={{
                                margin: "15px 0 15px 0",
                                borderColor: "navy",
                            }}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "10px",
                                border: "1px solid navy",
                            }}
                        >
                            <Typography variant="body2">{item.bio}</Typography>
                        </Box>
                    </div>
                ))}

            {sportCard &&
                !showUpdateUser &&
                sportCard.map((item) => (
                    <div
                        sx={{
                            display: "flex",
                            flexDirection: "column", // Arrange content vertically
                            justifyContent: "center", // Center vertically
                            alignItems: "center", // Center horizontally
                            textAlign: "center", // Center text alignment
                        }}
                    >
                        <Card
                            sx={{
                                maxWidth: 275,
                                height: 175,
                                margin: "10px",
                                boxShadow: 10,
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <h6>TENNIS</h6> {/* Default centered content */}
                                <h2
                                    style={{
                                        marginTop: "10px", // Extra space above this element
                                    }}
                                >
                                    {item.skill_level}
                                </h2>
                                <h3
                                    style={{
                                        display: "inline-flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        border: "2px solid black",
                                        borderRadius: "50%",
                                        height: "50px",
                                        width: "50px",
                                        fontWeight: "bold",
                                        marginTop: "10px",
                                    }}
                                >
                                    {item.skill_rate === "unrated"
                                        ? "U"
                                        : item.skill_rate}
                                </h3>
                            </CardContent>
                        </Card>
                    </div>
                ))}

            {/* Update */}
            {showUpdateUser && (
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
                            // border: "2px solid red",
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
                        <h4>Update Profile</h4>
                    </Box>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 0 0"
                    >
                        <CalendarMonthOutlinedIcon />
                        <div>Email</div>
                        <Typography>
                            <input
                                required
                                type="text"
                                ref={emailRef}
                                defaultValue={userProfile[0].email}
                            />
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 0 0"
                    >
                        <CalendarMonthOutlinedIcon />
                        <div>First Name</div>
                        <Typography>
                            <input
                                required
                                type="text"
                                ref={firstNameRef}
                                defaultValue={userProfile[0].first_name}
                            />
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 0 0"
                    >
                        <CalendarMonthOutlinedIcon />
                        <div>Last Name</div>
                        <Typography>
                            <input
                                required
                                type="text"
                                ref={lastNameRef}
                                defaultValue={userProfile[0].last_name}
                            />
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 0 0"
                    >
                        <CalendarMonthOutlinedIcon />
                        <div>Location</div>
                        <Typography>
                            <input
                                required
                                type="text"
                                ref={locationRef}
                                defaultValue={userProfile[0].location}
                            />
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 0 0"
                    >
                        <CalendarMonthOutlinedIcon />
                        <div>Gender</div>
                        <Typography>
                            <input
                                type="text"
                                ref={genderRef}
                                defaultValue={userProfile[0].gender}
                            />
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 10px 0"
                    >
                        <CalendarMonthOutlinedIcon />
                        <div>Bio</div>
                        <Typography>
                            <input
                                type="text"
                                ref={bioRef}
                                defaultValue={userProfile[0].bio}
                            />
                        </Typography>
                    </Stack>
                    <label htmlFor="rate-select">Select Skill Rate:</label>{" "}
                    <select
                        id="rate-select"
                        value={skillRate}
                        onChange={handleSkillRateChange}
                    >
                        {rateArray.map((rate, index) => (
                            <option key={index} value={rate}>
                                {rate}{" "}
                            </option>
                        ))}
                    </select>
                    <button
                        className={`btn btn-danger btn-sm ${styles.userButton}`}
                        type="button"
                        onClick={handleUpdateUserAndSportCard}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;

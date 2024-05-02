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

    const handleUpdateUserClick = () => {
        setShowUpdateUser(true);
        setSkillRate();
    };

    const handleSkillRateChange = (event) => {
        setSkillRate(event.target.value);
    };

    const handleModalClose = () => {
        setShowUpdateUser(false);
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
            {/* <h1>Player Details for ID: {id}</h1>
            {JSON.stringify(userCtx.displayPlayer)}
            <hr />
            {JSON.stringify(userCtx.displayFollowings)}
            <hr />
            {JSON.stringify(userCtx.displayFollowers)}
            <hr />
            {JSON.stringify(userCtx.displaySportCard)}
            <hr /> */}
            {/* {userCtx.displayPlayer &&
                userCtx.displayPlayer.map((item) => (
                    <div>
                        <div>USER PROFILE</div>
                        <div className="title">{`Name: ${item.first_name} ${item.last_name}`}</div>
                        <div className="activities">{`Number of Activities: `}</div>

                        <div className="followers">
                            {userCtx.displayFollowers ? (
                                <p>{`Number of Followers: ${userCtx.displayFollowers.length}`}</p>
                            ) : (
                                <p>No followers available</p>
                            )}
                        </div>
                        <div className="following">
                            {userCtx.displayFollowers ? (
                                <p>{`Number of Followings: ${userCtx.displayFollowings.length}`}</p>
                            ) : (
                                <p>No followings available</p>
                            )}
                        </div>
                        <div className="location">{`Location: ${item.location}`}</div>
                    </div>
                ))} */}
            {/* {userCtx.displaySportCard &&
                userCtx.displaySportCard.map((item) => (
                    <div>
                        <div>SPORT CARD</div>
                        <div className="skillLevel">{`Skill level: ${item.skill_level}`}</div>
                        <div className="skillRate">{`Skill rate: ${item.skill_rate}`}</div>
                    </div>
                ))} */}

            {userProfile && !showUpdateUser &&
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
                        {/* <Card
                            sx={{
                                maxWidth: 345,
                                height: 200,
                                margin: "10px",
                                boxShadow: 10,
                            }}
                            onClick={onClick}
                        >
                            <CardActionArea
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                
                            </CardActionArea>
                        </Card> */}
                    </div>
                ))}

            {sportCard && !showUpdateUser &&
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
                                        display: "inline-flex", // Center content horizontally
                                        justifyContent: "center", // Center content horizontally
                                        alignItems: "center", // Center content vertically
                                        border: "2px solid black", // Border to create a circle effect
                                        borderRadius: "50%", // Circular shape
                                        height: "50px", // Define circle size
                                        width: "50px", // Define circle size
                                        fontWeight: "bold", // Bold text
                                        marginTop: "10px", // Additional space between elements
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
                        <h4>Update Profile</h4>
                    </Box>
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
                            <input required type="text" ref={emailRef} defaultValue={userProfile.email} />
                        </Typography>
                    </Stack>
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
                            <input required type="text" ref={firstNameRef} defaultValue={userProfile.first_name} />
                        </Typography>
                    </Stack>
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
                            <input required type="text" ref={lastNameRef} defaultValue={userProfile.last_name}/>
                        </Typography>
                    </Stack>
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
                            <input required type="text" ref={locationRef} defaultValue={userProfile.location} />
                        </Typography>
                    </Stack>
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
                            <input type="text" ref={genderRef} defaultValue={userProfile.gender} />
                        </Typography>
                    </Stack>
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
                        margin="10px 0 10px 0"
                    >
                        <CalendarMonthOutlinedIcon />
                        <Typography>
                            <input type="text" ref={bioRef} defaultValue={userProfile.bio} />
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
                </div>
            )}
        </div>
    );
};

export default Profile;

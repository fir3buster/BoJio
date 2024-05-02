import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

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
    Card,
    CardContent,
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
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";

const Player = () => {
    const userCtx = useContext(UserContext);
    const { id } = useParams();
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const fetchData = useFetch();

    const fetchPlayer = async () => {
        try {
            const res = await fetchData(
                "/profile/user/" + id,
                undefined,
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                console.log(res.data);
                userCtx.setDisplayPlayer(res.data);
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // const numberFollowers = userCtx.displayFollowers.length();
    // const numberFollowing = userCtx.displayFollowers.length();
    console.log(userCtx.displayPlayer[0]);
    const isHost =
        userCtx.displayPlayer[0].id === userCtx.activeUserId ? true : false;
    const handleUpdateUserClick = () => {
        setShowUpdateUser(true);
    };

    useEffect(() => {
        if (!userCtx.displayPlayer) {
            console.log(id);
            fetchPlayer();
        }
    }, [id]);

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
            {userCtx.displayPlayer &&
                userCtx.displayPlayer.map((item) => (
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
                                {isHost ? (
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
                                        onClick={setShowUpdateUser}
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                ) : null}
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
                                key={id}
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

            {userCtx.displaySportCard &&
                userCtx.displaySportCard.map((item) => (
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
                                <h6>TENNIS</h6>
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
        </div>
    );
};

export default Player;

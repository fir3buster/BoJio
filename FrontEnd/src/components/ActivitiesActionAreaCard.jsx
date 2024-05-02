import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import moment from "moment";
import HomeIcon from "@mui/icons-material/Home";
import SportsTennisOutlinedIcon from "@mui/icons-material/SportsTennisOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import styles from "./Home.module.css";

const ActivitiesActionAreaCard = ({
    id,
    title,
    date,
    startTime,
    endTime,
    location,
    isBooked,
    skillRate,
    minPeople,
    maxPeople,
    players,
    isJoined,
    onClick,
}) => {
    console.log(startTime, endTime, maxPeople, minPeople);
    console.log(JSON.stringify(players));
    const goingCount = players.reduce((count, player) => {
        return player.is_going ? count + 1 : count;
    }, 0);

    const joinGame = async () => {
        try {
            const res = await fetchData(
                "/activity/player",
                "POST",
                {
                    activity_id: id,
                    user_id: userCtx.activeUserId,
                    is_going: true,
                    is_active: true,
                },
                userCtx.accessToken
            );

            if (res.ok) {
                alert("Join Game Successfully");
                getDisplayActivity();
                onClose();
            }
        } catch (error) {
            alert(JSON.stringify(error.message));
            console.log(error.message);
        }
    };

    return (
        <Card
            sx={!isJoined ? {
                height: "340px",
                width: "100%",
                boxShadow: 10,
                margin: "10px 0 10px 0",
            }: {
                height: "300px",
                padding: "20px 0",
                width: "100%",
                boxShadow: 10,
                margin: "10px 0 10px 0",
            }}
        >
            <CardActionArea sx={{ height: "100%" }} onClick={onClick}>
                <CardContent sx={{ marginTop: "-25px" }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <SportsTennisOutlinedIcon />
                        <Typography
                            variant="subtitle1"
                            sx={{ marginBottom: "0" }}
                        >
                            Tennis
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography className={styles.typographyWithBorder}>
                            {skillRate ? `Lv ${skillRate}` : "Lv 1.0"}
                        </Typography>
                    </Stack>
                    <Typography
                        variant="h6"
                        sx={{ margin: "-5px 0 0 0", padding: "0" }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{ margin: "5px 0", padding: "0" }}
                    >
                        {`${goingCount}/${maxPeople} Going - Min ${minPeople} to start`}
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        {players.map((player) =>
                            player.is_going ? (
                                <Avatar
                                    key={player.user_id}
                                    sx={{ bgcolor: player.profile_picture_url }}
                                >
                                    {player.profile_name}
                                </Avatar>
                            ) : null
                        )}
                    </Stack>
                </CardContent>
                <Divider sx={{ marginTop: "15px" }} />

                {/* {`${moment(date).format("MMMM Do YYYY, h:mm a")}`} */}
                <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <AccessTimeOutlinedIcon />
                        <Typography variant="body1" color="text.secondary">
                            {`${moment(date).format("MMMM Do YYYY")},
                            ${moment(startTime, "HH:mm:ss").format(
                                "h:mm a"
                            )} - ${moment(endTime, "HH:mm:ss").format(
                                "h:mm a"
                            )}`}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        margin="10px 0 0 0"
                    >
                        <LocationOnOutlinedIcon />
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ margin: "10px 0" }}
                        >
                            {isBooked ? "Court Booked -" : null} {location}
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ActivitiesActionAreaCard;

import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SportsTennisOutlinedIcon from "@mui/icons-material/SportsTennisOutlined";
import { CardActionArea } from "@mui/material";

const UsersActionAreaCard = ({
    id,
    firstName,
    lastName,
    location,
    profileName,
    profilePic,
    onClick,
}) => {
    // console.log(firstName, lastName);
    return (
        <Card
            sx={{ maxWidth: 345, height: 200, margin: "10px", boxShadow: 10 }}
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
                <CardContent>
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
                                bgcolor: profilePic,
                                margin: "-20px 0 10 0",
                                width: 70,
                                height: 70,
                            }}
                        >
                            {profileName}
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
                            {firstName}
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                display: "inline-block",
                                fontWeight: "bold",
                                margin: "15px 0 0 0",
                            }} // Set inline to be on the same line
                        >
                            {lastName}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "10px",
                        }}
                    >
                        <Typography variant="body2">
                            {location.split()[0]}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default UsersActionAreaCard;


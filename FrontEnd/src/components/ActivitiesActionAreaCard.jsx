import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { CardActionArea } from "@mui/material";
import moment from "moment";

const ActivitiesActionAreaCard = ({
    id,
    title,
    schedule,
    location,
    players,
    onClick
}) => {
    return (
        <Card sx={{ height: "340px", width: "100%" }} onClick={onClick}>
            <CardActionArea sx={{ height: "100%" }}>
                <CardContent>
                    <Typography variant="subtitle1">Tennis MeetUp</Typography>
                    <Typography variant="h5" sx={{ margin: "5px 0" }}>
                        {title}
                    </Typography>
                    {players.map((player) => (
                        <Avatar
                            key={player.user_id}
                            src={player.is_going ? "/broken-image.jpg" : "H"}
                            sx={{
                                display: "inline-flex",
                                margin: "10px 10px 10px 0px",
                            }}
                        />
                    ))}
                </CardContent>
                <Divider />

                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        {`${moment(schedule).format("MMMM Do YYYY, h:mm a")}`}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ margin: "10px 0" }}
                    >
                        {location}
                    </Typography>

                    <Typography sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Button
                            size="large"
                            color="primary"
                            variant="outlined" // Correct variant
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                                width: "100%"
                            }}
                        >
                            JOIN
                        </Button>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ActivitiesActionAreaCard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";

// // Function to fetch the profile picture URL from an API
// const fetchProfilePictureUrl = async (userId) => {
//   try {
//     const response = await axios.get(`/api/user/${userId}/profile-picture`); // API endpoint to get the URL
//     return response.data.url; // Assuming the response contains the URL
//   } catch (error) {
//     console.error("Error fetching profile picture URL:", error);
//     return null;
//   }
// };

// const PlayerCard = ({ userId, isGoing }) => {
//   const [profilePictureUrl, setProfilePictureUrl] = useState(null);

//   useEffect(() => {
//     if (isGoing) {
//       fetchProfilePictureUrl(userId).then((url) => {
//         setProfilePictureUrl(url); // Update state with the profile picture URL
//       });
//     }
//   }, [userId, isGoing]);

//   return (
//     <div style={{ display: "flex", alignItems: "center" }}>
//       {isGoing && profilePictureUrl ? (
//         <Avatar src={profilePictureUrl} alt={`Player ${userId}`} sx={{ marginRight: "10px" }} />
//       ) : (
//         <Typography variant="body2" color="text.secondary">
//           Not Going
//         </Typography>
//       )}
//       <Typography variant="body2" color="text.secondary">
//         {`Player ${userId}`}
//       </Typography>
//     </div>
//   );
// };

// export default PlayerCard;

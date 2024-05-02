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

import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const UsersActionAreaCard = ({ id, firstName, lastName, location }) => {
    console.log(firstName, lastName);
    return (
        <Card sx={{ maxWidth: 345, height: 200, margin: "10px" }}>
            <CardActionArea sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <CardContent>
                    <Avatar src="/broken-image.jpg" sx={{ width: 70, height: 70}} />
                    <Typography
                        variant="body1"
                        sx={{ display: "inline-block", marginRight: "3px" }} // Set inline and add spacing
                    >
                        {firstName}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{ display: "inline-block" }} // Set inline to be on the same line
                    >
                        {lastName}
                    </Typography>

                    <Typography variant="body2">{location}</Typography>
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

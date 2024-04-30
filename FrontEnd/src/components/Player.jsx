import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Button from "@mui/material/Button";

const Player = () => {
    const userCtx = useContext(UserContext);
    const { id } = useParams();
    const fetchData = useFetch();

    const fetchPlayer = async () => {
        try {
            const res = await fetchData(
                "/profile/user/" + id,
                undefined,
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

    // const fetchPlayer = async () => {
    //     try {
    //         const res = await fetchData(
    //             "/profile/user/" + id,
    //             undefined,
    //             undefined,
    //             undefined,
    //             userCtx.accessToken
    //         );

    //         if (res.ok) {
    //             console.log(res.data);
    //             userCtx.setDisplayPlayer(res.data);
    //         } else {
    //             alert(JSON.stringify(res.data));
    //             console.log(res.data);
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };
    // const numberFollowers = userCtx.displayFollowers.length();
    // const numberFollowing = userCtx.displayFollowers.length();

    useEffect(() => {
        if (!userCtx.displayPlayer) {
            console.log(id);
            fetchPlayer();
        }
    }, [id]);

    return (
        <div>
            <h1>Player Details for ID: {id}</h1>
            {JSON.stringify(userCtx.displayPlayer)}
            <hr />
            {JSON.stringify(userCtx.displayFollowings)}
            <hr />
            {JSON.stringify(userCtx.displayFollowers)}
            <hr />
            {JSON.stringify(userCtx.displaySportCard)}
            <hr />
            {userCtx.displayPlayer &&
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
                        <div className="location">{`Location: ${item.location}` }</div>
                    </div>
                ))}
            {userCtx.displaySportCard &&
                userCtx.displaySportCard.map((item) => (
                    <div>
                        <div>SPORT CARD</div>
                        <div className="skillLevel">{`Skill level: ${item.skill_level}`}</div>
                        <div className="skillRate">{`Skill rate: ${item.skill_rate}`}</div> 
                    </div>
                ))}
        </div>
    );
};

export default Player;

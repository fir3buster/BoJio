import React, { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import ActivitiesActionAreaCard from "./ActivitiesActionAreaCard";
import UsersActionAreaCard from "./UsersActionAreaCard";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const activityCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
};

const userCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
};

const Home = () => {
    const userCtx = useContext(UserContext);
    const [allActivities, setAllActivities] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useFetch();
    const navigate = useNavigate();

    const getAllPublicActivities = async (id) => {
        try {
            console.log("getting all public activities");
            const res = await fetchData(
                "/activity/public/" + id,
                undefined,
                undefined,
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                setIsLoading(false);
                console.log(res.data);
                setAllActivities(res.data);
                // setAllActivities()
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const getAllActiveUsers = async () => {
        try {
            console.log("getting all active users");
            const res = await fetchData(
                "/profile/activeusers",
                undefined,
                undefined,
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                setIsLoading(false);
                console.log(res.data);
                setAllUsers(res.data);
                // setAllActivities()
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

    const getUserProfileById = async (id) => {
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
    }

    const getFollowingUserById = async (id) => {
        try {
            const res = await fetchData(
                "/profile/following/" + id,
                undefined,
                undefined,
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                console.log(res.data);
                userCtx.setDisplayFollowings(res.data);
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const getFollowersById = async (id) => {
        try {
            const res = await fetchData(
                "/profile/follower/" + id,
                undefined,
                undefined,
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                console.log(res.data);
                userCtx.setDisplayFollowers(res.data);
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const getSportCardByUserId = async (id) => {
        try {
            const res = await fetchData(
                "/profile/sportcard/" + id,
                undefined,
                undefined,
                undefined,
                userCtx.accessToken
            )

            if (res.ok) {
                console.log(res.data);
                userCtx.setDisplaySportCard(res.data);
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data)
            } 
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleActivityCardClick = async (id) => {
        try {
            await getActivityById(id);
            navigate(`/play/${id}`);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleUserCardClick = async (id) => {
        try {
            await getUserProfileById(id);
            await getFollowingUserById(id);
            await getFollowersById(id);
            await getSportCardByUserId(id)
            navigate(`/player/${id}`)
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        // getAllPublicActivities(activeUserId);
        getAllPublicActivities(6);
        getAllActiveUsers();
        userCtx.setIsJoined(false)
    }, []);

    return (
        // <div>
        //     <h1>INSIDE HOME</h1>
        //     {JSON.stringify(allActivities)}
        //     <br/>
        //     {JSON.stringify(allUsers)}
        // </div>
        <div>
            <h2>Activities</h2>
            <Slider {...activityCarouselSettings}>
                {allActivities &&
                    allActivities.map((item) => (
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
                            onClick={() => handleActivityCardClick(item.id)}
                        />
                    ))}
            </Slider>
            <br />
            <br />
            <hr></hr>
            <h2>People</h2>
            <Slider {...userCarouselSettings}>
                {allUsers &&
                    allUsers.map((item) => (
                        <UsersActionAreaCard
                            key={item.user_id}  
                            id={item.user_id}
                            firstName={item.first_name}
                            lastName={item.last_name}
                            profileName={item.profile_name}
                            profilePic={item.profile_picture_url}
                            location={item.location}
                            onClick={() => handleUserCardClick(item.user_id)}
                        />
                    ))}
            </Slider>
        </div>
    );
};

export default Home;

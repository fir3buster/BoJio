import React, { useEffect, useState, useContext } from 'react';
import Slider from 'react-slick';
import ActivitiesActionAreaCard from './ActivitiesActionAreaCard';
import UsersActionAreaCard from './UsersActionAreaCard';
import UserContext from '../context/user';
import useFetch from "../hooks/useFetch";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const activityCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
}

const userCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
}

const Home = () => {
    const userCtx = useContext(UserContext)
    const [allActivities, setAllActivities] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useFetch();

    const getAllPublicActivities = async () => {
        try {
            console.log("getting all public activities")
            const res = await fetchData("/activity/public",
                undefined,
                undefined,
                undefined,
                userCtx.accessToken
            );
            
            if (res.ok) {
                
                setIsLoading(false);
                console.log(res.data)
                setAllActivities(res.data)
                // setAllActivities()

            } else {
                alert(JSON.stringify(res.data))
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const getAllActiveUsers = async () => {
        try {
            console.log("getting all active users")
            const res = await fetchData("/profile/activeusers",
                undefined,
                undefined,
                undefined,
                userCtx.accessToken
            );
            
            if (res.ok) {
                setIsLoading(false);
                console.log(res.data)
                setAllUsers(res.data)
                // setAllActivities()

            } else {
                alert(JSON.stringify(res.data))
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    
    useEffect(() => {
        getAllPublicActivities()
        getAllActiveUsers()     
    }, [])

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
                {allActivities && allActivities.map((item) => (
                    <ActivitiesActionAreaCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        schedule={item.schedule}
                        location={item.location}
                        players={item.players}
                    />
                ))}
            </Slider>
            <br />
            <br />
            <hr></hr>
            <h2>People</h2>
            <Slider {...userCarouselSettings}>
                {allUsers && allUsers.map((item) => (
                    <UsersActionAreaCard
                        key={item.id}
                        id={item.id}
                        firstName={item.first_name}
                        lastName={item.last_name}
                        profilePic={item.profile_picture_url}
                        location={item.location}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default Home;
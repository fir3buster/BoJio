import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Button from "@mui/material/Button";

const Play = () => {
    const userCtx = useContext(UserContext);
    const { id } = useParams(); // Extract the route parameter
    const [isLoading, setIsLoading] = useState(true);


    // const [title, setTitle] = useState("");
    // const [location, setLocation] = useState("");
    // const [schedule, setSchedule] = useState(""); // Date/time field
    // const [gameType, setGameType] = useState("");
    // const [minPeople, setMinPeople] = useState(0); // Slider or number input
    // const [maxPeople, setMaxPeople] = useState(0); // Slider or number input
    // const [skillLevel, setSkillLevel] = useState(""); // Text or select input
    // const [gamePrivate, setGamePrivate] = useState(false); // Toggle button
    const [showJoinGame, setShowJoinGame] = useState(false);

    const fetchData = useFetch();

    // const handleToggle = () => {
    //     setGamePrivate(!gamePrivate); // Toggle the boolean value
    // };

    // const handleSliderChange = (event, newValue, name) => {
    //     // Slider component will send a new value
    //     if (name === "minPeople") {
    //         setMinPeople(newValue);
    //     } else if (name === "maxPeople") {
    //         setMaxPeople(newValue);
    //     }
    // };
    
    // refetch activity if displayActivity state is none
    const fetchActivity = async () => {
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

    // const handleAddActivityClick = () => {
    //     setShowCreate(true);
    // };

    const handleGetActivityClick = () => {
        
    }

    useEffect(() => {
        if (!userCtx.displayActivity) {
            fetchActivity();
        }
    }, [id]); // Rerun if the ID changes

    // if (isLoading) {
    //     return <div>Loading...</div>; // Display loading state
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>; // Display error message
    // }

    return (
        <div>
            <h1>Activity Details for ID: {id}</h1>
            {JSON.stringify(userCtx.displayActivity)}
            <hr />
            {userCtx.displayActivity &&
                userCtx.displayActivity.map((item) => (
                    <div>
                        <div>ACTIVITIES</div>
                        <div>Title: {item.title}</div>
                        <div>Location: {item.location}</div>
                        <div>Schedule: {item.schedule}</div>
                        <div>GameType: {item.game_type}</div>
                        <div>Min: {item.min_player}</div>
                        <div>Max: {item.max_player}</div>
                        <div>Skill: {item.skill_level}</div>
                        <div>Private: {item.game_private}</div>
                    </div>

                ))}
            <Button
                // onClick={handleAddActivityClick}
                size="large"
                color="primary"
                variant="outlined" // Correct variant
                style={{
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    width: "100%",
                }}
            >
                JOIN 
            </Button>

            {/* {accessToken.length === 0 && showLogin && (
                    <Login setShowLogin={setShowLogin}></Login>
                )} */}

            {/* ADD A GAME */}
            {/* {showCreate && (
                <form onSubmit={handleSubmit}>
                    <h2>Organise a Game</h2>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} // Directly updating state
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)} // Direct update
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="schedule">Schedule:</label>
                        <input
                            type="datetime-local"
                            id="schedule"
                            value={schedule}
                            onChange={(e) => setSchedule(e.target.value)} // Direct update
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="gameType">Game Type:</label>
                        <input
                            type="text"
                            id="gameType"
                            value={gameType}
                            onChange={(e) => setGameType(e.target.value)} // Direct update
                        />
                    </div>
                    <div>
                        <label htmlFor="minPeople">Minimum Players:</label>
                        <input
                            type="number"
                            id="minPeople"
                            value={minPeople}
                            onChange={(e) =>
                                setMinPeople(Number(e.target.value))
                            } // Direct update
                        />
                    </div>
                    <div>
                        <label htmlFor="maxPeople">Maximum Players:</label>
                        <input
                            type="number"
                            id="maxPeople"
                            value={maxPeople}
                            onChange={(e) =>
                                setMaxPeople(Number(e.target.value))
                            } // Direct update
                        />
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={gamePrivate}
                                onChange={handleToggle} // Toggle boolean
                            />
                            Make Game Private
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )} */}
        </div>
    );
};

export default Play;

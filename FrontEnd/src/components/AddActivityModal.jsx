import React, { useState } from "react";

const AddActivityModal = () => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [schedule, setSchedule] = useState(""); // Date/time field
    const [gameType, setGameType] = useState("");
    const [minPeople, setMinPeople] = useState(0); // Slider or number input
    const [maxPeople, setMaxPeople] = useState(0); // Slider or number input
    const [skillLevel, setSkillLevel] = useState(""); // Text or select input
    const [gamePrivate, setGamePrivate] = useState(false); // Toggle button

    const handleToggle = () => {
        setGamePrivate(!gamePrivate); // Toggle the boolean value
    };

    const handleSliderChange = (event, newValue, name) => {
        // Slider component will send a new value
        if (name === "minPeople") {
            setMinPeople(newValue);
        } else if (name === "maxPeople") {
            setMaxPeople(newValue);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Game details submitted:", {
            title,
            location,
            schedule,
            gameType,
            minPeople,
            maxPeople,
            skillLevel,
            gamePrivate,
        });

        // Resetting fields after submission
        setTitle("");
        setLocation("");
        setSchedule("");
        setGameType("");
        setMinPeople(0);
        setMaxPeople(0);
        setSkillLevel("");
        setGamePrivate(false);
    };

    return (
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
                    onChange={(e) => setMinPeople(Number(e.target.value))} // Direct update
                />
            </div>
            <div>
                <label htmlFor="maxPeople">Maximum Players:</label>
                <input
                    type="number"
                    id="maxPeople"
                    value={maxPeople}
                    onChange={(e) => setMaxPeople(Number(e.target.value))} // Direct update
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
            <button type="submit">Submit</button> {/* Submit button */}
        </form>
    );
};

export default AddActivityModal;

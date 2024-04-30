import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ActivitiesActionAreaCard from "./ActivitiesActionAreaCard";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import Button from "@mui/material/Button";

const Schedule = () => {
    const userCtx = useContext(UserContext);

    const [value, setValue] = useState("1");
    const [upcomingActivities, setUpcomingActivities] = useState([]);
    const [pastActivities, setPastActivities] = useState([]);

    // const [showCreate, setShowCreate] = useState(false);

    const fetchData = useFetch();
    const navigate = useNavigate();

    // console.log(userCtx.ActiveUserId)
    const getAllUpcomingActivities = async () => {
        try {
            console.log("getting upcoming activities");
            const res = await fetchData(
                "/activity/upcoming/" + userCtx.ActiveUserId,
                undefined,
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                setUpcomingActivities(res.data);
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const getAllPastActivities = async () => {
        try {
            console.log("getting past activities");
            const res = await fetchData(
                "/activity/past/" + userCtx.ActiveUserId,
                undefined,
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                setPastActivities(res.data);
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleActivityCardClick = async (id) => {
        try {
            await getActivityById(id);
            navigate(`/play/${id}`);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getAllUpcomingActivities();
        getAllPastActivities();
    }, []);

    return (
        // <div>
        //     <h1>INSIDE SCHEDULE</h1>
        //     {userCtx.ActiveUserId}
        //     <h2>upcoming activities</h2>
        //     {JSON.stringify(upcomingActivities)}
        //     <h2>Past Activities</h2>
        //     {JSON.stringify(pastActivities)}

        // </div>
        <>
            <Box
                sx={{ width: "100%", typography: "body1", border: "2px solid" }}
            >
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange} aria-label="schedule">
                            <Tab
                                label="Upcoming Activities"
                                value="1"
                                style={{ fontWeight: "bold" }}
                            />
                            <Tab
                                label="History"
                                value="2"
                                style={{ fontWeight: "bold" }}
                            />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {upcomingActivities &&
                            upcomingActivities.map((item) => (
                                <ActivitiesActionAreaCard
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    schedule={item.schedule}
                                    location={item.location}
                                    players={item.players}
                                    onClick={() =>
                                        handleActivityCardClick(item.id)
                                    }
                                />
                            ))}
                    </TabPanel>
                    <TabPanel value="2">
                        {pastActivities &&
                            pastActivities.map((item) => (
                                <ActivitiesActionAreaCard
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    schedule={item.schedule}
                                    location={item.location}
                                    players={item.players}
                                    sx={{ marginBottom: "20px" }}
                                    onClick={() =>
                                        handleActivityCardClick(item.id)
                                    }
                                />
                            ))}
                    </TabPanel>
                </TabContext>
            </Box>
            <div></div>
        </>
    );
};

export default Schedule;

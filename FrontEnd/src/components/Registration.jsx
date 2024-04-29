import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
// import logo from "../ts_logo.png";

const Registration = (props) => {
    const fetchData = useFetch();

    const [roles, setRoles] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [location, setLocation] = useState("");
    const [role, setRole] = useState("");

    const getRoles = async () => {
        const res = await fetchData("/roles", "GET");
        if (res.ok) {
            setRoles(res.data);
        } else {
            alert(JSON.stringify(res.data));
        }
    };

    const registerUser = async () => {
        const res = await fetchData("/auth/register", "PUT", {
            email,
            password,
            firstName,
            lastName,
            location,
            role,
        });

        if (res.ok) {
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setLocation("");
            setRole("");
            alert("successfully Registered!");
            props.setShowLogin(true);
        } else {
            alert(JSON.stringify(res.data));
        }
    };

    useEffect(() => {
        getRoles();
    }, []);

    return (
        <>
            <br />
            <div className="login">
                {/* <img src={logo} className="logo"></img> */}
                <div className="">
                    <div className=""></div>
                    <input
                        type="text"
                        className="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className=""></div>
                </div>

                <div className="">
                    <div className=""></div>
                    <input
                        type="password"
                        className="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className=""></div>
                </div>

                <div className="firstLastName">
                    <div className=""></div>
                    <input
                        type="text"
                        className="firstName"
                        placeholder="first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <div className=""></div>
                </div>
                
                <div className="firstLastName">
                    <div className=""></div>
                    <input
                        type="text"
                        className="lastName"
                        placeholder="last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <div className=""></div>
                </div>

                <div className="">
                    <div className=""></div>
                    <input
                        type="text"
                        className="location"
                        placeholder="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <div className=""></div>
                </div>
                
                <select className="selection">
                    <option value="none">Please select your role</option>
                    {roles.map((item) => {
                        return (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        );
                    })}
                </select>
                
                <div className="">
                    <div className=""></div>
                    <button
                        className="loginButton"
                        onClick={registerUser}
                        type="submit"
                    >
                        Register
                    </button>
                    <div className=""></div>
                </div>
                <br />
                <div className="">
                    <div className=""></div>
                    <button
                        className="goToRegisterButton"
                        type="submit"
                        onClick={() => props.setShowLogin(true)}
                    >
                        Go to login screen
                    </button>
                    <div className=""></div>
                </div>
            </div>
        </>
    );
};

export default Registration;

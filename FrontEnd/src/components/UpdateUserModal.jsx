import React, { useRef, useContext } from "react";
import ReactDOM from "react-dom";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import styles from "./UserModal.module.css";

const Overlay = ({ onClose, user, getUserData }) => {
    const userCtx = useContext(UserContext);
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const roleRef = useRef();
    const fetchData = useFetch();

    // update existing user
    const updateUser = async () => {
        try {
            const res = await fetchData(
                "/profile/user/" + user.id,
                "PUT",
                {
                    email: emailRef.current.value,
                    first_name: firstNameRef.current.value,
                    last_name: lastNameRef.current.value,
                    role: roleRef.current.value,
                },
                userCtx.accessToken
            );

            if (res.ok) {
                alert("User updated successfully")
                getUserData();
                onClose();
                emailRef.current.value = "";
                firstNameRef.current.value = "";
                lastNameRef.current.value = "";
                roleRef.current.value = "";
            } else {
                throw new Error("UserData Put Response was not OK!");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (

        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <br />
                <br />
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-3">Email</div>
                    <input
                        ref={emailRef}
                        type="text"
                        className="col-md-7"
                        // on useRef, default value
                        defaultValue={user.email}
                    />
                    <div className="col-md-1"></div>
                </div>

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-3">First Name</div>
                    <input
                        ref={firstNameRef}
                        type="text"
                        className="col-md-7"
                        // on useRef, default value
                        defaultValue={user.first_name}
                    />
                    <div className="col-md-1"></div>
                </div>

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-3">Last Name</div>
                    <input
                        ref={lastNameRef}
                        type="text"
                        className="col-md-7"
                        // on useRef, default value
                        defaultValue={user.last_name}
                    />
                    <div className="col-md-1"></div>
                </div>

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-3">Role</div>
                    <input
                        ref={roleRef}
                        type="text"
                        className="col-md-7"
                        // on useRef, default value
                        defaultValue={user.role}
                    />
                    <div className="col-md-1"></div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-3"></div>
                    <button onClick={updateUser} className="col-md-3">
                        Update
                    </button>
                    <button className="col-md-3" onClick={onClose}>
                        Cancel
                    </button>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
    );
};

const UpdateUserModal = ({ onClose, user, getUserData }) => {
    return (
        <div>
            {ReactDOM.createPortal(
                <Overlay
                    onClose={onClose}
                    user={user}
                    getUserData={getUserData}
                ></Overlay>,
                document.querySelector("#userModal-root")
            )}
        </div>
    );
};

export default UpdateUserModal;

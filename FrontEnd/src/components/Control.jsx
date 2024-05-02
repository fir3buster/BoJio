import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import DeleteUserModal from "./DeleteUserModal";
import UpdateUserModal from "./UpdateUserModal";
import styles from "./Control.module.css";

const Control = () => {
    const [getAllUsers, setGetAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

    const userCtx = useContext(UserContext);

    const fetchData = useFetch();

    const getAllUsersData = async () => {
        try {
            const res = await fetchData(
                "/auth/users",
                undefined,
                undefined,
                userCtx.accessToken
            );

            if (res.ok) {
                console.log(res.data);
                setGetAllUsers(res.data);
            } else {
                alert(JSON.stringify(res.data));
                console.log(res.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleUpdateUserClick = (user) => {
        console.log(JSON.stringify(user));
        setSelectedUser(user);
        setShowUpdateUserModal(true);
    };

    const handleDeleteUserClick = (user) => {
        console.log(JSON.stringify(user));
        setSelectedUser(user);
        setShowDeleteUserModal(true);
    };

    const handleModalClose = () => {
        setShowUpdateUserModal(false);
        setShowDeleteUserModal(false);
    };

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <div className={styles["user-list-container"]}>
            <div className={styles["user-header"]}>
                <div>Email</div>
                <div>First Name</div>
                <div>Last Name</div>
            </div>
            <div>
                {getAllUsers &&
                    getAllUsers.map((user) => (
                        <div key={user.id} className={styles["user-item"]}>
                            <div>{user.email}</div>
                            <div>{user.first_name}</div>
                            <div>{user.last_name}</div>
                            <button
                                className={`btn btn-primary btn-sm ${styles.userButton}`}
                                type="button"
                                onClick={() => handleUpdateUserClick(user)}
                            >
                                Update
                            </button>
                            <button
                                className={`btn btn-danger btn-sm ${styles.userButton}`}
                                type="button"
                                onClick={() => handleDeleteUserClick(user)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
            </div>

            {showDeleteUserModal && (
                    <DeleteUserModal
                        onClose={handleModalClose}
                        user={selectedUser}
                        getUserData={getAllUsersData}
                    ></DeleteUserModal>
            )}
            
            {showUpdateUserModal && (
                    <UpdateUserModal
                        onClose={handleModalClose}
                        user={selectedUser}
                        getUserData={getAllUsersData}
                    ></UpdateUserModal>
                )}
        </div>
    );
};

export default Control;

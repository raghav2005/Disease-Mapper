// Profile.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import styles from './Profile.module.css';

const Profile = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    // Handler for the logout action
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={styles.profile}>
            <h1>User Profile</h1>
            {user ? (
                <>
                    <div>
                        <strong>Username:</strong> {user.username}
                    </div>
                    <div>
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div>
                        <strong>NHS ID:</strong> {user.nhsID}
                    </div>
                    <div>
                        <strong>Postcode:</strong> {user.postcode}
                    </div>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Logout
                    </button>
                </>
            ) : (
                <p>Please login to see the profile information.</p>
            )}
        </div>
    );
};

export default Profile;

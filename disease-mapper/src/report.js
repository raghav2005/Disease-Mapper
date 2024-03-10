// Report.js
import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import styles from './Report.module.css';

const Report = () => {
    const { user } = useContext(UserContext);
    const [disease, setDisease] = useState('');

    const sendReport = async () => {
        if (!user) {
            alert('Please log in to send a report.');
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:${process.env.REACT_APP_FLASK_PORT}/sendReport`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: user.username,
                        diseaseName: disease,
                    }),
                }
            );
            const data = await response.json();

            if (data.status === 'SUCCESS') {
                alert('Report submitted successfully');
                setDisease('');
            } else {
                alert(`Failed to submit report: ${data.message}`);
            }
        } catch (error) {
            console.error('Report submission failed:', error);
            alert('Report request failed. Please try again.');
        }
    };

    return (
        <div className={[styles.report]}>
            <h1>Report Disease</h1>
            <input
                className={styles.input}
                type="text"
                value={disease}
                placeholder="Disease Name"
                onChange={(e) => setDisease(e.target.value)}
            />
            <button className={styles.button} onClick={sendReport}>
                Send Disease Report
            </button>
        </div>
    );
};

export default Report;

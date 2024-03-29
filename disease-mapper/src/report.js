import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import styles from './Report.module.css';

const Report = () => {
    const { user } = useContext(UserContext);
    const [disease, setDisease] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const sendReport = async () => {
        if (!user) {
            alert('Please log in to send a report.');
            return;
        }
        
        if (!disease.trim()) {
            setError('Please enter a disease name.');
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
                // Navigate to the map page
                navigate('/map');

            } else {
                alert(`Failed to submit report: ${data.message}`);
            }
        } catch (error) {
            console.error('Report submission failed:', error);
            alert('Report request failed. Please try again.');
        }
    };

    return (
        <div className={styles.report}>
            <h1>Report Disease</h1>
            <label htmlFor="diseaseInput" className={styles.inputLabel}>Disease Name</label>
            <input
                id="diseaseInput"
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                type="text"
                value={disease}
                placeholder=""
                onChange={(e) => {
                    setDisease(e.target.value);
                    setError(''); // Clear error on change
                }}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
            <button className={styles.button} onClick={sendReport}>
                Send Disease Report
            </button>
        </div>
    );
};

export default Report;

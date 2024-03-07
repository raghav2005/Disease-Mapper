import React from 'react';
import { Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import logo from './logo.svg';
import './App.css';

function App() {

    const handleFetch = () => {
        // This is the flask server url
        fetch("http://localhost:" + process.env.FLASK_PORT + "/search", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "test1": 1,
                "test2": 2,
            })
        }).then((res) => res.json()
            .then((result) => {
                console.log(result.status);
                console.log(result.message);
            })
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
            </header>
        </div>
    );
}

export default App;

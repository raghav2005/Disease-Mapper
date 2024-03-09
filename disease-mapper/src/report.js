import NavBar from "./index.js";
import {useContext, useState} from 'react';
import {usernameContext} from './App';

const sendReport = async (username, diseaseName) => {
    const response = await fetch('http://localhost:' + process.env.REACT_APP_FLASK_PORT + '/sendReport', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, diseaseName }),
    });
    const data = await response.json();
    console.log(data);
}

// TODO: CHANGE BACK TO / home after fixing username transferred from home to report & back!
function Report(){
    const {username} = useContext(usernameContext);
    const [disease, setDisease] = useState('');
    return (
        <div className="App">
            <NavBar />
            {username}
            <div className='App' style={{ display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'50vh'}}>
                <h1> Report Disease </h1>
                <input className='input' name='password' value={disease} placeholder='DiseaseName:' color='white' onChange={e => setDisease(e.target.value)} required="required" />
                <button className='sendButton' onClick={() => sendReport(username, disease)} >Send Disease</button>
            </div>
        </div>
    );
}


export default Report;

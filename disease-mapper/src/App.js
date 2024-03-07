// import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import './App.css';
// import { useEffect } from 'react';
// import 'dotenv/config';
const search = async () => {
    const response = await fetch("http://localhost:3001/search", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "HI"
    });
    return response;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={search} variant="primary">Primary</Button>{' '}
        {/* <Button variant="secondary">Secondary</Button>{' '}
        <Button variant="success">Success</Button>{' '} */}
      </header>
    </div>
  );
}

export default App;

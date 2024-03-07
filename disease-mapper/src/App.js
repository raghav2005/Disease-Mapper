import Button from 'react-bootstrap/Button';
import './App.css';

const search = async () => {
    const response = await fetch("http://localhost:" + process.env.REACT_APP_FLASK_PORT + "/search", {
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

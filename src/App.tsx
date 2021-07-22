import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { db, Portal } from './services/firebase';

function App() {
  useEffect(() => {
    db.portals.onSnapshot((snap) => {
      const portals: Portal[] = [];
      snap.forEach((entry) => portals.push(entry.data()));
      console.log(portals);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

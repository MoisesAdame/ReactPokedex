import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Navbar from './components/Navbar';
import Body from './components/Body'

function App() {

  return (
    <div className="App">
      <Navbar home="#" links={{'Wikipedia': 'random/link', 'Random': 'random/link'}}></Navbar>

      <Body></Body>

      
    </div>
  );
}

export default App;

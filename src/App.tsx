import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import { SetupPage, StroopPage } from './page';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="setup" element={<SetupPage/>} />
        <Route path="test" element={<StroopPage/>} />
      </Routes>
    </div>
  );
}

export default App;

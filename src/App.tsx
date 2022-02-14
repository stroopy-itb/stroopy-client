import React from 'react';
import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom';
import { Header } from './component';
import { SetupPage, StroopPage } from './page';

function App() {
  return (
    <div className="bg-black px-10 min-h-screen">
      <Header/>
      <Routes>
        <Route path="setup" element={<SetupPage/>} />
        <Route path="test" element={<StroopPage/>} />
      </Routes>
    </div>
  );
}

export default App;

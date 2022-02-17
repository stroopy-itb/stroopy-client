import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { Header } from './component';
import { Home, Login, Register, History, Setup, Stroop, Result} from './page';

function App() {
  return (
    <div className="bg-black px-10 min-h-screen flex flex-col justify-start items-stretch">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="history" element={<History/>} />
        <Route path="history" element={<History/>} />
        <Route path="setup" element={<Setup/>} />
        <Route path="test" element={<Stroop/>} />
        <Route path="result" element={<Result/>} />
      </Routes>
    </div>
  );
}

export default App;

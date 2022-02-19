import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { Header, ProtectedRoute } from './component';
import { Home, Login, Register, History, Setup, Stroop, Result} from './page';

function App() {
  return (
    <div className="bg-black px-10 min-h-screen flex flex-col justify-start items-stretch">
      <Header/>
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="/" element={<ProtectedRoute children={<Home/>} />} />
        <Route path="history" element={<ProtectedRoute children={<History/>} />} />
        <Route path="setup" element={<ProtectedRoute children={<Setup/>} />} />
        <Route path="test" element={<ProtectedRoute children={<Stroop/>} />} />
        <Route path="result" element={<ProtectedRoute children={<Result/>} />} />
      </Routes>
    </div>
  );
}

export default App;

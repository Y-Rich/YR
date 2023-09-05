import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './view/components/header/Header';
import Login from './view/pages/login/Login';
import Register from './view/pages/register/Register';
import Home from './view/pages/home/Home';
import UserModi from './view/pages/usermodi/UserModi';
import Find from './view/pages/findpassword/Find';
import Chart from './view/pages/chart/Chart';
import PLC from './view/pages/3d/Edukit';

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/usermodi" element={<UserModi />} />
        <Route path="/findpassword" element={<Find />} />
        <Route path="/plc" element={<PLC />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </Router>
  );
}

export default App;

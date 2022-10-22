import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const PREFIX_PATH = "UHIHI-DIARY-front";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/" element={<Login/>} />
            <Route path="/register/" element={<Register/>} />
        </Routes>
      </Router>
  );
}

export default App;
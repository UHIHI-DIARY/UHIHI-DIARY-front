import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Monthly from 'pages/Monthly';
import PWSearch from 'pages/PWSearch';
import PageLayout from 'components/layout/PageLayout';

function App() {
  return (
    <PageLayout>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/" element={<Login/>} />
            <Route path="/register/" element={<Register/>} />
            <Route path="/password-search/" element={<PWSearch/>}/>
            <Route path="/test/" element={<Monthly/>}/>
        </Routes>
      </Router>
    </PageLayout>
  );
}

export default App;
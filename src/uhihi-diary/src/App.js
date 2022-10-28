import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PageLayout from './components/Layout/PageLayout';
import PWSearch from './pages/PWSearch';

const PREFIX_PATH = "UHIHI-DIARY-front";

function App() {
  return (
    <PageLayout>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/" element={<Login/>} />
            <Route path="/register/" element={<Register/>} />
            <Route path="/password-search/" element={<PWSearch/>}/>
        </Routes>
      </Router>
    </PageLayout>
  );
}

export default App;
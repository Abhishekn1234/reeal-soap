
/// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Login from './components/Login';
import Otp from './components/Otp';
import Home from './components/Home';


const App = () => {
    return (
        <Router>
            
            <Container>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                  
                    <Route path="/" element={<Home />} />
                    <Route path="/otp" element={<Otp />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;

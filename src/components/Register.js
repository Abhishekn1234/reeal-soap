
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
const Register = () => {
    const [formData, setFormData] = useState({
        mobileNumber: '',
        password: '',
        username: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', formData);
            setMessage(response.data.message);
            console.log(response.data.message);
            setError('');
            navigate('/login');
        } catch (err) {
            setError(err.response.data.message);
            setMessage('');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                />
            </Form.Group>
            <Form.Group controlId="formMobileNumber">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    );
};

export default Register;

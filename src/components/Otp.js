// src/components/Otp.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
export default function Otp() {
    const [otp, setOtp] = useState('');
    const navigate=useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/verify-otp', { otp });
            console.log('OTP verified:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="4">
                    <h3>Enter OTP</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formOtp">
                            <Form.Label>OTP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

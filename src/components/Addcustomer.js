import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Addcustomer = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    mobileNumber: '',
    username: '',
    epin1: false,
    epin2: false
  });
  const [loginDetails, setLoginDetails] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example of sending formData to backend endpoint to add customer
      await axios.post('http://localhost:5000/customer', formData);
      
      // Fetch updated login details after adding customer
      const response = await axios.get('http://localhost:5000/login-details');
      const loginDetails = response.data;
      
      // Optionally update your state with the fetched loginDetails
      setLoginDetails(loginDetails); // Assuming you have a state for loginDetails
      
      
      
      // Check if epin1 or epin2 is true to determine where to navigate
      if (formData.epin1 && formData.epin2) {
        history('/login-details');
      } else if (formData.epin1) {
        history('/login-details');
      } else if (formData.epin2) {
        history('/epin');
      } else {
        console.log('No checkbox selected');
      }
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title>Add Customer</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Epin 1"
                name="epin1"
                checked={formData.epin1}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Epin 2"
                name="epin2"
                checked={formData.epin2}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Customer
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Addcustomer;

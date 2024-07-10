import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faUser, faFileInvoiceDollar, faWallet, faCog } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Home.css';

const Sidebar = ({ handleEditDetails, handleChangePassword }) => (
  <div className="sidebar">
    <ul>
      <li><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</li>
      <li><FontAwesomeIcon icon={faUsers} /> Customers</li>
      <li><FontAwesomeIcon icon={faUser} /> Users</li>
      <li><FontAwesomeIcon icon={faFileInvoiceDollar} /> Profile</li>
      <li><FontAwesomeIcon icon={faWallet} /> Wallet</li>
      <li onClick={handleChangePassword}><FontAwesomeIcon icon={faCog} /> Settings</li>
    </ul>
  </div>
);

const CardComponent = ({ title, value, onClick }) => (
  <Card className="mb-4" onClick={onClick} style={{ cursor: 'pointer' }}>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{value}</Card.Text>
    </Card.Body>
  </Card>
);

const Home = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formDatas, setFormDatas] = useState({
    mobileNumber: '',
    username: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const [loginDetails, setLoginDetails] = useState("");

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/total-amount');
        const { totalAmount } = response.data;

        const earnings = totalAmount * 0.15;

        setTotalAmount(totalAmount);
        setTotalEarnings(earnings);
      } catch (error) {
        console.error('Error fetching total amount:', error);
      }
    };

    fetchTotalAmount();
  }, []);

  const handleAddCustomer = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditDetails = () => {
    setShowEditDetailsModal(true);
  };

  const handleCloseEditDetailsModal = () => {
    setShowEditDetailsModal(false);
  };

  const handleChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  const handleEditDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/edit-details', formDatas);
      setShowEditDetailsModal(false);
      // Optionally update any necessary state or fetch updated data
    } catch (error) {
      console.error('Error updating details:', error);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
     const response= await axios.put('http://localhost:5000/change-password', passwordData);
      setShowChangePasswordModal(false);
      console.log(response.data);
      // Optionally update any necessary state or fetch updated data
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormDatas(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example of sending formDatas to backend endpoint to add customer
      await axios.post('http://localhost:5000/customer', formDatas);

      // Fetch updated login details after adding customer
      const response = await axios.get('http://localhost:5000/login-details');
      const loginDetails = response.data;

      // Optionally update your state with the fetched loginDetails
      setLoginDetails(loginDetails); // Assuming you have a state for loginDetails

      // Close modal after successful submission
      setShowModal(false);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar Column */}
        <Col md={3} className="sidebar-col">
          <Sidebar handleEditDetails={handleEditDetails} handleChangePassword={handleChangePassword} />
        </Col>
        {/* Main Content Column */}
        <Col md={9} className="content">
          <Row>
            <Col md={4}>
              <CardComponent title="Add Details" value="Details about adding something here" onClick={handleAddCustomer} />
            </Col>
            <Col md={4}>
              <CardComponent title="Total Amount" value={`$${totalAmount}`} />
            </Col>
            <Col md={4}>
              <CardComponent title="Total Earnings" value={`$${totalEarnings}`} />
            </Col>
            {/* Additional Cards */}
            <Col md={4}>
              <CardComponent title="Wallets" value="Details about wallets" />
            </Col>
            <Col md={4}>
              <CardComponent title="Payments" value="Details about payments" />
            </Col>
            <Col md={4}>
              <CardComponent title="Transactions" value="Details about transactions" />
            </Col>
            <Col md={4}>
              <CardComponent title="Edit Details" value="Click to edit user details" onClick={handleEditDetails} />
            </Col>
            <Col md={4}>
              <CardComponent title="Change Password" value="Click to change password" onClick={handleChangePassword} />
            </Col>
            {/* Add Customer Card */}
            <Col md={4}>
              <Card className="mb-4" onClick={handleAddCustomer} style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <Card.Title>Add Customer</Card.Title>
                  <Card.Text>Click to add customer details</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Modal for Add Customer */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                name="mobileNumber"
                value={formDatas.mobileNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formDatas.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Customer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for Edit Details */}
      <Modal show={showEditDetailsModal} onHide={handleCloseEditDetailsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditDetailsSubmit}>
            <Form.Group controlId="formMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                name="mobileNumber"
                value={formDatas.mobileNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formDatas.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for Change Password */}
      <Modal show={showChangePasswordModal} onHide={handleCloseChangePasswordModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleChangePasswordSubmit}>
            <Form.Group controlId="formCurrentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Home;

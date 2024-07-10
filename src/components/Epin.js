import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const LoginDetails = () => {
  const [loginDetails, setLoginDetails] = useState([]);

  useEffect(() => {
    fetchLoginDetails();
  }, []);

  const fetchLoginDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/login-details');
      setLoginDetails(response.data);
    } catch (err) {
      console.error('Error fetching login details:', err);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Mobile Number</th>
          <th>Member ID</th>
          <th>Left Customer</th>
          <th>Right Customer</th>
          <th>Amount</th>
          <th>Income</th>
          <th>Rebirth</th>
          <th>Count</th>
          <th>SiNo</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {loginDetails.map((detail, index) => (
          <tr key={index}>
            <td>{detail.mobileNumber}</td>
            <td>{detail.memberId}</td>
            <td>{detail.leftCustomer}</td>
            <td>{detail.rightCustomer}</td>
            <td>{detail.amount}</td>
            <td>{detail.income}</td>
            <td>{detail.rebirth ? 'Yes' : 'No'}</td>
            <td>{detail.count}</td>
            <td>{detail.siNo}</td>
            <td>{detail.formattedDate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default LoginDetails;

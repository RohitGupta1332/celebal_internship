import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const { formValues } = location.state || {};

  return (
    <div className="container">
      <h1>Form Submission Successful!</h1>
      <h2>Submitted Details:</h2>
      <p><strong>First Name:</strong> {formValues.firstName}</p>
      <p><strong>Last Name:</strong> {formValues.lastName}</p>
      <p><strong>Email:</strong> {formValues.email}</p>
      <p><strong>Phone:</strong> {formValues.phone}</p>
      <p><strong>Country:</strong> {formValues.country}</p>
      <p><strong>State:</strong> {formValues.state}</p>
      <p><strong>PAN:</strong> {formValues.pan}</p>
      <p><strong>Aadhar:</strong> {formValues.aadhar}</p>
    </div>
  );
};

export default Success;

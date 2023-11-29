import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const FinalOrderedPage = () => {
    const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', padding:"10px" }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '15px', border: '1px solid black', width: '500px' }}>
        <h1>Thank you for your order.</h1>
        <p>Your order has been successful.
          We have emailed your order
          confirmation, and will send you
          an update when your order has
          shipped.</p>
        <Button variant="contained" onClick={() => navigate(`/`)}>Back To Home</Button>
      </div>
    </div>
  );
};

export default FinalOrderedPage;

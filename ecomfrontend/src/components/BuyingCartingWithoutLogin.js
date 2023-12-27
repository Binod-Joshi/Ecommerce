import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const BuyingCartingWithoutLogin = () => {
    const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', padding:"10px" }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '15px', border: '1px solid black', width: '500px' }}>
      <h1>Thanks for liking this product.</h1>
      <p>You can buy or add to add only after login/signup.</p>
      <Button variant="contained" onClick={() => navigate(`/`)}>Back To Home</Button>
    </div>
  </div>
  )
}

export default BuyingCartingWithoutLogin



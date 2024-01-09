import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Wait = () => {
    // const navigate = useNavigate();
    // useEffect(() => {
    // const time = setTimeout(() => {
    //     navigate(-1);
    //  }, 3000);
    //  return () => clearTimeout(time);
    // },[]);
  return (
    <>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `calc(100vh - 64px)`,
        flexDirection:"column"
      }}
    >
      <h2 style={{color:"#4d1c9c"}}>Wait...</h2>
    </div>
  </>
  )
}

export default Wait

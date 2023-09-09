import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledLogout = styled.div`
display:flex;
align-items:center;
justify-content:center;
`
const Logout = () => {
    const navigate = useNavigate();

    const cancelHandler = () => {

    }

    const okHandler = () => {
        
    }

    return(
        <>
        <StyledLogout>
        <h1>Are you sure you want to Logout.</h1>
        <div className="cancelAndOk">
            <button onClick={cancelHandler}>Cancel</button>
            <button onClick={okHandler}>Ok</button>
        </div>
        </StyledLogout>
        </>
    )
}

export default Logout;
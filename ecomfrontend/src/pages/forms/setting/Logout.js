import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogoutUser } from "../../../store/userRelated/userHandle";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

const StyledLogout = styled.div`

display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
background-color:gray;
height:40vh;
width:100vw;


h1 {
    width:280px;
}

.cancelAndOk {
    display:flex;
    align-items:center;
    justify-content:center;
    gap:98%;
    

    button {
      margin-right:10px;
      padding:5px;
      border-radius:5px;
      cursor:pointer;

      &:last-child {
        margin-right: 0;
        background-color:yellow;
        border:none
      }
    }
  }
`;

const Logout = () => {
    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cancelHandler = () => {
        navigate('/usehome')
    }

    const okHandler = () => {
        dispatch(LogoutUser())
        //logout function
    }

    return(
        <>
     <StyledContainerr>
      <StyledContentt>
        <StyledParagraph >{currentUser?.name}</StyledParagraph>
        <StyledParagraph>Are you sure you want to Logout.</StyledParagraph>
      </StyledContentt>
      <StyledButtonContainerr>
        <Button variant="outlined" color="error" style={{width:"50px"}} onClick={okHandler}>
          Ok
        </Button>
        <Button variant="contained" color="success" style={{width:"80px"}} onClick={cancelHandler} >
          Cancel
        </Button>
      </StyledButtonContainerr>
    </StyledContainerr>
        </>
    )
}

export default Logout;

 const StyledContainerr = styled.div`
  position: fixed;
  top: 50%; /* Adjust as needed */
  left: 50%; /* Adjust as needed */
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9); /* Adjust background color and opacity */
  padding: 20px;
  z-index: 1000;

  @media only screen and (max-width:768px) {
    width: 90vw;
  }
`;

 const StyledContentt = styled.div`
  /* Add any necessary styles for the content container */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  margin: 0px;
  padding:0px;
`;

 const StyledButtonContainerr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-around;
`;

 const StyledParagraph = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap:0px;
  margin:0;
  padding:0;
  font-size:20px;
`
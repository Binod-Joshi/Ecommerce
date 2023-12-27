import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogoutUser } from "../../../store/userRelated/userHandle";
import { useDispatch, useSelector } from "react-redux";

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
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <StyledLogout>
        <h1 style={{display:"flex",alignItems:"center",justifyContent:"center"}}>{currentUser?.name}</h1>
        <h3>Are you sure you want to Logout.</h3>
        <hr />
        <div className="cancelAndOk">
            <button onClick={cancelHandler} style={{backgroundColor:"green",border:"none"}}>Cancel</button>
            <button onClick={okHandler}>Ok</button>
        </div>
        </StyledLogout>
        </div>
        </>
    )
}

export default Logout;
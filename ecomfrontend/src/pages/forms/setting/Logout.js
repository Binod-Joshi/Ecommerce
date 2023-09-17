import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogoutUser } from "../../../store/userRelated/userHandle";
import { useDispatch } from "react-redux";

const StyledLogout = styled.div`

display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
background-color:gray;


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

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

const Logout = () => {

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
        <StyledLogout>
        <h1>Are you sure you want to Logout.</h1>
        <hr />
        <div className="cancelAndOk">
            <button onClick={cancelHandler}>Cancel</button>
            <button onClick={okHandler}>Ok</button>
        </div>
        </StyledLogout>
        </>
    )
}

export default Logout;
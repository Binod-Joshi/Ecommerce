import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { loginUser } from "../../store/userRelated/userHandle";
import {Link, useNavigate} from "react-router-dom";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const Login = () => {
  const {status,loading} = useSelector((state) => state.user);

  
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(status);
    if(status === "success"){
      navigate(`/`);
    }
  },[status])

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = { password, email };
    dispatch(loginUser(fields));
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Link to="/register">Sign up</Link>

      <label>
        Email:
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </StyledForm>
  );
};


export default Login;

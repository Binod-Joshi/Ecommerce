import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { loginUser } from "../../store/userRelated/userHandle";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = { name, email };
    dispatch(loginUser(fields));
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </StyledForm>
  );
};


export default Login;

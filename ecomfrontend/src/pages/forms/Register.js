import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { RegisterUser } from "../../store/userRelated/userHandle";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = { name, email, password };
    console.log(fields)
    dispatch(RegisterUser(fields))
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Email:</label>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </StyledForm>
  );
};

export default Register;

import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProductFromCart,
  saveBuyingDetails,
} from "../store/productRelated/productHandle";

const SuccessfullPaymentPage = ({ result }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const seachQuery = useSearchParams()[0];
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: `calc(100vh - 64px)`,
          flexDirection: "column",
        }}
      >
        <StyledDiv result={result}>
          {result === "Successfull" ? <DoneAllIcon /> : <ClearIcon />}
          <h2>Payment {result}</h2>
        </StyledDiv>
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </div>
    </>
  );
};

export default SuccessfullPaymentPage;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: ${(props) => (props.result === "Successfull" ? "green" : "red")};
`;

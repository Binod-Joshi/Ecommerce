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

  const referenceNum = seachQuery.get("reference");
  // console.log(referenceNum); // ye mai agar payment id and order id same mai hoigya order hunxa natara ken
  if (referenceNum) {
    console.log(referenceNum);
    const buyingDetails =
      JSON.parse(localStorage.getItem("buyingDetails")) || {};
    if (buyingDetails?.buyer) {
      console.log(buyingDetails);
      dispatch(saveBuyingDetails(buyingDetails));

      const datas = buyingDetails?.orderedProducts;
      if (datas && datas?.length > 1) { //direct buy gargya lai bewasta gaddo xa
        console.log(datas);
        const orderedDetails = {
          buyer: buyingDetails?.buyer,
          product: "deleteall",
        };
        let length = "morethan1";
        dispatch(removeProductFromCart(orderedDetails,length));
      } else {
        console.log(datas);
        const orderedDetails = {
          buyer: buyingDetails?.buyer,
          product: datas?.product,
        };
        let length = "1";
        console.log(orderedDetails);
        dispatch(removeProductFromCart(orderedDetails,length));
      }

      localStorage.removeItem('buyingDetails');
    }
  } else {
    console.log("jd");
  }
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

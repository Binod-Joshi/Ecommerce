import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCheckoutHandler,
  getKey,
} from "../store/productRelated/productHandle";

const PaymentForm = ({ handleBack }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state?.user);
  const {
    gettedShippingData,
    particularProductData,
    cartProductList,
    QuantityOfSingleProductToBuy,
    finalBuyingDetails,
  } = useSelector((state) => state?.product);

  const params = useParams();
  const productID = params?.Id;
  let quantity = params?.quantity;

  const totalOGPrice = cartProductList?.reduce(
    (total, item) => total + item?.quantity * item?.product?.cost,
    0
  );
  const totalDiscounPrice = cartProductList?.reduce(
    (total, item) =>
      total +
      item?.quantity * ((item?.product?.discount / 100) * item?.product?.cost),
    0
  );

  const checkoutHandler = async () => {
    let amount;
    if (productID === "0") {
      amount = totalOGPrice - totalDiscounPrice;
    } else {
      amount =
        particularProductData?.cost &&
        (particularProductData?.cost -
          particularProductData?.cost *
            (particularProductData?.discount / 100)) *
          (QuantityOfSingleProductToBuy || quantity);
    }

    try {

      const key = await getKey(dispatch);
      const order = await getCheckoutHandler(dispatch, amount);

      
      let data;
      if(quantity === "0"){
         data = {
          order_id: order?.id,
          buyer: currentUser?._id,
          shippingData: gettedShippingData?._id,
          orderedProducts: cartProductList?.map((order) => ({
            product: order?.product?._id,
            quantity: order?.quantity,
            seller: order?.product?.seller,
            // price:99,
            status: "processing",
            cancelled: false,
          })),
          paymentInfo: (totalOGPrice - totalDiscounPrice).toFixed(2),
          group: true,
        };
      }else{
         let singleProduct = {
          product: particularProductData?._id,
          quantity: QuantityOfSingleProductToBuy || quantity,
          seller: particularProductData?.seller,
          status: "processing",
          cancelled: false,
        };
  
         data = {
          order_id: order?.id,
          buyer: currentUser?._id,
          shippingData: gettedShippingData?._id,
          orderedProducts: singleProduct, // ye bhitra hun padyo product quantity
          paymentInfo: (
            particularProductData?.cost &&
            (particularProductData?.cost -
              particularProductData?.cost *
                (particularProductData?.discount / 100)) *
              (QuantityOfSingleProductToBuy || quantity)
          ).toFixed(2),
          group: false,
        };
      }
      const dataString = JSON.stringify(data);


      if (key && order) {
        const options = {
          key,
          amount: order.amount,
          currency: "INR",
          name: "Binod Joshi", 
          description: "razorpay integration",
          image: "https://media.licdn.com/dms/image/D5635AQF0qKFANHyvEg/profile-framedphoto-shrink_400_400/0/1692359839193?e=1705294800&v=beta&t=nMsGRymVsB5EMzOCjOKqKdtEcWCsIIqfzxMCOeO3dc8",
          order_id: order.id,
          callback_url:
            `${process.env.REACT_APP_BASE_URL_BACKEND}/auth/cshipping/paymentverification/${encodeURIComponent(dataString)}`,
          prefill: {
            name: currentUser?.name,
            email: currentUser?.email,
            contact: gettedShippingData?.phoneNo, // contact number of
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",  
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();

      } else {
        console.log("error try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 3, ml: 1 }}
        onClick={handleBack}
      >
        Back
      </Button>
      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 3, ml: 1 }}
        onClick={checkoutHandler}
      >
        Select Method
      </Button>
    </React.Fragment>
  );
};

export default PaymentForm;

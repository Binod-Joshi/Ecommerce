import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import "./Cart.css";
import { CenteredText, StyledButton } from "../products/ParticularProduct";
import BoltIcon from "@mui/icons-material/Bolt";
import styled from "styled-components";
import { useState } from "react";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { authRemoveProductFromCart, authUpdateQuantityOfProductInCart, getCartProductLengthHandle, getProductOfCart,setBuyedProduct } from "../../store/productRelated/productHandle";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ScrollableParagraph = styled.div`
  overflow-y: auto;
  padding: 10px;
  max-height: 85vh;
  scrollbar-width: none; /* Hide scrollbars for supported browsers */

  /* For Webkit-based browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none; /* Hide scrollbars */
  }
`;

const StyledDivSpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  align-item: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const Cart = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { cartProductList, loading, cartProductLength } = useSelector((state) => state.product);
  const [updatedCartProducts, setUpdatedCartProducts] = useState([]);
  const [noOfPartItem, setNoOfPartItem] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Id = currentUser._id;

  const totalCost = cartProductList?.reduce(
    (sum, products) => sum + products?.product?.cost,
    0
  );
  const totalDiscount = cartProductList.reduce(
    (sum, products) =>
      sum + products?.product?.cost * (products?.product?.discount / 100),
    0
  );
  const totalCostAfterDiscount = totalCost - totalDiscount;
  const totalSaveIncludingDelivery = totalCostAfterDiscount + 40;
  

  const handlePlaceorder = () => {
    console.log("order is placing");
    let Id = 0;
    navigate(`/checkoutsteps/${Id}`)

  };


  // 
  const minusParticularItem = (id) => {

        const updatedCart = (updatedCartProducts?.length === 0 ? cartProductList : updatedCartProducts)?.map((product) => {
          if (product?._id === id && product.quantity > 1) {
            const quantity = product.quantity-1;
            dispatch(authUpdateQuantityOfProductInCart(id,quantity));
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        });
        setUpdatedCartProducts(updatedCart);

      
  };
  useEffect(() => {
    console.log(updatedCartProducts);
    if(updatedCartProducts?.length === 0){
      dispatch(getProductOfCart(Id));
    }
  },[updatedCartProducts])

  const plusParticularItem = (id) => {

    const updatedCart = (updatedCartProducts?.length === 0 ? cartProductList : updatedCartProducts)?.map((product) => {
      if (product?._id === id) {
        const quantity = product.quantity+1;
            dispatch(authUpdateQuantityOfProductInCart(id,quantity));
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setUpdatedCartProducts(updatedCart);
  };


  const handleRemoveFromCart = (id) => {
    
    const updatedCart = (updatedCartProducts?.length === 0 ?cartProductList : updatedCartProducts)?.map((product) => {
      if(product?._id === id){
        dispatch(authRemoveProductFromCart(id));
        const updatednum = cartProductLength -1;
        dispatch(getCartProductLengthHandle(updatednum));
        return null;
      }
      return product;
    }).filter(product => product !== null);
    setUpdatedCartProducts(updatedCart);
    
  };
  console.log(cartProductList); 

  const handleBuyFromCart = (Id) => {
    console.log(Id);
    navigate(`/checkoutsteps/${Id}`)
    // dispatch(setBuyedProduct(id));
    
  }

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <h1>Loading...</h1>
        </div>
      ) : cartProductList?.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#e4e7ed",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "20px 0",
              width: "66vw",
            }}
          >
            <Card sx={{ maxWidth: "65vw", margin: "0 5% 0 13%" }}>
              <ScrollableParagraph>
                 {(updatedCartProducts?.length === 0 ? cartProductList : updatedCartProducts)?.map((cards, index) => (
                  <Card key={index} sx={{ maxWidth: "65vw" }}>
                    <div className="outerCard">
                      <CardMedia
                        component="img"
                        height="200"
                        style={{ maxWidth: "50%" }}
                        image={cards?.product?.image}
                        alt="green iguana"
                      />

                      <CardContent
                        style={{
                          width: `calc(50% - 16px)`,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          gap: "20px",
                        }}
                      >
                        <div className="shortDetail">
                          <Typography gutterBottom variant="h5" component="div">
                            {cards?.product?.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {" "}
                            <span
                              style={{ fontSize: "30px", fontWeight: "bolder" }}
                            >
                              ₹
                              {cards?.product?.cost -
                                cards?.product?.cost *
                                  (cards?.product?.discount / 100)}
                            </span>{" "}
                            <CenteredText>₹{cards?.product?.cost}</CenteredText>{" "}
                            <span
                              style={{ fontSize: "21px", color: "blueviolet" }}
                            >
                              {cards?.product?.discount}% off{" "}
                            </span>
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            gap: "40px",
                          }}
                        >
                          <Button variant="contained"
                          onClick={() => handleBuyFromCart(cards?.product?._id)}
                          >
                            {" "}
                            <BoltIcon style={{ marginRight: "5px" }} />
                            BUY NOW
                          </Button>
                          <StyledButton
                            variant="contained"
                            onClick={() => handleRemoveFromCart(cards?._id)}
                          >
                            <RemoveShoppingCartIcon
                              style={{ marginRight: "5px" }}
                            />
                            Remove
                          </StyledButton>
                        </div>
                      </CardContent>
                    </div>

                    <div className="pieceButton">
                      <button
                        className="plusMinusButton"
                        onClick={() => minusParticularItem(cards?._id)}
                      >
                        -
                      </button>
                      <button style={{ width: "30px" }}>{cards?.quantity}</button>
                      <div
                        className="plusMinusButton"
                        onClick={() => plusParticularItem(cards?._id)}
                      >
                        +
                      </div>
                    </div>
                  </Card>
                ))}
              </ScrollableParagraph>
              <div className="blockForPlaceOrder">
                <Button variant="contained" onClick={handlePlaceorder}>
                  Place Order
                </Button>
              </div>
            </Card>
          </div>

          {/* total price section */}
          <Card style={{ width: "400px", margin: "20px 0", height: "390px" }}>
            <div>
              <p style={{ padding: "0 10px", fontSize: "large" }}>
                PRICE DETAILS
              </p>
              <hr />
            </div>
            <StyledDivSpaceBetween>
              <p>Price (total items)</p>
              <p>₹{totalCost}</p>
            </StyledDivSpaceBetween>
            <StyledDivSpaceBetween>
              <p>Discount</p>
              <p style={{ color: "green" }}>− ₹{totalDiscount}</p>
            </StyledDivSpaceBetween>
            <StyledDivSpaceBetween>
              <p>Delivery Charges</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "3px" }}
              >
                <p>₹40</p>
                <span style={{ color: "green" }}>Free</span>
              </div>
            </StyledDivSpaceBetween>
            <hr style={{ width: "94%" }} />
            <StyledDivSpaceBetween>
              <p style={{ fontSize: "20px" }}>Total Amount</p>
              <p style={{ fontSize: "20px" }}>₹{totalCostAfterDiscount}</p>
            </StyledDivSpaceBetween>
            <hr style={{ width: "94%" }} />
            <div
              style={{
                padding: " 0 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "green",
              }}
            >
              <p>You will save ₹{totalSaveIncludingDelivery} on this order</p>
            </div>
          </Card>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <h1>No items added to Cart.</h1>
        </div>
      )}
    </>
  );
};

export default Cart;

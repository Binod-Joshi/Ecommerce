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
      ) : cartProductList?.length > 0 ? (<>
        <StyledDivForCart
        >
          <StyledDivForCartOnly
          >
            <Card sx={{ maxWidth: "95vw", margin: "0 5% 0 5%" }}>
              <ScrollableParagraph>
                 {(updatedCartProducts?.length === 0 ? cartProductList : updatedCartProducts)?.map((cards, index) => (
                  <Card key={index} sx={{ maxWidth: "94vw" }}>
                    <div className="outerCard">
                      <CardMedia
                        component="img"
                        height="200"
                        style={{ width: "90%" }}
                        image={cards?.product?.image}
                        alt="green iguana"
                      />

                      <CardContent
                        style={{
                          // width: `calc(50% - 16px)`,
                          width:`85%`,
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
                        <StyledDivForButton>
                          <Button variant="contained"
                          onClick={() => handleBuyFromCart(cards?.product?._id)}
                          >
                            {" "}
                            <BoltIcon style={{ marginRight: "5px" }} />
                            BUY NOW
                          </Button>
                          <StyledButton className="buttonStyle"
                            variant="contained"
                            onClick={() => handleRemoveFromCart(cards?._id)}
                          >
                            <RemoveShoppingCartIcon
                              style={{ marginRight: "5px" }}
                            />
                            Remove
                          </StyledButton>
                        </StyledDivForButton>
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
          </StyledDivForCartOnly>

          {/* total price section */}
          <Card style={{ width: "375px", margin: "20px 0", height: "390px" }}>
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
        </StyledDivForCart>
        </>
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
const StyledDivForCart = styled.div`
display: flex;
flex-direction: row;
background-color: #e4e7ed;

@media only screen and (max-width: 768px) {
  display: flex;
  flex-direction: column;
  background-color: #e4e7ed;
  maxwidth:100vw;
}
`;
const StyledDivForCartOnly = styled.div`
display:flex;
flexdirection:column;
gap:10px;
padding:20px 0;
width:66vw;

@media only screen and (max-width:768px){
  display:flex;
  flexdirection:column;
  align-items:center;
  justify-content:center;
  gap:10px;
  // padding:20px 0;
  width:98vw;
}
`;

const StyledDivForButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: "center";
`;
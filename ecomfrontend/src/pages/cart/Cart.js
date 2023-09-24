import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import "./Cart.css";
import { CenteredText } from "../products/ParticularProduct";
import BoltIcon from "@mui/icons-material/Bolt";
import styled from "styled-components";

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
  display:flex;
  flex-direction:row;
  align-item:center;
  justify-content:space-between;
  padding: 0 10px;
`;

const Cart = () => {
  const addedCardsData = [
    {
      title: "halfshirts",
      image:
        "https://mockups-design.com/wp-content/uploads/2021/08/Hanging_T-Shirt_Mockup.jpg",
      description: "Description for Card 1",
    },
    {
      title: "Black Shirt",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdYM1DskwUYKCTULeE4gMKk-XWaCzrA87oA&usqp=CAU",
      description: "Description for Card 2",
    },
    {
      title: "halfshirts",
      image:
        "https://mockups-design.com/wp-content/uploads/2021/08/Hanging_T-Shirt_Mockup.jpg",
      description: "Description for Card 1",
    },
    {
      title: "Black Shirt",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdYM1DskwUYKCTULeE4gMKk-XWaCzrA87oA&usqp=CAU",
      description: "Description for Card 2",
    },
  ];

  const handlePlaceorder = () => {
    console.log("order is placing");
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "10px",
            width: "61vw",
          }}
        >
          <Card sx={{ maxWidth: "60vw" }}>
            <ScrollableParagraph>
              {addedCardsData.map((cards, index) => (
                <Card key={index} sx={{ maxWidth: "60vw" }}>
                  <div className="outerCard">
                    <CardMedia
                      component="img"
                      height="200"
                      style={{ maxWidth: "50%" }}
                      image={cards.image}
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
                          {cards.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {" "}
                          <span
                            style={{ fontSize: "30px", fontWeight: "bolder" }}
                          >
                            ₹595
                          </span>{" "}
                          <CenteredText>₹845</CenteredText>{" "}
                          <span
                            style={{ fontSize: "21px", color: "blueviolet" }}
                          >
                            29% off{" "}
                          </span>
                        </Typography>
                      </div>
                      <div>
                        <Button variant="contained">
                          {" "}
                          <BoltIcon style={{ marginRight: "5px" }} />
                          BUY NOW
                        </Button>
                      </div>
                    </CardContent>
                  </div>

                  <div className="pieceButton">
                    <button className="plusMinusButton">-</button>
                    <button style={{ width: "30px" }}>1</button>
                    <div className="plusMinusButton">+</div>
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
        <Card style={{width:"400px",margin:"10px",height:"390px"}}>
          <div >
            <p style={{padding:"0 10px",fontSize:"large"}}>PRICE DETAILS</p>
            <hr />
          </div>
          <StyledDivSpaceBetween>
            <p>Price (1 item)</p>
            <p>₹42,000</p>
          </StyledDivSpaceBetween>
          <StyledDivSpaceBetween>
            <p>Discount</p>
            <p style={{color:"green"}}>− ₹17,000</p>
          </StyledDivSpaceBetween>
          <StyledDivSpaceBetween>
            <p>Delivery Charges</p>
            <div style={{display:"flex",alignItems:"center",gap:"3px"}}><p>₹40</p>
            <span style={{color:"green"}}>Free</span></div>
          </StyledDivSpaceBetween>
          <hr style={{width:"94%"}}/>
          <StyledDivSpaceBetween>
            <p style={{fontSize:"20px"}}>Total Amount</p>
            <p style={{fontSize:"20px"}}>₹25,000</p>
          </StyledDivSpaceBetween>
          <hr style={{width:"94%"}}/>
          <div style={{padding:" 0 10px",display:"flex",alignItems:"center",justifyContent:"center",color:"green"}}>
            <p>You will save ₹17,000 on this order</p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Cart;

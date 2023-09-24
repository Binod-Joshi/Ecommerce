import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, CardActionArea } from "@mui/material";
import styled from "styled-components";
import BoltIcon from "@mui/icons-material/Bolt";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useNavigate, useParams } from "react-router-dom";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // align-items: center;
  padding: 20px;
  gap: 10px;

  & > div:first-child {
    flex: 0 0 40vw; /* Set the first card to 30vw width */
    max-height:75vh;
  }

  & > div:last-child {
    flex: 1; /* Make the second div take up remaining width */
    padding-left: 20px; /* Add some padding for separation */
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: #ffa500;
    color: white;

    &:hover {
      background-color: #ff8500;
    }
  }
`;

export const CenteredText = styled.span`
  text-decoration: line-through;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 20px !important;
`;

export const ScrollableParagraph = styled.div`
height:90vh;
overflow-y:scroll;
padding:10px;`;

const ParticularProduct = () => {
  const navigate = useNavigate();

  const encodedImage = useParams().encodedImage;
  const decodedImage = decodeURIComponent(encodedImage);

  const handleAddToCart =() => {
    navigate("/openCart")
  }


  return (
    <>
      <StyledDiv>
        <Card sx={{ maxWidth: "35vw" }}>
          <CardActionArea>
            <CardMedia
              style={{ height: "65vh", objectFit: "contain" }}
              image={decodedImage}
              alt="green iguana"
            />
          </CardActionArea>
          <CardContent
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <StyledButton variant="contained" onClick={handleAddToCart}>
              <AddShoppingCartIcon style={{ marginRight: "5px" }} />
              ADD TO CART
            </StyledButton>
            <Button variant="contained">
              {" "}
              <BoltIcon style={{ marginRight: "5px" }} />
              BUY NOW
            </Button>
          </CardContent>
        </Card>

        {/* // second card */}

        <div>
        <ScrollableParagraph>
          <h3>
            Logitech M171 Wireless Optical Mouse (2.4GHz Wireless, Blue Grey)
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <Button variant="contained">
              4.5
              <StarRateIcon
                style={{
                  fontSize: "12px",
                  marginBottom: "2px",
                }}
              />
            </Button>
            <span>
              <p style={{ marginLeft: "10px" }}>
                43,836 Ratings & 5,047 Reviews
              </p>
            </span>
          </div>

          {/* for price */}
          <div>
            <h2 style={{ color: "green" }}>Special Price</h2>
            <p>
              {" "}
              <span style={{ fontSize: "32px", fontWeight: "bolder" }}>
                ₹595
              </span>{" "}
              <CenteredText>₹845</CenteredText>{" "}
              <span style={{ fontSize: "23px", color: "blueviolet" }}>
                29% off
              </span>
            </p>
          </div>

          {/* complement about product */}
          <div>
            <p>
              "Your clothing line is a versatile gem that effortlessly
              complements all types of wardrobe choices. Whether I'm dressing
              casually, preparing for a special event, or selecting professional
              attire, your products consistently deliver in style, comfort, and
              quality. What sets your brand apart is its remarkable ability to
              seamlessly blend with any outfit, enhancing its overall appeal.
              Your commitment to versatility and timeless design makes your
              clothing an ideal complement to every fashion need, and I
              appreciate how your pieces have become an essential part of my
              everyday wardrobe. In a world where clothing preferences can be
              diverse and personal, your brand stands out as a reliable choice.
              <br />
              <br />
              Your dedication to delivering stylish, adaptable pieces ensures
              that they effortlessly fit into my daily fashion choices,
              reflecting my style and personality beautifully. Thank you for
              consistently offering clothing that is not just a product but a
              true complement to my fashion journey. Your brand is synonymous
              with versatility and sophistication in my wardrobe, and I look
              forward to many more stylish moments ahead with your exceptional
              products."
            </p>
            <p>
              "Your clothing line is a versatile gem that effortlessly
              complements all types of wardrobe choices. Whether I'm dressing
              casually, preparing for a special event, or selecting professional
              attire, your products consistently deliver in style, comfort, and
              quality. What sets your brand apart is its remarkable ability to
              seamlessly blend with any outfit, enhancing its overall appeal.
              Your commitment to versatility and timeless design makes your
              clothing an ideal complement to every fashion need, and I
              appreciate how your pieces have become an essential part of my
              everyday wardrobe. In a world where clothing preferences can be
              diverse and personal, your brand stands out as a reliable choice.
              <br />
              <br />
              Your dedication to delivering stylish, adaptable pieces ensures
              that they effortlessly fit into my daily fashion choices,
              reflecting my style and personality beautifully. Thank you for
              consistently offering clothing that is not just a product but a
              true complement to my fashion journey. Your brand is synonymous
              with versatility and sophistication in my wardrobe, and I look
              forward to many more stylish moments ahead with your exceptional
              products."
            </p>
            <p>
              "Your clothing line is a versatile gem that effortlessly
              complements all types of wardrobe choices. Whether I'm dressing
              casually, preparing for a special event, or selecting professional
              attire, your products consistently deliver in style, comfort, and
              quality. What sets your brand apart is its remarkable ability to
              seamlessly blend with any outfit, enhancing its overall appeal.
              Your commitment to versatility and timeless design makes your
              clothing an ideal complement to every fashion need, and I
              appreciate how your pieces have become an essential part of my
              everyday wardrobe. In a world where clothing preferences can be
              diverse and personal, your brand stands out as a reliable choice.
              <br />
              <br />
              Your dedication to delivering stylish, adaptable pieces ensures
              that they effortlessly fit into my daily fashion choices,
              reflecting my style and personality beautifully. Thank you for
              consistently offering clothing that is not just a product but a
              true complement to my fashion journey. Your brand is synonymous
              with versatility and sophistication in my wardrobe, and I look
              forward to many more stylish moments ahead with your exceptional
              products."
            </p>
          </div>
        </ScrollableParagraph>
        </div>
      </StyledDiv>
    </>
  );
};

export default ParticularProduct;

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Alert, Button, CardActionArea, TextField } from "@mui/material";
import styled from "styled-components";
import BoltIcon from "@mui/icons-material/Bolt";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  RemovingProductFromSellerList,
  getCartProductLengthHandle,
  particularProductDetails,
  saveToCart,
  settingAllToInitial,
  updatingQuantityOfProduct,
} from "../../store/productRelated/productHandle";
import { useEffect,useState } from "react";
import AddProducts from "./AddProducts";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  gap: 10px;
  background-color: #e4e7ed;

  & > div:first-child {
    flex: 0 0 40vw;
    max-height: 75vh;
  }

  & > div:last-child {
    flex: 1;
    padding-left: 20px;
  }

  @media only screen and (max-width:768px) {
      display: flex; /* Add semicolon here */
      justify-content: center; /* Add semicolon here */
      align-items: center; /* Add semicolon here */
      gap: 20px;
      flex-direction: column;

      & > div:first-child {
        display:flex;
        align-items:center;
        justify-content:center;
        width:99vw;
        height:80vh;
      }
  }
`;


export const StyledButton = styled(Button)`
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
  height: 90vh;
  overflow-y: scroll;
  padding: 10px;
`;

const ParticularProduct = () => {
  const [updatedQuantity,setUpdatedQuantity] = useState(null);
  const [clickButton, setClickButton] = useState(false);
  const [selectedValue, SetSelectedValue] = useState("");
  const [messageResponse ,setMessageResponse] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { particularProductData, response, cartProductLength } = useSelector(
    (state) => state.product
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Id = currentUser?._id;
  const encodedImage = useParams().encodedImage;
  const productId = useParams().productId;
  const decodedImage = decodeURIComponent(encodedImage);
  useEffect(() => {
    dispatch(particularProductDetails(productId));
  }, [dispatch]);

  const handleAddToCart = () => {
    if (currentUser?.role === null || currentUser?.role === undefined) {
      navigate(`/buyingorcartingwithoutlogin`);
    } else {
      const customer = currentUser?._id;
      const product = particularProductData?._id;
      const quantity = 1;
      const fields = { customer, product, quantity };
      dispatch(saveToCart(fields));
      const updatednum = cartProductLength + 1;
      dispatch(getCartProductLengthHandle(updatednum));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (response !== null) {
        dispatch(settingAllToInitial());
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [response]);

  const handleBuyFromParticularProduct = () => {
    const Id = particularProductData?._id;
    if (currentUser?.role === null || currentUser?.role === undefined) {
      navigate(`/buyingorcartingwithoutlogin`);
    } else {
      navigate(`/checkoutsteps/${Id}`);
    }
  };

  //select button
  const selecteButtonHandler = (value) => {
    SetSelectedValue(value);
    setClickButton(true);
  }

  const passingFunctionForDivRemove =() => {
    setClickButton(false);
  }
 

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (messageResponse !== null) {
        setMessageResponse(null);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [messageResponse]);

  const handleRemoveProduct = () => {
    const id = particularProductData?._id;
    dispatch(RemovingProductFromSellerList(id));
    navigate(-1);
  };
  const CancelHandle = () => {
    setClickButton(false);
  }


  return (
    <>
      {response !== null ? (
        <>
          <Alert
            severity="success"
            color="info"
            style={{
              position: "fixed",
              top: "65px",
              right: "5px",
              width: "30vw",
              zIndex: 1000,
            }}
          >
            {response}
          </Alert>
        </>
      ) : (
        ""
      )}
      <StyledDiv>
        <div >
        <Card sx={{ maxWidth: "98vw" }}>
          <CardActionArea>
            <CardMedia
              style={{ height: "65vh", objectFit: "contain" }}
              image={decodedImage}
              alt="green iguana"
            />
          </CardActionArea>
          {currentUser?.role === "Seller" ? (
            <CardContent
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <StyledButton variant="contained" onClick={(e)=> {selecteButtonHandler("update")}}> 
                <AddShoppingCartIcon style={{ marginRight: "5px" }} />
                update Product
              </StyledButton>
              <Button variant="contained" onClick={(e)=> {selecteButtonHandler("remove")}} style={{marginLeft:'2px'}}>
                {" "}
                <BoltIcon style={{ marginRight: "5px" }} />
                Remove
              </Button>
            </CardContent>
          ) : (
            <CardContent
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <StyledButton variant="contained" onClick={handleAddToCart}>
                <AddShoppingCartIcon style={{ marginRight: "5px" }} />
                ADD TO CART
              </StyledButton>
              <Button style={{marginLeft:'2px'}}
                variant="contained"
                onClick={handleBuyFromParticularProduct}
              >
                {" "}
                <BoltIcon style={{ marginRight: "5px" }} />
                BUY NOW
              </Button>
            </CardContent>
          )}
        </Card>
        </div>

        {/* // second card */}

        <div>
          <ScrollableParagraph>
            <h3>{particularProductData?.name}</h3>
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
                  ₹
                  {particularProductData?.cost -
                    particularProductData?.cost *
                      (particularProductData?.discount / 100)}
                </span>{" "}
                <CenteredText>₹{particularProductData?.cost}</CenteredText>{" "}
                <span style={{ fontSize: "23px", color: "blueviolet" }}>
                  {particularProductData?.discount}% off
                </span>
              </p>
            </div>

            {/* complement about product */}
            <div>
              <p>{particularProductData?.description}</p>
              <p>
                "Your clothing line is a versatile gem that effortlessly
                complements all types of wardrobe choices. Whether I'm dressing
                casually, preparing for a special event, or selecting
                professional attire, your products consistently deliver in
                style, comfort, and quality. What sets your brand apart is its
                remarkable ability to seamlessly blend with any outfit,
                enhancing its overall appeal. Your commitment to versatility and
                timeless design makes your clothing an ideal complement to every
                fashion need, and I appreciate how your pieces have become an
                essential part of my everyday wardrobe. In a world where
                clothing preferences can be diverse and personal, your brand
                stands out as a reliable choice.
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

      
     {clickButton && <StyledContainerr>
      {selectedValue === "remove"?<><StyledContentt>
        <StyledParagraph >Are you sure you want to remove this</StyledParagraph>
        <StyledParagraph>product from your selling list?</StyledParagraph>
      </StyledContentt>
      <StyledButtonContainerr>
        <Button variant="outlined" color="error" style={{width:"50px"}} onClick={handleRemoveProduct}>
          Ok
        </Button>
        <Button variant="contained" color="success" style={{width:"80px"}} onClick={CancelHandle} >
          Cancel
        </Button>
      </StyledButtonContainerr></>:<><StyledDivOfUpdateQuantity>
      <AddProducts value={"updateproduct"} pData={particularProductData} passingFunctionForDivRemove={passingFunctionForDivRemove}/>
      <>
      </>
      </StyledDivOfUpdateQuantity></> }

    </StyledContainerr>}

    </>
  );
};

export default ParticularProduct;


const StyledContainerr = styled.div`
  position: fixed;
  top: 50%; /* Adjust as needed */
  left: 50%; /* Adjust as needed */
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9); /* Adjust background color and opacity */
  padding: 20px;
  z-index: 1000;
`;

const StyledContentt = styled.div`
  /* Add any necessary styles for the content container */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  margin: 0px;
  padding:0px;
`;

export const StyledButtonContainerr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-around;
`;

const StyledParagraph = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap:0px;
  margin:0;
  padding:0;
  font-size:20px;
`

const StyledDivOfUpdateQuantity = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  gap:20px;
  flex-direction:column;
  max-height: 80vh; /* Set a maximum height for the div */
  overflow-y: auto;
  scroll:hidden;
  /* Hide the scrollbar in WebKit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /* Hide the scrollbar in Firefox */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  margin-top:-20px;
  
`
import React, { useEffect, useState } from "react";
import { Box, Container, styled } from "@mui/material";
import Slide from "./Slide";
import Banner from "./Banner";
import { useDispatch, useSelector } from "react-redux";
import { getProductOfCart, getProductOfSeller, getProducts } from "../store/productRelated/productHandle";
import ProductsMenu from "./ProductsMenu";
import { NewtonsCradle } from "@uiball/loaders";
import { Link } from "react-router-dom";

const Home = () => {

  const { currentUser, responseProducts, error } = useSelector(
    (state) => state.user
  );
  const {loading, productData, listOfProductOfSingleSeller, response } = useSelector(
    (state) => state.product
  );

  const [showNetworkError, setShowNetworkError] = useState(false);
  const dispatch = useDispatch();
  const Id = currentUser?._id;

  const adURL =
  "https://rukminim1.flixcart.com/flap/464/708/image/1f03e99f6dc9f7a6.jpg?q=70";

  useEffect(() => {
    dispatch(getProducts());
    if (Id !== undefined) {
      if(currentUser?.role === "Customer"){
      dispatch(getProductOfCart(Id));
      }else if(currentUser.role === "Seller"){
        dispatch(getProductOfSeller(Id));
      }
    }
  }, []);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setShowNetworkError(true);
      }, 40000);

      return () => clearTimeout(timeoutId);
    }
  }, [error]);


  return (
    <div id="top">
      <Container
        sx={{
          display: "none",
          "@media (max-width: 600px)": {
            display: "flex",
            justifyContent: "center",
            marginTop: "2px",
          },
        }}
      >
        <ProductsMenu dropName="Categories" style={{marginLeft:"-2rem"}}/>
        {/* <ProductsMenu dropName="Products" /> */}
      </Container>
      {currentUser?.role !== "Seller" && (
        <BannerBox>
          <Banner />
        </BannerBox>
      )}

      {showNetworkError ? (
        <StyledContainer>
          <h1>Sorry, network error.</h1>
        </StyledContainer>
      ) : error ? (
        <StyledContainer>
          <h1>Please Wait A Second</h1>
          <NewtonsCradle size={70} speed={1.4} color="black" />
        </StyledContainer>
      ) : (
        <>
          {responseProducts ? (
            <>
              <StyledContainer>No products found right now</StyledContainer>
              <StyledContainer>
                Become a seller to add products
                <Link to={"/Sellerregister"}>Join</Link>
              </StyledContainer>
            </>
          ) : (
            <>
              <Component>
                <LeftComponent>
                  <Slide
                    products={
                      currentUser?.role === "Seller"
                        ? listOfProductOfSingleSeller
                        : productData
                    }
                    title="Top Selection"
                  />
                </LeftComponent>

                <RightComponent>
                  <img src={adURL} alt="" style={{ width: 217 }} />
                </RightComponent>
              </Component>

              {(listOfProductOfSingleSeller && listOfProductOfSingleSeller.length === 0 &&
              currentUser?.role === "Seller") ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                 {loading&&<h1>Loading...</h1>}
                 {!loading && <h2>you haven't add any product yet to sell.</h2>}
                </div>
              ) : (
                <>
                  {" "}
                  <Slide
                    products={
                      currentUser?.role === "Seller"
                        ? listOfProductOfSingleSeller
                        : productData
                    }
                    title="Deals of the Day"
                  />
                  <Slide
                    products={
                      currentUser?.role === "Seller"
                        ? listOfProductOfSingleSeller
                        : productData
                    }
                    title="Suggested Items"
                  />
                  <Slide
                    products={
                      currentUser?.role === "Seller"
                        ? listOfProductOfSingleSeller
                        : productData
                    }
                    title="Discounts for You"
                  />
                  <Slide
                    products={
                      currentUser?.role === "Seller"
                        ? listOfProductOfSingleSeller
                        : productData
                    }
                    title="Recommended Items"
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const BannerBox = styled(Box)`
  padding: 20px 10px;
  background: #f2f2f2;
`;

const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)(({ theme }) => ({
  width: "83%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const RightComponent = styled(Box)(({ theme }) => ({
  marginTop: 10,
  background: "#FFFFFF",
  width: "17%",
  marginLeft: 10,
  padding: 5,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

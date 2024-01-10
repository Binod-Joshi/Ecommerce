import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getNoOfOrderOfSeller } from "../../../store/productRelated/productHandle";
import styled from "styled-components";

export default function OnGoingOrders() {
  const theme = useTheme();
  const { currentUser } = useSelector((state) => state.user);
  const { listOfOrderedDetailsOfSeller } = useSelector(
    (state) => state.product
  );
  const [orderStatus, setOrderStatus] = useState("processing");
  const dispatch = useDispatch();
  const id = currentUser?._id;


  useEffect(() => {
    dispatch(getNoOfOrderOfSeller(id, "getordereddetailsofseller"));
  }, []);

  let flattenedList;
  const flattendWork = () => {
    flattenedList = listOfOrderedDetailsOfSeller.flatMap((order) => {
      return order.orderedProducts.map((product) => ({
        buyer: order.buyer,
        createdAt: order.createdAt,
        order_id: order.order_id,
        orderedProduct: {
          product: product.product,
          quantity: product.quantity,
          seller: product.seller,
          _id: product._id,
        },
        paymentInfo: order.paymentInfo,
        shippingData: order.shippingData,
        updatedAt: order.updatedAt,
        __v: order.__v,
        _id: order._id,
      }));
    });
  };
  flattendWork();
  console.log(flattenedList);

  const handleStatusChange = (newStatus) => {
    setOrderStatus(newStatus);

    // statusChange(id);
  };

  // const statusChange = (id) => {

  //   const updatedCart = (updatedCartProducts?.length === 0 ? cartProductList : updatedCartProducts)?.map((product) => {
  //     if (product?._id === id) {
  //       const quantity = product.quantity+1;
  //           dispatch(authUpdateQuantityOfProductInCart(id,quantity));
  //       return { ...product, quantity: product.quantity + 1 };
  //     }
  //     return product;
  //   });
  //   setUpdatedCartProducts(updatedCart);
  // };
  
  return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      {flattenedList &&
        flattenedList?.map((order) => {
          return (
            <MobileStyledCard
              key={order?.orderedProduct?._id}
              sx={{ display: "flex" }}
            >
              <div>
                <CardMedia
                  component="img"
                  sx={{ width: 109, height: 132 }}
                  image={order?.orderedProduct?.product?.image}
                  alt="Live from space album cover"
                />
              </div>
              <Grid container spacing={2}>
                {/* First Grid item with 30% width on small and larger screens */}
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={5}
                  style={{ backgroundColor: "aliceblue" }}
                >
                  <CardContent>
                    <Typography
                      component="div"
                      variant="h7"
                      sx={{ color: "green" }}
                    >
                      Name : {order?.orderedProduct?.product?.name}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <div>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          Quantity : {order?.orderedProduct?.quantity}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          PaymentInfo :₹{order?.paymentInfo}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          Status:
                          <Select
                            value={orderStatus}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            style={{ fontSize: "13px", marginTop: "0",height:"17px" }}
                          >
                            <MenuItem value="processing">Processing</MenuItem>
                            <MenuItem value="shipped">Shipped</MenuItem>
                            <MenuItem value="delivered">Delivered</MenuItem>
                          </Select>
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          Customer : {order?.buyer?.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          Date: {new Date(order?.createdAt).toLocaleString()}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          Cancelled: false
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={7}
                  style={{ backgroundColor: "#7faeff4d" }}
                >
                  <CardContent>
                    <div>
                      <Typography
                        component="div"
                        variant="h7"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Shipping Data
                      </Typography>
                    </div>
                    <StyledDivForAddress1
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          Address : {order?.shippingData?.address}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          City : {order?.shippingData?.city}
                        </Typography>
                      </div>
                      <StyledDiv2>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          State : {order?.shippingData?.state}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          Country : {order?.shippingData?.country}
                        </Typography>
                      </StyledDiv2>
                      <StyledDiv2>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          Pincode : {order?.shippingData?.pinCode}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          PhoneNo :{order?.shippingData?.phoneNo}
                        </Typography>
                      </StyledDiv2>
                    </StyledDivForAddress1>
                  </CardContent>
                </Grid>
              </Grid>
            </MobileStyledCard>
          );
        })}
    </div>
  );
}

const MobileStyledCard = styled(Card)`
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column !important;
    width: 90vw;
    margin: 0;
    padding: 0;

    & > div {
      display: flex;
      flex-direction: column;
    }

    & .MuiGrid-container {
      width: 100% !important;
      margin: 0 !important;
    }

    & .MuiCardMedia-root {
      height: 80px; /* Set your desired height for the image */
      object-fit: cover;
    }
  }
`;

const StyledDivForAddress1 = styled.div`
  @media (max-width: 768px) {
    display: flex !important;
    flex-direction: column !important;
    // align-items:center !important;
    // justify-content:center !important;
  }
`;
const StyledDiv2 = styled.div`
  @media (max-width: 768px) {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
`;

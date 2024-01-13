import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getNoOfOrderOfSeller,
  getUpdateOrderDetails,
} from "../../../store/productRelated/productHandle";
import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export default function OnGoingOrders({ status }) {
  const theme = useTheme();
  const { currentUser } = useSelector((state) => state.user);
  const { loading, listOfOrderedDetailsOfSeller } = useSelector(
    (state) => state.product
  );
  const [updatedOrderDetails, setUpdatedOrderDetails] = useState([]);
  const dispatch = useDispatch();
  const id = currentUser?._id;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(status);
    if (currentUser?.role === "Seller") {
      dispatch(getNoOfOrderOfSeller(id, "getordereddetailsofseller", status));
    } else {
      dispatch(getNoOfOrderOfSeller(id, "getordereddetailsofcustomer", status));
    }
  }, []);

  let flattenedList;
  const flattendWork = () => {
    flattenedList =
      listOfOrderedDetailsOfSeller?.length > 0 &&
      listOfOrderedDetailsOfSeller?.flatMap((order) => {
        return order?.orderedProducts?.map((product) => ({
          buyer: order?.buyer,
          createdAt: order?.createdAt,
          order_id: order?.order_id,
          orderedProduct: {
            product: product?.product,
            quantity: product?.quantity,
            seller: product?.seller,
            cancelled: product?.cancelled,
            status: product?.status,
            _id: product?._id,
          },
          paymentInfo: order?.paymentInfo,
          shippingData: order?.shippingData,
          group: order?.group,
          updatedAt: order?.updatedAt,
          __v: order?.__v,
          _id: order?._id,
        }));
      });
  };
  flattendWork();
  console.log(listOfOrderedDetailsOfSeller);
  console.log(updatedOrderDetails?.length);

  const handleStatusChange = (newStatus, orderId, ProductId) => {
    statusChange(newStatus, orderId, ProductId);
    console.log(orderId, ProductId);
  };

  const statusChange = (newStatus, orderId, productId) => {
    console.log(flattenedList);
    let flattenedList1 = (
      updatedOrderDetails?.length === 0 ? flattenedList : updatedOrderDetails
    )
      ?.map((order) => {
        if (
          order?.order_id === orderId &&
          order?.orderedProduct?.product?._id === productId
        ) {
          dispatch(
            getUpdateOrderDetails(newStatus, orderId, productId, "updatestatus")
          );
          console.log(orderId, productId);
          return null;
        }
        return order;
      })
      .filter((order) => order !== null);
    console.log(flattenedList1);
    setUpdatedOrderDetails(flattenedList1);
  };

  const numberOfSkeletons = 5;
  return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      {!loading ? (
        flattenedList &&
        (updatedOrderDetails?.length === 0
          ? flattenedList
          : updatedOrderDetails
        )?.map((order) => {
          let encodedImage = encodeURIComponent(order?.orderedProduct?.product?.image);
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
                  onClick={(e) => navigate(`/particularproduct/${encodedImage}/${order?.orderedProduct?.product?._id}`)}
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
                          {currentUser?.role === "Customer" ? (
                            ` ${order?.orderedProduct?.status}`
                          ) : (
                            <Select
                              value={order?.orderedProduct?.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  e.target.value,
                                  order?.order_id,
                                  order?.orderedProduct?.product._id
                                )
                              }
                              style={{
                                fontSize: "13px",
                                marginTop: "0",
                                height: "17px",
                              }}
                            >
                              <MenuItem value="processing">Processing</MenuItem>
                              <MenuItem value="shipped">Shipped</MenuItem>
                              <MenuItem value="delivered">Delivered</MenuItem>
                            </Select>
                          )}
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
                          Group:{" "}
                          {order?.group ? `true(${order?.order_id})` : "false"}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          product payment
                          {order?.orderedProduct?.quantity > 1
                            ? `(${order?.orderedProduct?.quantity}items)`
                            : "(1item)"}{" "}
                          : ₹
                          {(
                            (order?.orderedProduct?.product?.cost -
                              (order?.orderedProduct?.product?.discount *
                                order?.orderedProduct?.product?.cost) /
                                100) *
                            order?.orderedProduct?.quantity
                          ).toFixed(2)}
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
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          Date: {new Date(order?.createdAt).toLocaleString()}
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
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "13px" }}
                        >
                          Cancelled:{" "}
                          {currentUser?.role === "Customer" &&
                          order?.orderedProduct?.status === "delivered" ? (
                            order?.orderedProduct?.cancelled ? (
                              "Cancelled"
                            ) : (
                              "Not Cancelled"
                            )
                          ) : (
                            <Select
                              value={
                                order?.orderedProduct?.cancelled
                                  ? "true"
                                  : "false"
                              }
                              onChange={(e) =>
                                handleStatusChange(
                                  e.target.value,
                                  order?.order_id,
                                  order?.orderedProduct?.product._id
                                )
                              }
                              style={{
                                fontSize: "13px",
                                marginTop: "0",
                                height: "17px",
                              }}
                            >
                              <MenuItem value="false">Not Cancelled</MenuItem>
                              <MenuItem value="true">Yes Cancelled</MenuItem>
                            </Select>
                          )}
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
        })
      ) : (
        <Stack
          spacing={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[...Array(numberOfSkeletons)].map((_, index) => (
            <Skeleton key={index} variant="rounded" width="90vw" height={120} />
          ))}
        </Stack>
      )}
    </div>
  );
}

export const MobileStyledCard = styled(Card)`
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column !important;
    width: 87vw;
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

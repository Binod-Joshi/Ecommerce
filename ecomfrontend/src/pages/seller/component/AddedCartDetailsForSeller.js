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
  getNoOfAddedProductToCartofSeller,
} from "../../../store/productRelated/productHandle";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { MobileStyledCard } from './OnGoingOrders';

export default function OnGoingOrders({ status }) {
  const theme = useTheme();
  const { currentUser } = useSelector((state) => state.user);
  const { loading, listOfAddedProductToCartForSeller } = useSelector(
    (state) => state.product
  );
  const [updatedOrderDetails, setUpdatedOrderDetails] = useState([]);
  const dispatch = useDispatch();
  const id = currentUser?._id;
  useEffect(() => {
    if (listOfAddedProductToCartForSeller?.length < 1) {
      console.log(listOfAddedProductToCartForSeller?.length);
      dispatch(getNoOfAddedProductToCartofSeller(id));
    }
  }, []);

  const numberOfSkeletons = 5;
  console.log(loading);
  return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      {!loading ? (
        listOfAddedProductToCartForSeller &&
        listOfAddedProductToCartForSeller?.map((cart) => {
          return (
            <MobileStyledCard key={cart?._id} sx={{ display: "flex" }}>
              <div>
                <CardMedia
                  component="img"
                  sx={{ width: 109, height: 132 }}
                  image={cart?.productImage}
                  alt="Live from space album cover"
                />
              </div>
              <div>
                <CardContent>
                  <Typography
                    component="div"
                    variant="h7"
                    sx={{ color: "green" }}
                  >
                    Name : {cart?.productName}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      // alignItems: "center",
                      // justifyContent: "space-around",
                      flexDirection: "row",
                      gap:"30px"
                      // flex:"end"
                    }}
                  >
                    <div>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        style={{ fontSize: "13px" }}
                      >
                        Quantity : {cart?.productQuantity}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        style={{ fontSize: "13px" }}
                      >
                        Price per items :₹
                        {(
                          cart?.productCost -
                          (cart?.productDiscount * cart?.productCost) / 100
                        ).toFixed(2)}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        style={{ fontSize: "13px" }}
                      >
                        Customer : {cart?.customerName}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        style={{ fontSize: "13px" }}
                      >
                        Category: {cart?.productCategory}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </div>
            </MobileStyledCard>
          );
        })
      ) : (
        <Stack spacing={1} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          {[...Array(numberOfSkeletons)].map((_, index) => (
            <Skeleton key={index} variant="rounded" width="90vw" height={120} />
          ))}
        </Stack>
      )}
    </div>
  );
}


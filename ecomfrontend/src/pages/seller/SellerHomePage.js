import { Grid } from '@mui/material';
import SalesCard from './component/SalesCard';
import SalesChart from './component/SalesChart';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNoOfAddedProductToCartofSeller, getNoOfOrderOfSeller } from '../../store/productRelated/productHandle';

const SellerHomePage = () => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.user);
  const {noOfAddedProductToCartForSeller,noOfOngoingOrders,
    noOfCancelledOrders,noOfLastWeekCompletedOrders} = useSelector((state) => state?.product);
  const id = currentUser?._id;
  useEffect(() => {
    const address = "getnooforderofseller";
    const status = ["delivered","ongoing","cancelled","lastweek"];
    for(const s of status){
      dispatch(getNoOfOrderOfSeller(id,"getNoOfOrderOfSeller",s));
    }
    dispatch(getNoOfAddedProductToCartofSeller(id));
  },[]);
  

  return (
    <Grid container spacing={3} sx={{ padding: "9px" }}>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Weekly Sales" total={noOfLastWeekCompletedOrders} color='primary' icon={'ant-design:carry-out-filled'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Added to Cart" total={noOfAddedProductToCartForSeller} color="success" icon={'ant-design:shopping-cart-outlined'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Ongoing Orders" total={noOfOngoingOrders} color="warning" icon={'material-symbols:data-exploration'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Cancelled Orders" total={noOfCancelledOrders} color="error" icon={'material-symbols:free-cancellation-rounded'} />
      </Grid>

      <Grid item xs={12} lg={6}>
        <SalesChart type="line" />
      </Grid>

      <Grid item xs={12} lg={6}>
        <SalesChart type="bar" />
      </Grid>
    </Grid>
  );
};

export default SellerHomePage;
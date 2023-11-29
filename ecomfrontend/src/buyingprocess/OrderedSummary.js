import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductOfCart, particularProductDetails } from '../store/productRelated/productHandle';
// import { fetchProductDetailsFromCart } from '?.?./?.?./?.?./redux/userSlice';

const OrderSummary = ({ handleNext, handleBack }) => {

    const dispatch = useDispatch();

    const params = useParams();
    const productID = params?.Id;
    console.log(productID)

    const { currentUser } = useSelector((state) => state?.user);
    const {gettedShippingData,particularProductData,cartProductList} = useSelector((state) => state?.product);

    React?.useEffect(() => {
        if (productID !== 0 && productID !== '0' && productID) {
            console.log(productID)
            dispatch(particularProductDetails(productID));
        }else{
            dispatch(getProductOfCart(currentUser?._id));
        }
    }, [productID, dispatch]);
    console.log(particularProductData);
    console.log(gettedShippingData);
    console.log(cartProductList)

    let cartDetails = cartProductList;
    let shippingData = gettedShippingData;
    console.log(shippingData);
    const totalQuantity = cartDetails?.reduce((total, item) => total + item?.quantity, 0);
    const totalOGPrice = cartDetails?.reduce((total, item) => total + (item?.quantity * item?.product?.cost), 0);
    const totalDiscounPrice = cartDetails?.reduce((total, item) => total + (item?.quantity * ((item?.product?.discount/100)*item?.product?.cost)), 0);

    return (
        <React.Fragment>
            <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
                Order summary
            </Typography>
            {(productID !== 0 && productID !== '0' && productID) ?
                <React.Fragment>
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={particularProductData?.name} secondary={`Quantity: 1`} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                {`₹${particularProductData?.cost && particularProductData?.cost * 1}`} {/* if many quantity dont multify by 1 */}
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Discount" />
                            <Typography variant="subtitle1" sx={{ color: "green" }}>
                                ₹{particularProductData?.cost && particularProductData?.cost * (particularProductData?.discount/100)}
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Shipping" />
                            <Typography variant="body2">
                                Free 40
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Total Amount" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                ₹{particularProductData?.cost && particularProductData?.cost - (particularProductData?.cost * (particularProductData?.discount/100))}
                            </Typography>
                        </ListItem>
                    </List>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
                                Shipping
                            </Typography>
                            <Typography gutterBottom>{currentUser?.name}</Typography>
                            <Typography gutterBottom>{shippingData?.address},{shippingData?.city},{shippingData?.state},{shippingData?.country},{shippingData?.phoneNo}</Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>
                :
                <React.Fragment>
                    <List disablePadding>
                        {cartDetails?.map((product, index) => (
                            <ListItem key={index} sx={{ py: 1, px: 0 }}>
                                <ListItemText primary={product?.product?.name} secondary={`Quantity: ${product?.quantity}`} />
                                <Typography variant="body2">{`₹${product?.quantity * product?.product?.cost}`}</Typography>
                            </ListItem>
                        ))}
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={`Price (${totalQuantity} items)`} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                ₹{totalOGPrice}
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Discount" />
                            <Typography variant="subtitle1" sx={{ color: "green" }}>
                                ₹{totalDiscounPrice}
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Shipping" />
                            <Typography variant="body2">
                                Free
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Total Amount" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                ₹{totalOGPrice-totalDiscounPrice}
                            </Typography>
                        </ListItem>
                    </List>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 700 }}>
                                Shipping
                            </Typography>
                            <Typography gutterBottom>{currentUser?.name}</Typography>
                            <Typography gutterBottom>{shippingData?.address},{shippingData?.city},{shippingData?.state},{shippingData?.country},{shippingData?.phoneNo}</Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>
            }
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Next
                </Button>
            </Box>
        </React.Fragment>
    );
}

export default OrderSummary
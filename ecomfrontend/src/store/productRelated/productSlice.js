import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  loading: false,
  response: null,
  error: null,
  productData: [],
  particularProductData: null,
  categoriesList: [],
  cartProductList: [],
  cartProductLength:null,
  gettedShippingData:null,
  listOfProductOfSingleSeller:[],
  orderCreationDetails:null,
  key:null,
  QuantityOfSingleProductToBuy:null,
  noOfOrderOfProductOfSeller:0,
  noOfAddedProductToCartForSeller:0,
  listOfAddedProductToCartForSeller:[],
  listOfOrderedDetailsOfSeller:[],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.loading = true;
      state.status = "loading";
    },
    authInitial: (state) => {
      state.loading = false;
      state.status = "idle";
      state.response = null;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.status = "success";
      state.response = action.payload;
    },
    authFailed: (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.response = action.payload;
    },
    authError: (state, action) => {
      state.loading = false;
      state.status = "Error";
      state.response = action.payload;
    },
    authGetProductData: (state, action) => {
      state.loading = false;
      state.status = "success";
      state.productData = action.payload;
    },
    authGetParticularProductDetails: (state, action) => {
      state.loading = false;
      state.status = "success";
      state.particularProductData = action.payload;
    },
    authGetSearchedProduct: (state, action) => {
      state.loading = false;
      state.status = "success";
      state.productData = action.payload;
    },
    authSuccessToSaveCategories: (state, action) => {
      state.loading = false;
      state.status = "success";
      state.categoriesList = action.payload;
    },
    authCartProductList: (state, action) => {
      state.status = "success";
      state.cartProductList = action.payload;
      state.loading = false;
      state.cartProductLength = action?.payload?.length;
    },
    authCartProductLengthHandler: (state, action) => {
      state.cartProductLength = action?.payload;
    },
    authgettingShippingData:(state,action) => {
      state.gettedShippingData = action?.payload;
      state.loading = false;
      state.status = "idle";
    },
    authGettedProductOfSingleSeller: (state, action) => {
      state.listOfProductOfSingleSeller = action?.payload;
      state.status = "idle";
      state.loading = false;
    },
    authOrderCreation: (state, action) => {
      state.orderCreationDetails = action?.payload;
      state.loading = false;
      // state.status = "success"
    },
    authGetKey: (state, action) => {
      state.key = action?.payload;
      state.loading = false;
    },
    authSetQuantityOfSingleProductToBuy: (state, action) => {
      state.QuantityOfSingleProductToBuy = action?.payload;
    },
    authGetNoOfOrderOfSeller: (state, action) => {
      state.noOfOrderOfProductOfSeller = action?.payload;
    },
    authGetNoOfAddedProductToCartForSeller: (state, action) => {
      state.noOfAddedProductToCartForSeller = action?.payload?.length;
      state.listOfAddedProductToCartForSeller = action?.payload;
    },
    authGetOrderedDetailsOfSeller: (state, action) => {
      state.listOfOrderedDetailsOfSeller = action?.payload;
      state.loading = false;
    }
  },
});

export const {
  authRequest,
  authInitial,
  authSuccess,
  authFailed,
  authError,
  authGetProductData,
  authGetParticularProductDetails,
  authGetSearchedProduct,
  authSuccessToSaveCategories,
  authCartProductList,
  authCartProductLengthHandler,
  authgettingShippingData,
  authGettedProductOfSingleSeller,
  authOrderCreation,
  authGetKey,
  authSetQuantityOfSingleProductToBuy,
  authGetNoOfOrderOfSeller,
  authGetNoOfAddedProductToCartForSeller,
  authGetOrderedDetailsOfSeller,

} = productSlice.actions;

export const productReducer = productSlice.reducer;

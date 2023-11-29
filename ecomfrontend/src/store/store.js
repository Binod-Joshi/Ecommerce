import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./userRelated/userSlice";
import { productReducer } from "./productRelated/productSlice";

const store = configureStore({
    reducer:{
        user: userReducer,
        product: productReducer,
    }
})

export default store;
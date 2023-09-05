import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./userRelated/userSlice";

const store = configureStore({
    reducer:{
        user: userReducer,
    }
})

export default store;
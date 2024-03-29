import {
  authRequest,
  authSuccess,
  authError,
  authFailed,
  authInitial,
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
  authOngoingNoOfOrders,
  authCancelledNoOfOrders,
  authLastWeekNoOfCompletedOrders,
} from "./productSlice";

export const settingAllToInitial = () => async (dispatch) => {
  dispatch(authInitial());
};

export const addProducts = (fields) => async (dispatch) => {
  const { name, cost, discount, category, image, description, quantity, id } =
    fields;
  dispatch(authRequest());
  try {
    let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/auth/sellerp/addproduct`, {
      method: "post",
      body: JSON.stringify({
        name,
        cost,
        discount,
        category,
        image,
        description,
        quantity,
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result._id) {
      dispatch(authSuccess("added successfully"));
    } else {
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(authError("Internal Server Error."));
  }
};

export const getProducts = () => async (dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/auth/sellerp/getProducts`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      dispatch(authGetProductData(result));
    } else {
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(
      authError(
        "An error occurred while adding product. Please try again later."
      )
    );
  }
};

export const particularProductDetails = (productId) => async (dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/auth/sellerp/getparticularproduct`,
      {
        method: "post",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    if (result) {
      dispatch(authGetParticularProductDetails(result));
    } else {
      dispatch(authFailed(result?.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(
      authError(
        "An error occurred while adding product. Please try again later."
      )
    );
  }
};

// to find from categories
export const getSearchedProducts = (category) => async (dispatch) => {
  let key = category;
  dispatch(authRequest());
  try {
    let result = await fetch(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/auth/sellerp/getsearchedrproduct`,
      {
        method: "post",
        body: JSON.stringify({ key }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    if (result?.length) {
      dispatch(authGetSearchedProduct(result));
    } else {
      dispatch(authFailed(result?.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(authError("Internal Server Error."));
  }
};

// to save categories
export const setCategory = (categories) => async (dispatch) => {
  dispatch(authRequest());
  try {
    dispatch(authSuccessToSaveCategories(categories));
  } catch (error) {
    console.log(error);
    dispatch(authError("Failed to save category."));
  }
};

// to get products which is being searched
export const getSearchesProduct = (key) => async (dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/auth/sellerp/getSearchesproduct`,
      {
        method: "post",
        body: JSON.stringify({ key }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    if (result?.length) {
      dispatch(authGetSearchedProduct(result));
    } else {
      dispatch(authFailed(result?.message));
    }
  } catch (error) {
    dispatch(authError("Internal Server Error."));
  }
};

// save to cart
export const saveToCart = (fields) => async (dispatch) => {
  try {
    let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/auth/sellerp/savetocart`, {
      method: "POST",
      body: JSON.stringify({ fields }), // Send the fields directly without JSON.stringify()
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    
    if (result?.message === "Successfully added to the cart.") {
      dispatch(authSuccess(result?.message));
    }else{
      authFailed("failed try again after some time");
    }
  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
  }
};

// for getting the all product of cart
export const getProductOfCart = (id, remo) => async (dispatch) => {
  if (remo !== "remove") {
    dispatch(authRequest());
  }

  try {
    let result = await fetch(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/auth/sellerp/getcartproducts/${id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    if (result) {
      dispatch(authCartProductList(result));
    } else {
      dispatch(authFailed(result?.message));
    }
  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
  }
};

// updating the quantity of the product in the cart
export const authUpdateQuantityOfProductInCart =
  (id, quantity) => async (dispatch) => {
    try {
      let result = await fetch(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/auth/sellerp/updatingquantityofproductincart`,
        {
          method: "post",
          body: JSON.stringify({ id, quantity }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      result = await result.json();

      if (result.message === "quantity updated successfully.") {
        
      }
    } catch (error) {
      console.error("Network Error:", error);
      dispatch(authError("Network Error."));
    }
  };

// for removing items/product from the cart
export const authRemoveProductFromCart = (id) => async (dispatch) => {
  console.log(id);
  try {
    let result = await fetch(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/auth/sellerp/removeproductfromCart/${id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    
    if (result?.message === "product is successfully removed.") {
      
    }
  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
  }
};

export const getCartProductLengthHandle =
  (updatedLength) => async (dispatch) => {
    console.log(updatedLength);
    try {
      console.log(updatedLength);
      dispatch(authCartProductLengthHandler(updatedLength));
    } catch (error) {
      console.error("Network Error:", error);
      dispatch(authError("Network Error."));
    }
  };

// getting ordered product
export const setBuyedProduct = (id) => async (dispatch) => {
  console.log(id);
  try {
    let result = await fetch(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/auth/sellerp/settingOrderedProduct`,
      {
        method: "post",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    
  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
  }
};

// adding/updating shipping data
export const addUpdateShippingData = (fields) => async (dispatch) => {
  console.log(fields);
  try {
    let result = await fetch(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/auth/cshipping/addupdateshippingdata`,
      {
        method: "post",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    
  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
  }
};

//getting shipping detail
export const getShippingDataIfAvailable = (id) => async (dispatch) => {
  console.log(id);
  dispatch(authRequest());
  try {
    let result = await fetch(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/auth/cshipping/gettingshippingdata/${id}`,
      {
        method: "get",
      }
    );
    result = await result.json();
    
    if (result?._id) {
      dispatch(authgettingShippingData(result));
    }else{
      console.log("no address");
    }
  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
  }
};

// getting the product of seller
export const getProductOfSeller = (id) => async (dispatch) => {
  console.log(id);
  dispatch(authRequest());
  try {
    let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/auth/seller/getproduct/${id}`,
    {method:"get",});
    result = await result.json();
    
    if(result?.length){
      dispatch(authGettedProductOfSingleSeller(result));
    }
  } catch (error) {
    console.error("Network Eroor:", error);
    dispatch(authError("Network Error."));
  }
};

// for updating quantity of the product 
export const updatingProduct = (fields) => async (dispatch) => {
  console.log(fields);
  dispatch(authRequest());
  try {
    let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/auth/seller/updatingproduct`, {
      method: "put",
      body: JSON.stringify({fields}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    
    if (result._id) {
      
      dispatch(authGetParticularProductDetails(result));
    }else{
      dispatch(authFailed("Failed to update.try again after a sometime."))
    }
  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
  }
};


// removing product from seller list
export const RemovingProductFromSellerList = (id) => async(dispatch) => {
  console.log(id);
  dispatch(authRequest());
  try {
    let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/auth/seller/removingproduct`,{
      method:"post",
      body : JSON.stringify({id}),
      headers:{
        "Content-Type":"application/json"
      },
    });
    result = await result.json();
    
    if(result){
      
    }

  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
  }
}

// to setQuantityOfSingleProductToBuy
export const setQuantityOfSingleProductToBuy = (quantity) => async(dispatch) => {
  try {
    console.log(quantity);
    dispatch(authSetQuantityOfSingleProductToBuy(quantity))
  } catch (error) {
    console.log(error+ " failed try again");
  }
}



// for getting key
// getKey
export const getKey = async (dispatch) => {
  try {
    console.log("hello key");
    let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/auth/cshipping/getkey`, {
      method: "get",
    });
    result = await result.json();
    
    if (result?.key) {
      dispatch(authGetKey(result?.key));
      return result?.key;
    } else {
      dispatch(authFailed("Failed to get key"));
      throw new Error("Failed to get key");
    }
  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
    throw error;
  }
};

// getCheckoutHandler
export const getCheckoutHandler = async (dispatch, amount) => {
  try {
    console.log(amount);
    let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/auth/cshipping/checkout`, {
      method: "post",
      body: JSON.stringify({ amount }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    
    if (result) {
      dispatch(authOrderCreation(result));
      return result;
    }
  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
    throw error;
  }
};

// now for seller regading orders

//getNoOfOrderOfSellerofParticularSeller
export const getNoOfOrderOfSeller = (id,address,status) => async(dispatch) => {
  if(address === "getordereddetailsofseller" || address === "getordereddetailsofcustomer"){
    dispatch(authRequest());
    console.log(address);
  }
  try {
    let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/auth/sellerorder/${address}/${id}/${status}`,{
      method:"get",
    });
    result = await result.json();

    if(address === "getordereddetailsofseller"  || address === "getordereddetailsofcustomer"){
      dispatch(authGetOrderedDetailsOfSeller(result));

    }else if(result>-1){
      if(status === "delivered"){
        dispatch(authGetNoOfOrderOfSeller(result));

      }else if(status === "ongoing"){
        dispatch(authOngoingNoOfOrders(result));

      }else if(status === "cancelled"){
        dispatch(authCancelledNoOfOrders(result));
        
      }else if(status === "lastweek"){
        dispatch(authLastWeekNoOfCompletedOrders(result));

      }
      
    }
  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
  }
}


// getting the no of addedproductforseller
export const getNoOfAddedProductToCartofSeller = (id) => async(dispatch) => {
  dispatch(authRequest());
  try {
    let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/auth/sellerorder/numberofproductaddedtocartforseller/${id}`,{
      method:"get",
    });
    result = await result.json();
    if(result?.length>0){
      dispatch(authGetNoOfAddedProductToCartForSeller(result))
    }
  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
  }
}

//getUpdateOrderDetails for updation
export const getUpdateOrderDetails = (status,orderedid,productid,address) => async(dispatch) => {
  try {
    let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/auth/sellerorder/${address}`,{
      method:"put",
      body: JSON.stringify({status,orderedid,productid}),
      headers:{
        "Content-Type" : "application/json",
      },
    });
    result = await result.json();
    console.log(result);
  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
  }
}
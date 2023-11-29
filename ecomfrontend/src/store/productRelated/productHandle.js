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
} from "./productSlice";

export const settingAllToInitial = () => async (dispatch) => {
  dispatch(authInitial());
};

export const addProducts = (fields) => async (dispatch) => {
  const { name, cost, discount, category, image, description, quantity, id } =
    fields;
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/auth/sellerp/addproduct`, {
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
    let result = await fetch(`http://localhost:5000/auth/sellerp/getProducts`, {
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
      `http://localhost:5000/auth/sellerp/getparticularproduct`,
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
      `http://localhost:5000/auth/sellerp/getsearchedrproduct`,
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
      `http://localhost:5000/auth/sellerp/getSearchesproduct`,
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
    let result = await fetch("http://localhost:5000/auth/sellerp/savetocart", {
      method: "POST",
      body: JSON.stringify({ fields }), // Send the fields directly without JSON.stringify()
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result?.message === "Successfully added to the cart.") {
      dispatch(authSuccess(result?.message));
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
      `http://localhost:5000/auth/sellerp/getcartproducts/${id}`,
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
        `http://localhost:5000/auth/sellerp/updatingquantityofproductincart`,
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
        console.log(result);
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
      `http://localhost:5000/auth/sellerp/removeproductfromCart/${id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log(result);
    if (result?.message === "product is successfully removed.") {
      console.log(result);
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
      `http://localhost:5000/auth/sellerp/settingOrderedProduct`,
      {
        method: "post",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log(result);
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
      `http://localhost:5000/auth/cshipping/addupdateshippingdata`,
      {
        method: "post",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log(result);
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
      `http://localhost:5000/auth/cshipping/gettingshippingdata/${id}`,
      {
        method: "get",
      }
    );
    result = await result.json();
    console.log(result);
    if (result?._id) {
      dispatch(authgettingShippingData(result));
    }
  } catch (error) {
    console.error("Network Error:", error);
    dispatch(authError("Network Error."));
  }
};

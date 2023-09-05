import { authRequest, authSuccess, authFailed, authError } from "./userSlice";

export const loginUser = (fields) => async (dispatch) => {
    
  const { name, email } = fields;
  console.log(email, name);
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/auth/login`, {
      method: "post",
      body: JSON.stringify({ email, name }), // Fixed the payload
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result) {
      dispatch(authFailed(/* provide an error message or data */));
    } else {
      dispatch(authSuccess(result));
    }
  } catch (error) {
    console.log(error);
    dispatch(authError(error));
  }
};

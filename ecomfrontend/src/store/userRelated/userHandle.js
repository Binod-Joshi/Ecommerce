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

export const RegisterUser = (fields) => async(dispatch) => {
  const {name, email, password} = fields;
  console.log(name,email,password);
  dispatch(authRequest());
  try {
    let result = await fetch(`http://localhost:5000/auth/register`,{
      method: "post",
      body:JSON.stringify({email,name,password}),
      headers:{
        "Content-Type":"application/json"
      }
    });
    result = await result.json();
    if(result.email){
      dispatch(authSuccess(result));
    }else{
      dispatch(authFailed(result));
    }
  } catch (error) {
    dispatch(authError(error));
  }
}

import { authRequest, authSuccess, authFailed, authError, authLogout } from "./userSlice";

export const loginUser = (fields) => async (dispatch) => {
    
  const { email,password,role } = fields;
  console.log(email, password);
  dispatch(authRequest());
  try {
    let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/auth/login${role}`, {
      method: "post",
      body: JSON.stringify({ email, password,role }), // Fixed the payload
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if(result.email){
      dispatch(authSuccess(result));
    }else{
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(authError(error.message));
  }
};


export const RegisterUser = (fields) => async(dispatch) => {
  const {name, email, password,role} = fields;
  console.log(name,email,password,role);
  dispatch(authRequest());
  try {
    let result = await fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/auth/register${role}`,{
      method: "post",
      body:JSON.stringify({email,name,password,role}),
      headers:{
        "Content-Type":"application/json"
      }
    });
    result = await result.json();
    if(result.email){
      dispatch(authSuccess(result));
    }else{
      dispatch(authFailed(result.message));
    }
  } catch (error) {
    dispatch(authError(error.message));
  }
}

export const LogoutUser = () => async(dispatch) => {
  try {
    dispatch(authLogout());
  } catch (error) {
    console.log(error);
  }
}


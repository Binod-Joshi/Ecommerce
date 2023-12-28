import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { RegisterUser } from "../../store/userRelated/userHandle";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { authInitial } from "../../store/productRelated/productSlice";
import './Login.css'

const defaultTheme = createTheme();

// Profile Pic lai ta banaun xa

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Register = ({ role }) => {
  const { status, response, error, loading } = useSelector(
    (state) => state.user
  );
  const [checkField, setCheckField] = useState("");
  const [message, setMessage] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatedrole = role.charAt(0).toLowerCase() + role.slice(1);

  React.useEffect(() => {
    console.log(status);
    if (status === "success") {
      dispatch(authInitial());
      navigate(`/`);
    } else if (status === "failed") {
      setMessage(true);
      setCheckField(response);
      setTimeout(() => {
        setMessage(false);
        setCheckField("");
        dispatch(authInitial());
      }, 5000);
    } else if (status === "error") {
      console.log(error,status);
      setMessage(true);
      setCheckField(error+": Network problem!");
      setTimeout(() => {
        setMessage(false);
        setCheckField(""); // also done by without need of checkfield
        dispatch(authInitial());
      }, 5000);
    }
  }, [status]);

  const handleSubmit = (event) => {
    // i have to add profile here.
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    });
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");

    // in this i want to checkthis if email consist of @ or not we can able to do it by email.includes(`@`)but it only check @
    if (isValidEmail(email)&& email) {
      console.log(loading);
      const fields = { name, password, email, role };
      dispatch(RegisterUser(fields));

    }else if(!name || !password){
      setMessage(true);
      setCheckField("All fields are required.")
      setTimeout(() => {
        setMessage(false)
        setCheckField("");
      },3000);
    } else {
      console.log(name);
      setLoginClicked(true);
      setTimeout(() => {
        setLoginClicked(false);
      }, 3000);

    }
  };

  const isValidEmail = (email) => {
    const input = document.createElement("input");
    input.type = "email";
    input.value = email;
    return input.checkValidity();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up {role}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={loginClicked}
              helperText={loginClicked && "Please enter a valid email address"}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={toggle ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setToggle(!toggle)}>
                      {toggle ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {message && (
              <p
                className="errorlogin courseDetail"
                style={{ color: "red", marginTop: "5px" }}
              >
                {checkField}
              </p>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            {loading ?<CircularProgress size={24} color="inherit" />: "Sign Up"}
              {/* Sign Up */}
            </Button>
            <Grid container>
              <Grid item xs style={{ textAlign: "center" }}>
                <Link href={`/login${updatedrole}`} variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;

// <div className="registerpicManagement">
// <label htmlFor="fileInput">
// <BiUserCircle className="settingsPPIcon" />
// </label>
// <input
//       id="fileInput"
//       type="file"
//       style={{ display: "none" }}
//       className="settingsPPInput" accept="image/*"
//       onChange={imageUpload}
//     />
// {profileDP?<img src={profileDP} alt="" /> :''}
//  </div>

// const imageUpload = async(e) => {
//   const file = e.target.files[0];
//   const base64 = await convertToBase64(file);
//   setProfileDP(base64)

// }
// const convertToBase64 = async(file) => {
//   const fileReader = new FileReader();
//   fileReader.readAsDataURL(file);

//   return new Promise((resolve,reject) => {
//       fileReader.onload = () => {
//           resolve(fileReader.result);
//       };
//       fileReader.onerror = (error) => {
//           reject(error);
//       };
//   });
// };

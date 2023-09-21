import React, { useEffect } from "react";
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

const defaultTheme = createTheme();

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Register = () => {
  const {status, loading} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(status);
    if(status === "success"){
      navigate(`/`);
    }
  });

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

    const fields = { name, password, email };
    dispatch(RegisterUser(fields));
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
            Sign up
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
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs style={{ textAlign: "center" }}>
                <Link href="/login" variant="body2">
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
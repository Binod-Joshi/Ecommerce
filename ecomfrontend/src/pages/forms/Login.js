import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/userRelated/userHandle';
import { useState,useEffect } from 'react';
import { authInitial } from '../../store/productRelated/productSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CircularProgress, IconButton, InputAdornment } from '@mui/material';
import './Login.css'

const defaultTheme = createTheme();

export default function Login({role}) {
  const {status,response,error,loading} = useSelector((state) => state.user);
  const [checkField, setCheckField] = useState("");
  const [message, setMessage] = useState(false);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(role);

  const updatedrole = role.charAt(0).toLowerCase() + role.slice(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const email = data.get('email');
    const password = data.get('password');
    const fields = { password, email,role };
    dispatch(loginUser(fields));
  };

  useEffect(() => {
    console.log(status);
    if(status === "success"){
      dispatch(authInitial());
      navigate(`/`);
    }else if(status === "failed"){
      setMessage(true);
      setCheckField(response);
      setTimeout(()=> {
        setMessage(false);
        setCheckField("");
        dispatch(authInitial())
      },5000)
    }else if(status === "error"){
      setMessage(true);
      setCheckField(error+"Network problem!");
      setTimeout(() => {
        setMessage(false);
        setCheckField(""); // also done by without need of checkfield
        dispatch(authInitial());
      },5000)
    }
  },[status])

  // console.log(status,response);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in {role}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={toggle?"text":"password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setToggle(!toggle)}>
                            {toggle ? (
                                <Visibility />
                            ) : (
                                <VisibilityOff />
                            )}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            />
             {message && <p className='errorlogin courseDetail' style={{color:"red",marginTop:"5px"}}>{checkField}</p>}
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
              {loading ?<CircularProgress size={24} color="inherit" />: "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={`/register${updatedrole}`} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
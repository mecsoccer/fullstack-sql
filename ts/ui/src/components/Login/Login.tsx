import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'state_management/hooks';
import { authSignalLoading, loginUser } from 'state_management/actions/user/user.action';
import { handleEmailInput, handlePasswordInput } from 'utils';

const BootstrapButton = styled(Button)({
  backgroundColor: '#1b303b',
  borderColor: '#1b303b',
  '&:hover': {
    backgroundColor: '#263740',
    borderColor: '#263740',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#263740',
    borderColor: '#263740',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Browse Asteroids
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  const initialValues = {
    email: { value: '', validation: true },
    password: { value: '', validation: true },
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [valid, setValid] = useState(false);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formValues;
    const signupForm = {
      email: email.value,
      password: password.value
    }
    dispatch(authSignalLoading(true));
    dispatch(loginUser(signupForm));
  };
  
  useEffect(() => {
    const okay = Object.values(formValues).every(el => el.value && el.validation);
    okay ? setValid(true) : setValid(false);
  }, [formValues])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          paddingTop:'80px',
          paddingBottom: '100px',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
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
              value={formValues.email.value}
              onChange={(e) => handleEmailInput('email', e.target.value, formValues, setFormValues)}
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
              value={formValues.password.value}
              onChange={(e) => handlePasswordInput('password', e.target.value, formValues, setFormValues)}
            />
            <Grid item xs={12}> 
              <BootstrapButton
                type="submit"
                fullWidth sx={{ mt: 3, mb: 2 }}
                variant="contained"
                disabled={!valid || loading}
              >
                Sign In
              </BootstrapButton>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

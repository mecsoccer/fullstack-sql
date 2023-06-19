import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { handleEmailInput, handleNameInput, handlePasswordInput } from '../../utils';
import { useAppDispatch, useAppSelector } from 'state_management/hooks';
import { authSignalLoading, signupUser } from 'state_management/actions/user/user.action';

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

export default function SignUp() {
  const initialValues = {
    email: { value: '', validation: true },
    first_name: { value: '', validation: true },
    last_name: { value: '', validation: true },
    password: { value: '', validation: true },
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [valid, setValid] = useState(false);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, first_name, last_name, password } = formValues;
    const signupForm = {
      email: email.value,
      first_name: first_name.value,
      last_name: last_name.value,
      password: password.value
    }
    dispatch(authSignalLoading(true));
    dispatch(signupUser(signupForm));
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} sx={{marginBottom:'40px'}}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formValues.first_name.value}
                  onChange={(e) => handleNameInput('first_name', e.target.value, formValues, setFormValues)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formValues.last_name.value}
                  onChange={(e) => handleNameInput('last_name', e.target.value, formValues, setFormValues)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type='email'
                  autoComplete="email"
                  value={formValues.email.value}
                  onChange={(e) => handleEmailInput('email', e.target.value, formValues, setFormValues)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formValues.password.value}
                  onChange={(e) => handlePasswordInput('password', e.target.value, formValues, setFormValues)}
                />
              </Grid>
              <Grid item xs={12}> 
                <BootstrapButton
                  type="submit"
                  fullWidth sx={{ mt: 3, mb: 2 }}
                  variant="contained"
                  disabled={!valid || loading}
                >
                  Sign Up
                </BootstrapButton>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

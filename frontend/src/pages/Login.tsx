import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      sx={ {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      } }
    >
      <Container maxWidth="sm" sx={ {textAlign: 'center'} }>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField label="Nome de Usuário" fullWidth margin="normal"/>
        <TextField label="Senha" type="password" fullWidth margin="normal"/>
        <Button variant="contained" color="primary" onClick={ handleLogin }>
          Entrar
        </Button>
      </Container>
    </Box>
  );
}

export default Login;

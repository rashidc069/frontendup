import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });

            // Store token in localStorage if needed
            localStorage.setItem('token', response.data.token);

            alert("Signup successful! Redirecting to login...");
            navigate("/login"); // Redirect to login page
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed. Please try again.');
            console.error('Signup error:', err);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ minHeight: '80vh', alignContent: 'center' }}>
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Full Name"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Typography variant="body2" align="center">
                        Already have an account? <Button onClick={() => navigate('/login')} variant="text">Login</Button>
                    </Typography>

                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;

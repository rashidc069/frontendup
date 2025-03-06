import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);

    // 🔹 Logout function (removes token & redirects)
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("rememberedUser");
        navigate("/login"); // Redirect to login page
    };

    // 🔹 Auto-logout if token is missing/expired
    useEffect(() => {
        const checkAuthStatus = async () => {
            const storedToken = localStorage.getItem("token");
            if (!storedToken) {
                logout();
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/auth/check-token", {
                    headers: { Authorization: `Bearer ${storedToken}` }
                });

                if (!response.data.valid) {
                    logout();
                }
            } catch (error) {
                console.error("Token validation failed:", error);
                logout();
            }
        };

        checkAuthStatus();
    }, []);

    // 🔹 Handle form submission (login)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id);

            if (rememberMe) {
                localStorage.setItem("rememberedUser", JSON.stringify({ email, password, token: response.data.token }));
            } else {
                localStorage.removeItem("rememberedUser");
            }

            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred during login.");
        }
    };

    useEffect(() => {
        const rememberedUser = localStorage.getItem("rememberedUser");
        if (rememberedUser) {
            const user = JSON.parse(rememberedUser);
            setEmail(user.email);
            setPassword(user.password);
            setRememberMe(true);
        }
    }, []);

    return (
        <Container maxWidth="xs" sx={{ minHeight: '80vh', alignContent: 'center' }}>
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                        label="Remember me"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;

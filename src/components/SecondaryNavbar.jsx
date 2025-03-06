import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

const SecondaryNavbar = () => {
    const navigate = useNavigate();
    const [profileAnchor, setProfileAnchor] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
        checkAuth();
        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    const handleProfileOpen = (event) => setProfileAnchor(event.currentTarget);
    const handleProfileClose = () => setProfileAnchor(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
    };

    if (!isAuthenticated) return null;

    return (
        <AppBar position="static" color="secondary">
            <Toolbar sx={{ minHeight: 'unset !important', justifyContent: 'end' }}>
                <IconButton onClick={handleProfileOpen} sx={{ color: "white" }}>
                    <AccountCircleIcon fontSize="small" />
                </IconButton>
                <Menu anchorEl={profileAnchor} open={Boolean(profileAnchor)} onClose={handleProfileClose}>
                    <MenuItem component={Link} to="/dashboard" onClick={handleProfileClose}>Dashboard</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default SecondaryNavbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
    const handleMenuClose = () => setMenuAnchor(null);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>Blog</Typography>

                {/* Desktop Navigation */}
                <Stack direction="row" spacing={2} sx={{ display: { xs: "none", sm: "flex" } }}>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/blog">Blog</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact</Button>
                </Stack>

                {/* Mobile Menu */}
                <IconButton edge="start" color="inherit" onClick={handleMenuOpen} sx={{ display: { sm: "none" } }}>
                    <MenuIcon />
                </IconButton>
                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                    <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
                    <MenuItem component={Link} to="/blog" onClick={handleMenuClose}>Blog</MenuItem>
                    <MenuItem component={Link} to="/contact" onClick={handleMenuClose}>Contact</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

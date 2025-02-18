import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack, Button, Box, Drawer, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Blog
            </Typography>
            <Divider />
            <Stack direction="column" spacing={2}>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/blog">
                    Blog
                </Button>
                <Button color="inherit" component={Link} to="/contact">
                    Contact
                </Button>
            </Stack>
        </Box>
    );

    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography variant="h3" component='div' sx={{ flexGrow: 1 }}>
                        Blog
                    </Typography>

                    <Stack direction='row' spacing={2}>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/blog">
                            Blog
                        </Button>
                        <Button color="inherit" component={Link} to="/contact">
                            Contact
                        </Button>

                    </Stack>
                    <Button onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </Button>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </div>
    );
};

export default Navbar;

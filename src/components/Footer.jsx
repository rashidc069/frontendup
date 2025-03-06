import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#111827', color: 'white', padding: '24px' }}>
            <Container maxWidth="md">
                <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
                    <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'left' }}>
                        <Typography variant="h6" fontWeight="semibold" gutterBottom>
                            About My Blog
                        </Typography>
                        <Typography variant="body2" color="#979797">
                            Sharing insightful articles and thoughts on various topics.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'left' }}>
                        <Typography variant="h6" fontWeight="semibold" gutterBottom>
                            Quick Links
                        </Typography>
                        <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                            <Box component="li" sx={{ mb: 1 }}>
                                <Link href="/about" color="#979797" underline="hover">
                                    About Us
                                </Link>
                            </Box>
                            <Box component="li" sx={{ mb: 1 }}>
                                <Link href="/contact" color="#979797" underline="hover">
                                    Contact
                                </Link>
                            </Box>
                            <Box component="li" sx={{ mb: 1 }}>
                                <Link href="/privacy-policy" color="#979797" underline="hover">
                                    Privacy Policy
                                </Link>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'left' }}>
                        <Typography variant="h6" fontWeight="semibold" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }} gap={2}>
                            <Link href="https://facebook.com" target="_blank" color="#979797">
                                <FacebookIcon />
                            </Link>
                            <Link href="https://twitter.com" target="_blank" color="#979797">
                                <TwitterIcon />
                            </Link>
                            <Link href="https://instagram.com" target="_blank" color="#979797">
                                <InstagramIcon />
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                <Box mt={4} pt={2} borderTop="1px solid #374151" textAlign="center">
                    <Typography variant="body2" color="#979797">
                        © {new Date().getFullYear()} My Blog. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </footer>
    );
};

export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Height } from '@mui/icons-material';

const Home = () => {
    const images = [
        {
            src: "./src/assets/automation-testing-banner.webp",
            alt: "Banner 1"
        },
        {
            src: "./src/assets/api-testing-banner.webp",
            alt: "Banner 2"
        },
        {
            src: "./src/assets/blog.jpeg",
            alt: "Banner 3"
        },
    ];

    return (
        <Container sx={{ textAlign: "center", paddingTop: "2rem", maxWidth: '100%' }}>
            <Carousel>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image.src} alt={image.alt} style={{ width: '100%', objectFit: 'cover', height: '500px' }} />
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' }}>
                            <Typography variant="h3" component="h1" gutterBottom>
                                Welcome to My Blog
                            </Typography>
                            <Typography variant="body1" color="textSecondary" paragraph>
                                Explore the latest articles and insights on various topics.
                            </Typography>
                        </Box>
                    </div>
                ))}
            </Carousel>
            <Grid container spacing={2} sx={{ paddingTop: 10 }}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h2">Lorem ipsum doler sit</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src="./src/assets/blog.jpeg" alt="" srcset="" sx={{ Height: '250px' }} />
                    </Box>
                </Grid>

            </Grid>

            <Grid sx={{ paddingTop: 10, paddingBottom: 10 }}>
                <Link to="/blog" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary" size="large">
                        Read Blogs
                    </Button>
                </Link>
            </Grid>

        </Container >
    );
};

export default Home;
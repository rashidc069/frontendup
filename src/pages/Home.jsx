import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import axios from "axios";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
    const images = [
        { src: "./src/assets/automation-testing-banner.webp", alt: "Banner 1" },
        { src: "./src/assets/api-testing-banner.webp", alt: "Banner 2" },
        { src: "./src/assets/blog.jpeg", alt: "Banner 3" },
    ];

    const caseStudies = [
        {
            image: "./src/assets/about-us.webp", // Replace with your image paths
            title: "Case Study 1",
            description: "Brief description of case study 1.  Highlight key results and insights.",
        },
        {
            image: "./src/assets/about-us.webp",
            title: "Case Study 2",
            description: "Brief description of case study 2.  Focus on the problem and solution.",
        },
        {
            image: "./src/assets/about-us.webp",
            title: "Case Study 3",
            description: "Brief description of case study 3.  Emphasize the impact of your work.",
        },
    ];

    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Blogs
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get("http://localhost:5000/api/blogs");
                setBlogs(response.data.slice(0, 3)); // Only take the first 3 blogs
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleNavigate = (selectedItem) => {
        navigate(`/blogs/${selectedItem._id}`, { state: selectedItem });
    };

    if (loading) {
        return <div>Loading blogs...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container sx={{ paddingTop: "2rem", maxWidth: '100%', width: '100%' }}>
            {/* Hero Carousel */}
            <Carousel sx={{ textAlign: "center", marginBottom: 6 }}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image.src} alt={image.alt} style={{ width: '100%', objectFit: 'cover', height: '500px' }} />
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' }}>
                            <Typography variant="h3" component="h1" gutterBottom>
                                Welcome to My Blog
                            </Typography>
                            <Typography variant="body1" color="#979797" paragraph>
                                Explore the latest articles and insights on various topics.
                            </Typography>
                        </Box>
                    </div>
                ))}
            </Carousel>

            <Grid container spacing={2} sx={{ paddingTop: 6, padding: 5, alignItems: "center" }}> {/* Added background color and padding */}
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h2" gutterBottom>About Us</Typography>
                        <Typography variant="body1">
                            Write something compelling about your blog and its mission.  Explain what makes it unique.
                            Write something compelling about your blog and its mission.  Explain what makes it unique.
                            Write something compelling about your blog and its mission.  Explain what makes it unique.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src="./src/assets/about-us.webp" alt="About Us" style={{ maxWidth: '100%' }} /> {/* Replace with your image */}
                    </Box>
                </Grid>
            </Grid>

            {/* Why Us Section */}
            <Grid container spacing={2} sx={{ paddingTop: 10, padding: 5 }}> {/* Added padding */}
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom>Why Us?</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box>
                        <Typography variant="h4" gutterBottom>Expertise</Typography>
                        <Typography variant="body1">Highlight your expertise in the topics you cover.</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box>
                        <Typography variant="h4" gutterBottom>Value</Typography>
                        <Typography variant="body1">Explain the value readers get from your blog (insights, knowledge, etc.).</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box>
                        <Typography variant="h4" gutterBottom>Community</Typography>
                        <Typography variant="body1">Mention any community aspects (comments, forums, etc.).</Typography>
                    </Box>
                </Grid>
            </Grid>

            {/* Case Studies Section */}
            <Grid container spacing={4} sx={{ paddingTop: 10, padding: 5 }}>
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom>Case Studies</Typography>
                </Grid>
                {/* Add your case study components/data here */}
                {caseStudies.map((study, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card sx={{ position: 'relative' }}> {/* Card for image and overlay */}
                            <CardMedia
                                component="img"
                                height="100%" // Adjust height as needed
                                image={study.image}
                                alt={study.title}
                                sx={{ objectFit: 'cover' }} // Cover the entire area
                            />
                            <CardContent sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                top: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
                                color: '#fff',
                                padding: 4,
                                transition: 'transform 0.3s ease',
                                display: 'flex',          // Enable flexbox
                                justifyContent: 'end', // Center horizontally
                                flexDirection: 'column',
                            }}>
                                <Typography variant="h5" gutterBottom>{study.title}</Typography> {/* Smaller title */}
                                <Typography variant="body2">{study.description}</Typography> {/* Smaller description */}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Blog Section */}
            <Grid item xs={12} sx={{ paddingTop: 10, padding: 5, paddingBottom: 0 }}>
                <Typography variant="h2" gutterBottom>Latest Blog Posts</Typography>
            </Grid>

            <Grid container spacing={4} sx={{ paddingTop: 0, padding: 5 }}>
                {/* ... (Grid item for title) */}
                {blogs.map((blog) => (
                    <Grid item xs={12} sm={6} md={4} key={blog._id}>
                        <Card sx={{ height: '100%' }}>
                            <CardActionArea onClick={() => handleNavigate(blog)}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={blog.image || "./src/assets/blog.jpeg"}
                                    alt={blog.title}
                                />
                                <CardContent>
                                    <Typography variant="h6">{blog.title}</Typography>
                                    <Typography variant="body2" sx={{ color: "text.Secondary" }}
                                        dangerouslySetInnerHTML={{ __html: blog.content?.substring(0, 100) + "..." }}
                                    />
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid sx={{ paddingTop: 10, paddingBottom: 10, padding: 5 }}>
                <Link to="/blog" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary" size="large">
                        More Blogs
                    </Button>
                </Link>
            </Grid>
        </Container >
    );
};

export default Home;
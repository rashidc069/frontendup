import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActionArea, CardMedia, Typography, Grid } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogList = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);
    // Add error state

    const handleNavigate = (selectedItem) => {

        navigate(`/blogs/${selectedItem._id}`, { state: selectedItem })
    }

    const fetchBlogs = async () => {
        setLoading(true); // Set loading to true before fetching
        setError(null);    // Clear any previous errors
        try {
            const response = await axios.get('http://localhost:5000/api/blogs');
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setError(error.message); // Set the error message
        } finally {
            setLoading(false); // Set loading to false after fetch completes (success or error)
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    if (loading) {
        return <div>Loading blogs...</div>; // Display a loading message
    }

    if (error) {
        return <div>Error: {error}</div>; // Display an error message
    }

    return (
        <Grid container spacing={4} sx={{ padding: "2rem", marginTop: 6 }}>
            {blogs.map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog._id || blog.id}> {/* Use _id or id */}
                    <Card>
                        <CardActionArea onClick={() => handleNavigate(blog)}  > {/* Use _id or id */}
                            <CardMedia
                                component="img"
                                height="200"
                                image={blog.image || "https://copysmiths.com/wp-content/uploads/2022/05/feature-image-maintain-a-successful-blog.jpg"}
                                alt={blog.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{blog.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {blog.body?.substring(0, 100)}... {/* Optional chaining for body */}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default BlogList;
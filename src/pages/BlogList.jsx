import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActionArea, CardMedia, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogList = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    //  Fetch Blogs
    const fetchBlogs = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:5000/api/blogs");
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleNavigate = (selectedItem) => {
        navigate(`/blogs/${selectedItem._id}`, { state: selectedItem })
    }
    const handleEdit = (blog) => {

        navigate(`/add-blog`, { state: { blog, editMode: true } });
    };
    //  Delete a Blog
    const handleDelete = async (blogId) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/blogs/${blogId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            //  Refresh blog list after deletion
            fetchBlogs();
            alert("Blog deleted successfully!");
        } catch (error) {
            console.error("Error deleting blog:", error.response || error);
            alert(`Failed to delete blog: ${error.response?.data?.error || "Unknown error"}`);
        }
    };

    if (loading) {
        return <div>Loading blogs...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Grid container spacing={4} sx={{ padding: "2rem", marginTop: 6 }}>
            {blogs.map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog._id || blog.id}>
                    <Card>
                        <CardActionArea onClick={() => handleNavigate(blog)}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={blog.image || "./src/assets/blog.jpeg"}
                                alt={blog.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{blog.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {blog.content?.substring(0, 100)}...
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                        {localStorage.getItem("token") && (
                            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
                                <Button variant="contained" color="primary" onClick={() => handleEdit(blog)}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="error" onClick={() => handleDelete(blog._id)}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default BlogList;

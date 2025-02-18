import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../api/blogService";
import { Card, CardContent, CardActionArea, CardMedia, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs().then(setBlogs);
    }, []);

    return (
        <Grid container spacing={4} sx={{ padding: "2rem" }}>
            {blogs.map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                    <Card>
                        <CardActionArea component={Link} to={`/blog/${blog.id}`}>
                            <CardMedia component="img" height="200" image={blog.image || "https://copysmiths.com/wp-content/uploads/2022/05/feature-image-maintain-a-successful-blog.jpg"}
                                alt={blog.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{blog.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {blog.body.substring(0, 100)}...
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

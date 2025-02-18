import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../api/blogService";
import { Box, Typography, Paper } from "@mui/material";
import bannerImage from "../assets/blog.jpeg?url"; // Import banner image

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetchBlogById(id).then(setBlog);
    }, [id]);

    if (!blog) return <p>Loading...</p>;

    return (
        <div>
            {/* Banner Section */}
            <Box
                sx={{
                    position: "relative",
                    backgroundImage: `url(${bannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    textAlign: "center",
                    padding: "2rem",
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: "bold", position: "absolute" }}>
                    {blog.title}
                </Typography>
            </Box>

            <Box sx={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
                <Paper sx={{ padding: "1.5rem", backgroundColor: "background.paper" }}>
                    <Typography variant="body1" sx={{ color: "text.primary", marginBottom: "1rem" }}>
                        {blog.body}
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: "2rem" }}>
                        Related Posts:
                    </Typography>
                    <ul>
                        <li><a href="#">Related post 1</a></li>
                        <li><a href="#">Related post 2</a></li>
                    </ul>
                </Paper>
            </Box>
        </div>
    );
};

export default BlogDetail;

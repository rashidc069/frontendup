import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchBlogById } from "../api/blogService"; // Assuming this is your API service
import { Box, Typography, Paper, CircularProgress, Button } from "@mui/material"; // Import CircularProgress
import bannerImage from "../assets/about-us.webp?url";
import { Link } from "react-router-dom";

const BlogDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const data = location.state
    // const [blog, setBlog] = useState(null);
    // const [loading, setLoading] = useState(true); // Loading state
    // const [error, setError] = useState(null);    // Error state
    // const [relatedPosts, setRelatedPosts] = useState([]); // State for related posts
    console.log(data)


    // useEffect(() => {
    //     const fetchBlog = async () => {
    //         setLoading(true);
    //         setError(null);
    //         try {
    //             // const data = await fetchBlogById(id);
    //             console.log("Fetching URL:", `http://localhost:5000/api/blogs/${id}`); // Added here

    //             const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
    //             const data = await response.json();
    //             setBlog(data);

    //             // Fetch related posts (example - adjust as needed for your API)
    //             if (data && data.categories) { // Check if categories exist
    //                 const related = await fetchRelatedPosts(data.categories); // New function
    //                 setRelatedPosts(related);
    //             }

    //         } catch (err) {
    //             console.error("Error fetching blog:", err);
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchBlog();
    // }, [id]);

    // if (loading) {
    //     return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    //         <CircularProgress />
    //     </Box>;
    // }

    // if (error) {
    //     return <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 4 }}>Error: {error}</Typography>;
    // }

    // if (!blog) return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>Blog not found</Typography>;


    return (
        <div sx={{ marginTop: 16 }}>
            {/* Banner Section */}
            <Box
                sx={{
                    position: "relative",
                    backgroundImage: `url(${data.image ? `http://localhost:5000${data.image}` : bannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    textAlign: "center",
                    padding: "2rem",
                    backgroundColor: 'red',
                    // backgroundImage:
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: "bold", position: "absolute" }}>
                    {data.title}
                </Typography>
            </Box>

            <Box sx={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
                <Paper sx={{ padding: "1.5rem", backgroundColor: "background.paper" }}>
                    <Typography
                        variant="body1"
                        sx={{ color: "text.primary", marginBottom: "1rem" }}
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                </Paper>
            </Box>
        </div>
    );
};

export default BlogDetail;
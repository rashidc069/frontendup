import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchBlogById } from "../api/blogService"; // Assuming this is your API service
import { Box, Typography, Paper, CircularProgress, Button } from "@mui/material"; // Import CircularProgress
import bannerImage from "../assets/blog.jpeg?url"; // Or your default banner image
import { Link } from "react-router-dom"; // Import Link for related posts

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

    // const fetchRelatedPosts = async (categories) => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/blogs?categories=${categories.join(',')}`);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //             console.log(response.status);
    //         }
    //         const related = await response.json();
    //         return related.filter(post => post._id !== id); // Exclude the current blog
    //     } catch (error) {
    //         console.error("Error fetching related posts:", error);
    //         return []; // Return an empty array in case of error
    //     }
    // };


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
                    // backgroundImage: `url(${blog.image || bannerImage})`, // Use blog image or default
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    textAlign: "center",
                    padding: "2rem",
                    backgroundColor: 'red'
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: "bold", position: "absolute" }}>
                    {data.title}
                </Typography>
            </Box>

            <Box sx={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
                <Paper sx={{ padding: "1.5rem", backgroundColor: "background.paper" }}>
                    <Typography variant="body1" sx={{ color: "text.primary", marginBottom: "1rem" }}>
                        {data.content}
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: "2rem" }}>
                        Related Posts:
                    </Typography>
                    <ul>
                        {/* {relatedPosts.map((relatedPost) => (
                            <li key={relatedPost._id}>
                                <Button style={{ textDecoration: 'none' }}>
                                    <Typography variant="body1" color="text.primary">
                                        {relatedPost.title}
                                    </Typography>
                                </Button>
                            </li>
                        ))} */}
                    </ul>
                </Paper>
            </Box>
        </div>
    );
};

export default BlogDetail;
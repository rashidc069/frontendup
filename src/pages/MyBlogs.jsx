import React, { useEffect, useState } from "react";
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography, Paper, Button, CircularProgress, Pagination
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const MyBlogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const blogsPerPage = 10; // Display only 10 items per page

    const fetchMyBlogs = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:5000/api/blogs", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            setBlogs(response.data);
            // console.log("Fetched Blogs:", response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    const handleEdit = (blog) => {
        // navigate(`/add-blog`, { state: { blog, editMode: true } });
        navigate(`/blog/edit/${blog._id}`);
    };

    const handleDelete = async (blogId) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/blogs/${blogId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            fetchMyBlogs();
            alert("Blog deleted successfully!");
        } catch (error) {
            console.error("Error deleting blog:", error.response || error);
            alert(`Failed to delete blog: ${error.response?.data?.error || "Unknown error"}`);
        }
    };

    // Pagination Logic
    const indexOfLastBlog = page * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333", mb: 3 }}>
                    Blogs
                </Typography>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error">Error: {error}</Typography>
                ) : blogs.length === 0 ? (
                    <Typography>No blogs found. Start writing your first blog!</Typography>
                ) : (
                    <>
                        <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                        <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Categories</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Date & Time</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentBlogs.map((blog) => (
                                        <TableRow key={blog._id || blog.id}>
                                            <TableCell>{blog.title}</TableCell>
                                            <TableCell>{blog.author?.username || "Unknown"}</TableCell>
                                            <TableCell>{blog.categories?.join(", ") || "Uncategorized"}</TableCell>
                                            <TableCell>{new Date(blog.createdAt).toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    sx={{ mr: 1 }}
                                                    onClick={() => handleEdit(blog)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDelete(blog._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Pagination */}
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(event, value) => setPage(value)}
                                color="primary"
                            />
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default MyBlogs;

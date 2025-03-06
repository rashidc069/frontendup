import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import JoditEditor from "jodit-react";

const EditBlog = () => {
    const { id } = useParams(); // Get blog ID from URL
    const navigate = useNavigate();
    const [blog, setBlog] = useState({ title: "", content: "" });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [existingImage, setExistingImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                const blogData = response.data;

                setBlog({
                    title: blogData.title,
                    content: blogData.content,
                });

                if (blogData.image) {
                    setExistingImage(blogData.image);
                    setPreview(`http://localhost:5000${blogData.image}`);
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching blog:", err);
                setError("Error fetching blog details!");
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleContentChange = (value) => {
        setBlog((prev) => ({ ...prev, content: value || "" }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            };

            const formData = new FormData();
            formData.append("title", blog.title);
            formData.append("content", blog.content);

            if (image) {
                formData.append("image", image);
            } else if (existingImage) {
                formData.append("existingImage", existingImage);
            }

            await axios.put(`http://localhost:5000/api/blogs/${id}`, formData, { headers });
            alert("Blog updated successfully!");
            navigate("/blog");
        } catch (error) {
            alert(`Failed to update blog: ${error.response?.data?.error || "Unknown error"}`);
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container sx={{ marginTop: "80px", marginBottom: "80px", paddingLeft: "42px !important", paddingRight: "42px !important" }}>
            <Typography variant="h4" gutterBottom>Edit Blog</Typography>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={blog.title}
                    onChange={handleChange}
                    margin="normal"
                    required
                />


                {preview && (
                    <Box
                        component="img"
                        src={preview}
                        alt="Preview"
                        sx={{
                            width: "auto",
                            maxHeight: "250px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            boxShadow: 2,
                            mt: 2
                        }}
                    />
                )}
                <Button
                    variant="contained"
                    component="label"
                    sx={{
                        backgroundColor: "#1976d2", // Primary color
                        color: "white",
                        "&:hover": { backgroundColor: "#1565c0" },
                        mb: 2 // Add margin below button
                    }}
                >
                    Change Image
                    <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                </Button>

                <JoditEditor value={blog.content} onChange={handleContentChange} />



                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Update Blog
                </Button>
            </form>
        </Container>
    );
};

export default EditBlog;

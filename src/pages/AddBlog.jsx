import React, { useState } from "react";
import { Box, Container, TextField, Button, Typography } from "@mui/material";
import JoditEditor from "jodit-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
    const [blog, setBlog] = useState({ title: "", content: "" });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

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
            const headers = { Authorization: `Bearer ${token}` };
            const formData = new FormData();
            formData.append("title", blog.title);
            formData.append("content", blog.content);
            if (image) {
                formData.append("image", image);
            }

            await axios.post("http://localhost:5000/api/blogs", formData, { headers });
            alert("Blog created successfully!");
            navigate("/blog");
        } catch (error) {
            alert(`Failed to create blog: ${error.response?.data?.error || "Unknown error"}`);
        }
    };

    return (
        <Container sx={{ marginTop: "80px" }}>
            <Typography variant="h4" gutterBottom>Create New Blog</Typography>
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
                    Upload Image
                    <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                </Button>

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
                <JoditEditor value={blog.content} onChange={handleContentChange} />

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Create Blog</Button>
            </form>
        </Container>
    );
};

export default AddBlog;
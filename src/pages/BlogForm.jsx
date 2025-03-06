import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";

const BlogForm = () => {
    const [blog, setBlog] = useState({ title: "", content: "" });
    const [image, setImage] = useState(null); // Store selected image
    const [preview, setPreview] = useState(""); // Image preview URL
    const [existingImage, setExistingImage] = useState(""); // Keep track of old image
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = location?.state?.editMode;
    const editData = location?.state?.blog;

    useEffect(() => {
        if (isEdit && editData) {
            setBlog({
                title: editData?.title || "",
                content: editData?.content || "",
            });

            if (editData.image) {
                setExistingImage(editData.image);
                setPreview(`http://localhost:5000${editData.image}`);
            }
        }
    }, [isEdit, editData]);

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleContentChange = (value) => {
        setBlog((prev) => ({ ...prev, content: value || "" }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file)); // Show preview of new image
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data", // Ensure backend accepts FormData
            };

            const formData = new FormData();
            formData.append("title", blog.title);
            formData.append("content", blog.content);

            if (image) {
                formData.append("image", image); // Append new image if selected
            } else if (isEdit && existingImage) {
                formData.append("existingImage", existingImage); // Retain old image
            }

            if (isEdit && editData?._id) {
                await axios.put(`http://localhost:5000/api/blogs/${editData._id}`, formData, { headers });
                alert("Blog updated successfully!");
            } else {
                await axios.post("http://localhost:5000/api/blogs", formData, { headers });
                alert("Blog created successfully!");
            }

            navigate("/blog");
        } catch (error) {
            alert(`Failed to save blog: ${error.response?.data?.error || "Unknown error"}`);
        }
    };

    return (
        <Container sx={{ marginTop: "80px" }}>
            <Typography variant="h4" gutterBottom>
                {isEdit ? "Edit Blog" : "Add New Blog"}
            </Typography>

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

                <JoditEditor
                    value={blog.content}
                    onChange={handleContentChange}
                />

                {/* Image Upload Input */}
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginTop: "20px" }} />

                {/* Show Image Preview */}
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        style={{ width: "100%", maxHeight: "250px", marginTop: "10px" }}
                    />
                )}

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    {isEdit ? "Update Blog" : "Create Blog"}
                </Button>
            </form>
        </Container>
    );
};

export default BlogForm;

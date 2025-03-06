import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import "quill/dist/quill.snow.css"; // ✅ Ensure Quill is imported
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/react-quill.js";

const BlogForm = () => {
    const [blog, setBlog] = useState({ title: "", content: "" });
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = location?.state?.editMode;
    const editData = location?.state?.blog;

    useEffect(() => {
        if (isEdit && editData) {
            setBlog({
                title: editData?.title || "",
                content: editData?.content || "", // ✅ Ensure content is a string
            });
        }
    }, [isEdit, editData]);

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleContentChange = (value) => {
        setBlog((prev) => ({ ...prev, content: value || "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };

            if (isEdit && editData?._id) {
                await axios.put(`http://localhost:5000/api/blogs/${editData._id}`, blog, { headers });
                alert("Blog updated successfully!");
            } else {
                await axios.post("http://localhost:5000/api/blogs", blog, { headers });
                alert("Blog created successfully!");
            }

            navigate("/blog");
        } catch (error) {
            alert(`Failed to save blog: ${error.response?.data?.error || "Unknown error"}`);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {id ? "Edit Blog" : "Add New Blog"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={blog.title}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Content"
                    name="content"
                    value={blog.content}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />

                {/* ✅ Removed TextField for content, using only ReactQuill */}
                {/* <ReactQuill
                    theme="snow"
                    value={blog.content} // ✅ Directly using blog.content
                    onChange={handleContentChange} // ✅ Updates blog.content
                    style={{ marginTop: "16px", marginBottom: "16px", height: "200px" }}
                /> */}

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    {id ? "Update Blog" : "Create Blog"}
                </Button>
            </form>
        </Container>
    );
};

export default BlogForm;

import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BlogForm = () => {
    const [blog, setBlog] = useState({ title: "", content: "" });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/blogs/${id}`)
                .then((response) => {
                    setBlog({ title: response.data.title, content: response.data.content });
                })
                .catch((error) => console.error("Error fetching blog:", error));
        }
    }, [id]);

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };
            console.log("Token from localStorage:", token);
            console.log("🔵 Token being sent:", token);
            console.log("🟢 Headers being sent:", headers);
            let response;
            if (id) {
                let response; await axios.put(`http://localhost:5000/api/blogs/${id}`, blog, { headers });
            } else {
                response = await axios.post("http://localhost:5000/api/blogs", blog, { headers });
            }

            alert("Blog saved successfully!");
            navigate("/blog");

        } catch (error) {
            console.error("Error saving blog:", error.response?.data || error.message);
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
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    {id ? "Update Blog" : "Create Blog"}
                </Button>
            </form>
        </Container>
    );
};

export default BlogForm;
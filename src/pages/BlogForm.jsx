import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const BlogForm = () => {
    const [blog, setBlog] = useState({ title: "", content: "" });
    const location = useLocation()
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = location?.state?.editMode;
    const editData = location?.state?.blog

    // useEffect(() => {
    //     if (id) {
    //         axios.get(`http://localhost:5000/api/blogs/${id}`)
    //             .then((response) => {
    //                 setBlog({ title: response.data.title, content: response.data.content });
    //             })
    //             .catch((error) => console.error("Error fetching blog:", error));
    //     }
    // }, [id]);

    useEffect(() => {
        if (isEdit) {
            setBlog({
                title: editData.title,
                content: editData.content
            })
        }
    }, [])

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };

            // let response;
            if (id) {
                await axios.put(`http://localhost:5000/api/blogs/${id}`, blog, { headers });
                alert("Blog updated successfully!");
            } else {
                await axios.post("http://localhost:5000/api/blogs", blog, { headers });
                alert("Blog created successfully!");
            }

            alert("Blog saved successfully!");
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
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    {id ? "Update Blog" : "Create Blog"}
                </Button>
            </form>
        </Container>
    );
};

export default BlogForm;
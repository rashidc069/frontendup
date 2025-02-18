import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Replace with your actual API

export const fetchBlogs = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchBlogById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

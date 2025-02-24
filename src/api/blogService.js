import axios from "axios";

// 1. Replace with your actual API base URL
const API_BASE_URL = "http://localhost:5000/api"; // Example: Your backend API URL

// 2. Define API endpoints (adjust these if your API is different)
const BLOGS_ENDPOINT = `${API_BASE_URL}/blogs`;
const BLOG_BY_ID_ENDPOINT = `${API_BASE_URL}/blogs`; // Note the trailing slash for ID

export const fetchBlogs = async () => {
    try {
        const response = await axios.get(BLOGS_ENDPOINT);
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error; // Re-throw the error for the component to handle
    }
};

export const fetchBlogById = async (id) => {
    try {
        const response = await axios.get(`${BLOG_BY_ID_ENDPOINT}${id}`); // Use template literal
        return response.data;
    } catch (error) {
        console.error("Error fetching blog by ID:", error);
        throw error; // Re-throw the error
    }
};

// Example for related posts (adapt as needed for your API)
export const fetchRelatedPosts = async (categories) => {
    try {
        const response = await axios.get(`${BLOGS_ENDPOINT}?categories=${categories.join(',')}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching related posts:", error);
        throw error;
    }
};
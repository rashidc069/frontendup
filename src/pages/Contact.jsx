import { Link } from "react-router-dom";

const Contact = () => {
    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
            <p className="text-lg text-gray-700">
                Explore the latest articles and insights.
            </p>
            <Link
                to="/blog"
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg"
            >
                Read Blogs
            </Link>
        </div>
    );
};

export default Contact;

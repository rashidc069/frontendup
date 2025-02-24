import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={() => navigate("/add-blog")}>Add Blog</button>
            <button onClick={() => navigate("/edit-blog")}>Edit Blog</button>
            <button onClick={handleLogout}>Logout</button>
            {/* hello */}
            {/* hello */}
        </div>
    );
};

export default Dashboard;

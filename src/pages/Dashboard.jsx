import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, display: "flex", justifyContent: "center", alignItems: "center" }}>

                {/* Welcome Banner */}
                <Paper
                    elevation={3}
                    sx={{
                        padding: 10,
                        marginBottom: 3,
                        backgroundColor: "#1976d2",
                        color: "white",
                        textAlign: "center",
                        borderRadius: 2,
                        width: "100%",
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        Welcome to Blogsite!
                    </Typography>
                </Paper>

                {/* <Paper
                    elevation={4}
                    sx={{
                        padding: 4,
                        textAlign: "center",
                        width: "100%",
                        maxWidth: 600,
                        borderRadius: 3,
                    }}
                >
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
                        Admin Dashboard
                    </Typography>

                    <Box mt={3} display="flex" flexDirection="column" gap={2}>
                        
                        <Paper
                            elevation={3}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 2,
                                borderRadius: 2,
                                cursor: "pointer",
                                transition: "0.3s",
                                "&:hover": { boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)" },
                            }}
                            onClick={() => navigate("/add-blog")}
                        >
                            <AddIcon sx={{ fontSize: 30, marginRight: 1, color: "primary.main" }} />
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Add Blog</Typography>
                        </Paper>

                        
                        <Paper
                            elevation={3}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 2,
                                borderRadius: 2,
                                cursor: "pointer",
                                transition: "0.3s",
                                "&:hover": { boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)" },
                            }}
                            onClick={() => navigate("/my-blogs")}
                        >
                            <VisibilityIcon sx={{ fontSize: 30, marginRight: 1, color: "secondary.main" }} />
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>View My Blogs</Typography>
                        </Paper>

                        
                        <Paper
                            elevation={3}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 2,
                                borderRadius: 2,
                                cursor: "pointer",
                                backgroundColor: "#ffebee",
                                transition: "0.3s",
                                "&:hover": { backgroundColor: "#ffcdd2", boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)" },
                            }}
                            onClick={handleLogout}
                        >
                            <ExitToAppIcon sx={{ fontSize: 30, marginRight: 1, color: "error.main" }} />
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "error.main" }}>Logout</Typography>
                        </Paper>
                    </Box>
                </Paper> */}
            </Box>
        </Box>
    );
};

export default Dashboard;

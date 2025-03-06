import { useNavigate, useLocation } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        { text: "Add Blog", icon: <AddIcon />, path: "/addblog" },
        { text: "View Blogs", icon: <VisibilityIcon />, path: "/my-blogs" },
        // { text: "Edit Blogs", icon: <VisibilityIcon />, path: "/blog/edit/:id" },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                flexShrink: 0,
                "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
            }}
        >
            <List sx={{
                paddingTop: '0 !important',
                paddingBottom: '0 !important',
            }}>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        selected={location.pathname === item.path} // ✅ Correct usage
                        onClick={() => navigate(item.path)}
                        sx={{
                            cursor: "pointer",

                            transition: "0.3s",
                            "&.Mui-selected": {
                                backgroundColor: "primary.main",
                                color: "#fff",
                                "& .MuiListItemIcon-root": { color: "#fff" },
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "primary.dark",
                            },
                            "&:hover": {
                                backgroundColor: "primary.light",
                                color: "#fff",
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: location.pathname === item.path ? "#fff" : "inherit" }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}

                {/* Logout Button */}
                <ListItemButton onClick={handleLogout} sx={{
                    cursor: "pointer",
                    color: "error.main",
                    "&:hover": {
                        backgroundColor: "error.light",
                        color: "#fff",
                    },
                }}>
                    <ListItemIcon>
                        <ExitToAppIcon sx={{ color: "error.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" sx={{}} />
                </ListItemButton>
            </List>
        </Drawer>
    );
};

export default Sidebar;

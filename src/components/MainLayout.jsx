import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import BlogList from "../pages/BlogList";
import BlogForm from "../pages/BlogForm";
import AddBlog from "../pages/AddBlog";
import EditBlog from "../pages/EditBlog";
import BlogDetail from "../pages/BlogDetail";
import Contact from "../pages/Contact";
import Navbar from "./NavBar";
import SecondaryNavbar from "./SecondaryNavbar";
import Footer from "./Footer";
import LoginPage from "../pages/LoginPage";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import MyBlogs from "../pages/MyBlogs";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
    const location = useLocation();
    // const dashboardRoutes = ["/dashboard", "/my-blogs", "/addblog", "/blog/edit/:id"];
    const dashboardRoutes = ["/dashboard", "/my-blogs", "/addblog", "/blog/edit/:id"];
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <>
            {/* Show Secondary Navbar if Logged In */}
            {isAuthenticated && <SecondaryNavbar />}

            {/* Show Primary Navbar only on non-dashboard pages */}
            {!dashboardRoutes.includes(location.pathname) && <Navbar />}

            <div style={{ display: "flex" }}>
                {/* Show Sidebar only on dashboard pages */}
                {dashboardRoutes.includes(location.pathname) && <Sidebar />}

                {/* Content Layout */}
                <div style={{ flex: 1, paddingLeft: dashboardRoutes.includes(location.pathname) ? 240 : 0 }}>
                    <Routes>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/blog" element={<BlogList />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/blogs/:id" element={<BlogDetail />} />
                        <Route path="/contact" element={<Contact />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/my-blogs" element={<MyBlogs />} />
                            {/* <Route path="/add-blog" element={<BlogForm />} /> */}
                            <Route path="/addblog" element={<AddBlog />} />
                            <Route path="/blog/edit/:id" element={<EditBlog />} />
                        </Route>
                    </Routes>
                </div>
            </div>

            {/* Show Footer only when Primary Navbar is visible */}
            {!dashboardRoutes.includes(location.pathname) && <Footer />}
        </>
    );
};

export default MainLayout;

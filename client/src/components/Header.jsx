import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo2.png";
import Navbar from "./HeaderNavbar";

const Header = () => {
  // State to determine if the header should shrink
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get current route
  const location = useLocation();
  const currentPath = location.pathname;

  // Define titles for static routes
  const pageTitles = {
    "/": "All Blogs",
    "/profile": "Profile",
    "/login": "Login",
    "/signup": "Sign Up",
    "/my-blogs": "My Blogs",
    "/create-blog": "Create new Blog",
    "/update-profile": "Update Profile"
  };

  // Handle dynamic routes like "/post/:id"
  let pageTitle = pageTitles[currentPath] || "";
  if (currentPath.startsWith("/post/")) {
    pageTitle = "Blog Details"; // ✅ This will show "Blog Details" for any post ID
  }
  if (currentPath.startsWith("/my-blog/")) {
    pageTitle = "My Insight Log"; // ✅ This will show "Blog Details" for any post ID
  }
  if (currentPath.startsWith("/edit-blog/")) {
    pageTitle = "Update Blog"; // ✅ This will show "Blog Details" for any post ID
  }

  // Shrink header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle function for menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50 bg-[#1D503A] flex items-center px-20 
          transition-all duration-300 ${isScrolled ? "py-2 shadow-md" : "py-4"}
        `}
      >
        {/* Left: Logo */}
        <Link to="/" className="flex-1">
          <img
            src={logo}
            alt="Lofticore Logo"
            className={`transition-all duration-300 ${
              isScrolled ? "w-[140px]" : "w-[170.888px]"
            }`}
          />
        </Link>

        {/* Center: Page Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-white text-2xl font-light font-serif">
          {pageTitle}
        </div>

        {/* Right: Menu Icon */}
        <div className="flex items-center gap-20">
          <div className="relative group" onClick={toggleMenu}>
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white 
                           transition-colors duration-300 hover:border-transparent cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white group-hover:text-[#F2C0DD] transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </div>
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm px-2 py-1 rounded">
              Menu
            </div>
          </div>

          {/* Render Navbar */}
          <Navbar isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </header>
    </>
  );
};

export default Header;

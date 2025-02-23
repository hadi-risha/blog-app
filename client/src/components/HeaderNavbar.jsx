import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = ({ isOpen, toggleMenu }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    setShowLogoutModal(false); // Close modal
    // navigate("/login"); // Redirect to login

    window.location.reload(); // ✅ Reload the page after logout

  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0"
          onClick={toggleMenu}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)", // for Safari
          }}
        ></div>
      )}

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="pt-20 fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-10 z-50"
      >
        <button className="absolute top-4 right-4" onClick={toggleMenu}>
          <X size={20} className="mt-7 mr-10 cursor-pointer" />
        </button>
        <ul className="mt-10 space-y-4 text-lg">
          <li className="group">
            <Link
              to="/"
              onClick={toggleMenu}
              className="flex items-center cursor-pointer font-serif text-2xl"
            >
              <span className="mr-3 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                •
              </span>
              Home
            </Link>
          </li>
          <li className="group">
            <Link
              to="/my-blogs"
              onClick={toggleMenu}
              className="flex items-center cursor-pointer font-serif text-2xl"
            >
              <span className="mr-3 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                •
              </span>
              My Blogs
            </Link>
          </li>
          {/* <li className="group">
            <Link
              to="/orders"
              onClick={toggleMenu}
              className="flex items-center cursor-pointer font-serif text-2xl"
            >
              <span className="mr-3 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                •
              </span>
              Orders
            </Link>
          </li>
          <li className="group">
            <Link
              to="/wallet"
              onClick={toggleMenu}
              className="flex items-center cursor-pointer font-serif text-2xl"
            >
              <span className="mr-3 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                •
              </span>
              Wallet
            </Link>
          </li> */}
        </ul>

        <hr className="mt-28 text-gray-400" />

        <ul className="mt-10 space-y-4 text-lg">
          <li className="group">
            <Link
              to="/profile"
              onClick={toggleMenu}
              className="flex items-center cursor-pointer font-serif text-lg"
            >
              <span className="mr-3 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                •
              </span>
              Profile
            </Link>
          </li>
          <li className="group">
            <Link
              to="/create-blog"
              onClick={toggleMenu}
              className="flex items-center cursor-pointer font-serif text-lg"
            >
              <span className="mr-3 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                •
              </span>
              Create new Blog
            </Link>
          </li>
          {/* <li className="group">
            <Link
              to="/reset-password"
              onClick={toggleMenu}
              className="flex items-center cursor-pointer font-serif text-lg"
            >
              <span className="mr-3 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                •
              </span>
              Reset Password
            </Link>
          </li> */}
          {/* Logout Button */}
          <li className="group">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center cursor-pointer font-serif text-lg text-red-500"
            >
              <span className="mr-3 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                •
              </span>
              Log out
            </button>
          </li>
        </ul>
      </motion.div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xl bg-transparent">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

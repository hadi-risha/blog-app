import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js"; // Import axios instance
import toast from "react-hot-toast";

const Post = () => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate(); // Initialize navigation
  const [post, setPost] = useState(null); // Store fetched blog
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch blog details when component mounts
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blog/${id}`);
        console.log("Fetched blog:", response.data.blog);
        setPost(response.data.blog); // Store blog data
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error(error.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Show loading message
  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">Loading post...</div>
    );
  }

  // Show error message if post not found
  if (!post) {
    return <div className="text-center text-red-500 mt-10">Post not found</div>;
  }

  // Format date
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-[#FAF6EF] min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 cursor-pointer"
        >
          Go Back
        </button>

        {/* Post Content */}
        <img
          className="w-full h-64 object-cover rounded-t-lg"
          src={post.image?.url}
          alt="Blog cover"
        />
        <h1 className="text-3xl font-bold mt-6">{post.title}</h1>
        <p className="mt-4 text-gray-600">{post.content}</p>
        <div className="mt-6 text-sm text-gray-500">
          <p>Date: {formattedDate}</p>
          <p>Author: {post.userId?.name || "Unknown"}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;

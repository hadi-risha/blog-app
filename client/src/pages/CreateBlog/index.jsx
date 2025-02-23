import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance"; // Import axios instance
import toast from "react-hot-toast";

const CreateBlog = () => {
  const navigate = useNavigate();

  // State for form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Validation states to highlight empty fields
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isContentValid, setIsContentValid] = useState(true);
  const [isImageValid, setIsImageValid] = useState(true);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
      setIsImageValid(true); // Remove error highlight
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading

    // Validation
    let isValid = true;

    if (!title.trim()) {
      setIsTitleValid(false);
      toast.error("Title is required");
      isValid = false;
    } else {
      setIsTitleValid(true);
    }

    if (!content.trim()) {
      setIsContentValid(false);
      toast.error("Content is required");
      isValid = false;
    } else {
      setIsContentValid(true);
    }

    if (!image) {
      setIsImageValid(false);
      toast.error("Please upload an image");
      isValid = false;
    } else {
      setIsImageValid(true);
    }

    if (!isValid) return; // Stop submission if validation fails

    // Create form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("coverImage", image);

    try {
      const response = await axiosInstance.post("/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("response in createblog---", response);
      
      toast.success("Blog created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(error.response?.data?.message || "Failed to create blog");
    }
  };

  return (
    <div className="bg-[#FAF6EF] min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Go Back
        </button>

        <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>

        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                isTitleValid ? "focus:ring-indigo-500" : "border-red-500"
              }`}
              placeholder="Enter blog title"
            />
          </div>

          {/* Content Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                isContentValid ? "focus:ring-indigo-500" : "border-red-500"
              }`}
              rows="6"
              placeholder="Write your blog content here"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                isImageValid ? "focus:ring-indigo-500" : "border-red-500"
              }`}
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

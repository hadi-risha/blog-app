import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageStatus, setImageStatus] = useState("unchanged"); // Track image change

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blog/${id}`);
        console.log("Fetched blog:", response.data.blog);
        const blogData = response.data.blog;

        setPost(blogData);
        setTitle(blogData.title);
        setContent(blogData.content);
        setImagePreview(blogData.image?.url || "");
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error(error.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-gray-500 mt-10">Loading post...</div>
    );
  if (!post)
    return (
      <div className="text-center text-2xl font-semibold mt-10">
        Post not found
      </div>
    );

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageStatus("updated"); // Mark image as updated
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return toast.error("Title is required");
    if (!content.trim()) return toast.error("Content is required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("blogId", id);
    formData.append("imageStatus", imageStatus);

    if (image) {
      formData.append("coverImage", image);
    }

    try {
      const response = await axiosInstance.put("/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Updated Blog:", response.data.updatedBlog);
      toast.success("Blog updated successfully!");
      navigate(`/my-blog/${id}`);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error.response?.data?.message || "Failed to update blog");
    }
  };

  return (
    <div className="bg-[#FAF6EF] min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
        >
          Go Back
        </button>

        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="6"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;

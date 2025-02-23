import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // State variables
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageStatus, setImageStatus] = useState("unchanged");

  // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        const userData = response.data.profile;

        setProfile(userData);
        setName(userData.name);
        setImagePreview(userData.image?.url || "");
      } catch (error) {
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageStatus("updated");
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle Image Delete
  const handleDeleteImage = () => {
    setImageStatus("deleted");
    setImage(null);
    setImagePreview("");
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Name is required");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("imageStatus", imageStatus);

    if (image) {
      formData.append("profilePic", image);
    }

    try {
      const response = await axiosInstance.put("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-500 mt-10">Loading profile...</div>
    );

  return (
    <div className="pt-20 pb-96 bg-[#042030] flex justify-center">
      <div className="max-w-md mx-auto bg-gray-800 py-8 p-20 rounded-lg shadow-md">
        {/* <h2 className="text-2xl font-bold text-white mb-6">
          Update Your Profile
        </h2> */}
        <div className=" flex space-x-6">
          {/* back button */}
          <Link to={"/profile"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="#b3adad"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={48}
                d="M328 112L184 256l144 144"
              ></path>
            </svg>
          </Link>

          <h2 class="text-2xl font-bold text-white mb-3">Update Profile</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile Image Preview */}
          {/* <div className="mb-4 flex flex-col items-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={150}
                height={150}
                viewBox="0 0 512 512"
              >
                <path
                  fill="#fffcf6"
                  fillRule="evenodd"
                  d="M256 42.667A213.333 213.333 0 0 1 469.334 256c0 117.821-95.513 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334C42.667 138.18 138.18 42.667 256 42.667m21.334 234.667h-42.667c-52.815 0-98.158 31.987-117.715 77.648c30.944 43.391 81.692 71.685 139.048 71.685s108.104-28.294 139.049-71.688c-19.557-45.658-64.9-77.645-117.715-77.645M256 106.667c-35.346 0-64 28.654-64 64s28.654 64 64 64s64-28.654 64-64s-28.653-64-64-64"
                  strokeWidth={13}
                  stroke="#fff"
                />
              </svg>
            )}

            <div className="mt-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {imagePreview && (
              <button
                onClick={handleDeleteImage}
                type="button"
                className="mt-2 mb-7 text-white px-3 py-1 rounded"
              >
                <div className="flex space-x-3.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#eb2e2e"
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                      strokeWidth={0.5}
                      stroke="#eb2e2e"
                    ></path>
                  </svg>
                  Remove Image
                </div>
              </button>
            )}
          </div> */}
          {/* Profile Image Section */}
          <div className="mt-10 flex flex-col items-center">
            {/* Styled File Input */}
            <label className="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition mb-3">
              {/* Upload Image */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="#fff9f9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                >
                  <path d="M12 20H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1a2 2 0 0 0 2-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5"></path>
                  <path d="M12 16a3 3 0 1 0 0-6a3 3 0 0 0 0 6m7 6v-6m3 3l-3-3l-3 3"></path>
                </g>
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* Image Preview */}
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={80}
                height={80}
                viewBox="0 0 512 512"
              >
                <path
                  fill="#fffcf6"
                  fillRule="evenodd"
                  d="M256 42.667A213.333 213.333 0 0 1 469.334 256c0 117.821-95.513 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334C42.667 138.18 138.18 42.667 256 42.667m21.334 234.667h-42.667c-52.815 0-98.158 31.987-117.715 77.648c30.944 43.391 81.692 71.685 139.048 71.685s108.104-28.294 139.049-71.688c-19.557-45.658-64.9-77.645-117.715-77.645M256 106.667c-35.346 0-64 28.654-64 64s28.654 64 64 64s64-28.654 64-64s-28.653-64-64-64"
                  strokeWidth={13}
                  stroke="#fff"
                />
              </svg>
            )}

            {/* Remove Image Button */}
            {imagePreview && (
              <button
                onClick={handleDeleteImage}
                type="button"
                className="mt-2 text-white px-3 py-1 rounded"
              >
                <div className="flex space-x-3.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#eb2e2e"
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                      strokeWidth={0.5}
                      stroke="#eb2e2e"
                    ></path>
                  </svg>
                </div>
              </button>
            )}
          </div>

          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-full hover:opacity-80 cursor-pointer"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

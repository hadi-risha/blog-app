import React, { useEffect, useState } from 'react'
import blogger from "../../assets/blogger.png";
import axiosInstance from '../../utils/axiosInstance.js';
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';


const Profile = () => {
  const [profile, setProfile] = useState(null); // Store fetched blog
  const [loading, setLoading] = useState(true); // Track loading state
  
  const [blogCount, setBlogCount] = useState(null); 

  // Fetch blog details when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`/profile`);
        console.log("Fetched profile:", response.data.profile);
        setProfile(response.data.profile); // Store blog data
        setBlogCount(response.data.blogCount);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error(error.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Show loading message
  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">Loading profile...</div>
    );
  }

  // Show error message if post not found
  if (!profile) {
    return (
      <div className="text-center text-red-500 mt-10">Profile not found</div>
    );
  }

  return (
    <div className="bg-[#042030] min-h-screen flex pt-20 justify-center">
      {/* Profile Section */}
      <div className="w-auto flex flex-col items-center text-center space-y-8">
        <h1 className="text-4xl font-semibold font-serif text-[#FF3CFF]">
          {profile?.name}
        </h1>

        <div className="ml-10 flex space-x-7">
          {profile?.image?.url ? (
            <img
              src={profile.image.url}
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
              ></path>
            </svg>
          )}
          {/* edit nutton */}
          <Link to={"/update-profile"}>
            <svg
            className='cursor-pointer'
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 32 32"
            >
              <path
                fill="#fffcf6"
                d="M28.565 3.434a4.89 4.89 0 0 0-6.915 0L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l17.295-17.295a4.89 4.89 0 0 0 0-6.914m-5.5 1.414a2.89 2.89 0 0 1 4.085 4.086l-.9.9l-4.086-4.085zm-2.316 2.315l4.086 4.086L9.857 26.23a1.7 1.7 0 0 1-.846.46L4.3 27.7l1.01-4.71a1.7 1.7 0 0 1 .46-.846z"
                strokeWidth={1}
                stroke="#fff"
              ></path>
            </svg>
          </Link>
        </div>

        <p className="text-xl font-extralight font-serif text-[#FF3CFF]">
          Blogger
        </p>

        <p className="text-xl font-extralight font-serif text-white">
          {profile?.email}
        </p>
        <p className="text-xl font-extralight font-serif text-white">
          {blogCount} Blogs
        </p>
      </div>
    </div>
  );
}

export default Profile;

import React, { useEffect, useState } from "react";
import "./style.css";
import img1 from "../../assets/img1.png";
import MyBlogCard from "../../components/MyBlogCard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";

const MyBlogs = () => {
  const [posts, setPosts] = useState([]); // Store blogs from API
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4; // Number of posts per page

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/my-blogs"); // Fetch from backend
        console.log("Fetched blogs:", response.data.blogs);
        setPosts(response.data.blogs); // Store blogs in state
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error(error.response?.data?.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="bg-[#FAF6EF] min-h-screen w-full overflow-x-hidden">
        <div className="mt-10 flex flex-col items-center">
          {/* {currentPosts.map((post) => (
            <MyBlogCard
              key={post._id}
              title={post.title}
              content={post.content}
              date={post.date}
              author={post.author}
              image={post.image}
              _id={post._id}
            />
          ))} */}

          {currentPosts.map((post) => {
            // Convert createdAt to a readable date format
            const formattedDate = new Date(post?.createdAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );

            return (
              <MyBlogCard
                key={post?._id}
                title={post?.title}
                content={post?.content}
                date={formattedDate} // Pass formatted date
                // author={post?.userId?.name}
                image={post?.image?.url}
                _id={post?._id}
              />
            );
          })}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center space-x-4 my-8">
          {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white"
                } transition-colors duration-300`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default MyBlogs;

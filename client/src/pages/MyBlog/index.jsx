import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import img1 from "../../assets/img1.png";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; // Icons
import axiosInstance from "../../utils/axiosInstance.js";
import toast from "react-hot-toast"; // Import toast for notifications

const MyBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Delete Modal State

  const [post, setPost] = useState(null); // Store fetched blog
  const [loading, setLoading] = useState(true); // Track loading state

  // const posts = [
  //   {
  //     _id: 1,
  //     title: "How Chat GPT and Other AI Tools Can Transform Our World",
  //     content: "Have you heard about the new AI tool called ChatGPT?...",
  //     date: "2023-01-07",
  //     author: "Susan",
  //     image: img1,
  //   },
  //   {
  //     _id: 2,
  //     title: "The number one lesson Product Management has taught me",
  //     content: "An engineer on my team once asked me...",
  //     date: "2023-01-07",
  //     author: "David",
  //     image: img1,
  //   },
  // ];

  // const post = posts.find((p) => p._id === parseInt(id));

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

  if (!post) {
    return (
      <div className="text-center text-2xl font-semibold mt-10">
        Post not found
      </div>
    );
  }

  // Show loading message
  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">Loading post...</div>
    );
  }

  // Format date
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Handler for deleting the blog
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  // Confirm delete function
  const confirmDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/blog/${post._id}`);
      console.log("Blog deleted:", response.data.deletedBlog);
      toast.success("Blog successfully deleted"); // ✅ Show success message

      navigate("/"); // ✅ Redirect to home after delete
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error(error.response?.data?.message || "Failed to delete blog"); // ✅ Show error message
    } finally {
      setShowDeleteModal(false); // ✅ Close modal (if applicable)
    }
  };

  return (
    <div className="bg-[#FAF6EF] min-h-screen p-8 relative">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 relative">
        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-300"
        >
          Go Back
        </button>

        {/* Blog Image */}
        <img
          className="w-full h-64 object-cover rounded-t-lg"
          src={post.image?.url}
          alt="Blog cover"
        />

        {/* Blog Title & Content */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="mt-4 text-gray-600">{post.content}</p>
        </div>

        {/* Blog Details */}
        <div className="mt-6 text-sm text-gray-500">
          <p>Date: {formattedDate}</p>
          <p>Author: {post.userId?.name}</p>
        </div>

        {/* Edit & Delete Buttons */}
        <div className="absolute top-4 right-4 flex space-x-4">
          {/* Edit Button */}
          <button
            onClick={() => navigate(`/edit-blog/${post._id}`)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
            title="Edit Post"
          >
            <AiOutlineEdit size={22} />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
            title="Delete Post"
          >
            <AiOutlineDelete size={22} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-white/30">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-center">
            <h2 className="text-xl font-semibold">
              Are you sure you want to delete this blog?
            </h2>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-105 transition-all duration-300"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 hover:scale-105 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlog;

// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import img1 from "../../assets/img1.png";
// import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; // Icons

// const MyBlog = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [showDeleteModal, setShowDeleteModal] = useState(false); // Delete Modal State

//   const posts = [
//     { _id: 1, title: "How Chat GPT and Other AI Tools Can Transform Our World", content: "Have you heard about the new AI tool called ChatGPT?...", date: "2023-01-07", author: "Susan", image: img1 },
//     { _id: 2, title: "The number one lesson Product Management has taught me", content: "An engineer on my team once asked me...", date: "2023-01-07", author: "David", image: img1 },
//   ];

//   const post = posts.find((p) => p._id === parseInt(id));

//   if (!post) {
//     return <div className="text-center text-2xl font-semibold mt-10">Post not found</div>;
//   }

//   // Handler for deleting the blog
//   const handleDelete = () => {
//     setShowDeleteModal(true);
//   };

//   // Confirm delete function
//   const confirmDelete = () => {
//     console.log("Blog deleted:", post._id);
//     setShowDeleteModal(false);
//     navigate("/my-blogs"); // Redirect to home after delete
//   };

//   return (
//     <div className="bg-[#FAF6EF] min-h-screen p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 relative">
//         {/* Go Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-300"
//         >
//           Go Back
//         </button>

//         {/* Blog Image */}
//         <img className="w-full h-64 object-cover rounded-t-lg" src={post.image} alt="Blog cover" />

//         {/* Blog Title & Content */}
//         <div className="mt-6">
//           <h1 className="text-3xl font-bold">{post.title}</h1>
//           <p className="mt-4 text-gray-600">{post.content}</p>
//         </div>

//         {/* Blog Details */}
//         <div className="mt-6 text-sm text-gray-500">
//           <p>Date: {post.date}</p>
//           <p>Author: {post.author}</p>
//         </div>

//         {/* Edit & Delete Buttons */}
//         <div className="absolute top-4 right-4 flex space-x-4">
//           {/* Edit Button */}
//           <button
//             onClick={() => navigate(`/edit-blog/${post._id}`)}
//             className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
//             title="Edit Post"
//           >
//             <AiOutlineEdit size={22} />
//           </button>

//           {/* Delete Button */}
//           <button
//             onClick={handleDelete}
//             className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
//             title="Delete Post"
//           >
//             <AiOutlineDelete size={22} />
//           </button>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
//             <h2 className="text-xl font-semibold">Are you sure you want to delete this blog?</h2>
//             <div className="flex justify-center mt-4 space-x-4">
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBlog;

// // import React from "react";
// // import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
// // import img1 from "../../assets/img1.png";

// // const MyBlog = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate(); // Initialize useNavigate

// //   const posts = [
// //       {
// //         _id: 1,
// //         title: "How Chat GPT and Other AI Tools Can Transform Our World",
// //         content:
// //           "Have you heard about the new AI tool called ChatGPT? It stands for Generative Pre-trained Transformer, and it’s a robot you can talk to and have a conversation with.",
// //         date: "2023-01-07 11:03:14",
// //         author: "Susan",
// //         image: img1,
// //       },
// //       {
// //         _id: 2,
// //         title: "The number one lesson Product Management has taught me",
// //         content:
// //           "An engineer on my team once asked me, what is our team’s number one priority? A question dreaded by product managers. I gave a rather PM answer: we have a team of five engineers so we can parallelize the work, and each individual contributor has their number one priority.",
// //         date: "2023-01-07 11:00:01",
// //         author: "David",
// //         image: img1,
// //       },
// //       {
// //         _id: 3,
// //         title: "The number one lesson Product Management has taught me",
// //         content:
// //           "An engineer on my team once asked me, what is our team’s number one priority? A question dreaded by product managers. I gave a rather PM answer: we have a team of five engineers so we can parallelize the work, and each individual contributor has their number one priority.",
// //         date: "2023-01-07 11:00:01",
// //         author: "David",
// //         image: img1,
// //       },
// //       {
// //         _id: 4,
// //         title: "The number one lesson Product Management has taught me",
// //         content:
// //           "An engineer on my team once asked me, what is our team’s number one priority? A question dreaded by product managers. I gave a rather PM answer: we have a team of five engineers so we can parallelize the work, and each individual contributor has their number one priority.",
// //         date: "2023-01-07 11:00:01",
// //         author: "David",
// //         image: img1,
// //       },
// //       {
// //         _id: 5,
// //         title: "The number one lesson Product Management has taught me",
// //         content:
// //           "An engineer on my team once asked me, what is our team’s number one priority? A question dreaded by product managers. I gave a rather PM answer: we have a team of five engineers so we can parallelize the work, and each individual contributor has their number one priority.",
// //         date: "2023-01-07 11:00:01",
// //         author: "David",
// //         image: img1,
// //       },
// //       {
// //         _id: 6,
// //         title: "The number one lesson Product Management has taught me",
// //         content:
// //           "An engineer on my team once asked me, what is our team’s number one priority? A question dreaded by product managers. I gave a rather PM answer: we have a team of five engineers so we can parallelize the work, and each individual contributor has their number one priority.",
// //         date: "2023-01-07 11:00:01",
// //         author: "David",
// //         image: img1,
// //       },
// //       // Add more posts as needed
// //     ];

// //   const post = posts.find((p) => p._id === parseInt(id));

// //   if (!post) {
// //     return <div>Post not found</div>;
// //   }

// //   return (
// //     <div className="bg-[#FAF6EF] min-h-screen p-8">
// //       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
// //         {/* Go Back Button */}
// //         <button
// //           onClick={() => navigate(-1)} // Go back to the previous page
// //           className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
// //         >
// //           Go Back
// //         </button>

// //         {/* Post Content */}
// //         <img
// //           className="w-full h-64 object-cover rounded-t-lg"
// //           src={post.image}
// //           alt="Blog cover"
// //         />
// //         <h1 className="text-3xl font-bold mt-6">{post.title}</h1>
// //         <p className="mt-4 text-gray-600">{post.content}</p>
// //         <div className="mt-6 text-sm text-gray-500">
// //           <p>Date: {post.date}</p>
// //           <p>Author: {post.author}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MyBlog;

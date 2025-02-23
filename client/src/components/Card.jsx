import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, content, date, author, image, _id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${_id}`); // Redirect to the single post page
  };

  return (
    <div
      className="relative max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden
             md:max-w-2xl m-4 cursor-pointer transform transition-all duration-500 ease-in-out
             hover:shadow-2xl hover:scale-105 before:absolute before:inset-0 before:bg-gradient-radial
             before:from-transparent before:to-indigo-100 before:opacity-0 hover:before:opacity-100
             before:transition-opacity before:duration-500"
      onClick={handleClick}
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48 transition-transform duration-500 ease-out hover:scale-110"
            src={image}
            alt="Blog cover"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {title}
          </div>
          <p className="mt-2 text-gray-500 line-clamp-5">{content}</p>
          <div className="mt-4">
            <div className="text-sm text-gray-600">Date: {date}</div>
            <div className="text-sm text-gray-600">Author: {author}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React,{ useState,useEffect } from 'react'
import { motion } from "framer-motion";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const QuoteCard = ({ quote, author, onLike, onDislike, liked, disliked, dislike, like }) => (
  <motion.div
    className="bg-white shadow-xl rounded-2xl p-6 mb-6 transition-transform duration-300 hover:scale-105"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <p className="text-xl font-semibold text-gray-800 italic mb-4">"{quote}"</p>
    <p className="text-right text-sm text-gray-500 mb-4">- {author || "Unknown"}</p>
    <div className="flex justify-center gap-6">
      <button
        className={`text-green-600 text-xl hover:scale-110 transition-transform ${liked ? "scale-125" : ""}`}
        onClick={onLike}
      >
        {like} <FaThumbsUp />
      </button>
      <button
        className={`text-red-600 text-xl hover:scale-110 transition-transform ${disliked ? "scale-125" : ""}`}
        onClick={onDislike}
      >
        {dislike} <FaThumbsDown />
      </button>
    </div>
  </motion.div>
);

export default QuoteCard;

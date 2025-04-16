import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import QuoteCard from './components/QuoteCard';
import { motion } from "framer-motion";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link }  from 'react-router-dom';


const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [author, setAuthor] = useState(null);
  const [quoteOfTheDay, setQuoteOfTheDay] = useState({});
  const [topQuote, setTopQuote] = useState({});

  const fetchRandomQuote = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/quote/quote`);
      const quoteOfTheDay = res.data;
      console.log("this is res.data ", res.data);
      const author = res.data.author;
      setAuthor(author);
      setQuoteOfTheDay(quoteOfTheDay);
      setQuotes(prevQuotes => [...prevQuotes, quoteOfTheDay]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTopQuote = async () =>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/quote/top-quote`);
      setTopQuote(response.data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTopQuote();
  }
  , []);

  const fetchAllQuotes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/quote/all-quotes`);
      setQuotes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllQuotes();
  }, []);

  const handleLike = (id) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) => {
        if (quote._id === id) {
          if (quote.liked) {
            return { ...quote, likes: quote.likes - 1, liked: false };
          } else {
            return { ...quote, likes: quote.likes + 1, liked: true, disliked: false };
          }
        }
        return quote;
      })
    );
    if (quoteOfTheDay._id === id) {
      if (quoteOfTheDay.liked) {
        setQuoteOfTheDay({ ...quoteOfTheDay, likes: quoteOfTheDay.likes - 1, liked: false });
      } else {
        setQuoteOfTheDay({ ...quoteOfTheDay, likes: quoteOfTheDay.likes + 1, liked: true, disliked: false });
      }
    }
  };

  const handleDislike = (id) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) => {
        if (quote._id === id) {
          if (quote.disliked) {
            return { ...quote, dislikes: quote.dislikes - 1, disliked: false };
          } else {
            return { ...quote, dislikes: quote.dislikes + 1, disliked: true, liked: false };
          }
        }
        return quote;
      })
    );
    if (quoteOfTheDay._id === id) {
      if (quoteOfTheDay.disliked) {
        setQuoteOfTheDay({ ...quoteOfTheDay, dislikes: quoteOfTheDay.dislikes - 1, disliked: false });
      } else {
        setQuoteOfTheDay({ ...quoteOfTheDay, dislikes: quoteOfTheDay.dislikes + 1, disliked: true, liked: false });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-6 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">🌈 Daily Dose of Wisdom 🌈</h1>
        <button
          onClick={fetchRandomQuote}
          className="mt-4 px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 transition"
        >
          Get New Quote
        </button>
      </header>

      {quoteOfTheDay && (
        <motion.div
          className="max-w-3xl mx-auto bg-gradient-to-br from-pink-100 to-yellow-100 rounded-xl p-8 mb-12 shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-6 animate-pulse">✨ Quote of the Day ✨</h2>
          <QuoteCard
            quote={quoteOfTheDay.quote}
            author={author}
            like={quoteOfTheDay.likes}
            dislike={quoteOfTheDay.dislikes}
            onLike={() => handleLike(quoteOfTheDay._id)}
            onDislike={() => handleDislike(quoteOfTheDay._id)}
            liked={quoteOfTheDay.liked}
            disliked={quoteOfTheDay.disliked}
          />
        </motion.div>
      )}

      <motion.div
        className="max-w-4xl mx-auto bg-white bg-opacity-70 rounded-xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className='flex justify-between items-center mb-4'>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">📚 More Quotes You've Seen</h3>
        </div>
        
        <div className="space-y-4">
          {quotes.slice(1).map((q) => (
            <QuoteCard
              like={q.likes}
              dislike={q.dislikes}
              key={q._id}
              quote={q.quote}
              author={q.author}
              liked={q.liked}
              disliked={q.disliked}
              onLike={() => handleLike(q._id)}
              onDislike={() => handleDislike(q._id)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default App;

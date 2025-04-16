const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    quote: String,
    author: String,
    category: String,
    likes:{
        type: Number,
        default: 0
    },
    dislikes:{
        type: Number,
        default: 0
    },
    liked: {
        type: Boolean,
        default: false
    },
    disliked: {
        type: Boolean,
        default: false
    }
})

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
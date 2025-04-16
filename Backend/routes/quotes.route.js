const express = require('express');
const router = express.Router();
const Quote = require('../model/quotes.model.js');
const axios = require('axios');


// Get all quotes
router.get('/quote',async (req,res)=>{
    try{
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes',{
            headers: {
                'X-Api-Key': process.env.API_KEY,
            }
        })
        const { quote, author,category } = response.data[0]
        const newQuote = new Quote({
            quote,
            author,
            category
        })
        await newQuote.save()

        const quotes = response.data;
        
        if(!quotes || quotes.length === 0){
            return res.status(404).json({message: 'No quotes found'})
        }
        
        console.log(quotes)
        res.status(200).json(newQuote)
    }catch{
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.post('/like/:id', async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        
        if(quote.liked){
            quote.likes -= 1;
            quote.liked = false;
        }
        quote.likes += 1;
        quote.liked = true;
        await quote.save();
        res.status(200).json({ message: 'Quote liked successfully', quote });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

router.post('/dislike/:id', async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        if(quote.disliked){
            quote.likes -= 1;
            quote.dislikes -= 1;
            quote.disliked = false;
        }
        quote.dislikes += 1;
        quote.disliked = true;
        await quote.save();
        res.status(200).json({ message: 'Quote disliked successfully', quote });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

router.get('/all-quotes',async (req,res)=>{
    try{
        const quotes = await Quote.find()
        if(!quotes || quotes.length === 0){
            return res.status(404).json({message: 'No quotes found'})
        }
        res.status(200).json(quotes)
    }catch{ 
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.get('/top-quotes',async(req,res)=>{
    try{
        const quotes = await Quote.find().sort({likes: -1}).limit(5)
        if(!quotes || quotes.length === 0){
            return res.status(404).json({message: 'No quotes found'})
        }
        res.status(200).json(quotes)
    }catch(err){
        res.status(500).json({message: 'Internal Server Error'})
    }
})
module.exports = router;
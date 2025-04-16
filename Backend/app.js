const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db.js');
const quotesRoute = require('./routes/quotes.route.js');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hellooo');
});

app.use('/quote', quotesRoute);

module.exports = app;
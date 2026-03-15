//imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//routes
const userRoutes = require('../controller(api)/userRoutes');
const bookRoutes = require('../controller(api)/bookRoutes');

//app
const app = express();

//middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.static('frontend'));

//routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

//server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
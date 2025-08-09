const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN 
// || 'mongodb://localhost:27017/mern-auth-db';

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })
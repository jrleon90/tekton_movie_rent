require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true})
.then(()=> console.log(`Connected to MongoDB at ${process.env.MONGODB_URL}`))
.catch((err)=> console.log(`MongoDB Error: ${err}`));

const port = process.env.PORT || '3000';

//Start server
const server = app.listen(port, () => {
    console.log('Express server listening on Port: ' + port);
});
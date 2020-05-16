const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
//Import Routes
const authRoute = require('./routes/auth.js');
const postRoute = require('./routes/posts.js');

dotenv.config();

//using mongoose database connectivity
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, (err, db) => {
    if (err) {
        console.log("database connection error ", err);
        throw err;
    } else {
        console.log("Database connected");
    }
});

//Middleware
app.use(express.json());
app.use(expressLayouts)
//Ejs engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
//Route Middleware
app.use('/api/users', authRoute);
app.use('/api/users', postRoute);

app.listen(3000, () => { console.log('Server started on port 3000') });
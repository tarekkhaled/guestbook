// imports 
const express = require('express');
const cookieParser = require('cookie-parser');
const connect = require ('./utilities/db');
require('dotenv').config();

const app = express();

// routers 
const authRoutes = require('./utilities/auth/auth.routers');  


// middlewares 
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());


// Routes
app.use('/auth',authRoutes);

async function startServer () {
    try {
        await connect (process.env.DATABASE,process.env.PORT);
        app.listen(process.env.PORT,() => {
            console.log(`REST API on http://localhost:${process.env.PORT}/api`)
        })
    } catch (e) {
        console.error(e);
    }
}



module.exports = startServer;
    
// imports 
const express = require('express');
const cookieParser = require('cookie-parser');
const connect = require ('./utilities/db');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// routers 
const authRoutes = require('./utilities/auth/auth.routers'); 
const messagesRoutes = require('./resources/messages/message.routers');
const { permission } = require('./utilities/security');


// middlewares 
app.use('/api',permission);
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());


// Routes
app.use('/auth',authRoutes);
app.use('/api/messages',messagesRoutes);

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
    
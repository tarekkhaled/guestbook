async function startServer () {
    
  // imports 
  const express = require('express');
  const cookieParser = require('cookie-parser');
  const connect = require ('./utilities/db');
  require('dotenv').config();
  
  const app = express();
  
  // routers 
//   const authRoutes = require('./utilities/auth/auth.routers');  
  
  
  // middlewares 
  app.use(express.urlencoded({extended:false}));
  app.use(express.json());
  app.use(cookieParser());
  
  
  // Routes
//   app.use('/auth',authRoutes);
  await connect (process.env.DATABASE,process.env.PORT);
  
}
     

module.exports = startServer;
    
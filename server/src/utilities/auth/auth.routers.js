const express = require('express');
const router = express.Router();
const {signUserIn,signUserOut,signUserUp} = require('./auth.controllers');



// router.use('/login',signUserIn);
router.post('/signup',signUserUp)
router.use('/logout',signUserOut);


module.exports =  router;
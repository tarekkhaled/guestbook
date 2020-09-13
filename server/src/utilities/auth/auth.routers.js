const express = require('express');
const router = express.Router();
const {signUserIn,signUserOut,signUserUp} = require('./auth.controllers');



router.post('/login',signUserIn);
router.post('/signup',signUserUp)
router.get('/logout',signUserOut);


module.exports =  router;
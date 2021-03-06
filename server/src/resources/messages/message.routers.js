const express = require('express');
const routers = express.Router();
const { createMessage , 
    getAllMessages , 
    updateMessage ,
    replyToMessage,
    deleteMessage
} = require('./message.controllers');

routers.get('/',getAllMessages);
routers.patch('/:id',updateMessage);
routers.post('/',createMessage);
routers.delete('/:id',deleteMessage);
routers.post('/reply/:id',replyToMessage);

module.exports = routers;
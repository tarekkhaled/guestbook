const express = require('express');
const { createMessage } = require('./message.controllers');
const routers = express.Router();

// routers.get('/',getAllMessages);
// routers.patch('/',updateMessage);
routers.post('/',createMessage);
// routers.get('/me',getMyMessages);
// routers.post('/reply/:id',replyToMessage);

module.exports = routers;
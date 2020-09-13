const express = require('express');
const routers = express.Router();
const { createMessage } = require('./message.controllers');

// routers.get('/',getAllMessages);
// routers.patch('/',updateMessage);
routers.post('/',createMessage);
// routers.get('/me',getMyMessages);
// routers.post('/reply/:id',replyToMessage);

module.exports = routers;
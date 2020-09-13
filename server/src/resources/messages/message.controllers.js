const MessageModel = require('./message.model');

const createMessage = (req,res) => {
    const createdBy = req.user._id
    try {
      const doc = await model.create({ ...req.body, createdBy })
      res.status(201).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
}



module.exports = {
    createMessage
}
const MessageModel = require('./message.model');

const createMessage = async (req,res) => {
    const createdBy = req.user._id
    try {
      const doc = await MessageModel.create({ ...req.body, createdBy })
      res.status(201).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
}

const getAllMessages = async (req,res) => {
  try {
    const docs = await MessageModel
      .find()
      .populate('createdBy')
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const updateMessage = async (req,res) => {
  try {
    const updatedDoc = await MessageModel
      .findOneAndUpdate(
        {
          createdBy: req.user._id,
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const replyToMessage = async (req,res) => {
  try {
    const message = await MessageModel.findOne({_id: req.params.id})
        .lean()
        .exec()

      if (!message) {
        return res.status(400).end()
      }
      message.replies.push({...req.body,replyBy:req.user._id});
      res.status(200).json({
        success:true,
        message
      })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const deleteMessage = async (req,res) => {
  try {
    const removed = await MessageModel.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id
    })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }

}


module.exports = {
    createMessage,
    getAllMessages,
    updateMessage,
    replyToMessage,
    deleteMessage
}
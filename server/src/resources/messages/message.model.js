const mongoose = require('mongoose');

const messageScheme = new mongoose.Schema(
  {
    message: {
        type : String,
        required : true
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    replies: []
  },
  { timestamps: true }
)


module.exports =  mongoose.model('message', messageScheme)

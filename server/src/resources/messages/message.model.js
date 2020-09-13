const mongoose = require('mongoose');

const messageScheme = new mongoose.Schema(
  {
    message: {
        type : String,
        required : true
    },
    due: Date,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
  },
  { timestamps: true }
)


module.exports =  mongoose.model('message', messageScheme)

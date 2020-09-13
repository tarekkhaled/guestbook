const mongoose = require ('mongoose');

const userScheme = mongoose.Schema ({
  email: {
    type: String,
    unique: 1,
    required: true,
  },
  firstname: {
    type: String,
    maxlength: 100,
    required: true,
  },
  lastname: {
    type: String,
    maxlength: 100,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
});


module.exports = userScheme;
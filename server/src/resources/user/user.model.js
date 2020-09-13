const mongoose = require ('mongoose');
const {hashThePassword} = require('../../utilities/security');

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
    minlength: 4,
    required: true,
  },
});

userScheme.pre ('save', hashThePassword);


module.exports = mongoose.model('user',userScheme);
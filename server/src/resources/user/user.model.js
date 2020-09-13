const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

userScheme.methods.checkPassword = function (notHashedPassword) {
  const hashedPassword = this.password;
  return new Promise ((resolve, reject) => {
    bcrypt.compare (notHashedPassword, hashedPassword, (err, isMatch) => {
      if (err) return reject (err);
      resolve (isMatch);
    });
  });
};
module.exports = mongoose.model ('User', userScheme);

module.exports = mongoose.model('user',userScheme);
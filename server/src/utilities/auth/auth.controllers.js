const UserModel = require('../../resources/user/user.model');

const signUserUp = (req, res) => {
    
    try {
      const newUser = new UserModel (req.body);
      newUser.save ((err, doc) => {
        if (err) return res.status (200).json ({success: false, error: err});
        res.status (200).json ({
          success: true,
          data: doc,
        });
      });
    } catch (error) {
      res.status (400).json ({success: false, error: error});
    }
  };
  



module.exports = {
  signUserUp,
};

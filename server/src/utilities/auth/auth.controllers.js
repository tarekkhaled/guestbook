const UserModel = require('../../resources/user/user.model');
const {createToken,verifyToken} = require('../security');

const signUserUp = (req, res) => {
    
    try {
      const newUser = new UserModel (req.body);
      newUser.save ((err, doc) => {
        if (err) return res.status (200).json ({success: false, error: err});
        const token = createToken (newUser);
        res.cookie ('w_auth', token);  
        res.status (200).json ({
          success: true,
          data: doc,
        });
      });
    } catch (error) {
      console.error({error})
      res.status (400).json ({success: false, error: error});
    }
  };

  const signUserOut = (req, res) => {
    try {
      res.clearCookie ('w_auth');
      res.status (200).json ({
        success: true,
        message: 'User logged out successfully :(',
      });
    } catch (e) {
      res.status (400).json ({
        success: false,
        error: e,
      });
    }
  };
  
  



module.exports = {
  signUserUp,
  signUserOut
};

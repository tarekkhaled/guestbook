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
  



module.exports = {
  signUserUp,
};

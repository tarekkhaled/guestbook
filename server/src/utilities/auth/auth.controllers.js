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


const signUserIn = async (req, res) => {
  try {
    if(!req.body.email || !req.body.password)
      res.status(400).end();

    const user = await UserModel.findOne ({email: req.body.email});
    if (!user)
      return res.status (200).send ({
        success: false,
        message: 'Username not found !',
      });
    1;
    user
      .checkPassword (req.body.password)
      .then (isMatch => {
        if (!isMatch) {
          return res.status (200).send ({
            success: false,
            message: 'User Password not Matched !',
          });
        }
        const token = createToken (user);
        res.cookie ('w_auth', token).status (200).json ({
          success: true,
          user: user
        });
      })
      .catch (e => res.status (200).json ({success: false, error: e}));
  } catch (e) {
    console.log({error:e})
    res.status (400).json ({
      success: false,
      error: e,
    });
  }
};


const permission = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token);
    const user = await UserModel.findById(payload.id)
    .select('-password')
    .lean()
    .exec()

  if (!user) {
    return res.status(401).end()
  }

  req.user = user
  next()
  } catch (e) {
    return res.status(401).end()
  }

 
}

module.exports = {
  signUserUp,
  signUserOut,
  signUserIn,
  permission
};

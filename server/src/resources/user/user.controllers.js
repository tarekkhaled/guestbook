const UserModel = require ('./user.model');

// READ USER
const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById (req.params.id).select ('-password');
    if (!user)
      return res.status (404).json ({success: false, error: 'User not found!'});
    res.status (200).json ({success: true, data: user});
  } catch (error) {
    res.status (400).json ({success: false, error: error});
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const user = await UserModel.findOne ({
      username: req.params.username,
    }).select ('-password');
    if (!user)
      return res.status (200).json ({success: false, error: 'User not found!'});
    res.status (200).json ({
      success: true,
      data: user,
    });
  } catch (e) {
    res.status (400).json ({success: false, error: error});
  }
};

const checkThisUser = async (req, res) => {
  try {
    if (req.query.email) {
      const user = await UserModel.findOne ({
        email: req.query.email,
      }).select ('-password');
      if (!user)
        return res.status (200).json ({success: true, message: 'vaild user'});
      return res.status (200).json ({
        success: false,
        message: 'email already exists',
      });
    }
    if (req.query.username) {
      const user = await UserModel.findOne ({
        username: req.query.username,
      }).select ('-password');
      if (!user)
        return res.status (200).json ({success: true, message: 'vaild user'});
      return res.status (200).json ({
        success: false,
        message: 'username already exists',
      });
    }
  } catch (e) {
    res.status (400).json ({success: false, error: e});
  }
};
// UPDATE USER
const updateUser = async (req, res) => {
  try {
    let user = await UserModel.findById (req.params.id);
    if (!user)
      return res.status (404).json ({success: false, error: 'User not found!'});
    await user.updateOne ({...req.body});
    await user
      .save ()
      .then (res.status (200).json ({success: true, oldData: user}));
  } catch (error) {
    res.status (400).json ({success: false, error: error});
  }
};

// DELETE USER ::TODO
const deleteUser = (req, res) => {
  UserModel.findByIdAndRemove (req.params.id, (err, deletedUser) => {
    if (err) return res.status (400).json ({success: false, error: err});
    res.status (200).json ({
      success: true,
      data: deletedUser,
    });
  });
};

const addAvatar = async (req, res) => {
  try {
    let user = await UserModel.findById (req.user._id);
    if (req.files === undefined)
      return res
        .status (400)
        .json ({success: false, err: 'No image has been uploaded !'});
    if (req.files['user_profile_picture']) {
      req.files['user_profile_picture'][0].path =
        '/image/' + req.files['user_profile_picture'][0].filename;
      user.profilePicture = req.files['user_profile_picture'][0];
    }
    if (req.files['user_cover_picture']) {
      req.files['user_cover_picture'][0].path =
        '/image/' + req.files['user_cover_picture'][0].filename;
      user.coverPicture = req.files['user_cover_picture'][0];
    }
    await user.save ();
    res.status (200).json ({success: true, data: user});
  } catch (e) {
    res.status (400).json ({success: false, err: e});
  }
};

const getProfilePicture = async (req, res) => {
  try {
    const user = await UserModel.findById (req.params.id);
    if (!user)
      return res.status (404).json ({success: false, error: 'User not found!'});
    res.status (200).json ({success: true, data: user.profilePicture.path});
  } catch (error) {
    res.status (400).json ({success: false, error: error});
  }
};


const createRoom = async (req,res) => {
  try {
    const user = await UserModel.findById(req.body.id) ;
    
    if (!user)
      return res.status(404).json({success: false, error : 'User not found!'});

    const newdoc = user.rooms.push({...req.body.room}) ;
    console.log({user:user})
    console.log({newdoc})
    res.status(200).json({
      success: true,
      oldDoc: newdoc
    })
  
   
  } catch (e) {
    res.status (400).json ({success: false, error: e});
  }
}

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getUserByUsername,
  addAvatar,
  getProfilePicture,
  checkThisUser,
  createRoom
};

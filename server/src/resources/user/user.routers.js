const express = require ('express');
const router = express.Router ();
const {checkDataWhichWillBeUpdated} = require('../../utilites/auth/auth.controllers');
const avatarMiddleware = require ('../../utilites/upload.image');

const {
  getUser,
  updateUser,
  deleteUser,
  addAvatar,
  getProfilePicture,
  createRoom
} = require ('./user.controllers');

//apis
router.get ('/:id', getUser);
router.get ('profilePicture/:id', getProfilePicture);
router.put ('/:id', checkDataWhichWillBeUpdated, updateUser);
router.delete ('/:id', deleteUser);
router.post ('/change/image', avatarMiddleware, addAvatar);
router.post('/create/room',createRoom)

module.exports = router;

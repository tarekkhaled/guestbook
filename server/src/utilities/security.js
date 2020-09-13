const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user) => {
    return Jwt.sign({id:user._id},process.env.JWTSECERT);
}


const verifyToken = (token) => {
    return new  Promise((reslove,reject)=>{
        Jwt.verify(token,process.env.JWTSECERT,(err,payload)=>{
            if(err) return reject(err);
            reslove(payload)
        })
    })
}


function hashThePassword (next) {
    const user = this;
    if(!user.isModified('password'))
        next();
    bcrypt.hash(user.password,10,(err,newHashedPass)=>{
        if(err)
            next(err);
        user.password = newHashedPass;
        next();
    })
}


const permission = async (req, res, next) => {
    const bearer = req.headers.authorization
  
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return res.status(401).end()
    }
  
    const token = bearer.split('Bearer ')[1].trim()
    let payload
    try {
      payload = await verifyToken(token)
    } catch (e) {
      return res.status(401).end()
    }
  
    const user = await User.findById(payload.id)
      .select('-password')
      .lean()
      .exec()
  
    if (!user) {
      return res.status(401).end()
    }
  
    req.user = user
    next()
}
  


module.exports = {
    createToken,
    verifyToken,
    hashThePassword,
    permission
}

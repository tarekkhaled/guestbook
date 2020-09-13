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


module.exports = {
    createToken,
    verifyToken,
    hashThePassword
}

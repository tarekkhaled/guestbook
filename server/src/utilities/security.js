const Jwt = require('jsonwebtoken');

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


module.exports = {
    createToken,
    verifyToken
}

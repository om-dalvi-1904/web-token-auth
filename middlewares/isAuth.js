let jwt = require('jsonwebtoken')

let isAuthenticated = async(req, res, next) =>{
    let headerObj = req.headers
    let token = headerObj.authorization.split(' ')[1]
    //? verify the token
    let verifyToken = jwt.verify(token, 'auth-key', (err, decoded)=>{
        if(err){
            return false
        }else{
            return decoded
        }
    })
    if(verifyToken){
        // save in the req obj
        req.user = verifyToken.id
        next()
    }else{
        let err = new Error('Token expired.')
        next(err)
    }
}

module.exports = isAuthenticated
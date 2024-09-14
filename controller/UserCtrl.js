let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let asyncHandler = require('express-async-handler')
const User = require('../model/User')

let userController = {
    //! register
    register: asyncHandler(async (req,res)=>{
        let {username, email, password} = req.body
        // validations
        if(!username || !email || !password){
            throw new Error("All fields are required.")
        }
        // if user exists
        let userExists = await User.findOne({email:email})
        if(userExists){
            throw new Error('User already exists.')
        }
        // hash the password
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)  
        // create the user
        let userCreated = await User.create({
            username:username,
            email:email,
            password:hashedPassword
        })
        // display the result
        res.json({
            message:'User registered successfully.',
            userId: userCreated._id
        })
    }),
    //! login
    login: asyncHandler(async (req,res)=>{
        let {email, password} = req.body
        // check is user email exists
        let userExists = await User.findOne({email:email})
        if(!userExists){
            throw new Error("User doesn't exists.")
        }
        // check if the user password is correct
        let isMatch = await bcrypt.compare(password, userExists.password)
        if(!isMatch){
            throw new Error("Incorrect password.")
        }
        // generate the token
        let token = jwt.sign(
            {id:userExists._id},
            "auth-key",
            {expiresIn:'10m'}
        )
        // send the resposne
        res.json({
            message:'Login successful.',
            token:token,
        })
    }),
    //! profile
    profile:asyncHandler(async (req,res)=>{
        // console.log(req.headers)      
        let userProfile = await User.findById(req.user)   
        res.json({
            username: userProfile.username,
            email: userProfile.email
        })     
    })
}

module.exports = userController;
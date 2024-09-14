let mongoose = require('mongoose')
let schema = mongoose.Schema

let userSchema = new mongoose.Schema(
    {
        username:{type:String, required:true},
        email:{type:String, requires:true},
        password:{type:String, required:true}
    },
    {
        timestamps:true 
    }
)

module.exports = mongoose.model('User', userSchema)
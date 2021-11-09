const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id:String,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    bussinessName:{
        type:String,
        default:''
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        default:''
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
})

exports.User = mongoose.model('User', userSchema);
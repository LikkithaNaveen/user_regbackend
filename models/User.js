const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    firstname: {
        type: String,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    retypepassword: {
        type: String,
        required: true
    },
    dateofbirth:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
})

const User=mongoose.model('User',UserSchema)

module.exports=User;



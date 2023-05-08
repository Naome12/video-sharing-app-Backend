import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv  from "dotenv"
dotenv.config();
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    img:{
        type: String,
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribedUsers:{
        type:[String] 

    },
    fromGoogle:{
        type:Boolean,
        default:false
    }
},{timestamps: true});

UserSchema.methods.generateToken = function(){
    return jwt.sign(
        {id: this._id},
        process.env.JWT
    )
} 

export default mongoose.model("User",UserSchema)
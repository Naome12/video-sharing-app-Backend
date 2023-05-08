import User from "../models/User.js"; 
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();

dotenv.config()
export const signup = async (req,res,next )=>{
try {
    // const salt = await bcrypt.genSalt(10);
    const hash =await bcrypt.hash(req.body.password,10);
  
    const newUser =await User.create({...req.body,password:hash});
    res.status(200).send(newUser);
} catch (err) {
    next(err); 
}
}

export const signin  = async(req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email})
        if(!user) return res.status(404).send("Invalid email or password!")

        let isCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isCorrect) return res.status(400).send("Invalid email or password!")

        const token = user.generateToken(); 
        const {password,...others} = user._doc
res.cookie("access_token",token,{
    httpOnly:true
}).status(200)
.json(others) 

    }
    catch(err){
        console.error(err);
        res.status(500).send(err)
    }
}

export const googleAuth = async(req,res,next)=>{
    try {
        const user =await User.findOne({email:req.body.email})
        if(user){
            const token = jwt.sign({id: user._id},process.env.JWT); 

            res.cookie("access_token",token,{
                httpOnly:true
            }).status(200)
            .json(user._doc) 
            
        }else{
            const newUser = new User({
                ...req.body,
                fromGoogle:true,
            })
            const savedUser = await newUser.save()
            const token = jwt.sign({id:savedUser._id},process.env.JWT); 

            res.cookie("access_token",token,{
                httpOnly:true
            }).status(200)
            .json(savedUser._doc) 
        }
    } catch (err) {
        next(err)
    }
}

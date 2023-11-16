import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/User.js'

/* REGISTER USER */

export const register = async (req, res) => {
    try{
        const picture = req.file.filename
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({ // this is the User Schema that is imported 
            firstName,
            lastName,
            email,
            password :passwordHash,
            picturePath:picture,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()*10000),
            impressions: Math.floor(Math.random()*10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        } catch(err) {
            res.status(500).json({error:err.message})
        }
};

/* LOGGING IN */

export const login = async(req, res)=>{
    try{
        const { email, password } = req.body;
        console.log("Request Body:", req.body);
        const user = await User.findOne({email : email})
        console.log("Email from request:", email);
        console.log("User found in database:", user);
        if (!user) return res.status(400).json({msg:"User does not exist."})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg:"Invalid Credentials."})

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET) // user._id is an attribute provided in mongo DB
        delete user.password;
        res.status(200).json({user,token});
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

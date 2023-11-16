import Post from "../models/Post.js";
import User from "../models/User.js"
export const createPost = async(req, res)=>{
    try{
        const {userId, description, picturePath} = req.body; //frontend sends this in the request body
        const user = await User.findbyId(userId);
        const newPost = new Post({
            userId,
            firstName : user.firstName,
            lastName : user.lastName,
            location : user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments :[]
        })

        await newPost.save(); // saving the new post to the db

        const post = await Post.find(); // returns all posts to the home page with the NEW post as well

        res.status(201).json(post);
    }catch(err){
        res.status(409).json({message : err.message});
    }
}

/* READ */

export const getFeedPosts = async(req, res)=>{
    try{

        const post = await Post.find(); // returns all posts to the home page with the NEW post as well

        res.status(200).json(post);

    }catch(err){
        res.status(404).json({message: err.message});
    }
}

export const getUserPosts = async(req, res)=>{
    try{
        const {userId} = req.params;
        const post = await Post.find({userId}); // returns all posts to the home page with the NEW post as well
        res.status(200).json(post);

    }catch(err){
        res.status(404).json({message: err.message});
    }
}

/* UPDATE */

export const likePost = async (req, res) =>{
    try{
        const {id} = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes : post.likes},
            {new : true} // {new: true} as an option, it tells Mongoose to return the modified document after the update.
        );
        res.status(200).json(updatedPost)

    }catch(err){
        res.status(404).json({message: err.message});
    }
}
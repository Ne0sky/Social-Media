import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId:{
            type : String,
            required : true
        },
        firstName:{
            type : String,
            required : true
        },
        lastName:{
            type : String,
            required : true
        },
        lacation: String,
        description: String,
        picturePath : String,
        userPicturePath : String,
        likes:{
            type: Map,
            of: Boolean,    // user_id -> true/false [map]
        },
        comments:{
            type:Array,
            default:[]
        }
            
        
    },
    {timestamps :true}
);

const Post = mongoose.model("Post", postSchema);

export default Post;
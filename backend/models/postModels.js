const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        imgurl:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        useremail:{
            type:String,
            required:true
        }

    },
    {
        timestamps:true
    }
);

const posts = mongoose.model('posts',postSchema)

module.exports = posts;
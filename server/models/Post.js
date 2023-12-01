const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');


function dateFormat(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


const postSchema = new Schema(
    {
        postText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        postAuthor: {
            type: String,  // Change type to ObjectId
            ref: 'User',  // Reference the User model
            required: true,
        },
        comments: [commentSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const Post = model('Post', postSchema);
module.exports = Post;

// START OF UPDATED SCHEMA
// const postSchema = new Schema(
//     {
//         postText: {
//             type: String,
//             required: true,
//             minLength: 1,
//             maxLength: 280,
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             get: timestamp => dateFormat(timestamp)
//         },
//         postAuthor: {
//             type: String,
//             required: true,
//         },
//         comments: [commentSchema],
//     },
//     {
//         toJSON: {
//             getters: true,
//         },
//         id: false,
//     }
// );

// const Post = model('Post', postSchema);
// module.exports = Post;

// START OF ORIGINAL CODE 1
// const { Schema } = require('mongoose');
// const commentSchema = require('./Comment')

// import { commentSchema, reactionSchema } from ('./Comment');


// const postSchema = new Schema(
//     {
//         post: {
//             type: String,
//             required: true,
//                 unique: true,
//                 comment: [commentSchema],
//                 reactions: [reactionSchema]
//         }
//     }
// )

// module.exports = postSchema;
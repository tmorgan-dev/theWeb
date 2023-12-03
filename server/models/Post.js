const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');


function dateFormat(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours() % 12 || 12; // Convert 0 to 12 for a.m./p.m. format
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amOrPm = date.getHours() >= 12 ? 'p.m.' : 'a.m.';

    return `${hours}:${minutes}${amOrPm} ${month}/${day}/${year}`;
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
            type: Schema.Types.ObjectId,  // Change type to ObjectId
            ref: 'User',  // Reference the User model
            allowNull: true
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
const { Schema, Types } = require('mongoose');

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

const commentSchema = new Schema(
    {
        commentId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        commentBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        reactionIcon: {
            type: String,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = commentSchema;

// START OF ORIGINAL CODE
// const { Schema } = require('mongoose')


// const commentSchema = new Schema(
//     {
// 	comment: {
// 		type: String,
// 		required: true,
//             unique: true,
// 	},
//     });
// const reactionSchema = new {
//     reactions: {
//             type: String
//         }
//     }



// module.exports = { commentSchema, reactionSchema };
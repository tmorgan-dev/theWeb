const { Schema } = require('mongoose');
import { commentSchema, reactionSchema } from ('./Comment');

const postSchema = new Schema(
    {
        post: {
            type: String,
            required: true,
                unique: true,
                comment: [commentSchema],
                reactions: [reactionSchema]
        }
    }
)

module.exports = postSchema;
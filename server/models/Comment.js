const { Schema } = require('mongoose')


const commentSchema = new Schema(
    {
	comment: {
		type: String,
		required: true,
            unique: true,
	},
    });
const reactionSchema = new {
    reactions: {
            type: String
        }
    }



module.exports = { commentSchema, reactionSchema };



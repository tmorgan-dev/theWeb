const { Schema } = require('mongoose')


const commnentSchema = new Schema(
    {
	comment: {
		type: String,
		required: true,
            unique: true,
        reactions: [reactionSchema]
        
	},
    });
const reactionSchema = new {
    reactions: {
            type: String
        }
    }



module.exports = commnentSchema;
    


const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const commnentSchema = require('./Comment')


const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, 'Must use a valid email address'],
		},
		password: {
			type: String,
			required: true,
		},
		savedComments: [commnentSchema],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

userSchema.methods.isCorrectPassword = async function (
	password
) {
	return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
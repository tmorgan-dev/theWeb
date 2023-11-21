const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "must match an email"]
		},
		password: {
			type: String,
			required: true,
		},
		posts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Post',
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// hash user password
userSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.virtual("friendCount").get(function () {
	return this.friends.length
})

const User = model('User', userSchema);
module.exports = User;

// START OF ORIGINAL CODE
// const { Schema, model } = require('mongoose');
// const postSchema = require('./Post');
// const reactionSchema = require('./Reaction');
// const bcrypt = require('bcrypt');

// const User = model('User', userSchema);

// const userSchema = new Schema(
// 	{
// 		username: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 		},
// 		email: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 			match: [/.+@.+\..+/, 'Must use a valid email address'],
// 		},
// 		password: {
// 			type: String,
// 			required: true,
// 		},
// 		post: [postSchema],
// 	},
// 	{
// 		toJSON: {
// 			virtuals: true,
// 		},
// 	}
// );

// userSchema.methods.isCorrectPassword = async function (
// 	password
// ) {
// 	return bcrypt.compare(password, this.password);
// };

// const User = model('User', userSchema);
// module.exports = User;
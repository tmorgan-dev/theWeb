const { User, Post } = require('../models');
const {
	signToken,
	AuthenticationError,
} = require('../utils/auth');

const resolvers = {
	Query: {
		users: async () => {
			return User.find().populate('posts');
		},
		friends: async (parent, { _id, username }) => {
			return User.find({ _id, username });
		},
		user: async (parent, { username }) => {
			console.log(username);
			return User.findOne({ username })
				.populate('posts')
				.populate('friends');
			// changed back to populate friends and posts in gql
		},
		// posts: async (parent, { username }) => {
		// 	const params = username ? { username } : {};
		// 	return Post.find(params).sort({ createdAt: -1 });
		// },
		posts: async (parent, { username }) => {
			const params = username ? { postAuthor: username } : {};
			const posts = await Post.find(params).sort({
				createdAt: -1,
			});
			return posts;
		},

		post: async (parent, { postId }) => {
			return Post.findOne({ _id: postId });
		},
		me: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findOne({
					_id: context.user._id,
				})
					.populate({
						path: 'posts',
						populate: {
							path: 'comments',
						},
					})
					.populate('friends');

				return user;
			}
			throw AuthenticationError;
		},
	},

	Mutation: {
		createUser: async (
			parent,
			{ username, email, password }
		) => {
			const user = await User.create({
				username,
				email,
				password,
			});
			const token = signToken(user);
			return { token, user };
		},

		loginUser: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw AuthenticationError;
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw AuthenticationError;
			}

			const token = signToken(user);

			return { token, user };
		},
		addPost: async (parent, { postText }, context) => {
			if (context.user) {
				const post = await Post.create({
					postText,
				});

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $push: { posts: post._id } },
					{ new: true }
				);

				// Return the user associated with the post
			// 	const user = await User.findOne({
			// 		_id: context.user._id,
			// 	})
			// 		.populate('posts')
			// 		.populate('friends');

			// 	// Check if the user object has a username before returning
			// 	if (user && user.username) {
			// 		return user;
			// 	} else {
			// 		throw new Error('User does not have a username.');
			// 	}
			}
			// throw new AuthenticationError(
			// 	'You need to be logged in!'
			// );
		},

		savedPost: async (parent, { postText }, context) => {
			if (context.user) {
				const post = await Post.create({
					postText,
				});

				const thisPost = await Post.findOne({
					postText: post.postText,
				});
				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { posts: thisPost._id } }
				);

				return post;
			}
			// throw AuthenticationError;
			// ('You need to be logged in!');
		},
		deletePost: async (parent, { postId }, context) => {
			if (context.user) {
				const post = await Post.findOneAndDelete({
					_id: postId,
					postAuthor: context.user.username,
				});

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { posts: post._id } }
				);

				return post;
			}
			throw AuthenticationError;
		},
		addComment: async (parent, { postId, commentText }) => {
			return Post.findOneAndUpdate(
				{ _id: postId },
				{
					$addToSet: { comments: { commentText } },
				},
				{
					new: true,
					runValidators: true,
				}
			);
		},
		savedComment: async (
			parent,
			{ postId, commentText },
			context
		) => {
			if (context.user) {
				return Post.findOneAndUpdate(
					{ _id: postId },
					{
						$addToSet: {
							comments: {
								commentText,
								commentAuthor: context.user.username,
							},
						},
					},
					{
						new: true,
						runValidators: true,
					}
				);
			}
			throw AuthenticationError;
		},
		deleteComment: async (
			parent,
			{ postId, commentId },
			context
		) => {
			if (context.user) {
				return Post.findOneAndUpdate(
					{ _id: postId },
					{
						$pull: {
							comments: {
								_id: commentId,
								commentAuthor: context.user.username,
							},
						},
					},
					{ new: true }
				);
			}
			throw AuthenticationError;
		},
		addFriend: async (
			parent,
			{ friendsId, username },
			context
		) => {
			if (context.user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						$push: {
							friends: {
								_id: friendsId,
								friends: username,
							},
						},
					},
					{ new: true }
				);
				const updatedFriend = await User.findOneAndUpdate(
					{ _id: friendsId },
					{
						$push: {
							friends: {
								_id: context.user._id,
								friendUsername: context.user.username,
							},
						},
					},
					{ new: true }
				);

				return {
					currentUser: updatedUser,
					friend: updatedFriend,
				};
			}
			throw AuthenticationError;
		},

		deleteFriend: async (parent, { friendsId }, context) => {
			if (context.user) {
				const removeFriend = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { friends:  friendsId  } },
					{ new: true }
				);

				const updatedFriend = await User.findOneAndUpdate(
					{ _id:  friendsId },
					{ $pull: { friends:   context.user._id  } },
					{ new: true }
				);
console.log(removeFriend)
				return {
					currentUser: removeFriend,
					friend: updatedFriend,
				};
			}
			throw AuthenticationError;
		},
	},
};

module.exports = resolvers;

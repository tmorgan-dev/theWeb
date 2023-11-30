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
			
			return User.find({ _id, username })
		},
		user: async (parent, { username }) => {
			console.log(username);
			return User.findOne({ username })
			// 	.populate('posts')
			// 	.populate('friends')
			
			// .populate({ path: 'user', populate: 'friends' });
		},
		posts: async (parent, { username }) => {
			const params = username ? { username } : {};
			return Post.find(params).sort({ createdAt: -1 });
		},
		post: async (parent, { postId }) => {
			return Post.findOne({ _id: postId });
		},
		me: async (parent, args, context) => {
			if (context.user) {
				return User.findOne({ _id: context.user._id })
					.populate('posts')
					.populate('friends');
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
				postAuthor: context.user.username,
			});

			await User.findOneAndUpdate(
				{ _id: context.user._id },
				{ $addToSet: { posts: post._id } }
			);
			return post;
			}
			throw AuthenticationError;
		},
		savedPost: async (parent, { postText }, context) => {
			if (context.user) {
				const post = await Post.create({
					postText,
					postAuthor: context.user.username,
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
				return updatedUser;
			}
			throw AuthenticationError;
		},
	},
};

module.exports = resolvers;
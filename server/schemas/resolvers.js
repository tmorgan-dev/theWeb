const { User, Post } = require('../models');
const {
	signToken,
	AuthenticationError,
} = require('../utils/auth');

const resolvers = {
	Query: {
		users: async () => {
			return User.find().populate('posts').populate('friends');
		},
		friends: async (parent, { _id, username }) => {
			return User.find({ _id, username });
		},
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

		friendPosts: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findById(
					context.user._id
				).populate({
					path: 'friends',
					populate: { path: 'friendPosts' },
				});
				const friendPosts = user.friends.reduce(
					(posts, friend) => {
						if (friend.friendPosts.length > 0) {
							friend.friendPosts.forEach((post) => {
								post.friendsId = friend._id;
								post.friendUsername = friend.username;
								post.friendPostTxt = friend.postText;
							});
							posts.push(...friend.friendPosts);
						}
						return posts;
					},
					[]
				);
				return friendPosts;
			}
			throw new AuthenticationError(
				'You need to be logged in!'
			);
		},
		me: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findOne({
					_id: context.user._id,
				})
					.populate('posts')
					.populate({
						path: 'friends',
						populate: { path: 'friendPosts' },
					});

				for (let i = 0; i < user.friends.length; i++) {
					const friendPost = await Post.find({
						postAuthor: user.friends[i],
					});
					console.log(friendPost);
					user.friendPosts.push(...friendPost);
				}

				return user;
			}
			throw new AuthenticationError(
				'You need to be logged in!'
			);
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

		updateUserInfo: async (parent, { username, bio, github, linkedIn, instagram, stackOverflow}, context) => {
			if (context.user) {
				const user = await User.findOneAndUpdate(
					{ _id: context.user._id},
					{ username: username, bio: bio, github: github, linkedIn: linkedIn, instagram: instagram, stackOverflow: stackOverflow },
					{ new: true }
				)
				return user
			}
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
			}
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
		addComment: async (
			parent,
			{ postId, commentText },
			context
		) => {
			if (context.user) {
				const updatedPost = await Post.findOneAndUpdate(
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

				return updatedPost;
			}
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
					{ $pull: { friends: friendsId } },
					{ new: true }
				);

				const updatedFriend = await User.findOneAndUpdate(
					{ _id: friendsId },
					{ $pull: { friends: context.user._id } },
					{ new: true }
				);
				console.log(removeFriend);
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

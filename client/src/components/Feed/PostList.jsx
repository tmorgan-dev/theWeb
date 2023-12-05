import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import AuthService from '../../utils/auth';
import AddComment from './AddComment';

const Posts = () => {
	const user = AuthService.getProfile();
	const authToken = AuthService.getToken();
// console.log(authToken)
	const [userInfo, setUserInfo] = useState({
		postText: '',
		postAuthor: user ? user.username : '',
		posts: [],
		friendPosts: [],
	});

	const [friendComment, setFriendComment] =useState(false);
	const [commentToggle, setCommentToggle] = useState(false);

	const { loading, data } = useQuery(QUERY_ME);
	useEffect(() => {
		if (data && data.me && (data.me.posts || data.me.friendPosts)) {
		setUserInfo({
			posts: data.me.posts || [],
			friendPosts: data.me.friends ? data.me.friends.friendPosts || [] : [],
			// postAuthor: data.me.username,
			// friends: data.me.friends,
			// friendUsername: data.me.friendUsername,
			});
		}
	}, [data]);
	console.log(data)
	const handleCommentToggle = (postId) => {
		setCommentToggle((prevToggles) => ({
			...prevToggles,
			[postId]: !prevToggles[postId],
		}));
	};
	
	const handleFriendToggle = (postId) => {
		setFriendComment((prevComments) => ({
		...prevComments,
		[postId]: !prevComments[postId],
		}));
	};
	
	if (loading) return <p>Loading...</p>;
	if (!data || !data.me)
		return <p>No posts found</p>;
	const { posts, friendPosts } = data.me;
	// console.log(posts)
	// console.log(friendPosts)
	return (
		<div
			className='postBg p-4 m-4 rounded-lg shadow-md text-white'
			style={{
				overflowY: 'auto',
				scrollbarWidth: 'none',
				msOverflowStyle: 'none',
			}}
		>
			{posts && posts.length > 0 && (
        <>
			<h1 className='font-bold mb-4'>Your Posts</h1>
			<ul>
				{userInfo.posts.map((post) => (
					<li
						key={post._id}
						className='mb-4 p-4 feed-userListBg rounded-lg shadow-md'
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<p className='text-white userPostName'>
								{data.me.username}
							</p>
							<p className='text-white'>{post.createdAt}</p>
						</div>
						<p className='text-2xl font-semibold mb-2'>
							{post.postText}
						</p>
						<button
							className='mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded'
							onClick={() => handleCommentToggle(post._id)}
						>
							{commentToggle[post._id]
								? 'Nevermind'
								: 'Add a comment'}
						</button>
						{commentToggle[post._id] && (
							<ul className='mt-4'>
								{post.comments.map((comment) => (
									<li
										key={comment._id}
										className='postBg p-2 rounded-md shadow-sm mb-2'
									>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
											}}
										>
											<p className='text-white userCommentName'>
												{comment.commentAuthor}
											</p>
											<p className='text-white'>{comment.createdAt}</p>
										</div>
										<p className='text-md font-medium text-white'>
											{comment.commentText}
										</p>
									</li>
								))}
								<AddComment postId={post._id} />
							</ul>
						)}
					</li>
				))}
			</ul>
			</>
	)}
	{data?.me?.friendPosts && data.me.friendPosts.length > 0 && (
        <>
			<h1 className='font-bold mb-4'>Friend Posts</h1>
			<ul>
				{data.me.friendPosts.map((friendPost) => (
						<li
							key={friendPost._id}
							className='mb-4 p-4 feed-userListBg rounded-lg shadow-md'
						>
							<div
								key={friendPost._id}
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<p className='text-white userPostName'>
									{friendPost.friendUsername}
								</p>
								<p>{friendPost.createdAt}</p>
							</div>
							<p className='text-2xl font-semibold mb-2'>
								{friendPost.postText}
							</p>
							<button
							className='mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded'
							onClick={() => handleFriendToggle(friendPost._id)}
						>
							{friendComment[friendPost.comment_id]
								? 'Nevermind'
								: 'Add a comment'}
						</button>
						{friendComment[friendPost._id] && (
							<ul className='mt-4'>
								{friendPost.comments && friendPost.comments.map((comment) => (
									<li
										key={comment._id}
										className='postBg p-2 rounded-md shadow-sm mb-2'
									>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
											}}
										>
											<p className='text-white userCommentName'>
												{comment.commentAuthor}
											</p>
											<p className='text-white'>{comment.createdAt}</p>
										</div>
										<p className='text-md font-medium text-white'>
											{comment.commentText}
										</p>
									</li>
								))}
								<AddComment postId={friendPost._id} />
							</ul>
						)}
						</li>
					))}
			</ul>
			</>
			)}
			<style>
				{`
                    /* Hide the scrollbar for WebKit browsers */
                    ::-webkit-scrollbar {
                        display: none;
                    }
                    /* Hide scrollbar for Firefox */
                    scrollbar-width: none;
                    /* Hide scrollbar for IE/Edge */
                    -ms-overflow-style: none;
                `}
			</style>
		</div>
	);
};
export default Posts;

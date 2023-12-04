import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import AuthService from '../../utils/auth';
import AddComment from './AddComment';

const Posts = () => {
    const user = AuthService.getProfile();
    const authToken = AuthService.getToken();
    const [userInfo, setUserInfo] = useState({
        postText: '',
        postAuthor: user ? user.username : '',
    });

    const { data } = useQuery(QUERY_ME);
    const [toggleComments, setToggleComments] = useState({});

    useEffect(() => {
        if (data && data.me) {
            setUserInfo({
                posts: data.me.posts,
                postAuthor: data.me.username,
                friends: data.me.friends,
                friendPosts: data.me.friendPosts,
            });
        }
    }, [data]);

    const handleToggleComments = (postId) => {
        setToggleComments(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    if (!data || !data.me || !data.me.posts) return <p>No posts found</p>;

    const { posts, friendPosts } = data.me;
console.log(data.me.friendPosts)
    return (
        <div className="postBg p-4 m-4 rounded-lg shadow-md text-white" style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <h1 className="font-bold mb-4">Your Posts</h1>
            <ul>
            {posts.map((post) => (
                    <li key={post._id} className="mb-4 p-4 feed-userListBg rounded-lg shadow-md">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="text-white userPostName">{data.me.username}</p>
                            <p className="text-white">{post.createdAt}</p>
                        </div>
                        <p className="text-2xl font-semibold mb-2">{post.postText}</p>
                        <button className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded" onClick={() => handleToggleComments(post._id)}>
                            {toggleComments[post._id] ? 'Nevermind' : 'View Comments'}
                        </button>
                        {toggleComments[post._id] && post.comments && post.comments.length > 0 && (
                            <ul className="mt-4">
                                {post.comments.map((comment) => (
                                    <li key={comment._id} className="postBg p-2 rounded-md shadow-sm mb-2">
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <p className="text-white userCommentName">{comment.commentAuthor}</p>
                                            <p className="text-white">{comment.createdAt}</p>
                                        </div>
                                        <p className="text-md font-medium text-white">{comment.commentText}</p>
                                    </li>
                                ))}
                                <AddComment postId={post._id} />
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            <h1 className="font-bold mb-4">Friend Posts</h1>
            <ul>
            {friendPosts && friendPosts.map((friendPost) => (
                <li key={friendPost._id} className="mb-4 p-4 feed-userListBg rounded-lg shadow-md">
                    {/* Display friend posts */}
                    {/* You might need to find the respective friend's username from the 'friends' array */}
                    {/* Example: Find the friend's username based on the friend's ID */}
                    {userInfo.friends && userInfo.friends.map((friend) => {
                        if (friend._id === friendPost.friendsId) {
                            return (
                                <div key={friend._id}>
                                    <p>{friend.username}</p>
                                    <p>{friendPost.postText}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </li>
            ))}
        </ul>
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

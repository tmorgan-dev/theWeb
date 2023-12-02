import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import AuthService from '../../utils/auth';

const Posts = () => {
    // Retrieve user information from AuthService
    const user = AuthService.getProfile();
    const authToken = AuthService.getToken();

    const [userInfo, setUserInfo] = useState({
        postText: '',
        postAuthor: user ? user.username : '', // Use AuthService to get the username
    });

    // Fetch the currently logged-in user
    const { data } = useQuery(QUERY_ME, {
        onCompleted: (data) => {
            if (data && data.me) {
                setUserInfo({
                    posts: data.me.posts,
                    postAuthor: data.me.username,
                });
            }
        },
    });

    if (!data || !data.me || !data.me.posts) return <p>No posts found</p>;

    const { posts } = data.me;

    return (
        <div className="postBg p-4 m-4 rounded-lg shadow-md text-white" style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <h1 className="text-2xl font-bold mb-4">Your Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post._id} className="mb-4 p-4 feed-userListBg rounded-lg shadow-md">
                        <p className="text-white">Author: {post.postAuthor}</p>
                        <p className="text-white">Created At: {post.createdAt}</p>
                        <p className="text-lg font-semibold mb-2">{post.postText}</p>

                        {post.comments && post.comments.length > 0 && (
                            <ul className="mt-4">
                                {post.comments.map((comment) => (
                                    <li key={comment._id} className="postBg p-2 rounded-md shadow-sm mb-2">
                                        <p className="text-md font-medium text-white">{comment.commentText}</p>
                                        <p className="text-white">{comment.commentAuthor}</p>
                                        <p className="text-white">Created At: {comment.createdAt}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
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
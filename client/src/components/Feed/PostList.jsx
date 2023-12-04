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
    });

    const [commentToggle, setCommentToggle] = useState(false);
    const { loading, data } = useQuery(QUERY_ME);
    
    useEffect(() => {
        if (data && data.me) {
            setUserInfo({
                posts: data.me.posts,
                postAuthor: data.me.username,
                friends: data.me.friends,
                
            });
        }
    }, [data]);

    // console.log(data);

    const handleCommentToggle = (postId) => {
        setCommentToggle((prevToggles) => ({
            ...prevToggles,
            [postId]: !prevToggles[postId],
        }));
    };

    if (loading) return <p>Loading...</p>;
    if (!data || !data.me || !data.me.posts) return <p>No posts found</p>;

    const { posts, friendPosts } = data.me;
    console.log(data.me);

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
                        <button className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded" onClick={() => handleCommentToggle(post._id)}>
                            {commentToggle[post._id] ? 'Nevermind' : 'Add a comment'}
                        </button>
                        {commentToggle[post._id] && (
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
            {userInfo.friendPosts && userInfo.friendPosts.map((friendPost) => (
    <li key={friendPost._id} className="mb-4 p-4 feed-userListBg rounded-lg shadow-md">
        {/* TODO: Fix this to match updated info in resolvers(lines 55-71) so that friend posts post to frontend.  */}
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

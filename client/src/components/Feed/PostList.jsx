import { React, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import AuthService from '../../utils/auth';

const Posts = () => {
    const [userInfo, setUserInfo] = useState({
        postText: '',
        postAuthor: '',
    });
    const user = AuthService.getProfile();
    const authToken = AuthService.getToken();
    const postAuthor = user.username;
    const { data } = useQuery(QUERY_ME, {
        onCompleted: (data) => {
            if (data && data.me) {
                setUserInfo({
                    postText: data.me.posts.map(post => post.postText),
                    postAuthor: data.me.username,
                });
            }
        },
    });

    if (!data || !data.me || !data.me.posts) return <p>No posts found</p>;

    const { posts } = data.me;

    return (
        <div>
            <h1>Your Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <p>{post.postText}</p>
                        <p>Author: {post.postAuthor}</p>
                        <p>Created At: {post.createdAt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;



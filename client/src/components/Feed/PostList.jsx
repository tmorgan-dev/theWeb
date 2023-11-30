import AddComment from './AddComment';
//import React from 'react';

/**************************************** 
THIS IS HOW I THINK IT SHOULD BE DONE, and what needs to be worked on, the one displaying on MainPage is basically just a placeholder, it is importing the whole AddComment component which might cause issues... I need to pass the data like a prop from AddPost.jsx into function PostList

const PostList = ({ posts, postText }) => {
    if (!posts) {
        return <h3 className=" w-full rounded-lg p-4 text-white overflow-y-auto overallFont">No posts yet</h3>;
    }
        {posts && posts.map((post) => (
<div key={post._id} className=" w-full rounded-lg p-4 text-white overflow-y-auto overallFont">
    <div className="postBg w-full rounded-lg shadow-md p-4">
        <div className="font-bold">
            {post.postAuthor} <br />
                <span> created this post on {post.createdAt} </span>
        </div>
        <div className="font-bold mt-2">{post.postText}
        </div>
        <AddComment />
    </div>
</div>
    ))
}}

I also think I could take the AddComment.jsx component and add it in here instead so we don't need to pass any props from THIS file- comment needs postId otherwise I'd say it's probably fine the way it is.

***************************************/
const PostList = () => {

    return (
        <>
        <div className=" w-full rounded-lg p-4 text-white overflow-y-auto overallFont">
        <div className="postBg w-full rounded-lg shadow-md p-4">
        <div className="font-bold">username{/* Add in the postAuthor */}</div>
          <div className="font-bold mt-2">Titled post!{/* Add in the postTitle */}</div>
          <div>This is a post for example sake wow{/* Add in the postText */}</div>
          <AddComment />
          </div>
          </div>
      </>
      )
    }

export default PostList;
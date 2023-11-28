import { useState } from 'react';

const Feed = () => {
    const [showPost, setPost] = useState(false);
    const [showComment, setComment] = useState(false);

  const handlePostForm = () => {
    setPost(!showPost);
  };

  const handleCommentForm = () => {
    setComment(!showComment);
  }

    return (
        <>
        <div className="w-full rounded-lg p-4 text-white overallFont">
        <div className="postBg w-full rounded-lg shadow-md p-2">
        <div className="font-bold flex justify-between items-center">
          <div>username{/* Add in the postAuthor or just username since you are logged in */}</div>
          <button
            onClick={handlePostForm}
            className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded"
          >
            {showPost ? 'Nevermind' : 'Create a post...'}
          </button>
        </div>
        {showPost && (
          <form className="mt-4">
            <input
              placeholder="This is a post you are making yay"
              className="border rounded-md p-2 w-full focus:border-purple-1000 text-black"
            />
            <button className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded">
              POST{/* Do an onChange or tailwind toggle to submit post*/}
            </button>
          </form>
        )}
      </div>
    </div>
  <div className=" w-full rounded-lg p-4 text-white overflow-y-auto overallFont">
  <div className="postBg w-full rounded-lg shadow-md p-4">
  <div className="font-bold">username{/* Add in the postAuthor */}</div>
    <div className="font-bold mt-2">Titled post!{/* Add in the postTitle */}</div>
    <div>This is a post for example sake wow{/* Add in the postText */}</div>
    <button onClick={handleCommentForm}
            className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded"
            >
            {showComment ? 'Nevermind' : 'Comment'}
    </button>
    {showComment && (
            <form>
                          <input
                placeholder="This is a post you are making yay"
                className="border rounded-md p-2 w-full mt-2"
              />
              <button className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded">
                COMMENT{/* Do an onChange or tailwind toggle to submit post*/}
              </button>
            </form> )}
    </div>
  </div>
  <div className=" w-full rounded-lg p-4 text-white overflow-y-auto overallFont">
  <div className="postBg w-full rounded-lg shadow-md p-4">
  <div className="font-bold">username{/* Add in the postAuthor */}</div>
    <div className="font-bold mt-2">Titled post!{/* Add in the postTitle */}</div>
    <div>This is a post for example sake wow{/* Add in the postText */}</div>
    <button onClick={handleCommentForm}
            className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded"
            >
            {showComment ? 'Nevermind' : 'Comment'}
    </button>
    {showComment && (
            <form>
                          <input
                placeholder="This is a post you are making yay"
                className="border rounded-md p-2 w-full mt-2"
              />
              <button className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded">
                COMMENT{/* Do an onChange or tailwind toggle to submit post*/}
              </button>
            </form> )}
    </div>
  </div>
  <div className=" w-full rounded-lg p-4 text-white overflow-y-auto overallFont">
  <div className="postBg w-full rounded-lg shadow-md p-4">
  <div className="font-bold">username{/* Add in the postAuthor */}</div>
    <div className="font-bold mt-2">Titled post!{/* Add in the postTitle */}</div>
    <div>This is a post for example sake wow{/* Add in the postText */}</div>
    <button onClick={handleCommentForm}
            className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded"
            >
            {showComment ? 'Nevermind' : 'Comment'}
    </button>
    {showComment && (
            <form>
                          <input
                placeholder="This is a post you are making yay"
                className="border rounded-md p-2 w-full mt-2"
              />
              <button className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded">
                COMMENT{/* Do an onChange or tailwind toggle to submit post*/}
              </button>
            </form> )}
    </div>
  </div>
</>
    )
};
export default Feed;
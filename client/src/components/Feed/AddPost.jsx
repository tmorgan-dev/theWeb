import { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST } from '../../utils/mutation';
import { QUERY_ME } from '../../utils/queries';

// Define the AddPost component
const AddPost = () => {
  // Use the useQuery hook to fetch the currently logged-in user
  const { loading, data } = useQuery(QUERY_ME);
  const [postToggle, setPostToggle] = useState(false);
  const [postInput, setPostInput] = useState("");
  const userData = data?.me || {};

  // Use the useMutation hook to handle the mutation for adding a new post
  const [addPostMutation] = useMutation(ADD_POST, {
    // Update the cache after a new post is added
    update(cache, { data: { addPost } }) {
      // Read the existing posts from the cache
      const existingPosts = cache.readQuery({
        query: QUERY_ME,
      }).me.posts;
  
      // Update the cache with the new post
      cache.writeQuery({
        query: QUERY_ME,
        data: {
          me: {
            ...data.me,
            posts: [addPost, ...existingPosts],
          },
        },
      });
    },
  });

  // Define the function to handle the toggle
  const handleToggle = () => {
    setPostToggle(!postToggle);
  };

  // Define the function to handle post submission
  const handlePostSubmit = async (event) => {
    event.preventDefault();
    if (!postInput.trim()) {
      return false;
    }

    try {
      // Call the addPostMutation with the appropriate variables
      await addPostMutation({
        variables: {
          postText: postInput,
        },
      });

      // Reset the input and toggle state
      setPostInput("");
      setPostToggle(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full rounded-lg p-4 text-white overallFont">
        <div className="postBg w-full rounded-lg shadow-md p-2">
          <div className="font-bold flex justify-between items-center">
            <div>{userData.username}</div>
            <button
              onClick={handleToggle}
              className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded"
            >
              {postToggle ? 'Nevermind' : 'Create a post...'}
            </button>
          </div>
          {postToggle && (
            <form className="mt-4" onSubmit={handlePostSubmit}>
              <input
                placeholder="This is a post you are making yay"
                className="border rounded-md p-2 w-full focus:border-purple-1000 text-black"
                value={postInput}
                onChange={(event) => setPostInput(event.target.value)}
              />
              <button
                className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded"
                type="submit"
              >
                POST
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AddPost;

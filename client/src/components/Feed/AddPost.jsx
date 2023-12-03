import { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST } from '../../utils/mutation';
import { QUERY_ME, QUERY_POSTS } from '../../utils/queries';
import Auth from '../../utils/auth';


// Define the AddPost component
const AddPost = () => {
  // Use the useQuery hook to fetch the currently logged-in user
  const { loading, data } = useQuery(QUERY_ME);
  const [postToggle, setPostToggle] = useState(false);
  const [postText, setpostText] = useState("");
  const userData = data?.me || {};
  // console.log(data);

  // Use the useMutation hook to handle the mutation for adding a new post
  const [addPostMutation] = useMutation(ADD_POST, {
			refetchQueries: [QUERY_POSTS, 'getPosts', QUERY_ME, 'me'],
		});
    
    // Update the cache after a new post is added
    // update(cache, { data: { addPost } }) {
    //   // Read the existing posts from the cache
    //   const existingPosts = cache.readQuery({
    //     query: QUERY_ME,
    //   }).me.posts;
  
      // console.log(data);
      // Update the cache with the new post
  //     cache.writeQuery({
  //       query: QUERY_ME,
  //       data: {
  //         me: {
  //           ...data.me,
  //           posts: [addPost, ...existingPosts],
  //         },
  //       },
  //     });
  //   },
  // });
  
  const postAuthor = Auth.getProfile().data.username;
  console.log('username', postAuthor);
  // Define the function to handle the toggle
  const handleToggle = () => {
    setPostToggle(!postToggle);
  };

  // Define the function to handle post submission
  const handlePostSubmit = async (event) => {
    event.preventDefault();
    if (!postText.trim()) {
      return false;
    }
    
    try {
      // Call the addPostMutation with the appropriate variables
    const  data  = await addPostMutation({
          variables: {
            postText,
          },
          
        });

        console.log(data)
      

      // Reset the input and toggle state
      setpostText("");
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
                value={postText}
                onChange={(event) => setpostText(event.target.value)}
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

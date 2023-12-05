import { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST } from '../../utils/mutation';
import { QUERY_ME, QUERY_POSTS } from '../../utils/queries';
import Auth from '../../utils/auth';



const AddPost = () => {

  const { loading, data } = useQuery(QUERY_ME);
  const [postToggle, setPostToggle] = useState(false);
  const [postText, setpostText] = useState("");
  const userData = data?.me || {};

  const [addPostMutation] = useMutation(ADD_POST, {
			refetchQueries: [QUERY_POSTS, 'getPosts', QUERY_ME, 'me'],
		});

  const postAuthor = Auth.getProfile().data.username;
  console.log('username', postAuthor);

  const handleToggle = () => {
    setPostToggle(!postToggle);
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    if (!postText.trim()) {
      return false;
    }
    
    try {
    const data = await addPostMutation({
      variables: {
            postAuthor,
						postText: postText,
					},
				});

        console.log(data)
  
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
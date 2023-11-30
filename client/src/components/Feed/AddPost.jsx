import { useState } from 'react';
import { useMutation } from "@apollo/client";
// import { useQuery } from "@apollo/client";
// { QUERY_ME } from '../../utils/queries';
import { ADD_POST } from '../../utils/mutation';
import { QUERY_POSTS } from '../../utils/queries';

// Activity 18 in UofU repo is really great for this & the comments

const CreatePost = () => {
/* TOGGLE FUNCTIONALITY ***************/
  const [postToggle, openToggle] = useState(false);
  const handleToggle = () => {
    openToggle(!postToggle);
  };

/* DATA SAVING, Thinking this useState can be attached to the handlePostSubmit?? *****************************/
  const [newPost, saveNewPost] = useState({
    postText: '',
    postAuthor: '',
});

const [addPost, {err}] = useMutation(ADD_POST, {
  //I am actually unsure the functionality of refetchQueries but i think i need to use this to connect the mutation with the queries, so if that is the case, we may want to QUERY_SINGLE_POST and 'getSinglePost'
    refetchQueries: [
        QUERY_POSTS,
        'getPosts'
    ]
});

const handlePostSubmit = async (event) => {
event.preventDefault();
try {
    const { postData } = addPost({
        variables: {...newPost},
    });
console.log(postData)
    saveNewPost({
        postText: '',
        postAuthor: ''
    })
} catch (err) {
    console.log(err);
}
}

// const handlePost = (event) => {
// const { name, value } = event.target;

// if (name === "postText") {
//     saveNewPost({...newPost, [name]: value});
// } else if (name !== 'postText') {
//     saveNewPost({...newPost, [name]: value});
// }
// }

    return (
        <>
        <div className="w-full rounded-lg p-4 text-white overallFont">
        <div className="postBg w-full rounded-lg shadow-md p-2">
        <div className="font-bold flex justify-between items-center">
          <div>username{/* add QUERY_ME functionality? */}</div>
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
              className="border rounded-md p-2 w-full focus:border-purple-1000 text-black" value={newPost.postText} onChange={(event) => saveNewPost({ ...newPost, postText: event.target.value})}
            />
            <button className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded" type="submit">
              POST
            </button>
          </form>
        )}
      </div>
    </div>

</>
    )
};
export default CreatePost;
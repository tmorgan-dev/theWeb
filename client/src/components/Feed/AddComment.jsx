import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutation';
// import { GET_SINGLE_POST } from '../../utils/queries';


const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const [commentToggle, openToggle] = useState(false);
  
  const handleCommentToggle = () => {
    openToggle(!commentToggle);
  };

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const { commentData } = await addComment({
        variables: { postId, commentText },
      });
      console.log(commentData)
      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText') {
      setCommentText(value);
    }
  }

  return (
    <>
  <button onClick={handleCommentToggle}
          className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded"
          >
          {commentToggle ? 'Nevermind' : 'Comment'}
  </button>
  {commentToggle && (
          <form onSubmit={handleCommentSubmit}>
                        <input
              placeholder="This is a comment you are making yay"
              className="border rounded-md p-2 w-full mt-2 text-black" onChange={handleComment}
            />
            <button className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded" type="submit">
              COMMENT
            </button>
          </form> )}
</>
)
};

export default CommentForm;
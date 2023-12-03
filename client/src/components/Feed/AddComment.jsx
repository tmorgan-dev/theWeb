// AddComment.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { ADD_COMMENT } from '../../utils/mutation';

const AddComment = ({ postId }) => {
  const [commentInput, setCommentInput] = useState('');
  const [addComment, { loading: commentLoading }] = useMutation(ADD_COMMENT);

  const handleCommentInputChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      await addComment({
        variables: { postId, commentText: commentInput },
        refetchQueries: [{ query: QUERY_ME }],
      });
      setCommentInput('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="flex items-center mb-2">
      <input
        type="text"
        value={commentInput}
        onChange={handleCommentInputChange}
        placeholder="Add a comment..."
        className="border-b-2 border-white p-1 mr-2 bg-transparent text-white focus:outline-none"
      />
      <button
        onClick={handleAddComment}
        disabled={commentLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none"
      >
        {commentLoading ? 'Adding...' : 'Add Comment'}
      </button>
    </div>
  );
};

export default AddComment;

// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_COMMENT } from '../../utils/mutation';
// // import { GET_SINGLE_POST } from '../../utils/queries';


// const CommentForm = ({ postId }) => {
//   const [commentText, setCommentText] = useState('');
//   const [commentToggle, openToggle] = useState(false);
  
//   const handleCommentToggle = () => {
//     openToggle(!commentToggle);
//   };

//   const [addComment, { error }] = useMutation(ADD_COMMENT);

//   const handleCommentSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const { commentData } = await addComment({
//         variables: { postId, commentText },
//       });
//       console.log(commentData)
//       setCommentText('');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleComment = (event) => {
//     const { name, value } = event.target;

//     if (name === 'commentText') {
//       setCommentText(value);
//     }
//   }

//   return (
//     <>
//   <button onClick={handleCommentToggle}
//           className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded"
//           >
//           {commentToggle ? 'Nevermind' : 'Comment'}
//   </button>
//   {commentToggle && (
//           <form onSubmit={handleCommentSubmit}>
//                         <input
//               placeholder="This is a comment you are making yay"
//               className="border rounded-md p-2 w-full mt-2 text-black" onChange={handleComment}
//             />
//             <button className="mt-2 buttons hover:bg-purple-400 text-white font-bold text-sm py-1 px-2 rounded" type="submit">
//               COMMENT
//             </button>
//           </form> )}
// </>
// )
// };

// export default CommentForm;
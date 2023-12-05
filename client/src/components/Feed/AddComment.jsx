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
    className="postBg rounded-md p-2 flex-grow bg-transparent text-white focus:outline-none"
    // Use flex-grow to allow the input to grow and fill remaining space
  />
  <button
    onClick={handleAddComment}
    disabled={commentLoading}
    className="buttons hover:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none"
    // Preserve the button styling
  >
    {commentLoading ? 'Adding...' : 'Add Comment'}
  </button>
</div>

  );
};

export default AddComment;
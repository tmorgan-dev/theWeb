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
        className="postBg p-1 mr-2 bg-transparent text-white rounded-md focus:outline-none"
      />
      <button
        onClick={handleAddComment}
        disabled={commentLoading}
        className="buttons hover:bg-purple-400 text-white font-bold py-1 px-2 rounded focus:outline-none"
      >
        {commentLoading ? 'Adding...' : 'Add Comment'}
      </button>
    </div>
  );
};

export default AddComment;
import React, { useState } from "react";
import { createComment } from "../services/comments";
import "../styles/AddCommentModal.css";

function AddCommentModal({ recipeId, userId, onRequestClose }) {
  const [commentText, setCommentText] = useState('');
  

  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();  

    const newComment = {
      userId: userId,
      comment: commentText,
    };
    
    try {
      await createComment(newComment, recipeId);
      console.log("Comment added:", newComment, recipeId, userId);
      onRequestClose();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <div className="commentForm">
        <textarea
          className="commentTextArea"
          rows={10}
          placeholder="Comments"
          value={commentText}
          onChange={handleChange}
          required
        />
        <button
          className="submitButtonModal"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddCommentModal;

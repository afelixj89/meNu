import React, { useState } from "react";
import { createComment } from "../services/comments";
import { useNavigate } from "react-router-dom";
import "../styles/AddCommentModal.css";

function AddCommentModal({ recipeId, userId, onRequestClose }) {
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();    
    const newComment = {
      userId: userId,
      recipeId: recipeId,
      comment: commentText,
     
    };
    
    try {
      await createComment(newComment);
      console.log("Comment added:", newComment, recipeId,userId);
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

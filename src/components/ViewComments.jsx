import React from "react";
import Modal from "react-modal";
import icon from "../assets/userIcon.jpg";
import "../styles/ViewComments.css";

function ViewComments({ isOpen, isClose, comments }) {
  return (
    <Modal isOpen={isOpen}>
      <div>
        <div className="commentsContainer">
          <div>
            <button className='closeModalButton' onClick={isClose}>Close</button>
            <h4 style={{ textDecoration: "underline" }}>Comments</h4>
          </div>
          <table className="commentsTable">
            <thead>
              <tr>
                <th>User</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => (
                <tr key={index}>
                  <td className="commentUserImage">
                    <img src={comment.userAvatar || icon} alt="User Avatar" />
                  </td>
                  <td className="userData">{comment.username}</td>
                  <td className="commentData">{comment.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}

export default ViewComments;

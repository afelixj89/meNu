import React from "react";
import "../styles/ViewComments.css";
import icon from "../assets/userIcon.jpg";

function ViewComments() {
  return (
    <div>
      {/* <div className="recipeComments">
                  {recipe.comments.map((oneComment, index) => (
                    <p key={index}>{oneComment.comment}</p>
                  ))}
                </div> */}
      <div className="commentsContainer">
        <div>
          <h4 style={{ textDecoration: "underline" }}>Comments</h4>
        </div>
        <table className="commentsTable">
  <thead>
    <tr>
       <th>
        {/* /*leave this empty to avoid dom error */}
        </th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="commentUserImage">
        <img src={icon} alt="User Avatar" />
      </td>
      <td className="userData">REALLY LONG USERNAME TO TEST</td>
      <td className="commentData">
        Great recipe! Can't wait to try it out!
      </td>
    </tr>
    <tr>
      <td className="commentUserImage">
        <img src={icon} alt="User Avatar" />
      </td>
      <td className="userData">User 2</td>
      <td className="commentData">
        This looks delicious! I'm definitely making this for dinner tonight.
      </td>
    </tr>
    <tr>
      <td className="commentUserImage">
        <img src={icon} alt="User Avatar" />
      </td>
      <td className="userData">User 3</td>
      <td className="commentData">
        Wow, such a simple yet flavorful recipe. Thanks for sharing!
      </td>
    </tr>
    <tr>
      <td className="commentUserImage">
        <img src={icon} alt="User Avatar" />
      </td>
      <td className="userData">User 4</td>
      <td className="commentData">
        My family loved this dish! It's going into our regular rotation.
      </td>
    </tr>
    <tr>
      <td className="commentUserImage">
        <img src={icon} alt="User Avatar" />
      </td>
      <td className="userData">User 5</td>
      <td className="commentData">
        Yum! I added a twist by incorporating some fresh herbs from my garden. Turned out amazing!
      </td>
    </tr>
  </tbody>
</table>
      </div>
    </div>
  );
}

export default ViewComments;

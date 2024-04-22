import { useState, useEffect } from "react";
import { deleteRecipe, getRecipes } from "../services/recipes.js";
import { getCommentsbyRecipeId } from "../services/comments.js";
import Comments from "../components/AddCommentModal.jsx";
import ViewComments from "../components/ViewComments.jsx";
import SearchRecipe from "../components/SearchRecipe.jsx";
import DeleteButton from "../components/DeleteButton.jsx";
import icon from "../assets/userIcon.jpg";
import Modal from "react-modal";
import "../styles/Home.css";
import youtube from "../assets/youtube.png";
import commentIcon from "../assets/message.png";
import recipeIcon from "../assets/recipe-book.png";
import RecipeItem from "../components/RecipeItem.jsx";

function Home({ user, recipes }) {
  const [isLoaded, setLoaded] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const [isViewCommentsOpen, setIsViewCommentsOpen] = useState(false);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

  const toggleCommentView = () => {
    setIsViewCommentsOpen(!isViewCommentsOpen);
  };

  useEffect(() => {
    if (recipes.length > 0) {
      setLoaded(true);
    }
  }, [recipes]);

  const openRecipeModal = (index) => {
    setSelectedRecipeIndex(index);
    setIsRecipeModalOpen(true);
  };

  const closeRecipeModal = () => {
    setSelectedRecipeIndex(null);
    setIsRecipeModalOpen(false);
  };

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="container">
        <SearchRecipe />

        <div className="recipeFeed">
          {recipes.map((recipe, index) => (
            <div className="recipe" key={index}>
              <div className="recipeHeader">
                <div className="imageDiv">
                  <img
                    className="userIcon"
                    src={
                      recipe?.userId?.img === undefined
                        ? icon
                        : recipe?.userId?.img
                    }
                    alt={recipe?.userId?.username}
                  />
                </div>
                <div className="userTitle">
                  <p className="userIconTitle">{recipe?.userId?.username}</p>
                </div>
              </div>
              <div className="foodRecipeDiv">
                <div></div>
                <p className="recipeFeedTitle">{recipe.mealName}</p>
                <img
                  className="recipeImage"
                  src={recipe.image}
                  alt={recipe.name}
                />
                <p className="calories">{recipe.calories}</p>

                <div className="recipeButtons">
                  <a
                    className="instructionAnchor"
                    href={`https://www.youtube.com/results?search_query=${recipe.mealName} recipe`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="instructionButton">
                      <img
                        className="linkIcons"
                        src={youtube}
                        alt="Instructions"
                      />
                    </button>
                  </a>
                  <a className="instructionAnchor" href="#">
                    <button
                      onClick={toggleCommentView}
                      className="instructionButton"
                    >
                      <img
                        className="linkIcons"
                        src={commentIcon}
                        alt="Instructions"
                      />
                    </button>
                  </a>
                  <ViewComments
                    isOpen={isViewCommentsOpen}
                    isClose={() => setIsViewCommentsOpen(false)}
                  />

                  <a className="instructionAnchor" href="#">
                    <button
                      className="instructionButton"
                      onClick={() => openRecipeModal(index)}
                    >
                      <img
                        className="linkIcons"
                        src={recipeIcon}
                        alt="Instructions"
                      />
                    </button>
                  </a>
                </div>

                {selectedRecipeIndex === index && (
           <Modal
           isOpen={isRecipeModalOpen}
           onRequestClose={closeRecipeModal}
           style={{
             content: {
               width: "50%",
               height: "50%",
               margin: "auto",
               overflow: "auto",
               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
             },
             overlay: {
               backgroundColor: "rgba(0, 0, 0, 0.5)",
             },
           }}
         >
         
                    <div className="recipeModalContent">
                      <RecipeItem recipe={recipe} userId={user.Id} />
                      <button id="recipeModalButton" onClick={closeRecipeModal}>Close</button>
                    </div>
                  </Modal>
                )}

                <button
                  className="modalButton"
                  onClick={() => setCurrentRecipeId(recipe._id)}
                >
                  Add a Comment!
                </button>

                <div>
                  <Modal
                    isOpen={currentRecipeId === recipe._id}
                    onRequestClose={() => setCurrentRecipeId(null)}
                  >
                    <div className="closeModalButtonDiv">
                      <p>Add a Comment!</p>
                      <button
                        className="closeModalButton"
                        onClick={() => setCurrentRecipeId(null)}
                      >
                        X
                      </button>
                    </div>
                    <Comments
                      recipeId={currentRecipeId}
                      userId={user.Id}
                      comment={null}
                      setComment={null}
                      onRequestClose={() => setCurrentRecipeId(null)}
                    />
                  </Modal>
                </div>

                <DeleteButton user={user} recipe={recipe} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

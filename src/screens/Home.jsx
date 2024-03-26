import { useState, useEffect } from "react";
import { deleteRecipe, getRecipes } from "../services/recipes.js";
import { getCommentById } from "../services/comments.js";
import Comments from "../components/AddCommentModal.jsx";
import ViewComments from "../components/ViewComments.jsx";
import SearchRecipe from "../components/SearchRecipe.jsx";
import DeleteButton from "../components/DeleteButton.jsx";
import icon from "../assets/userIcon.jpg";
import Modal from "react-modal";
import "../styles/Home.css";

function Home({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [comment, setComments] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);

  async function fetchRecipes() {
    const allRecipes = await getRecipes();
    setRecipes(allRecipes);
    setLoaded(true);
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  const openModal = (recipeId) => {
    setCurrentRecipeId(recipeId);
  };

  const closeModal = () => {
    setCurrentRecipeId(null);
  };

  return (
    <div>
      <div className="container">
        <SearchRecipe />
        {/* HOLA */}

        <div className="recipeFeed">
          {recipes.length > 0 &&
            recipes.map((recipe, index) => (
              <div className="recipe">
                <div className="recipeHeader">
                  <img
                    className="userIcon"
                    src={
                      recipe?.userId?.img === undefined
                        ? icon
                        : recipe?.userId?.img
                    }
                    alt={recipe?.userId?.username}
                  ></img>
                  <p className="userIconTitle">{recipe?.userId?.username}</p>
                </div>
                <p className="recipeFeedTitle">{recipe.mealName}</p>
                <img
                  className="recipeImage"
                  src={recipe.image}
                  alt={recipe.name}
                ></img>
                <p>{recipe.calories}</p>
                <div className="ingredientsAndMeasurements">
                  <ul className="ingredients">
                    <h5 className="listTitle">Ingredients</h5>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.name}</li>
                    ))}
                  </ul>
                  <ul className="measurements">
                    <h5 className="listTitle">Measurements</h5>
                    {recipe.ingredients.map((measurement, index) => (
                      <li key={index}>{measurement.quantity}</li>
                    ))}
                  </ul>
                </div>
                <div className="recipeInstructions">
                  <ol>
                    <h5 className="listTitle">Instructions</h5>
                    <li>{recipe.instructions}</li>
                  </ol>
                </div>
                <button
                  className="modalButton"
                  onClick={() => openModal(recipe._id)}
                >
                  Add a Comment!
                </button>
                <ViewComments />
                {/* comments not being pulled from the db */}
                <div>
                  <Modal
                    isOpen={currentRecipeId === recipe._id}
                    onRequestClose={closeModal}
                  >
                    <div className="closeModalButtonDiv">
                      <p>Add a Comment!</p>
                      <button className="closeModalButton" onClick={closeModal}>
                        X
                      </button>
                    </div>
                    <Comments
                      recipeId={currentRecipeId}
                      userId={user.Id}
                      comment={comment}
                      setComment={setComments}
                      onRequestClose={closeModal}
                    />
                  </Modal>
                </div>
                <DeleteButton user={user} recipe={recipe} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

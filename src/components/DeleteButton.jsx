import { useState, useEffect } from "react";
import { deleteRecipe, getRecipeById } from "../services/recipes.js";
import { useParams } from "react-router-dom";

const DeleteButton = (props) => {
  const [oneRecipe, setOneRecipe] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const { id } = useParams();
  const { user, recipe } = props;

  useEffect(() => {
    const fetchRecipe = async () => {
      const fetchedRecipe = await getRecipeById(id);
      setOneRecipe(fetchedRecipe);
      setLoaded(true);
    };
    fetchRecipe();
  }, [id]);

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {console.log("Recipe:", recipe)}
      {user.id === recipe.userId._id && (
        <button
          onClick={() => deleteRecipe(oneRecipe.id)}
          className="deleteButton"
        >
          Delete Recipe
        </button>
      )}
    </div>
  );
};

export default DeleteButton;

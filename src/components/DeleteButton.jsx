import { deleteRecipe } from "../services/recipes.js";

const DeleteButton = (props) => {
  const { user, recipe } = props;

  return (
    <div>
     
      {user && recipe && user.id === recipe.userId._id && (
        <button
          onClick={() => deleteRecipe(recipe._id)} 
          className="deleteButton"
        >
          Delete Recipe
        </button>
      )}
    </div>
  );
};

export default DeleteButton;



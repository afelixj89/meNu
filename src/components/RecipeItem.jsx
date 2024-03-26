import React from "react";

function RecipeItem() {
  return (
    <div>
      <div className="recipe">
        <div className="recipeHeader">
          <img
            className="userIcon"
            src={recipe?.userId?.img === undefined ? icon : recipe?.userId?.img}
            alt={recipe?.userId?.username}
          ></img>
          <p className="userIconTitle">{recipe?.userId?.username}</p>
        </div>
        <p className="recipeFeedTitle">{recipe.mealName}</p>
        <img className="recipeImage" src={recipe.image} alt={recipe.name}></img>
        <p>{recipe.calories}</p>
        <div className="ingredientsAndMeasurements">
          <ul className="ingredients">
            <h5 className="listTitle">Ingredients</h5>

            {recipe.ingredients.map((ingredient) => (
              <li>{ingredient.name}</li>
            ))}
          </ul>
          <ul className="measurements">
            <h5 className="listTitle">Measurements</h5>
            {recipe.ingredients.map((measurement) => (
              <li>{measurement.quantity}</li>
            ))}
          </ul>
        </div>

        <button className="modalButton" onClick={() => openModal(recipe._id)}>
          Create a Comment
        </button>

        {/* <ViewComments /> */}

        {/* <div className="recipeComments">
                  {recipe.comments.map((oneComment, index) => (
                    <p key={index}>{oneComment.comment}</p>
                  ))}
                </div> */}
      </div>
    </div>
  );
}

export default RecipeItem;

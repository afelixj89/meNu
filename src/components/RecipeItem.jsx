import React from "react";

function RecipeItem({ recipe, userId, currentRecipeId }) {
  return (
    <div className="recipeItem">
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
    </div>
  );
}

export default RecipeItem;

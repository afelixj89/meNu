import { useState } from "react";
import "../styles/SearchRecipe.css";

function SearchRecipe({ recipes, setRecipes }) {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Function to handle search
  const handleSearch = () => {
    // Filter recipes based on search query
    const filtered = recipes.filter((recipe) =>
      recipe.mealName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Update the recipes state with filtered recipes
    setRecipes(filtered);
    // Clear the search query
    setSearchQuery("");
  };

  return (
    <div className="searchRecipeContainer">
      <h2>Search For a Recipe:</h2>
      <div className="searchRecipeSearch">
        <input
          type="text"
          placeholder="Enter Recipe"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        />
        <div className="searchButtonDiv">
        <button className="searchRecipeButton" onClick={handleSearch}>
          Search
        </button>
        </div>
      </div>
    </div>
  );
}

export default SearchRecipe;

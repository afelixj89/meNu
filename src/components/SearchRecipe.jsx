import { useState, useEffect } from "react";
import { getRecipes } from "../services/recipes.js";
import Modal from "react-modal";
import "../styles/SearchRecipe.css";

function SearchRecipe({ recipes, setRecipes }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  

  return (
    <div className="searchRecipeContainer">
      <button className="searchRecipeSubmitButtonModal" onClick={openModal}>
        Search For A Recipe
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="searchRecipeModalHeader">
          <button className="closeModalButton" onClick={closeModal}>
            X
          </button>
        </div>
        <h2>Search For a Recipe</h2>
        <div className="searchRecipeSearch">
        <input
          type="text"
          placeholder="Enter Recipe"
          value={null}
          onChange={null}
        />
        <button className= "searchRecipeButton" onClick={null}>Search</button>
        </div>

      </Modal>
    </div>
  );
}

export default SearchRecipe;

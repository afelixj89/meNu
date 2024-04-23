import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import { createRecipe, deleteRecipe } from "../services/recipes.js";
import { editUser, getUser } from "../services/users.js";
import "../styles/dashboard.css";
import userIcon from "../assets/userIcon.jpg";

function Dashboard({ user, recipes }) {
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [recipeForm, setRecipeForm] = useState({
    mealName: "",
    instructions: "",
    image: "",
    calories: "",
    ingredients: [],
  });
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    quantity: "",
  });
  const [editUserForm, setEditUserForm] = useState({
    username: "",
    email: "",
    description: "",
    img: "",
  });
  const [userInfo, setUserInfo] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const userInformation = await getUser(user?.id);
      setUserInfo(userInformation);
    } catch (error) {
      console.error("Error getting user", error);
    }
  }, [user?.id]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        await fetchUser();
      }
    };

    fetchData();
  }, [user?.id, fetchUser]);

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    try {
      await createRecipe(recipeForm);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error creating Recipes", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setRecipeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    setRecipeForm((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient],
    }));
    setNewIngredient({ name: "", quantity: "" });
  };

  const ingredientHandleChange = (e) => {
    const { name, value } = e.target;
    setNewIngredient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openUserModal = () => {
    setShowUserModal(true);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
  };

  const handleEditUser = (e) => {
    const { name, value } = e.target;
    setEditUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(user?.id, editUserForm);
      closeUserModal();
      window.location.reload();
    } catch (error) {
      console.error("Error editing user", error);
    }
  };

  const handleDelete = async (recipeId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (userConfirmed) {
      try {
        await deleteRecipe(recipeId);
        window.location.reload();
      } catch (error) {
        console.error("Failed to delete recipe", error);
      }
    } else {
      console.log("Deletion cancelled by user");
    }
  };

  return (
    <div className="containerSeperate">
      <div className="user_profile">
        <div className="userUsername">{userInfo?.username || "Loading..."}</div>

        <div className="userImgAlign">
          {userInfo?.img ? (
            <img className="userImg" src={userInfo.img} alt="User" />
          ) : (
            <img className="userImg" src={userIcon} alt="User Icon" />
          )}
        </div>
        <div className="alignUserDescription">
          <div className="userDescription">
            {userInfo?.description || "Loading..."}
          </div>
        </div>
        <div className="buttonCenterDb">
        <button className="dbButton" onClick={openUserModal}>
          Edit Personal Info
        </button>
        </div>
        <Modal
          isOpen={showUserModal}
          onRequestClose={closeUserModal}
          contentLabel="Example Modal"
        >
          <form onSubmit={handleEditUserSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={editUserForm.username}
                onChange={handleEditUser}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={editUserForm.email}
                onChange={handleEditUser}
              />
            </label>
            <label>
              Image:
              <input
                type="text"
                name="img"
                value={editUserForm.img}
                onChange={handleEditUser}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={editUserForm.description}
                onChange={handleEditUser}
              />
            </label>
            <button className="dbButton" type="submit">
              Save Changes
            </button>
          </form>
        </Modal>
          <div className="buttonCenterDb">
        <button className="dbButton" onClick={openModal}>
          Add Recipe
        </button>
        </div>
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <button onClick={() => setShowModal(false)}>Close</button>
          <form onSubmit={handleCreateRecipe} className="createRecipeForm">
            <label>
              Meal Name:
              <input
                type="text"
                name="mealName"
                value={recipeForm.mealName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Instructions:
              <textarea
                name="instructions"
                value={recipeForm.instructions}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={recipeForm.image}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Calories:
              <input
                type="text"
                name="calories"
                value={recipeForm.calories}
                onChange={handleChange}
                required
              />
            </label>
            <div className="ingredients_input">
              <label>
                Ingredient Name:
                <input
                  type="text"
                  name="name"
                  value={newIngredient.name}
                  onChange={ingredientHandleChange}
                />
              </label>
              <label>
                Quantity:
                <input
                  type="text"
                  name="quantity"
                  value={newIngredient.quantity}
                  onChange={ingredientHandleChange}
                />
              </label>
              <button type="button" onClick={handleAddIngredient}>
                Add Ingredient
              </button>
            </div>
            <ul>
              {recipeForm?.ingredients?.map((ingredient, index) => (
                <li key={`ingredient_form_${index}`}>
                  {ingredient.name} - {ingredient.quantity}
                </li>
              ))}
            </ul>
            <button type="submit">Add Recipe</button>
          </form>
        </Modal>
      </div>

      <div>
        <div className="dashboard_title">
          <p className="userNameTitle">
            WELCOME , {userInfo?.firstName || "Loading..."}{" "}
            {userInfo?.lastName || "Loading..."}
          </p>
        </div>

        <div className="recipeCardUser">
          {recipes?.map((recipe, index) => (
            <div className="root_recipe" id="recipeCard" key={`recipe_${index}`}>
              <div className="recipe_name recipe_content">
                <h3 className="recipe_title" key={`recipe_name_${index}`}>
                  Recipe: {recipe.mealName}
                </h3>
              </div>
              <div className="recipe_img recipe_content">
                <img
                  className="recipe_image"
                  src={recipe.image}
                  alt={recipe.mealName}
                  key={`recipe_image_${index}`}
                />
              </div>
              <div
                className="recipe_instructions recipe_content"
                key={`recipe_instructions_${index}`}
              >
                <p className="recipe_description">{recipe.instructions}</p>
              </div>
              <div
                className="recipe_calories recipe_content"
                key={`recipe_calories_${index}`}
              >
                <h4 className="recipe_calorie_title">{recipe.calories}</h4>
              </div>
              <div
                className="recipe_ingredients recipe_content"
                key={`recipe_ingredients_${index}`}
              >
                <ul>
                  <li className="ingredient_list_title">Ingredient:</li>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li
                      key={`ingredient_${index}_${i}`}
                      className="ingredient_list_item"
                    >
                      {ingredient.name}
                    </li>
                  ))}
                </ul>
                <ul>
                  <li className="amount_list_title">Amount:</li>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li
                      key={`ingredient_quantity_${index}_${i}`}
                      className="amount_list_item"
                    >
                      {ingredient.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="dbButton"
                onClick={() => handleDelete(recipe.recipeId)}
                key={`recipe_button_${index}`}
              >
                Delete Recipe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

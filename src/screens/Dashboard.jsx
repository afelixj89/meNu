import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { createRecipe, deleteRecipe } from '../services/recipes.js';
import { editUser, getUser } from '../services/users.js';
import '../styles/dashboard.css';

function Dashboard({ user, recipes }) {
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [recipeForm, setRecipeForm] = useState({
    mealName: '',
    instructions: '',
    image: '',
    calories: '',
    ingredients: [],
  });
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
  });
  const [editUserForm, setEditUserForm] = useState({
    username: '',
    email: '',
    description: '',
    img: '',
  });
  const [userInfo, setUserInfo] = useState(null);

  const fetchUser = async () => {
    try {
      const userInformation = await getUser(user?.id);
      setUserInfo(userInformation);
    } catch (error) {
      console.error('Error getting user', error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      setEditUserForm({
        username: userInfo.username || '',
        email: userInfo.email || '',
        description: userInfo.description || '',
        img: userInfo.img || '',
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (user?.id) {
      fetchUser();
    }
  }, [user?.id]);

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    try {
      await createRecipe(recipeForm);
      setShowModal(false);
      setToggle(true);
      window.location.reload();
    } catch (error) {
      console.error('Error creating Recipes', error);
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
    setNewIngredient({ name: '', quantity: '' });
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
      const updatedUser = await editUser(user?.id, editUserForm);
      closeUserModal();
      window.location.reload();
    } catch (error) {
      console.error('Error editing user', error);
    }
  };

  const handleDelete = async (recipeId) => {
    const userConfirmed = window.confirm('Are you sure you want to delete this recipe?');
    if (userConfirmed) {
      try {
        await deleteRecipe(recipeId);
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete recipe', error);
      }
    } else {
      console.log('Deletion cancelled by user');
    }
  };

  return (
    <div>
      <div className="dashboard_title">
        <p className="userNameTitle">WELCOME {userInfo?.firstName || 'Loading...'} {userInfo?.lastName || 'Loading...'}</p>
      </div>
      <div className="recipe_photos">
        <div className="recipeCardUser">
          {recipes?.map((recipe) => (
            <div className="root_recipe" key={recipe.recipeId}>
              <div className="recipe_name">
                <h3>Recipe:{recipe.mealName}</h3>
              </div>
              <div className="recipe_img">
                <img src={recipe.image} alt={recipe.mealName} />
              </div>
              <div className="recipe_instructions">
                <p>{recipe.instructions}</p>
              </div>
              <div className="recipe_calories">
                <h4>{recipe.calories}</h4>
              </div>
              <div className="recipe_ingredients">
                <ul>
                  Ingredient:
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.name}</li>
                  ))}
                </ul>
                <ul>
                  Amount:
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.quantity}>{ingredient.quantity}</li>
                  ))}
                </ul>
              </div>
              <button className="dbButton" onClick={() => handleDelete(recipe.recipeId)}>
                Delete Recipe
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="user_profile">
        <div className="userUsername">{userInfo?.username || 'Loading...'}</div>
        <div className="userImg">{userInfo?.img ? <img src={userInfo.img} alt="User" /> : 'Loading...'}</div>
        <div className="userDescription">{userInfo?.description || 'Loading...'}</div>
      </div>
      <div className="userEdit">
        <button className="dbButton" onClick={openUserModal}>
          Edit Personal Info
        </button>
        <Modal isOpen={showUserModal} onRequestClose={closeUserModal} contentLabel="Example Modal">
          <form onSubmit={handleEditUserSubmit}>
            <label>
              Username:
              <input type="text" name="username" value={editUserForm.username} onChange={handleEditUser} />
            </label>
            <label>
              Email:
              <input type="text" name="email" value={editUserForm.email} onChange={handleEditUser} />
            </label>
            <label>
              Image:
              <input type="text" name="img" value={editUserForm.img} onChange={handleEditUser} />
            </label>
            <label>
              Description:
              <input type="text" name="description" value={editUserForm.description} onChange={handleEditUser} />
            </label>
            <button className="dbButton" type="submit">
              Save Changes
            </button>
          </form>
        </Modal>
      </div>
      <button className="dbButton" onClick={openModal}>
        Add Recipe
      </button>
      <Modal isOpen={showModal} onRequestClose={closeModal} contentLabel="Example Modal">
        <button onClick={() => setShowModal(false)}>Close</button>
        <form onSubmit={handleCreateRecipe} className="createRecipeForm">
          <label>
            Meal Name:
            <input type="text" name="mealName" value={recipeForm.mealName} onChange={handleChange} required />
          </label>
          <label>
            Instructions:
            <textarea name="instructions" value={recipeForm.instructions} onChange={handleChange} required />
          </label>
          <label>
            Image URL:
            <input type="text" name="image" value={recipeForm.image} onChange={handleChange} required />
          </label>
          <label>
            Calories:
            <input type="text" name="calories" value={recipeForm.calories} onChange={handleChange} required />
          </label>
          <div className="ingredients_input">
            <label>
              Ingredient Name:
              <input type="text" name="name" value={newIngredient.name} onChange={ingredientHandleChange} />
            </label>
            <label>
              Quantity:
              <input type="text" name="quantity" value={newIngredient.quantity} onChange={ingredientHandleChange} />
            </label>
            <button type="button" onClick={handleAddIngredient}>
              Add Ingredient
            </button>
          </div>
          <ul>
            {recipeForm?.ingredients?.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} - {ingredient.quantity}
              </li>
            ))}
          </ul>
          <button type="submit">Add Recipe</button>
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard;

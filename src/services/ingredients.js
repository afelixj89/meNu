import api from "./apiConfing.js";

export const getIngredient = async () => {
  try {
    const response = await api.get("/ingredients");

    return response.data;
  } catch (error) {
    console.error("Error Getting all Ingredients:", error);
  }
};

export const getIngredientById = async (id) => {
  try {
    const response = await api.get(`/ingredients/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error Getting the Ingredient:", error);
  }
};

export const createIngredient = async (ingredientData) => {
  try {
    const response = await api.post(`/ingredients/`, ingredientData);
    return response.data;
  } catch (error) {
    console.error("Error", error);
  }
};

export const editIngredient = async (id, ingredientData) => {
  try {
    const response = await api.put(`/ingredients/${id}`, ingredientData);
    return response.data;
  } catch (error) {
    console.error("Error", error);
  }
};

export const deleteIngredient = async (id) => {
  try {
    const response = await api.delete(`/ingredients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error", error);
  }
};

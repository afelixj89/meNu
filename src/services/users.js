import api from "./apiConfing.js";
import {jwtDecode} from "jwt-decode";

export const register = async (userData) => {
  try {
    const response = await api.post(`/user/register`, userData);
    localStorage.setItem("token", response.data.token);
    const user = jwtDecode(response.data.token);
    return user;

  } catch (error) {
    // Log the error for debugging purposes
    console.error("Register error:", error);
    // Transform the error into a user-friendly message or custom error object
    const errorMessage =
      error.response?.data?.message || "Login failed due to unexpected error";

    // Optionally, throw a new error with the transformed message or handle it differently
    throw new Error(errorMessage);
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post(`/user/login`, credentials);
    localStorage.setItem("token", response.data.token);
    const user = jwtDecode(response.data.token);
    return user;
  } catch (error) {
    console.error("Error Getting the Users:", error);
  }
};

export const signOut = async () => {
  try {
    if (localStorage.getItem("token") === null) {
      throw new Error("No token found");
    }

    localStorage.removeItem("token");
    return true;
  } catch (error) {
    throw error;
  }
};

export const verify = async () => {
  //get token from local storage
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    const res = await api.get("/user/verify");
    return res.data;
  }
};


// -- Steven is routing edit user in backend --
 export const editUser = async (id , userData) => {
    try{
      const response = await api.put(`/user/edit/${id}`, userData)
      return response.data
    } catch(error){
      console.error("Error editing user", error)
      const errorMessage = error.response?.data?.message || "Failed to edit user due to unexpected error";
      throw new Error(errorMessage)
    }
 }

// -- If we want a delete account functionality --
//  export const deleteUser = async (id) => {
//     try{
//      const response = await api.delete(`/users/${id}`)
//      return response.data
//     } catch(error){
//      console.error("Error", error)
//     }
//  }

export const getUsers = async () => {
  try {
    const response = await api.get("/user/all");
    return response.data;
  } catch (error) {
    console.error("Error Getting all Users:", error);
  }
};

export const getUser = async (id) => {
  try {
    const response = await api.get(`/user/${id}`)
    return response.data
  } catch (error) {
    console.error("Error getting user by ID", error);
  }
}

import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { verify } from "./services/users.js";
import Home from "./screens/Home.jsx";
import Nav from "./components/Nav.jsx";
import Landing from "./screens/Landing.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import { getRecipes } from "./services/recipes.js";
import Modal from 'react-modal'; // Import Modal

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verify();
      user ? setUser(user) : setUser(null);
    };
    fetchUser();

    const fetchRecipes = async () => {
      try {
        const allRecipes = await getRecipes();
        setRecipes(allRecipes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const location = useLocation();

  // Set the root element as the app element for React Modal
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <div className="App">
      {location.pathname === "/" ? null : <Nav user={user} />}
      <Routes>
        <Route path="/" element={<Landing setUser={setUser} />} />
        <Route
          path="/home"
          element={<Home user={user} recipes={recipes} loading={loading} />}
        />
        <Route
          path="/db"
          element={<Dashboard user={user} recipes={recipes} loading={loading} />}
        />
      </Routes>
      {/* Credits */}
    </div>
  );
}

export default App;

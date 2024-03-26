import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { verify } from "./services/users.js";
import Home from "./screens/Home.jsx";
import Nav from "./components/Nav.jsx";
import Landing from "./screens/Landing.jsx";
import Dashboard from "./screens/Dashboard.jsx";


import "./App.css";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verify();
      user ? setUser(user) : setUser(null);
    };
    fetchUser();
  }, []);


  const location = useLocation();

  return (
    <div className="App">
      <div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
     </div>
      {location.pathname === "/" ? null : <Nav user={user}/>}
      <Routes>
        <Route path="/" element={<Landing setUser={setUser}/>} />
        <Route path="/home" element={<Home  user={user}/>} />
        <Route path="/db" element={<Dashboard user={user}/>} />
      </Routes>
      
      <div className="creditImage"><a href="https://www.freepik.com/free-photo/top-view-fresh-vegetables-with-raw-pasta-black_15805988.htm#&position=12&from_view=search&track=ais&uuid=23d636df-4e1e-425e-94dc-355767e984a6">Image by KamranAydinov</a> on Freepik</div>
    </div>
  );
}

export default App;

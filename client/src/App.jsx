import { Navigate, Route, Routes } from "react-router-dom";
import Inscription from "./pages/inscription/Inscription";
import Connexion from "./pages/connexion/Connexion";
import Home from "./pages/home/Home";
import { useState } from "react";
import RefreshHandler from "./utils/RefreshHandler";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // eslint-disable-next-line react/prop-types
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/connexion" />;
  };

  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/inscription" />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

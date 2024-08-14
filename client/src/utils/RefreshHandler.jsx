import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/connexion" ||
        location.pathname === "/inscription"
      ) {
        navigate("/home", { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated]);
  return null;
};

export default RefreshHandler;

import { motion } from "framer-motion";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleSucces } from "../../utils/utils";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [userLogged, setUserLogged] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setUserLogged(localStorage.getItem("userLogged"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogged");

    handleSucces("Déconnexion en cours");

    setTimeout(() => {
      navigate("/connexion");
    }, 2000);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] px-8 shadow-lg">
      <div className="w-24 h-auto mb-14 text-8xl">
        <motion.div
          animate={{
            scale: [1, 2, 1],
            rotate: 360,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🥳
        </motion.div>
      </div>
      <h1 className="text-3xl text-stone-800 mb-4">👏 Félicitations ! 😁</h1>
      <p className="text-2xl text-orange-400 font-bold mb-6">
        {userLogged.toLocaleUpperCase()}
      </p>
      <div>
        <button
          onClick={handleLogout}
          className="border px-4 py-2 rounded bg-violet-600 hover:bg-violet-700 text-white"
        >
          <Logout /> {` Déconnexion`}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

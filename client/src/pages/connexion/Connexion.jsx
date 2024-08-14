import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import axios from "axios";
import {
  AlternateEmail,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleError, handleSucces } from "../../utils/utils";
import { ToastContainer } from "react-toastify";

export default function Connexion() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = userInfo;

    if (!email || !password) {
      return handleError("Tous les champs sont obligatoires");
    }

    const apiUrl = "https://auth-app-mern-api.vercel.app/auth/connexion";
    await axios
      .post(apiUrl, userInfo)
      .then((res) => {
        setTimeout(() => {
          handleSucces(res.data.message);
        }, 100);

        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("userLogged", res.data.name);

        navigate("/home");
      })
      .catch((err) => {
        handleError(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center mt-32 px-8">
      <div className="w-96 border rounded bg-white px-7 py-10 shadow">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl mb-7 text-center font-medium text-slate-800">
            Connexion
          </h1>

          <div className="input-box">
            <TextField
              name="email"
              type="email"
              value={userInfo.email}
              onChange={handleChange}
              fullWidth
              placeholder="Adresse email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmail />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </div>

          <div className="input-box">
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              value={userInfo.password}
              onChange={handleChange}
              fullWidth
              placeholder="Mot de passe"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </div>

          <div className="mb-4">
            <Button variant="contained" fullWidth type="submit" size="large">
              {`Se connecter`}
            </Button>
          </div>

          <div className="flex justify-between items-center text-sm text-center">
            <p>{`Vous n'avez pas de compte ? `}</p>{" "}
            <p>
              <Link
                to="/inscription"
                className="text-blue-500 underline hover:text-blue-600"
              >{`S'inscrire`}</Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

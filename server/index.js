// IMPORTATION DES MODULES
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
const path = require("path");

// CONNEXION À LA BASE DE DONNÉES
connectDB();

// VARIABLES D'ENVIRONNEMENT
const PORT = process.env.PORT || 8080;

// INITIALISATION DE L'APPLICATION EXPRESS
const app = express();

// MIDDLEWARES POUR LE TRAITEMENT DES DONNÉES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.static(path.join(__dirname, "dist")));

// PAGE D'ACCUEIL DE L'APPLICATION EXPRESS
app.get("/", async (req, res) => {
  res.status(200).json({ Hello: "Bonjour les gens" });
});

// CRÉATION DE LA ROUTE POUR L'AUTHENTIFICATION
const authRouter = require("./routers/authRouters");
app.use("/auth", authRouter);

// DEMARRAGE DU SERVEUR
app.listen(PORT, () => {
  try {
    console.log(`Serveur en cours sur le port ${PORT} ...`);
  } catch (error) {
    console.log("Erreur au lancement du serveur : ", error.message);
  }
});

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_DB_URI = process.env.MONGO_DB_URI;

const connectDB = async () => {
  await mongoose
    .connect(MONGO_DB_URI)
    .then((res) => {
      console.log("Base de données connectée avec succès");
    })
    .catch((error) => {
      console.log("Erreur de connexion à la base de données : ", error.message);
    });
};

module.exports = connectDB;

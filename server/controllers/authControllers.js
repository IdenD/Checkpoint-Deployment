const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// INSCRIPTION DE L'UTILISATEUR
const inscription = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "Adresse email déjà utilisée", success: false });
    }

    const user = new userModel({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return res
      .status(200)
      .json({ message: "Inscription réussie", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

// CONNEXION DE L'UTILISATEUR
const connexion = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });

    if (!isUserExist) {
      return res.status(400).json({
        message: "Adresse email ou mot de passe incorrect",
        success: false,
      });
    }

    const isPassword = await bcrypt.compare(password, isUserExist.password);

    if (!isPassword) {
      return res.status(400).json({
        message: "Adresse email ou mot de passe incorrect",
        success: false,
      });
    }

    const userInfo = { email: isUserExist.email, _id: isUserExist._id };
    const accessToken = jwt.sign(userInfo, ACCESS_TOKEN_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "Connexion réussie",
      success: true,
      accessToken,
      email,
      name: isUserExist.name,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server", success: false });
  }
};

// RÉCUPÉRATION DE L'UTILISATEUR
// const getuser = async (req, res) => {
//   const { user } = req.user;

//   try {
//     const isUserExist = await userModel.findOne({ _id: user._id });

//     if (!isUserExist) {
//       return res
//         .status(400)
//         .json({ message: "Utilisateur introuvable", success: false });
//     }

//     return res.status(200).json({
//       message: "Utilisateur existant",
//       success: true,
//       user: {
//         name: isUserExist.name,
//         email: isUserExist.email,
//         _id: isUserExist._id,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal Server", success: false });
//   }
// };

module.exports = { inscription, connexion /*getuser*/ };

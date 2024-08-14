const express = require("express");
const {
  inscriptionValidation,
  connexionValidation,
} = require("../middlewares/authValidation");
const { inscription, connexion, getuser } = require("../controllers/authControllers");
// const authenticatedToken = require("../middlewares/auth");

const router = express.Router();

router.post("/inscription", inscriptionValidation, inscription);
router.post("/connexion", connexionValidation, connexion);
// router.get("/getUser", authenticatedToken, getuser)

module.exports = router;

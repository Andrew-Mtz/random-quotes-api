const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const FrasesController = require("../controllers/FrasesController");

// Rutas de frases
router.get("/", FrasesController.obtenerFrases);
router.post("/", authMiddleware, FrasesController.agregarFrase);
router.patch("/:id", authMiddleware, FrasesController.editarFrase);
router.delete("/:id", authMiddleware, FrasesController.eliminarFrase);

module.exports = router;

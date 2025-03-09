const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const DatosCuriososController = require("../controllers/DatosCuriososController");

// Rutas de datos curiosos
router.get("/", DatosCuriososController.obtenerDatoCurioso);
router.post("/", authMiddleware, DatosCuriososController.agregarDatoCurioso);
router.delete(
  "/:id",
  authMiddleware,
  DatosCuriososController.eliminarDatoCurioso
);

module.exports = router;

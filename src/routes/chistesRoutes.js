const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const ChistesController = require("../controllers/ChistesController");

// Rutas de chistes
router.get("/", ChistesController.obtenerChiste);
router.post("/", authMiddleware, ChistesController.agregarChiste);
router.delete("/:id", authMiddleware, ChistesController.eliminarChiste);

module.exports = router;

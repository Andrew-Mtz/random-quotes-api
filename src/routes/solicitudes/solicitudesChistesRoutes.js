const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const SolicitudesChistesController = require("../../controllers/solicitudes/SolicitudesChistesController");

// Rutas de solicitudes de frases
router.get("/", authMiddleware, SolicitudesChistesController.verSolicitudes);
router.post("/", SolicitudesChistesController.solicitarChiste);
router.patch(
  "/:id/aprobar",
  authMiddleware,
  SolicitudesChistesController.aprobarChiste
);
router.delete(
  "/:id/rechazar",
  authMiddleware,
  SolicitudesChistesController.rechazarChiste
);

module.exports = router;

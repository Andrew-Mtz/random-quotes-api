const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const SolicitudesDatosController = require("../../controllers/solicitudes/SolicitudesDatosCuriososController");

// Rutas de solicitudes de frases
router.get("/", authMiddleware, SolicitudesDatosController.verSolicitudes);
router.post("/", SolicitudesDatosController.solicitarDatoCurioso);
router.patch(
  "/:id/aprobar",
  authMiddleware,
  SolicitudesDatosController.aprobarDatoCurioso
);
router.delete(
  "/:id/rechazar",
  authMiddleware,
  SolicitudesDatosController.rechazarDatoCurioso
);

module.exports = router;

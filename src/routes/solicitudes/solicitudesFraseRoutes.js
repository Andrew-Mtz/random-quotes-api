const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const SolicitudesFrasesController = require("../../controllers/solicitudes/SolicitudesFrasesController");

router.get("/", authMiddleware, SolicitudesFrasesController.verSolicitudes);
router.post("/", SolicitudesFrasesController.solicitarFrase);
router.patch(
  "/:id/aprobar",
  authMiddleware,
  SolicitudesFrasesController.aprobarFrase
);
router.delete(
  "/:id/rechazar",
  authMiddleware,
  SolicitudesFrasesController.rechazarFrase
);

module.exports = router;

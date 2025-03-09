const express = require("express");
const router = express.Router();

// Importamos las rutas específicas de cada tipo de solicitud
const solicitudesFraseRoutes = require("./solicitudesFraseRoutes");
const solicitudesChistesRoutes = require("./solicitudesChistesRoutes");
const solicitudesDatosRoutes = require("./solicitudesDatosRoutes");

// Agrupamos las rutas bajo "/api/solicitudes"
router.use("/frases", solicitudesFraseRoutes);
router.use("/chistes", solicitudesChistesRoutes);
router.use("/datos-curiosos", solicitudesDatosRoutes);

module.exports = router;

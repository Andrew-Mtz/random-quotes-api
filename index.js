require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/utils/db"); // Importamos la connexión a la base de datos

// Importamos las rutas
const frasesRoutes = require("./src/routes/frasesRoutes");
const chistesRoutes = require("./src/routes/chistesRoutes");
const datosCuriososRoutes = require("./src/routes/datosCuriososRoutes");
const solicitudesRoutes = require("./src/routes/solicitudes/solicitudesRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Conectamos a la base de datos

// Usar las rutas
app.use("/api/frases", frasesRoutes);
app.use("/api/chistes", chistesRoutes);
app.use("/api/datos-curiosos", datosCuriososRoutes);
app.use("/api/solicitudes", solicitudesRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);

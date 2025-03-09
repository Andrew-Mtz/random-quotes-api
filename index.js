require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./src/utils/db"); // Importamos la connexión a la base de datos

const FrasesController = require("./src/controllers/FrasesController"); // Importamos el controlador de frases
const ChistesController = require("./src/controllers/ChistesController"); // Importamos el controlador de chistes
const DatosCuriososController = require("./src/controllers/DatosCuriososController"); // Importamos el controlador de datos curiosos

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Conectamos a la base de datos

app.get("/api/frases", FrasesController.obtenerFrases);
app.post("/api/frases", FrasesController.agregarFrase);
app.delete("/api/frases/:id", FrasesController.eliminarFrase);

app.get("/api/chistes", ChistesController.obtenerChiste);
app.post("/api/chistes", ChistesController.agregarChiste);
app.delete("/api/chistes/:id", ChistesController.eliminarChiste);

app.get("/api/datos-curiosos", DatosCuriososController.obtenerDatoCurioso);
app.post("/api/datos-curiosos", DatosCuriososController.agregarDatoCurioso);
app.delete(
  "/api/datos-curiosos/:id",
  DatosCuriososController.eliminarDatoCurioso
);

app.use(function (req, res) {
  res.status(404);
  res.send({ error: "Sorry, can't find that" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);

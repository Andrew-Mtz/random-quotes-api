require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./src/utils/db"); // Importamos la connexión a la base de datos
const Frase = require("./src/models/Frase"); // Importamos el modelo Frase

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

connectDB();

app.get("/api/frases", async (req, res) => {
  const categoria = req.query.categoria;

  let frases;
  let error;
  if (categoria) {
    frases = await Frase.find({ categoria: categoria.toLowerCase() });
    error = "No hay frases en esta categoría";
  } else {
    frases = await Frase.find();
    error = "Aún no hay frases en la base de datos";
  }

  if (frases.length === 0) {
    return res.status(404).json({ error });
  }

  const randomIndex = Math.floor(Math.random() * frases.length);
  res.json({ frase: frases[randomIndex].texto });
});

app.post("/api/frases", async (req, res) => {
  const { categoria, texto } = req.body;

  if (!categoria || !texto) {
    return res.status(400).json({ error: "Debe incluir categoría y texto" });
  }

  if (texto.length < 5) {
    return res
      .status(400)
      .json({ error: "La frase debe tener al menos 5 caracteres" });
  }

  try {
    // 📌 Validar si la frase ya existe en la base de datos
    const fraseExistente = await Frase.findOne({ texto });
    if (fraseExistente) {
      return res
        .status(400)
        .json({ error: "La frase ya existe en la base de datos" });
    }

    // 📌 Guardar la nueva frase
    const nuevaFrase = new Frase({ categoria: categoria.toLowerCase(), texto });
    await nuevaFrase.save();

    res.status(201).json({
      mensaje: "Frase guardada en la base de datos",
      frase: nuevaFrase,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", detalle: error.message });
  }
});

app.use(function (req, res) {
  res.status(404);
  res.send({ error: "Sorry, can't find that" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);

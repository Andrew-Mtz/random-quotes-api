require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const frasesPath = "quotes.json";

// Cargar frases desde el archivo JSON
const frases = JSON.parse(fs.readFileSync(frasesPath, "utf-8"));

const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/frases", (req, res) => {
  const categoria = req.query.categoria;

  if (categoria) {
    const frasesFiltradas = frases.filter(
      f => f.categoria === categoria.toLowerCase()
    );

    if (frasesFiltradas.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    const randomIndex = Math.floor(Math.random() * frasesFiltradas.length);
    return res.json({ frase: frasesFiltradas[randomIndex].texto });
  }

  // Si no se pasa categoría, devolver una frase aleatoria de cualquier categoría
  const randomIndex = Math.floor(Math.random() * frases.length);
  res.json({ frase: frases[randomIndex].texto });
});

app.post("/api/frases", (req, res) => {
  const { categoria, texto } = req.body;

  if (!categoria || !texto) {
    return res.status(400).json({ error: "Debe incluir categoría y texto" });
  }

  if (texto.length < 5) {
    return res
      .status(400)
      .json({ error: "La frase debe tener al menos 5 caracteres" });
  }

  const nuevaFrase = { categoria: categoria.toLowerCase(), texto };

  // Leer frases actuales del archivo
  const frasesActuales = JSON.parse(fs.readFileSync(frasesPath, "utf-8"));

  if (frasesActuales.some(f => f.texto === nuevaFrase.texto)) {
    return res.status(400).json({ error: "La frase ya existe" });
  }

  // Agregar nueva frase y guardar en el archivo
  frasesActuales.push(nuevaFrase);
  fs.writeFileSync(frasesPath, JSON.stringify(frasesActuales, null, 2));

  res
    .status(201)
    .json({ mensaje: "Frase guardada correctamente", frase: nuevaFrase });
});

app.use(function (req, res) {
  res.status(404);
  res.send({ error: "Sorry, can't find that" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);

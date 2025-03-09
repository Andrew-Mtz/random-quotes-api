const Frase = require("../models/Frase"); // Importamos el modelo Frase

// GET
exports.obtenerFrases = async (req, res) => {
  const categoria = req.query.categoria;

  let frases;
  if (categoria) {
    frases = await Frase.find({ categoria: categoria.toLowerCase() });
  } else {
    frases = await Frase.find();
  }

  if (frases.length === 0) {
    return res.status(404).json({ error: "No hay frases en esta categoría" });
  }

  const randomIndex = Math.floor(Math.random() * frases.length);
  res.json({ frase: frases[randomIndex].texto });
};

// POST
exports.agregarFrase = async (req, res) => {
  const { categoria, texto, autor } = req.body;

  if (!categoria || !texto) {
    return res.status(400).json({ error: "Debe incluir categoría y texto" });
  }

  if (texto.length < 5) {
    return res
      .status(400)
      .json({ error: "La frase debe tener al menos 5 caracteres" });
  }

  try {
    const fraseExistente = await Frase.findOne({ texto });
    if (fraseExistente) {
      return res
        .status(400)
        .json({ error: "La frase ya existe en la base de datos" });
    }

    const nuevaFrase = new Frase({
      categoria: categoria.toLowerCase(),
      texto,
      autor: autor || "Anónimo",
    });
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
};

// PUT
exports.editarFrase = async (req, res) => {
  const { id } = req.params;
  const { categoria, texto, autor } = req.body;

  try {
    const fraseActualizada = await Frase.findByIdAndUpdate(
      id,
      { categoria, texto, autor },
      { new: true }
    );

    if (!fraseActualizada) {
      return res.status(404).json({ error: "Frase no encontrada" });
    }

    res.json({
      mensaje: "Frase actualizada con éxito",
      frase: fraseActualizada,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", detalle: error.message });
  }
};

// DELETE
exports.eliminarFrase = async (req, res) => {
  const { id } = req.params;

  try {
    const fraseEliminada = await Frase.findByIdAndDelete(id);

    if (!fraseEliminada) {
      return res.status(404).json({ error: "Frase no encontrada" });
    }

    res.json({ mensaje: "Frase eliminada con éxito", frase: fraseEliminada });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", detalle: error.message });
  }
};

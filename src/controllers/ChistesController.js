const Chiste = require("../models/Chiste");

// GET
exports.obtenerChiste = async (req, res) => {
  const categoria = req.query.categoria;
  let chistes;

  if (categoria) {
    chistes = await Chiste.find({ categoria: categoria.toLowerCase() });
  } else {
    chistes = await Chiste.find();
  }

  if (chistes.length === 0) {
    return res.status(404).json({ error: "No hay chistes en esta categoría" });
  }

  const randomIndex = Math.floor(Math.random() * chistes.length);
  res.json(chistes[randomIndex]);
};

// POST
exports.agregarChiste = async (req, res) => {
  const { categoria, pregunta, respuesta, texto } = req.body;

  if (!pregunta && !texto) {
    return res.status(400).json({ error: "Debe incluir un chiste" });
  }

  try {
    const nuevoChiste = new Chiste({
      categoria: categoria?.toLowerCase(),
      pregunta,
      respuesta,
      texto,
    });

    await nuevoChiste.save();
    res.status(201).json({ mensaje: "Chiste agregado", chiste: nuevoChiste });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", detalle: error.message });
  }
};

// DELETE
exports.eliminarChiste = async (req, res) => {
  const { id } = req.params;

  try {
    const chisteEliminado = await Chiste.findByIdAndDelete(id);

    if (!chisteEliminado) {
      return res.status(404).json({ error: "Chiste no encontrado" });
    }

    res.json({
      mensaje: "Chiste eliminado con éxito",
      chiste: chisteEliminado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", detalle: error.message });
  }
};

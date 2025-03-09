const Chiste = require("../models/Chiste");

// GET
exports.obtenerChiste = async (req, res) => {
  const { categoria, tipo } = req.query;
  let filtro = {};

  if (categoria) filtro.categoria = categoria.toLowerCase();
  if (tipo) filtro.tipo = tipo;

  const chistes = await Chiste.find(filtro);

  if (chistes.length === 0) {
    return res
      .status(404)
      .json({ error: "No hay chistes con estos criterios" });
  }

  const randomIndex = Math.floor(Math.random() * chistes.length);
  res.json(chistes[randomIndex]);
};

// POST
exports.agregarChiste = async (req, res) => {
  const { categoria, tipo, pregunta, respuesta, texto } = req.body;

  if (!tipo || !["pregunta-respuesta", "texto"].includes(tipo)) {
    return res
      .status(400)
      .json({ error: "El tipo debe ser 'pregunta-respuesta' o 'texto'" });
  }

  if (!categoria) {
    return res.status(400).json({ error: "Debe incluir categoría" });
  }

  if (tipo === "pregunta-respuesta" && (!pregunta || !respuesta)) {
    return res.status(400).json({
      error: "Debe incluir pregunta y respuesta para este tipo de chiste",
    });
  }

  if (tipo === "texto" && !texto) {
    return res
      .status(400)
      .json({ error: "Debe incluir texto para este tipo de chiste" });
  }

  try {
    const nuevoChiste = new Chiste({
      categoria: categoria.toLowerCase(),
      tipo,
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

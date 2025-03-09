const Chiste = require("../models/DatoCurioso");

// GET
const DatoCurioso = require("../models/DatoCurioso");

exports.obtenerDatoCurioso = async (req, res) => {
  const categoria = req.query.categoria;
  let datos;

  if (categoria) {
    datos = await DatoCurioso.find({ categoria: categoria.toLowerCase() });
  } else {
    datos = await DatoCurioso.find();
  }

  if (datos.length === 0) {
    return res
      .status(404)
      .json({ error: "No hay datos curiosos en esta categoría" });
  }

  const randomIndex = Math.floor(Math.random() * datos.length);
  res.json(datos[randomIndex]);
};

// POST
exports.agregarDatoCurioso = async (req, res) => {
  const { categoria, texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: "Debe incluir un dato curioso" });
  }

  try {
    const nuevoDato = new DatoCurioso({
      categoria: categoria?.toLowerCase(),
      texto,
    });

    await nuevoDato.save();
    res.status(201).json({ mensaje: "Dato curioso agregado", dato: nuevoDato });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", detalle: error.message });
  }
};

// DELETE
exports.eliminarDatoCurioso = async (req, res) => {
  const { id } = req.params;

  try {
    const datoEliminado = await DatoCurioso.findByIdAndDelete(id);

    if (!datoEliminado) {
      return res.status(404).json({ error: "Dato curioso no encontrado" });
    }

    res.json({
      mensaje: "Dato curioso eliminado con éxito",
      dato: datoEliminado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", detalle: error.message });
  }
};

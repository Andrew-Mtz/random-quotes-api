const SolicitudFrase = require("../../models/solicitudes/SolicitudFrase");

exports.verSolicitudes = async (req, res) => {
  const solicitudes = await SolicitudFrase.find({ estado: "pendiente" });

  if (solicitudes.length === 0) {
    return res.status(404).json({ error: "No hay solicitudes pendientes" });
  }

  res.json(solicitudes);
};

exports.solicitarFrase = async (req, res) => {
  const { categoria, texto, autor } = req.body;

  if (!categoria || !texto) {
    return res.status(400).json({ error: "Debe incluir categoría y texto" });
  }

  try {
    const nuevaSolicitud = new SolicitudFrase({
      categoria: categoria.toLowerCase(),
      texto,
      autor: autor || "Anónimo",
    });

    await nuevaSolicitud.save();
    res.status(201).json({
      mensaje: "Solicitud enviada para revisión",
      solicitud: nuevaSolicitud,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", detalle: error.message });
  }
};

const Frase = require("../../models/Frase");

exports.aprobarFrase = async (req, res) => {
  const { id } = req.params;

  try {
    const solicitud = await SolicitudFrase.findById(id);
    if (!solicitud)
      return res.status(404).json({ error: "Solicitud no encontrada" });

    // Crear una nueva frase en la colección principal
    const nuevaFrase = new Frase({
      categoria: solicitud.categoria,
      texto: solicitud.texto,
      autor: solicitud.autor,
    });

    await nuevaFrase.save();

    // Marcar la solicitud como aprobada
    solicitud.estado = "aprobada";
    await solicitud.save();

    res.json({
      mensaje: "Frase aprobada y agregada a la base de datos",
      frase: nuevaFrase,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", detalle: error.message });
  }
};

exports.rechazarFrase = async (req, res) => {
  const { id } = req.params;

  try {
    const solicitud = await SolicitudFrase.findById(id);
    if (!solicitud)
      return res.status(404).json({ error: "Solicitud no encontrada" });

    solicitud.estado = "rechazada";
    await solicitud.save();

    res.json({ mensaje: "Solicitud rechazada", solicitud });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", detalle: error.message });
  }
};

const SolicitudDatoCurioso = require("../../models/solicitudes/SolicitudDatoCurioso");

exports.verSolicitudes = async (req, res) => {
  const solicitudes = await SolicitudDatoCurioso.find({ estado: "pendiente" });

  if (solicitudes.length === 0) {
    return res.status(404).json({ error: "No hay solicitudes pendientes" });
  }

  res.json(solicitudes);
};

exports.solicitarDatoCurioso = async (req, res) => {
  const { categoria, texto } = req.body;

  if (!categoria || !texto) {
    return res.status(400).json({ error: "Debe incluir categoría y texto" });
  }

  try {
    const nuevaSolicitud = new SolicitudDatoCurioso({
      categoria: categoria.toLowerCase(),
      texto,
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

const DatoCurioso = require("../../models/DatoCurioso");

exports.aprobarDatoCurioso = async (req, res) => {
  const { id } = req.params;

  try {
    const solicitud = await SolicitudDatoCurioso.findById(id);
    if (!solicitud)
      return res.status(404).json({ error: "Solicitud no encontrada" });

    // Crear una nueva frase en la colección principal
    const nuevoDato = new DatoCurioso({
      categoria: solicitud.categoria,
      texto: solicitud.texto,
    });

    await nuevoDato.save();

    // Marcar la solicitud como aprobada
    solicitud.estado = "aprobada";
    await solicitud.save();

    res.json({
      mensaje: "Dato curioso aprobado y agregado a la base de datos",
      dato: nuevoDato,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", detalle: error.message });
  }
};

exports.rechazarDatoCurioso = async (req, res) => {
  const { id } = req.params;

  try {
    const solicitud = await SolicitudDatoCurioso.findById(id);
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

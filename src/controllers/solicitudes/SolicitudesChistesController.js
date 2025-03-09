const SolicitudChiste = require("../../models/solicitudes/SolicitudChiste");

exports.verSolicitudes = async (req, res) => {
  const solicitudes = await SolicitudChiste.find({ estado: "pendiente" });

  if (solicitudes.length === 0) {
    return res.status(404).json({ error: "No hay solicitudes pendientes" });
  }

  res.json(solicitudes);
};

exports.solicitarChiste = async (req, res) => {
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
    const nuevaSolicitud = new SolicitudChiste({
      categoria: categoria.toLowerCase(),
      tipo,
      pregunta,
      respuesta,
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

const Chiste = require("../../models/Chiste");

exports.aprobarChiste = async (req, res) => {
  const { id } = req.params;

  try {
    const solicitud = await SolicitudChiste.findById(id);
    if (!solicitud)
      return res.status(404).json({ error: "Solicitud no encontrada" });

    const nuevoChiste = new Chiste({
      categoria: solicitud.categoria,
      tipo: solicitud.tipo,
      pregunta: solicitud.pregunta,
      respuesta: solicitud.respuesta,
      texto: solicitud.texto,
    });

    await nuevoChiste.save();

    solicitud.estado = "aprobada";
    await solicitud.save();

    res.json({
      mensaje: "Chiste aprobado y agregado a la base de datos",
      Chiste: nuevaChiste,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", detalle: error.message });
  }
};

exports.rechazarChiste = async (req, res) => {
  const { id } = req.params;

  try {
    const solicitud = await SolicitudChiste.findById(id);
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

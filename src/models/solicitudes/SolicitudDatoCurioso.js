const mongoose = require("mongoose");

const SolicitudDatoCuriosoSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  texto: { type: String, required: true, unique: true },
  estado: {
    type: String,
    enum: ["pendiente", "aprobada", "rechazada"],
    default: "pendiente",
  },
});

const SolicitudDatoCurioso = mongoose.model(
  "solicitudesDatos",
  SolicitudDatoCuriosoSchema
);
module.exports = SolicitudDatoCurioso;

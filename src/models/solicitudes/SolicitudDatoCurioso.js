const mongoose = require("mongoose");

const SolicitudDatoCuriosoSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  texto: { type: String, required: true, unique: true },
});

const SolicitudDatoCurioso = mongoose.model(
  "solicitudesDatos",
  SolicitudDatoCuriosoSchema
);
module.exports = SolicitudDatoCurioso;

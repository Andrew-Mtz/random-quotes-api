const mongoose = require("mongoose");

const SolicitudFraseSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  texto: { type: String, required: true, unique: true },
  autor: { type: String, default: "Anónimo" },
  estado: {
    type: String,
    enum: ["pendiente", "aprobada", "rechazada"],
    default: "pendiente",
  },
});

const SolicitudFrase = mongoose.model(
  "solicitudesFrases",
  SolicitudFraseSchema
);
module.exports = SolicitudFrase;

const mongoose = require("mongoose");

const SolicitudChisteSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  tipo: { type: String, enum: ["pregunta-respuesta", "texto"], required: true },
  pregunta: {
    type: String,
    required: function () {
      return this.tipo === "pregunta-respuesta";
    },
  },
  respuesta: {
    type: String,
    required: function () {
      return this.tipo === "pregunta-respuesta";
    },
  },
  texto: {
    type: String,
    required: function () {
      return this.tipo === "texto";
    },
  },
  estado: {
    type: String,
    enum: ["pendiente", "aprobada", "rechazada"],
    default: "pendiente",
  },
});

const SolicitudChiste = mongoose.model(
  "solicitudesChistes",
  SolicitudChisteSchema
);
module.exports = SolicitudChiste;

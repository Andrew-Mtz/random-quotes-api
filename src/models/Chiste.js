const mongoose = require("mongoose");

const ChisteSchema = new mongoose.Schema({
  categoria: { type: String, required: false },
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
});

const Chiste = mongoose.model("chistes", ChisteSchema);
module.exports = Chiste;

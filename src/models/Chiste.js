const mongoose = require("mongoose");

const ChisteSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  pregunta: { type: String, required: false },
  respuesta: { type: String, required: false },
  texto: { type: String, required: false },
});

const Chiste = mongoose.model("chistes", ChisteSchema);
module.exports = Chiste;

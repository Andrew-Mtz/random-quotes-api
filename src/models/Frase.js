const mongoose = require("mongoose");

const FraseSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  texto: { type: String, required: true, unique: true },
  autor: { type: String, default: "Anónimo" },
});

const Frase = mongoose.model("quotes", FraseSchema);

module.exports = Frase;

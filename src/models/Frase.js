const mongoose = require("mongoose");

// Definir el esquema para la colección "Frases"
const FraseSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  texto: { type: String, required: true, unique: true },
  autor: { type: String, default: "Anónimo" }, // Nuevo campo
});

// Crear el modelo basado en el esquema
const Frase = mongoose.model("quotes", FraseSchema);

module.exports = Frase;

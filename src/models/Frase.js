const mongoose = require("mongoose");

// Definir el esquema para la colección "Frases"
const FraseSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  texto: { type: String, required: true, unique: true }, // 'unique: true' evita frases duplicadas automáticamente
});

// Crear el modelo basado en el esquema
const Frase = mongoose.model("quotes", FraseSchema);

module.exports = Frase;

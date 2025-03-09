const mongoose = require("mongoose");

const Datoschema = new mongoose.Schema({
  categoria: { type: String, required: true },
  texto: { type: String, required: true, unique: true },
});

const DatoCurioso = mongoose.model("datos", Datoschema);

module.exports = DatoCurioso;

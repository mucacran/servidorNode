const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

// Define el nombre de la base de datos
const dbName = 'mibasededatos';

// Define el nombre de la colección
const collectionName = 'miprimeracoleccion';

//module.exports = mongoose.model('Post', postSchema);

  module.exports = mongoose.model('Post', postSchema, collectionName, "");


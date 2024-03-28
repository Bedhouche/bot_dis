const mongoose = require('mongoose');

// Définir les valeurs autorisées pour le champ "type"
const validTypes = ['books', 'websites', 'videos', 'others'];

const resourceSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: validTypes },
  subject: { type: String, required: true },
  link: { type: String, required: true },
  userId: { type: String, required: true },
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;

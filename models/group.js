/* const mongoose = require('mongoose');

// Définir le schéma Mongoose pour les groupes
const groupSchema = new mongoose.Schema({
    name: String,
    description: String,
    members: [String], // Stockez les ID des membres
    channelId: String, // Ajoutez le champ channelId pour stocker l'ID du canal
    scheduledTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ScheduledTask' }], // Référence aux tâches planifiées
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
 */

const mongoose = require('mongoose');

// Schéma Mongoose pour les canaux associés
const channelSchema = new mongoose.Schema({
    channelId: String,
    channelName: String,
});

// Définir le schéma Mongoose pour les groupes
const groupSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true, required: true },
    description: String,
    members: [String], // Stockez les ID des membres
    channelId: String, // Ajoutez le champ channelId pour stocker l'ID du canal
    scheduledTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ScheduledTask' }], // Référence aux tâches planifiées
    associatedChannels: [channelSchema], // Liste des canaux associés
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;

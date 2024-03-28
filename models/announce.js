const mongoose = require('mongoose');

// Modèle de données pour les annonces
const announceSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    channel: {
        type: String, // Modifiez ici pour accepter une chaîne
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Announce = mongoose.model('Announce', announceSchema);

module.exports = Announce;

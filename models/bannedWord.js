const mongoose = require('mongoose');

const bannedWordSchema = new mongoose.Schema({
    word: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
});

const BannedWord = mongoose.model('BannedWord', bannedWordSchema);

module.exports = BannedWord;

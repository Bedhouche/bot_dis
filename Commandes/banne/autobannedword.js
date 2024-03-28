const { Permissions } = require('discord.js');
const BannedWord = require('../../models/bannedWord'); 

module.exports = async (message) => {
    if (message.author.bot) return;

    // Retrieve the list of banned words from the database
    const bannedWords = await getBannedWords();

    // Check if the message contains a banned word
    const content = message.content.toLowerCase();
    if (bannedWords.some(word => content.includes(word))) {
        // Ban the user
        try {
            await message.member.ban({ reason: 'Used a banned word.' });
            console.log(`User ${message.author.tag} banned for using banned words.`);
            // Delete the message that triggered the action
            await message.delete();
        } catch (error) {
            console.error('Error trying to ban the user:', error);
        }
    }
};

async function getBannedWords() {
    try {
        const words = await BannedWord.find({});
        return words.map(word => word.text.toLowerCase());
    } catch (error) {
        console.error('Error retrieving banned words:', error);
        return [];
    }
}

module.exports = {
    getBannedWords,
};
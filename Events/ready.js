const Discord = require("discord.js");

module.exports = async (bot , message) => {
    try {
        console.log(`${bot.user.tag} est bien en ligne !`);
    } catch (error) {
        console.error('Erreur dans le script ready :', error.message);
    }
};

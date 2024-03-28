//interactionHandler.js

const { Client, Permissions, MessageEmbed } = require('discord.js');

module.exports = async (bot, interaction) => {
    if (!interaction.isCommand()) return;

    const command = bot.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply('Une erreur est survenue lors de l\'exécution de cette commande.');
    }
};

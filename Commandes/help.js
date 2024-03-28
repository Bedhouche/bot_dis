const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Affiche une liste des commandes disponibles avec des descriptions détaillées.',
    execute(message, args, commands) {
        if (!commands || commands.size === 0) {
            return message.channel.send("Aucune commande trouvée.");
        }

        const helpEmbed = new EmbedBuilder()
            .setColor(0xFFD700) // Set the color of the embed to yellow
            .setTitle('Liste des commandes')
            .setDescription('Voici une liste de toutes les commandes disponibles.')
            .setFooter({ text: 'bot student' });

        let count = 0;
        commands.forEach(command => {
            if (count < 25) {
                helpEmbed.addFields({ name: `!${command.name}`, value: command.description || 'Pas de description disponible.', inline: true });
                count++;
            }
        });

        message.channel.send({ embeds: [helpEmbed] });
    }
};
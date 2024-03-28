const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Vérifie la latence du bot et la latence de l\'API',
    execute: async function (message, args) {
        const sent = await message.channel.send('Pinging...');
        const timeDiff = (sent.editedTimestamp || sent.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp);
        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('Pong!')
            .addFields(
                { name: 'Latence du bot', value: `${timeDiff}ms`, inline: true },
                { name: 'Latence de l\'API', value: `${Math.round(message.client.ws.ping)}ms`, inline: true }
            );
        await sent.edit({ content: ' ', embeds: [embed] });
    }
};
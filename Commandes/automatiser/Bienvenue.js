const { EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');

function handleWelcome(member) {
    // Recherchez un canal nommé "welcome" dans la liste des canaux du serveur
    const welcomeChannel = member.guild.channels.cache.find(channel => 
        channel.name === "welcome" && channel.type === ChannelType.GuildText
    );

    if (welcomeChannel && welcomeChannel.permissionsFor(member.guild.me).has(PermissionsBitField.Flags.SendMessages)) {
        const welcomeEmbed = new EmbedBuilder()
            .setTitle(`Bienvenue sur le serveur, ${member.user.tag}!`)
            .setDescription('N\'oubliez pas de lire les règles.')
            .setColor('#0099ff');

        // Send the welcome message
        welcomeChannel.send({ embeds: [welcomeEmbed] });
    } else {
        console.error("Le bot n'a pas la permission d'envoyer des messages dans le canal de bienvenue ou le canal n'a pas été trouvé.");
    }
}

module.exports = { handleWelcome };


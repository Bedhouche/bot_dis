const Discord = require("discord.js");

module.exports = {
    name: 'guildMemberAdd', // Nom de l'événement Discord.js pour l'arrivée d'un membre sur le serveur
    run: (member) => {
        // Trouver le salon 'bienvenue' dans le serveur
        const channel = member.guild.channels.cache.find(ch => ch.name === 'bienvenue');

        // Vérifier si le salon existe
        if (!channel) return;

        // Envoyer un message de bienvenue
        channel.send(`Bienvenue sur le serveur, ${member.user.tag}!`);
    }
};

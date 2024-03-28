// Importer les modules nécessaires
const { MessageMentions } = require('discord.js');

module.exports = {
    name: 'message_commande',
    description: 'Autorisez les membres à utiliser des commandes spécifiques pour envoyer des messages à des canaux spécifiques ou à des groupes de personnes.',
    execute(message, args) {
        // Vérifier si l'utilisateur a la permission nécessaire
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.reply("Vous n'avez pas la permission d'utiliser cette commande.").catch(console.error);
            return;
        }

        // Extraire la mention de canal ou de groupe de personnes
        const mention = args[0];
        const mentionID = mention ? MessageMentions.CHANNELS_PATTERN.exec(mention) : null;

        // Vérifier si la mention est valide
        if (!mentionID) {
            message.reply("Veuillez mentionner un canal ou un groupe de personnes valide.").catch(console.error);
            return;
        }

        // Extraire le message à envoyer
        const messageContent = args.slice(1).join(' ');

        // Envoyer le message au canal ou au groupe de personnes
        message.client.channels.fetch(mentionID[1])
            .then(channel => channel.send(messageContent))
            .catch(error => {
                console.error(error);
                message.reply("Erreur lors de l'envoi du message.").catch(console.error);
            });
    },
};

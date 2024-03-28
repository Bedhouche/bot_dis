const Group = require('../models/group');

module.exports = {
    name: 'timer',
    description: 'Définit un minuteur pour des sessions d\'étude concentrées (technique Pomodoro).',
    usage: '<nom du groupe> <durée en minutes>',
    async execute(message, args) {
        // Vérifier le nombre d'arguments
        if (args.length !== 2) {
            return message.reply('Utilisation incorrecte. Exemple : !timer <nom du groupe> <durée en minutes>');
        }

        const groupName = args[0];
        const duration = parseInt(args[1], 10);

        // Récupérer le groupe depuis la base de données
        try {
            const group = await Group.findOne({ name: groupName });

            if (!group) {
                return message.reply(`Le groupe "${groupName}" n'existe pas.`);
            }

            // Vérifier si l'utilisateur fait partie du groupe
            if (!group.members.includes(message.author.id)) {
                return message.reply(`Vous ne faites pas partie du groupe "${groupName}".`);
            }

            // Vérifier si la durée est un nombre valide
            if (isNaN(duration) || duration <= 0) {
                return message.reply('Veuillez spécifier une durée valide en minutes.');
            }

            // Définir le minuteur Pomodoro
            message.reply(`Le minuteur Pomodoro est réglé sur ${duration} minutes. La session d'étude commence maintenant.`);

            setTimeout(() => {
                message.channel.send(`La session d'étude de ${duration} minutes est terminée. Prenez une courte pause !`);
            }, duration * 60 * 1000); // Convertir la durée en millisecondes
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la recherche du groupe :', error);
            return message.reply('Une erreur s\'est produite lors de la recherche du groupe. Veuillez réessayer plus tard.');
        }
    },
};

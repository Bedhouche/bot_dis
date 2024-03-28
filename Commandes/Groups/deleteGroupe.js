
const { PermissionsBitField } = require('discord.js');
const Group = require('../../models/group'); // Adjust the path to your Group model

module.exports = {
    name: 'deletegroup',
    description: 'Supprime un groupe et son salon associé.',
    async execute(message, args) {
        // Vérifier si l'utilisateur a la permission de gérer les salons
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply("Vous n'avez pas la permission de supprimer des salons.");
        }

        const nom = args[0];
        if (!nom) {
            return message.reply("Veuillez spécifier le nom du groupe à supprimer.");
        }

        // Demander une confirmation avant de procéder
        const filter = m => m.author.id === message.author.id;
        message.reply('Êtes-vous sûr de vouloir supprimer ce groupe ? (oui/non)')
            .then(() => {
                message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        const response = collected.first().content.toLowerCase();
                        if (response === 'oui') {
                            // Logique de suppression du groupe et du salon
                            // Supprimer le salon associé au groupe
                            const channel = message.guild.channels.cache.find(c => c.name === nom);
                            if (channel) {
                                channel.delete()
                                    .then(() => {
                                        // Supprimer le groupe de la base de données
                                        Group.findOneAndDelete({ name: nom })
                                            .then(() => {
                                                message.reply(`Le groupe ${nom} et son salon associé ont été supprimés avec succès.`);
                                            })
                                            .catch(error => {
                                                console.error(error);
                                                message.reply("Une erreur s'est produite lors de la suppression du groupe dans la base de données.");
                                            });
                                    })
                                    .catch(error => {
                                        console.error(error);
                                        message.reply("Une erreur s'est produite lors de la suppression du salon.");
                                    });
                            } else {
                                message.reply("Le salon associé au groupe n'a pas été trouvé.");
                            }
                        } else {
                            message.reply('Suppression annulée.');
                        }
                    })
                    .catch(() => {
                        message.reply('Temps écoulé, suppression annulée.');
                    });
            });
    },
};


/* const { PermissionsBitField } = require('discord.js');
const Group = require('../../models/group'); // Adjust the path to your Group model

module.exports = {
    name: 'deletegroup',
    description: 'Supprime un groupe et son salon associé.',
    async execute(message, args) {
        // Vérifier si l'utilisateur a le rôle d'administrateur
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("Vous n'avez pas la permission d'utiliser cette commande.");
        }

        const nom = args[0];
        if (!nom) {
            return message.reply("Veuillez spécifier le nom du groupe à supprimer.");
        }

        // Trouver le salon associé au groupe
        const channel = message.guild.channels.cache.find(c => c.name === nom);
        if (!channel) {
            return message.reply("Le salon associé au groupe n'a pas été trouvé.");
        }

        // Supprimer le salon
        await channel.delete().catch(error => {
            console.error(error);
            return message.reply("Une erreur s'est produite lors de la suppression du salon.");
        });

        // Supprimer le groupe de la base de données
        await Group.findOneAndDelete({ name: nom }).catch(error => {
            console.error(error);
            return message.reply("Une erreur s'est produite lors de la suppression du groupe dans la base de données.");
        });

        return message.reply(`Le groupe ${nom} et son salon associé ont été supprimés avec succès.`);
    },
}; */
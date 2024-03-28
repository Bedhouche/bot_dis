const { PermissionsBitField, ChannelType } = require('discord.js');
const Group = require('../../models/group');

module.exports = {
    name: 'adduser',
    description: 'Ajoute un utilisateur à un groupe existant.',
    async execute(message, args) {
        try {
            // Vérifier si l'utilisateur a le rôle d'administrateur
            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                throw new Error("Vous n'avez pas la permission d'utiliser cette commande.");
            }

            const groupName = args[0];
            const userMentions = args.slice(1); // Les arguments après le nom du groupe sont supposés être des mentions d'utilisateurs

            if (!groupName || userMentions.length === 0) {
                throw new Error("Veuillez spécifier le nom du groupe et au moins une mention d'utilisateur à ajouter.");
            }

            // Trouver le groupe dans la base de données
            const group = await Group.findOne({ name: groupName });
            if (!group) {
                throw new Error("Le groupe spécifié n'a pas été trouvé dans la base de données.");
            }

            // Ajouter les utilisateurs au groupe
            const usersToAdd = [];
            const existingMembers = []; // Pour stocker les utilisateurs déjà membres

            for (const userMention of userMentions) {
                const userId = userMention.replace(/[<@!>]/g, ''); // Extraire l'ID de l'utilisateur de la mention
                const user = message.guild.members.cache.get(userId);

                if (user) {
                    if (group.members.includes(user.id)) {
                        // L'utilisateur est déjà membre du groupe
                        existingMembers.push(user.displayName || user.user.username);
                    } else {
                        // Ajouter l'utilisateur à la liste des utilisateurs à ajouter
                        usersToAdd.push(user.id);
                    }
                } else {
                    console.log(`L'utilisateur spécifié ${userMention} n'a pas été trouvé.`);
                }
            }

            // Ajouter les utilisateurs au groupe
            group.members.push(...usersToAdd);
            await group.save();

            // Informer sur les membres existants
            if (existingMembers.length > 0) {
                const existingMembersString = existingMembers.join(', ');
                message.reply(`Les utilisateurs suivants sont déjà membres du groupe : ${existingMembersString}`);
            }

            // Informer sur les utilisateurs ajoutés
            if (usersToAdd.length > 0) {
                const usersAddedString = usersToAdd.join(', ');
                message.reply(`Les utilisateurs suivants ont été ajoutés au groupe ${groupName} : ${usersAddedString}`);
            } else {
                message.reply(`Aucun nouvel utilisateur n'a été ajouté au groupe ${groupName}.`);
            }
        } catch (error) {
            console.error(error);
            message.reply(`Une erreur s'est produite lors de l'ajout des utilisateurs au groupe. Détails : ${error.message}`);
        }
    },
};

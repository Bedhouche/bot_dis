const { PermissionsBitField } = require('discord.js');
const Group = require('../../models/group');

module.exports = {
    name: 'deleteuser',
    description: 'Supprime un utilisateur d\'un groupe existant.',
    async execute(message, args) {
        try {
            // Vérifier si l'utilisateur a le rôle d'administrateur
            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                throw new Error("Vous n'avez pas la permission d'utiliser cette commande.");
            }

            const groupName = args[0];
            const userMentions = args.slice(1); // Les arguments après le nom du groupe sont supposés être des mentions d'utilisateurs

            if (!groupName || userMentions.length === 0) {
                throw new Error("Veuillez spécifier le nom du groupe et au moins une mention d'utilisateur à supprimer.");
            }

            // Trouver le groupe dans la base de données
            const group = await Group.findOne({ name: groupName });
            if (!group) {
                throw new Error("Le groupe spécifié n'a pas été trouvé dans la base de données.");
            }

            // Supprimer les utilisateurs du groupe
            const usersToRemove = [];
            const nonExistingMembers = []; // Pour stocker les utilisateurs qui ne sont pas membres

            for (const userMention of userMentions) {
                const userId = userMention.replace(/[<@!>]/g, ''); // Extraire l'ID de l'utilisateur de la mention

                if (group.members.includes(userId)) {
                    // Ajouter l'utilisateur à la liste des utilisateurs à supprimer
                    usersToRemove.push(userId);
                } else {
                    nonExistingMembers.push(userMention);
                }
            }

            // Supprimer les utilisateurs du groupe
            group.members = group.members.filter(memberId => !usersToRemove.includes(memberId));
            await group.save();

            // Informer sur les membres inexistants
            if (nonExistingMembers.length > 0) {
                const nonExistingMembersString = nonExistingMembers.join(', ');
                message.reply(`Les utilisateurs suivants ne sont pas membres du groupe : ${nonExistingMembersString}`);
            }

            // Informer sur les utilisateurs supprimés
            if (usersToRemove.length > 0) {
                const usersRemovedString = usersToRemove.join(', ');
                message.reply(`Les utilisateurs suivants ont été supprimés du groupe ${groupName} : ${usersRemovedString}`);
            } else {
                message.reply(`Aucun utilisateur n'a été supprimé du groupe ${groupName}.`);
            }
        } catch (error) {
            console.error(error);
            message.reply(`Une erreur s'est produite lors de la suppression des utilisateurs du groupe. Détails : ${error.message}`);
        }
    },
};

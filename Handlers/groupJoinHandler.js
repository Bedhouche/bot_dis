// groupJoinHandler.js
const Group = require('../models/group');

async function handleGroupJoin(member) {
    // Obtenez le nom du salon que l'utilisateur a rejoint
    const channelName = member.voice.channel ? member.voice.channel.name : null;

    // Si l'utilisateur a rejoint un salon vocal
    if (channelName) {
        try {
            // Recherchez un groupe avec le même nom que le salon dans la base de données
            const group = await Group.findOne({ name: channelName });

            // Si le groupe existe et que l'utilisateur n'est pas déjà membre
            if (group && !group.members.includes(member.id)) {
                // Ajoutez l'utilisateur au groupe
                group.members.push(member.id);
                // Sauvegardez les modifications dans la base de données
                await group.save();
                console.log(`Utilisateur ajouté au groupe : ${member.user.tag}`);
            } else if (group) {
                console.log(`L'utilisateur est déjà membre du groupe : ${member.user.tag}`);
            } else {
                console.log(`Aucun groupe trouvé pour le salon : ${channelName}`);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur à la base de données :', error);
        }
    }
}

module.exports = handleGroupJoin;
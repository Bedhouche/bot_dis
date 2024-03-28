const { Group } = require('../models/group');
const ScheduledTask = require('../models/scheduledTask'); 
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'schedule',
    description: 'Aide les étudiants à planifier des sessions d\'étude ou des rappels pour les tâches.',
    async execute(message, args) {
        const groupName = args[0];
        const task = args.slice(1).join(' '); // Combine tous les arguments restants pour former la tâche
        const time = args[args.length - 1]; // Prend la dernière partie comme le temps

        // Récupérer le groupe depuis la base de données
        const group = await Group.findOne({ name: groupName });
        if (!group) {
            return message.reply(`Le groupe "${groupName}" n'existe pas.`);
        }

        // Vérifier si l'utilisateur fait partie du groupe
        if (!group.members.includes(message.author.id)) {
            return message.reply(`Vous ne faites pas partie du groupe "${groupName}".`);
        }

        // Créer et enregistrer la tâche planifiée dans la base de données
        const scheduledTask = new ScheduledTask({ taskId: group._id, task, time });
        await scheduledTask.save();

        // Ajouter la référence à la tâche planifiée dans le groupe
        group.scheduledTasks.push(scheduledTask);
        await group.save();

        // Afficher une confirmation à l'utilisateur
        message.reply(`La tâche "${task}" pour le groupe "${groupName}" a été planifiée pour ${time}.`);
    }
};
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const schedule = require('node-schedule');
const Announce = require('../../models/announce.js');
const Group = require('../../models/group.js'); // Importez le modèle de groupe


// Function to save the announcement to the database
async function saveAnnouncementToDatabase(groupName, message, channel, date) {
    // Check if all required fields are provided

    console.log('groupName:', groupName);
    console.log('message:', message);
    console.log('channel:', channel);
    console.log('date:', date);
    
    if (!groupName || !message || !channel || !date) {
        console.error('Error: Required fields are missing.');
        return;
    }

    // Retrieve the group details from the database
    const group = await Group.findOne({ name: groupName.toLowerCase() });
    if (!group) {
        console.error(`Error: Group "${groupName}" not found in the database.`);
        return;
    }

    const channelId = channel.id.toString();

    // Create a new announcement object with the provided fields
    const newAnnouncement = new Announce({
        groupName: group.name.toLowerCase(),
        message,
        channel: channelId,
        date
    });

    // Attempt to save the new announcement to the database
    try {
        await newAnnouncement.save();
        console.log('Announcement saved to the database.');
    } catch (error) {
        console.error('Error saving announcement to the database:', error);
    }
}


function scheduleReminder(date, message, channel) {
 console.log('Scheduling reminders...');

 // Convertir la date du rappel à l'heure de l'utilisateur
 const eventDate = new Date(date);
 const reminder24h = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000);
console.log('Reminder 24h scheduled at:', reminder24h);
setTimeout(() => {
  console.log('Reminder 24h triggered.');
  channel.send(`Rappel : L'événement "${message}" aura lieu dans 24 heures.`);
}, reminder24h.getTime() - Date.now());

const reminder2h = new Date(eventDate.getTime() - 2 * 60 * 60 * 1000);
console.log('Reminder 2h scheduled at:', reminder2h);
setTimeout(() => {
  console.log('Reminder 2h triggered.');
  channel.send(`Rappel : L'événement "${message}" aura lieu dans 2 heures.`);
}, reminder2h.getTime() - Date.now());
}

module.exports = {
    name: 'announce',
    description: 'Crée une annonce dans le salon à partir duquel la commande a été envoyée.',
    async execute(message, args) {
        // Check if the user has permission to manage messages
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply("Vous n'avez pas la permission de gérer les messages.");
        }

        // Extract the group name, announcement message, date, and time
        const groupName = args[0];
        const announcementIndex = args.indexOf('-date');
        const announcementMessage = args.slice(1, announcementIndex).join(' ').trim();
        const dateIndex = args.findIndex(arg => arg === '-date');
        const timeIndex = args.indexOf('-time');
        
        // Vérifier que les indicateurs ont été trouvés
        if (dateIndex === -1 || timeIndex === -1) {
            return message.reply("Veuillez spécifier la date et l'heure de l'annonce avec les indicateurs -date et -time.");
        }

        // Extraire les valeurs de date et d'heure
        const date = args[dateIndex + 1].trim();
        const time = args[timeIndex + 1];

        const group = await Group.findOne({ name: groupName.toLowerCase() });
        console.log('Retrieved Group:', group);

if (!group) {
    console.error(`Error: Group "${groupName}" not found in the database.`);
    return;
}



        if (!groupName || !announcementMessage || !date || !time) {
            return message.reply("Veuillez spécifier le nom du groupe, le message de l'annonce, la date et l'heure avec les indicateurs appropriés.");
        }

        // Créer un objet de date de rappel avec la date et l'heure correctes
        const reminderDate = new Date(`${date}T${time}:00+00:00`);

        // Ajouter des messages de débogage supplémentaires
        console.log('Parsed Reminder Date:', reminderDate);

        // Vérifier si la date du rappel est dans le passé
        if (reminderDate < new Date()) {
            return message.reply("La date et l'heure spécifiées sont dans le passé.");
        }

        // Enregistrement dans une base de données avec le nom du groupe
        await saveAnnouncementToDatabase(groupName, announcementMessage, message.channel, reminderDate);

        // Création de rappels pour les événements à venir
        scheduleReminder(reminderDate, announcementMessage, message.channel);

        // Envoyer l'annonce
        const embed = new EmbedBuilder()
            .setTitle('📢・Announcement!')
            .setDescription(announcementMessage)
            .setColor('#3498db'); // You can change the color as needed

        try {
            await message.channel.send({ embeds: [embed] });
            await message.reply("L'annonce a été envoyée avec succès!");
        } catch (error) {
            console.error(error);
            await message.reply("Une erreur s'est produite lors de l'envoi de l'annonce.");
        }
    },
};
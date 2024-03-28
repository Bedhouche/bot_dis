const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const schedule = require('node-schedule');
const Announce = require('../../models/announce.js');
const Group = require('../../models/group.js');


async function listAnnouncementsForGroup(message, groupName) {
 const group = await Group.findOne({ name: groupName.toLowerCase() });

 if (!group) {
   return message.reply(`Le groupe "${groupName}" n'a pas été trouvé dans la base de données.`);
 }

 // Retrieve announcements for the specific group
 const announcements = await Announce.find({ groupName: group.name.toLowerCase() });

 if (announcements.length === 0) {
   return message.reply(`Aucune annonce trouvée pour le groupe "${groupName}".`);
 }

 // Create an embed to display the announcements
 const embed = new EmbedBuilder()
   .setTitle(`Annonces pour le groupe "${group.name}"`)
   .setColor(0x3498db); // You can change the color as needed

   announcements.forEach((announcement, index) => {
    const date = new Date(announcement.date);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    embed.addFields({ name: `Annonce ${index + 1}`, value: `Message: ${announcement.message}\nDate: ${formattedDate} | Heure: ${formattedTime}` });
  });

 // Send the embed
 try {
   await message.channel.send({ embeds: [embed] });
 } catch (error) {
   console.error('Error sending embed:', error);
 }
}

async function listAllAnnouncements(message) {
  // Retrieve all announcements from the database
  const allAnnouncements = await Announce.find();

  if (allAnnouncements.length === 0) {
    return message.reply("Aucune annonce trouvée pour tous les groupes.");
  }

  // Create an embed to display all announcements
  const embed = new EmbedBuilder()
    .setTitle('Toutes les annonces')
    .setColor(0x3498db); // You can change the color as needed

    allAnnouncements.forEach((announcement, index) => {
     const date = new Date(announcement.date);
     const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
     const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
 
     embed.addFields({ name: `Annonce ${index + 1}`, value: `Groupe: ${announcement.groupName}\nMessage: ${announcement.message}\nDate: ${formattedDate} | Heure: ${formattedTime}` });
   });

  // Send the embed
  try {
    await message.channel.send({ embeds: [embed] });
  } catch (error) {
    console.error(error);
    await message.reply("Une erreur s'est produite lors de l'affichage des annonces.");
  }
}

module.exports = {
    name: 'listannounces',
    description: 'Affiche la liste des annonces pour un groupe spécifié ou toutes les annonces.',
    async execute(message, args) {
        // Check if the user has permission to manage messages
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply("Vous n'avez pas la permission de gérer les messages.");
        }

        const groupName = args[0];

        if (groupName) {
            // If groupName is specified, list announcements for that group
            await listAnnouncementsForGroup(message, groupName);
        } else {
            // If no groupName is specified, list all announcements for every group
            await listAllAnnouncements(message);
        }
    },
};

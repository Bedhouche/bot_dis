// Assurez-vous d'importer EmbedBuilder de discord.js
const { EmbedBuilder } = require('discord.js');
const Resource = require('../../models/resource');

module.exports = {
  name: 'deleteresource',
  description: 'Supprime une ressource de la base de données.',
  async execute(message, args) {
    if (args.length < 3) {
      return message.reply('Utilisation incorrecte de la commande. Utilisation : `!deleteresource [type] [sujet] [lien]`');
    }

    const [type, subject, link] = args;

    try {
      // Recherche et suppression de la ressource
      const deletedResource = await Resource.findOneAndDelete({ type, subject, link }).lean();

      if (!deletedResource) {
        return message.reply('Aucune ressource trouvée avec les critères spécifiés.');
      }

      // Utilisez EmbedBuilder correctement
      const embed = new EmbedBuilder()
        .setTitle('Ressource Supprimée')
        .setDescription(`Ressource supprimée avec succès : \n\nType : ${deletedResource.type}\nSujet : ${deletedResource.subject}\nLien : ${deletedResource.link}`)
        .setColor('#e74c3c');

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('Une erreur s\'est produite lors de la suppression de la ressource.');
    }
  },
};

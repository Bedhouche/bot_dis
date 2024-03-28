const { EmbedBuilder } = require('discord.js');
const Resource = require('../../models/resource');

module.exports = {
  name: 'getresources',
  description: 'Récupère les ressources de la base de données.',
  async execute(message, args) {
    // Vérifier si les arguments sont suffisants
    if (args.length === 1) {
      const [type] = args;

      try {
        // Récupérer toutes les ressources du type spécifié depuis la base de données
        const resourceList = await Resource.find({ type }).lean();

        // Vérifier s'il y a des ressources trouvées
        if (!resourceList || resourceList.length === 0) {
          return message.reply('Aucune ressource trouvée pour ce type.');
        }

        // Créer un EmbedBuilder pour afficher les ressources
        const embed = new EmbedBuilder()
          .setTitle(`Ressources ${type.charAt(0).toUpperCase() + type.slice(1)}`)
          .setDescription(
            resourceList.map(resource => `[${resource.subject}](${resource.link})`).join('\n')
          )
          .setColor('#3498db');

        // Répondre avec l'embed
        return message.reply({ embeds: [embed] });
      } catch (error) {
        console.error(error);
        return message.reply('Une erreur s\'est produite lors de la récupération des ressources.');
      }
    }

    if (args.length < 2) {
      return message.reply('Utilisation incorrecte de la commande. Utilisation : `!getresources [type] [sujet]`');
    }

    const [type, subject] = args;

    try {
      // Récupérer les ressources depuis la base de données
      const resourceList = await Resource.find({ type, subject }).lean();

      // Vérifier s'il y a des ressources trouvées
      if (!resourceList || resourceList.length === 0) {
        return message.reply('Aucune ressource trouvée pour ce type et ce sujet.');
      }

      // Créer un EmbedBuilder pour afficher les ressources
      const embed = new EmbedBuilder()
        .setTitle(`Ressources ${type.charAt(0).toUpperCase() + type.slice(1)} - ${subject}`)
        .setDescription(
          resourceList.map(resource => `[${resource.subject}](${resource.link})`).join('\n')
        )
        .setColor('#3498db');

      // Répondre avec l'embed
      return message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return message.reply('Une erreur s\'est produite lors de la récupération des ressources.');
    }
  },
};

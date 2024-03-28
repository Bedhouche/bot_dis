const { EmbedBuilder } = require('discord.js');
const Resource = require('../../models/resource');

module.exports = {
  name: 'allresources',
  description: 'Affiche toutes les ressources de la base de données.',
  async execute(message) {
    try {
      // Récupérer toutes les ressources depuis la base de données
      const allResources = await Resource.find().lean();

      // Vérifier s'il y a des ressources trouvées
      if (!allResources || allResources.length === 0) {
        return message.reply('Aucune ressource trouvée dans la base de données.');
      }

      // Organiser les ressources par type
      const resourcesByType = {};
      allResources.forEach(resource => {
        if (!resourcesByType[resource.type]) {
          resourcesByType[resource.type] = [];
        }
        resourcesByType[resource.type].push(resource);
      });

      // Créer un Embed pour afficher toutes les ressources organisées par type
      const embed = new EmbedBuilder()
        .setTitle('Toutes les Ressources')
        .setColor('#2ecc71');

      // Ajouter un champ pour chaque type
      for (const [type, resources] of Object.entries(resourcesByType)) {
        embed.addFields({
          name: `${type.charAt(0).toUpperCase() + type.slice(1)}s`,
          value: resources.map(resource => `**[${resource.subject}](${resource.link})**`).join('\n'),
        });
      }

      // Ajouter le pied de page
      embed.setFooter({
        text: 'Gestion des ressources - Votre message de pied de page ici',
      });

      // Répondre avec l'embed
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('Une erreur s\'est produite lors de la récupération des ressources.');
    }
  },
};

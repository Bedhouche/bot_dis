const Resource = require('../../models/resource');

// Les types autorisés
const validTypes = ['books', 'websites', 'videos', 'others'];

module.exports = {
  name: 'addresource',
  description: 'Ajoute une ressource à la base de données.',
  async execute(message, args) {
    if (args.length < 3) {
      return message.reply('Utilisation incorrecte de la commande. Utilisation : `!addresource [type] [sujet] [lien]`');
    }

    const [type, subject, link] = args;
    const userId = message.author.id;

    // Vérifier si le type spécifié est valide
    if (!validTypes.includes(type.toLowerCase())) {
      return message.reply(`Type invalide. Veuillez choisir parmi les types suivants : ${validTypes.join(', ')}`);
    }

    try {
      const newResource = new Resource({ type, subject, link, userId });
      await newResource.save();
      message.reply('Ressource ajoutée avec succès à la base de données.');
    } catch (error) {
      console.error(error);
      message.reply('Une erreur s\'est produite lors de l\'ajout de la ressource.');
    }
  },
};

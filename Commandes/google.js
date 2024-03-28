const Discord = require('discord.js');
const googleIt = require('google-it');

module.exports = {
  name: 'google',
  description: 'Effectue une recherche Google',
  async execute(message, args) {
    // Récupère la requête de recherche
    const query = args.join(' ');

    try {
      // Effectue la recherche avec google-it
      const results = await googleIt({ query });

      // Récupère les liens des résultats
      const resultLinks = results.map(result => result.link);

      // Envoi des résultats dans le canal Discord
      message.channel.send(`Résultats de recherche pour "${query}":\n${resultLinks.join('\n')}`);
    } catch (error) {
      console.error('Erreur lors de la recherche Google:', error.message);
      message.channel.send('Une erreur s\'est produite lors de la recherche.');
    }
  },
};

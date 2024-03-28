 const Discord = require("discord.js");
// Dans votre fichier d'événement interactionCreate
module.exports = {
  name: 'interactionCreate',
  execute(interaction) {
      if (!interaction.isCommand()) return;

      const command = bot.commands.get(interaction.commandName);
      if (!command) return;

      try {
          command.execute(bot, interaction);
      } catch (error) {
          console.error(error);
          interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution de cette commande.', ephemeral: true });
      }
  },
};

 
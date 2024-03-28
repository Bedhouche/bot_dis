const { EmbedBuilder } = require('discord.js');
const math = require('mathjs');

module.exports = {
  name: 'calculate',
  description: 'Calcule une expression mathématique avancée.',
  execute(message, args, commands) {
    try {
      const expression = args.join(' ');
      const result = math.evaluate(expression);

      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Calcul Mathématique')
        .setDescription(`Expression : ${expression}`)
        .addFields({ name: 'Résultat', value: `${result}` });

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      const errorEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle('Erreur de Calcul')
        .setDescription('Une erreur est survenue lors du calcul.');

      message.channel.send({ embeds: [errorEmbed] });
    }
  },
};
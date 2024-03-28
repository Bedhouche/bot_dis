const { EmbedBuilder } = require('discord.js');

// motivation.js
module.exports = {
 name: 'motivation',
 description: 'Obtenez une citation de motivation ou une vidéo motivante.',
 execute(message, args) {
     // Liste de citations de motivation (vous pouvez ajouter autant que vous le souhaitez)
     const motivations = [
      'La réussite ne vient pas de ce que vous avez, mais de ce que vous êtes.',
      'Le seul moyen de faire du bon travail est d’aimer ce que vous faites.',
      'Votre temps est limité, ne le gaspillez pas en vivant la vie de quelqu\'un d\'autre.',
      "La vie n'est pas d'attendre que les tempêtes passent, c'est d'apprendre comment danser sous la pluie.",
      "La réussite vient de la persévérance, de la détermination et de l'amour pour ce que vous faites.",
      "Le seul échec réel est celui que l'on apprend rien.",
      "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte.",
      "Le secret du bonheur et le sens de la vie résident dans la réalisation de soi-même et dans le service aux autres.",
      "Chaque journée est une nouvelle opportunité de changer votre vie.",
      "Votre temps est limité, ne le gaspillez pas en vivant la vie de quelqu'un d'autre.",
      "Soyez le changement que vous voulez voir dans le monde.",
      "L'avenir appartient à ceux qui croient en la beauté de leurs rêves.",
      "Le succès ne consiste pas à obtenir ce que vous voulez, mais à aimer ce que vous avez obtenu.",
      "La clé du succès est de commencer avant que vous ne soyez prêt.",
      "La vie devient ce que vous décidez d'en faire.",
      "La seule façon de faire du bon travail est d'aimer ce que vous faites.",
      "Chaque obstacle est une occasion de grandir et d'améliorer votre vie.",
      "Ne rêvez pas de votre vie, vivez vos rêves.",
      "La persévérance n'est pas une longue course, c'est beaucoup de petites courses jour après jour.",
      "Le succès est un voyage, pas une destination.",
      "Soyez le héros de votre propre histoire.",
      "L'impossible n'est souvent qu'une opinion.",
      "Le courage n'est pas l'absence de peur, mais la capacité de la surmonter."     ];

     // Liste de liens vers des vidéos motivantes
     const videosMotivantes = [

      'https://www.youtube.com/watch?v=11Ty384Xe9o',
      'https://www.youtube.com/watch?v=rq39plBJJl8',
      'https://www.youtube.com/watch?v=6iZBMk3iV5I',     ];

    // Définissez la probabilité d'obtenir une vidéo (par exemple, 20% de chance)
   const chanceVideo = 20;
   const randomChance = Math.random() * 100;

   if (randomChance <= chanceVideo) {
     // Obtenir une vidéo
     const randomVideoIndex = Math.floor(Math.random() * videosMotivantes.length);
     const randomVideoLink = videosMotivantes[randomVideoIndex];
     const videoEmbed = new EmbedBuilder()
       .setColor(0x0099FF)
       .setTitle('Vidéo Motivante')
       .setURL(randomVideoLink)
       .setDescription(`Cliquez sur le titre pour regarder la vidéo!`);

     message.channel.send({ embeds: [videoEmbed] });
   } else {
     // Obtenir une citation
     const randomMotivationIndex = Math.floor(Math.random() * motivations.length);
     const randomMotivation = motivations[randomMotivationIndex];
     const quoteEmbed = new EmbedBuilder()
       .setColor(0x0099FF)
       .setTitle('Citation de Motivation')
       .setDescription(randomMotivation);

     message.channel.send({ embeds: [quoteEmbed] });
   }
 },
};
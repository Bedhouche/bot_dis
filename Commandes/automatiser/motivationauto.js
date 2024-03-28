 module.exports = {
 name: 'motivation',
 description: 'Obtenez une citation de motivation ou une vidéo inspirante.',
 execute: sendMotivation,
};

// Le reste du code de motivation.js


function sendMotivation(client) {


 if (!client) {
     console.error("Client Discord non défini.");
     return;
 }

 // Liste de citations de motivation
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
     "Le courage n'est pas l'absence de peur, mais la capacité de la surmonter."       
 ];


 const videosMotivantes = [
     'https://www.youtube.com/watch?v=11Ty384Xe9o',
     'https://www.youtube.com/watch?v=rq39plBJJl8',
     'https://www.youtube.com/watch?v=6iZBMk3iV5I',
     'https://www.youtube.com/watch?v=_ijj1-WkaZ8',
     'https://www.youtube.com/watch?v=d41Y7KCE8qo',
     'https://www.youtube.com/watch?v=Mv18TXZtLrA',
     'https://www.youtube.com/watch?v=HOmrzm1CUEo',
     'https://www.youtube.com/watch?v=T4mxZ2bazSA',

 ];

 // Définissez la probabilité d'obtenir une vidéo (par exemple, 20% de chance)
 const chanceVideo = 20;
 const randomChance = Math.random() * 100;

 let messageToSend;

 // Sélectionnez une citation ou une vidéo en fonction de la probabilité
 if (randomChance <= chanceVideo) {
     // Obtenir une vidéo
     const randomVideoIndex = Math.floor(Math.random() * videosMotivantes.length);
     const randomVideoLink = videosMotivantes[randomVideoIndex];
     messageToSend = `Voici une vidéo motivante : ${randomVideoLink}`;
 } else {
     // Obtenir une citation
     const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
     messageToSend = `Motivation du jour : "${randomMotivation}"`;
 }
     const channelID = '1174078076393631859';
    const channel = client.channels && client.channels.cache && client.channels.cache.get(channelID);
 

  

    if (channel) {
        console.log(`Le bot a trouvé le canal avec l'ID ${channelID}`);
        channel.send(messageToSend);
    } else {
        console.log(`Le canal avec l'ID ${channelID} est introuvable ou non défini.`);
    }

}

/* // Définir l'intervalle en dehors de la fonction sendMotivation
const interval = 1 * 60 * 1000; // 1 minute en millisecondes
setInterval(() => {
    sendMotivation(client); // Passer le client ici
}, interval);
  */


// Salutation.js
module.exports = {
    name: 'saluer',
    description: 'Permet aux membres de se saluer mutuellement.',
    execute(message, args) {
        // Liste de salutations possibles
        const salutations = ['Salut', 'Bonjour', 'Coucou', 'Hey'];

        // Choisissez une salutation aléatoire
        const randomSalutation = salutations[Math.floor(Math.random() * salutations.length)];

        // Répondez de manière amicale
        message.channel.send(`${randomSalutation}, ${message.author.username}! Comment ça va?`);
    },
};

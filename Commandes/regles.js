module.exports = {
    name: 'regles',
    description: 'Affiche les règles du serveur.',
    execute: function (message, args) {
        const regles = [
            '1. Soyez respectueux envers les autres membres.',
            '2. Pas de langage offensant ou de harcèlement.',
            '3. Pas de contenu inapproprié ou NSFW.',
        ];

        const reglesMessage = regles.join('\n');

        message.channel.send(`**Règles du serveur :**\n${reglesMessage}`);
    },
};

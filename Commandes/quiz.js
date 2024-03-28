/* // quiz.js
const Discord = require('discord.js');

// Stockage des scores
const scores = new Map();

module.exports = {
    name: 'quiz',
    description: 'Lance un quiz interactif pour les membres.',
    execute(message, args) {
        // Vérifie si un sujet de quiz est spécifié
        const sujet = args.join(' ');
        if (!sujet) {
            return message.reply('Veuillez spécifier un sujet pour le quiz.');
        }

        // Créer une nouvelle carte de scores pour le sujet du quiz
        scores.set(sujet, new Map());

        // Envoyer un message de démarrage du quiz
        message.channel.send(`Le quiz sur le sujet "${sujet}" commence ! Répondez avec !answer suivi de votre réponse.`);

        // Collecter les réponses des utilisateurs
        const filter = response => response.content.startsWith('!answer') && response.author.id !== message.author.id;
        const collector = message.channel.createMessageCollector(filter, { time: 60000 }); // 60 secondes de délai

        // Écouter les réponses
        collector.on('collect', (response) => {
            const user = response.author;
            const answer = response.content.slice('!answer'.length).trim().toLowerCase();

            // Vérifier la réponse et attribuer des points
            if (answer === 'la bonne réponse') {
                // Ajouter des points à l'utilisateur
                const userScore = scores.get(sujet).get(user.id) || 0;
                scores.get(sujet).set(user.id, userScore + 1);
            }
        });

        // Événement lorsque le collecteur se termine (temps écoulé)
        collector.on('end', collected => {
            message.channel.send('Le quiz est terminé ! Voici les résultats :');

            // Afficher le classement
            const sortedScores = Array.from(scores.get(sujet).entries()).sort((a, b) => b[1] - a[1]);
            const leaderboard = sortedScores.map(([userID, score], index) => {
                const user = message.guild.members.cache.get(userID);
                return `${index + 1}. ${user ? user.displayName : 'Utilisateur inconnu'}: ${score} point(s)`;
            });

            message.channel.send(leaderboard.join('\n'));
        });
    },
};
 */
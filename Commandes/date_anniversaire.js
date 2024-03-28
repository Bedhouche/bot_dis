const { anniversaires } = require('./anniversaires.js');

module.exports = {
    name: 'date_anniversaire',
    description: 'Configurer la date d\'anniversaire pour recevoir des messages automatiques.',
    execute(message, args) {
        const userID = message.author.id;
        const dateAnniversaire = args[0];

        if (!dateAnniversaire || !/^\d{4}-\d{2}-\d{2}$/.test(dateAnniversaire)) {
            message.reply(":warning: Vous devez spécifier votre date d'anniversaire au format 'YYYY-MM-DD'.").catch(console.error);
        } else {
            anniversaires.set(userID, dateAnniversaire);
            message.reply('Date d\'anniversaire configurée avec succès ! 🎉');
        }
    },
};


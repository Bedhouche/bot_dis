const { anniversaires } = require('./anniversaires');

function checkAnniversairesAutomatique() {
    const today = new Date();

    anniversaires.forEach((dateAnniversaire, userID) => {
        // Définir la date d'anniversaire à la fin de la journée
        const anniversaire = new Date(dateAnniversaire);
        anniversaire.setHours(23, 59, 59);

        // Vérifier si c'est l'anniversaire de l'utilisateur aujourd'hui
        if (today.getTime() === anniversaire.getTime()) {
            const user = client.users.cache.get(userID); // Assure-toi d'avoir l'accès aux utilisateurs
            if (user) {
                user.send(`Joyeux anniversaire, ${user.username} ! 🎉`); // Envoie le message en message privé
            }
        }
    });
}

module.exports = {
    name: 'anniversaire',
    description: 'Affiche un message automatique pour souhaiter joyeux anniversaire à un utilisateur du bot.',
    execute: function (message, args) {
        // Récupérer l'ID de l'utilisateur actuel
        const userID = message.author.id;

        // Vérifier si l'utilisateur a configuré son anniversaire
        if (anniversaires.has(userID)) {
            const dateAnniversaire = anniversaires.get(userID);

            // Vérifier si c'est l'anniversaire de l'utilisateur aujourd'hui
            const today = new Date();
            const anniversaire = new Date(dateAnniversaire);

            // Correction pour prendre en compte l'année
            if (today.getTime() > anniversaire.getTime()) {
                message.reply("Ton anniversaire est déjà passé ! 🎉");
            } else if (today.getMonth() === anniversaire.getMonth() && today.getDate() === anniversaire.getDate()) {
                message.reply(`Joyeux anniversaire, ${message.author.username} ! 🎂`);
            } else {
                const joursRestants = Math.ceil((anniversaire - today) / (1000 * 60 * 60 * 24));
                message.reply(`Ce n'est pas encore ton anniversaire. Il reste ${joursRestants} jour(s). 🎈`);
            }
        } else {
            message.reply("Tu n'as pas configuré ton anniversaire. Utilise la commande `date_anniversaire` pour le faire. 🎁");
        }
    },
};

// Appelle la fonction toutes les 24 heures (86400000 millisecondes)
setInterval(checkAnniversairesAutomatique, 86400000);

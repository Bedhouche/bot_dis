const { PermissionsBitField } = require('discord.js');
const BannedWord = require('../../models/bannedWord'); // Make sure to adjust the path

async function addBannedWord(word) {
    try {
        const bannedWord = new BannedWord({ word: word.toLowerCase() });
        await bannedWord.save();
        console.log(`Le mot "${word}" a été ajouté à la liste des mots bannis.`);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du mot banni:', error);
        throw error; // Rethrow the error to be caught by the command execution
    }
}

module.exports = {
    name: 'addbannedword',
    description: 'Ajoute un mot à la liste des mots bannis.',
    async execute(message, args) {
        try {
            // Vérifier si l'utilisateur a le rôle d'administrateur
            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                throw new Error("Vous n'avez pas la permission d'utiliser cette commande.");
            }

            const wordToAdd = args[0];
            if (!wordToAdd) {
                throw new Error("Veuillez spécifier le mot à ajouter à la liste des mots bannis.");
            }

            // Ajouter le mot à la liste des mots bannis
            await addBannedWord(wordToAdd);

            return message.reply(`Le mot "${wordToAdd}" a été ajouté à la liste des mots bannis.`);
        } catch (error) {
            console.error(error);
            return message.reply('Une erreur est survenue lors de la tentative d\'ajouter le mot banni.');
        }
    }
};


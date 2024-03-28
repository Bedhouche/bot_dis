/* module.exports = {
    name: 'pin',
    description: 'Épingle un message.',
    execute: async function (message, args) {
        if (args.length < 1) {
            message.reply(":warning: Vous devez spécifier l'ID du message à épingler.").catch(console.error);
        } else {
            const messageId = args[0];

            try {
                // Récupérer le message par son ID
                const messageToPin = await message.channel.messages.fetch(messageId);

                if (!messageToPin) {
                    message.reply(":warning: Le message n'a pas pu être trouvé dans ce canal. Assurez-vous d'avoir spécifié le bon ID.").catch(console.error);
                } else {
                    // Épingler le message
                    await messageToPin.pin();
                    message.react('✅').catch(console.error);
                }
            } catch (error) {
                console.error(error);
                message.reply("Une erreur s'est produite lors de l'épinglage du message. Détails : " + error.message).catch(console.error);
            }
        }
    },
};
 */


module.exports = {
    name: 'pin',
    description: 'Épingle le dernier message envoyé.',
    execute: async function (message, args) {
        try {
            // Récupérer le dernier message du canal
            const messages = await message.channel.messages.fetch({ limit: 1 });
            const lastMessage = messages.first();

            if (!lastMessage) {
                message.reply(":warning: Aucun message récent trouvé dans ce canal.").catch(console.error);
            } else {
                // Épingler le dernier message
                await lastMessage.pin();
                message.react('✅').catch(console.error);
            }
        } catch (error) {
            console.error(error);
            message.reply(":warning: Une erreur s'est produite lors de la tentative d'épinglage du message.").catch(console.error);
        }
    }
};
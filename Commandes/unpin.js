/* module.exports = {
    name: 'unpin',
    description: 'Désépingle un message épinglé.',
    execute: async function (message, args) {
        if (args.length < 1) {
            message.reply(":warning: Vous devez spécifier l'ID du message à désépingler.").catch(console.error);
        } else {
            const messageId = args[0];

            try {
                // Récupérer le message épinglé par son ID
                const pinnedMessage = await message.channel.messages.fetchPinned();

                // Vérifier si le message avec l'ID spécifié est épinglé
                const messageToUnpin = pinnedMessage.find(msg => msg.id === messageId);

                if (!messageToUnpin) {
                    message.reply(":warning: Le message épinglé avec cet ID n'a pas été trouvé. Assurez-vous d'avoir spécifié le bon ID.").catch(console.error);
                } else {
                    // Désépingler le message
                    await messageToUnpin.unpin();
                    message.react('✅').catch(console.error);
                }
            } catch (error) {
                console.error(error);
                message.reply("Une erreur s'est produite lors du désépinglage du message. Détails : " + error.message).catch(console.error);
            }
        }
    },
};
 */

module.exports = {
    name: 'unpin',
    description: 'Désépingle un message.',
    execute: async function (message, args) {
        try {
            // Récupérer les messages épinglés du canal
            const pinnedMessages = await message.channel.messages.fetchPinned();
            
            if (pinnedMessages.size === 0) {
                message.reply(":warning: Aucun message épinglé trouvé dans ce canal.").catch(console.error);
            } else {
                // Désépingler le premier message épinglé
                const messageToUnpin = pinnedMessages.first();
                await messageToUnpin.unpin();
                message.react('✅').catch(console.error);
            }
        } catch (error) {
            console.error(error);
            message.reply(":warning: Une erreur s'est produite lors de la tentative de désépinglage du message.").catch(console.error);
        }
    }
};



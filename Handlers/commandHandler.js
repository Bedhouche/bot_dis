const handleCommand = (bot, message, prefix, commands) => {
    // Si le message est un message de bot ou ne commence pas par le préfixe, on ignore
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    // Utilisez une expression régulière pour capturer la commande et les arguments
    const regex = /^(\w+)\s*(.*)$/;
    const match = message.content.slice(prefix.length).trim().match(regex);

    // Si la commande ne correspond pas au modèle, ignorez-la
    if (!match) return;

    const [, commandName, argsString] = match;

    console.log(`Commande reçue : ${commandName}`);

    // Vérifiez si la commande existe dans la collection
    const command = bot.commands.get(commandName.toLowerCase());

    // Si la commande n'existe pas, on ignore
    if (!command) {
        console.log(`La commande ${commandName} n'existe pas.`);
        return;
    }

    // Exécutez la commande avec les arguments
    try {
        const args = argsString.split(/ +/);
        command.execute(message, args, commands); // Ajoutez commands comme argument ici
    } catch (error) {
        console.error(error);
        message.reply(`Une erreur s'est produite lors de l'exécution de la commande. Détails : ${error.message}`);
    }
};
module.exports = {
    handleCommand,
};
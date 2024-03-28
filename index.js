const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./Config/config.js');
const connectDB = require('./Bd/bd.js');
const fs = require('fs');
// index.js
const handleGroupJoin = require('./Handlers/groupJoinHandler');


connectDB();

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});


const prefix = config.prefix;
bot.commands = new Collection();


const readyEvent = require('./Events/ready.js');
const commandHandler = require('./Handlers/commandHandler.js');
const { handleWelcome } = require('./Commandes/automatiser/Bienvenue.js');
const sendMotivation = require('./Commandes/automatiser/motivationauto').execute;
const motivationAuto = require('./Commandes/automatiser/motivationauto');
const autoBanWords = require('./Commandes/banne/autobannedword.js');

bot.on('ready', () => {

    readyEvent(bot);
    const fakeMessage = {
        guild: bot.guilds.cache.first(), // Remplacez ceci par la méthode pour obtenir le serveur approprié
        // Autres propriétés de message si nécessaire
    };

    motivationAuto.execute(bot, fakeMessage); // Passer le client et le message factice ici


    // (définir l'intervalle en dehors de la fonction sendMotivation)
    const interval = 24 * 60 * 60 * 1000; // 24 heures en millisecondes
    setInterval(() => {
        motivationAuto.execute(bot, null); // Passer le client ici
    }, interval);
/*     sendMotivation(bot);

    // (définir l'intervalle en dehors de la fonction sendMotivation)
    const interval = 24 *60 * 60 * 1000; // 24 heures en millisecondes
    setInterval(() => {
        sendMotivation(bot); // Passer le client ici
    }, interval); */
});

const pingCommand = require('./Commandes/ping.js');
const helpCommand = require('./Commandes/help.js');
const pinCommand = require('./Commandes/pin.js');
const unpinCommand = require('./Commandes/unpin.js');
const SalutationCommand = require('./Commandes/Salutation.js');
const pollCommand = require('./Commandes/poll.js');
const calculateCommand = require('./Commandes/Calculate.js');
const anniversaireCommand = require('./Commandes/anniversaire.js');
const configAnniversaireCommand = require('./Commandes/date_anniversaire.js');
const reglesCommand = require('./Commandes/regles.js');

const googleCommand= require('./Commandes/google.js');

const quizCommand = require('./Commandes/quiz.js');
const motivationCommand = require('./Commandes/motivation.js');
const addResourceCommand = require('./Commandes/resources/addResource.js');
const getResourcesCommand = require('./Commandes/resources/getResource.js');
const deleteResourcesCommand = require('./Commandes/resources/deleteResource.js');
const getAllResourcesCommand = require('./Commandes/resources/getAllResource.js');
const addGroupCommand = require('./Commandes/Groups/addGroupe.js');
const deleteGroupCommand = require('./Commandes/Groups/deleteGroupe.js');
const adduserCommand = require('./Commandes/users/adduser.js');
const deleteuserCommand = require('./Commandes/users/deleteuser.js');
const addBannedWordCommand = require('./Commandes/banne/addbanneword.js');
const scheduleCommand = require('./Commandes/schedule.js');
const CreatAnnounCommand =require('./Commandes/announces/CreatAnnoun');
const ListAnnounCommand =require('./Commandes/announces/listAnnounce');
const timerCommand =require('./Commandes/timer.js');




// Ajoutez les commandes à votre bot
bot.commands.set(pingCommand.name, pingCommand);
bot.commands.set(helpCommand.name, helpCommand);
bot.commands.set(pinCommand.name, pinCommand);
bot.commands.set(unpinCommand.name, unpinCommand);
bot.commands.set(SalutationCommand.name, SalutationCommand);
bot.commands.set(pollCommand.name, pollCommand);
bot.commands.set(calculateCommand.name, calculateCommand);
bot.commands.set(anniversaireCommand.name, anniversaireCommand);
bot.commands.set(configAnniversaireCommand.name, configAnniversaireCommand);
bot.commands.set(reglesCommand.name, reglesCommand);

bot.commands.set(googleCommand.name, googleCommand);

bot.commands.set(quizCommand.name, quizCommand);
bot.commands.set(addResourceCommand.name, addResourceCommand);
bot.commands.set(getResourcesCommand.name, getResourcesCommand);
bot.commands.set(deleteResourcesCommand.name, deleteResourcesCommand);
bot.commands.set(getAllResourcesCommand.name, getAllResourcesCommand);
bot.commands.set(addGroupCommand.name, addGroupCommand);
bot.commands.set(motivationCommand.name, motivationCommand);
bot.commands.set(deleteGroupCommand.name, deleteGroupCommand);
bot.commands.set(adduserCommand.name, adduserCommand);
bot.commands.set(deleteuserCommand.name, deleteuserCommand);
bot.commands.set(addBannedWordCommand.name, addBannedWordCommand);
bot.commands.set(scheduleCommand.name, scheduleCommand);
bot.commands.set(CreatAnnounCommand.name, CreatAnnounCommand);
bot.commands.set(ListAnnounCommand.name, ListAnnounCommand);
bot.commands.set(timerCommand.name, timerCommand);


bot.on('guildMemberAdd', (member) => {
    handleWelcome(member);
    handleGroupJoin(member).catch(console.error);

});


bot.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        await command.execute(interaction, options);
    } catch (error) {
        console.error(error);
        interaction.reply(`Une erreur s'est produite lors de l'exécution de la commande. Détails : ${error.message}`);
    }
});

bot.on('messageCreate', (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
        // Si ce n'est pas une commande, vérifiez les mots bannis
        //autoBanWords(message);
        return;
    }

    try {
        if (commandName === 'help') {
            // Si la commande est "help", exécutez uniquement la commande "help"
            helpCommand.execute(message, args, bot.commands);
        } else {
            // Sinon, exécutez la commande correspondante
            command.execute(message, args);
        }
    } catch (error) {
        console.error(error);
        message.reply(`Une erreur s'est produite lors de l'exécution de la commande. Détails : ${error.message}`);
    }
});



bot.login(config.token);

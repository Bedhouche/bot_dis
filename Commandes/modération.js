const Discord = require('discord.js');
const client = new Discord.Client();
// Importe le tableau de mots réservés depuis le fichier listeMots.js
const motsInterdits = require('./Listemots');

// Fonction pour vérifier si un message contient des mots interdits
// Fonction pour vérifier si un message contient des mots interdits
function verifierMotsInterdits(message) {
    const contenuMessage = message.content.toLowerCase();
  
    for (const mot of motsInterdits) {
      if (contenuMessage.includes(mot)) {
        // Supprime le message contenant le mot interdit
        message.delete()
          .then(() => {
            // Bannit l'utilisateur pendant 10 minutes
            message.member.ban({ reason: 'Utilisation de mots interdits', time: 600000 }) // 600000 ms = 10 minutes
              .then(() => {
                // Confirme dans la console que le message a été supprimé et l'utilisateur banni
                console.log(`Message supprimé et utilisateur banni pendant 10 minutes pour utilisation du mot interdit "${mot}": ${message.content}`);
              })
              .catch((err) => {
                console.error('Erreur lors du bannissement de l\'utilisateur :', err);
              });
          })
          .catch((err) => {
            console.error('Erreur lors de la suppression du message :', err);
          });
        break;
      }
    }
  }
  
// Écoute les événements de message
client.on('message', (message) => {
    // Vérifie si le message provient d'un bot ou si c'est un message système
    if (message.author.bot || message.system) {
      return; // Ignore les messages des bots et les messages système
    }
  
    // Vérifie si le message contient des mots interdits
    verifierMotsInterdits(message);
  });
  client.login("MTE2OTczNDAyODUyMjQzODcwNg.G-uRIe.sUO-uANfZpu1kDKoiiMBfy0Bzuxan_XCGZDOrc");
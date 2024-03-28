/* const { ChannelType, PermissionFlagsBits, PermissionsBitField } = require('discord.js');
const Group = require('../../models/group');

module.exports = {
    name: 'addgroup',
    description: 'Crée un groupe et un salon associé.',
    async execute(message, args) {
        // Vérifier si l'utilisateur a le rôle d'administrateur
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("Désolé, vous devez être administrateur pour utiliser cette commande.");
        }
        
        let nom = args[0];

        if (!nom) {
            return message.reply("Oups, il semble que vous ayez oublié de spécifier un nom pour le groupe. Veuillez réessayer avec un nom.");
        }
       // Normalisation du nom du groupe pour éviter les problèmes liés à la casse
        nom = nom.toLowerCase();
        // Validation du nom du groupe (pas de caractères spéciaux, longueur maximale de 30 caractères)
        if (!/^[a-z0-9\-]{1,30}$/.test(nom)) {
            return message.reply("Le nom du groupe doit être alphanumérique et ne peut pas dépasser 30 caractères.");
        }

        const membres = message.mentions.users.size > 0 ? message.mentions.users.map(user => user.id) : [];
        console.log("Membres du groupe :", membres);

        const parentCategory = message.channel.parent;
        if (!parentCategory) {
            return message.reply("Hmm, je ne trouve pas la catégorie parente. Assurez-vous d'exécuter cette commande dans un salon qui appartient à une catégorie.");
        }

        try {
            // Vérifier si le groupe existe déjà dans la base de données
            const existingGroup = await Group.findOne({ name: nom });
            if (existingGroup) {
                return message.reply(`Il semble que le groupe "${nom}" existe déjà. Essayez avec un autre nom.`);
            }

            // Créer un salon avec le nom du groupe dans la catégorie parente
            const groupChannel = await message.guild.channels.create({
                name: nom,
                type: ChannelType.GuildText,
                parent: parentCategory,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    ...membres.map(memberId => ({
                        id: memberId,
                        allow: [PermissionFlagsBits.ViewChannel],
                    })),
                ],
            });

            const newGroup = new Group({
                name: nom,
                channelId: groupChannel.id,
                members: membres,
            });
            await newGroup.save();

            console.log("Groupe créé avec succès :", newGroup);
            return message.reply(`Super ! Le groupe "${nom}" a été créé avec succès.`);
        } catch (error) {
            console.error("Erreur lors de la création du groupe :", error);
            return message.reply("Oups, quelque chose s'est mal passé lors de la création du groupe. Veuillez réessayer plus tard ou contacter le support si le problème persiste.");
        }
    },
};
 */

const { ChannelType, PermissionFlagsBits, PermissionsBitField } = require('discord.js');
const Group = require('../../models/group');

module.exports = {
    name: 'addgroup',
    description: 'Crée un groupe et un salon associé.',
    async execute(message, args) {
        // Vérifier si l'utilisateur a le rôle d'administrateur
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("Désolé, vous devez être administrateur pour utiliser cette commande.");
        }
        
        let nom = args[0];

        if (!nom) {
            return message.reply("Oups, il semble que vous ayez oublié de spécifier un nom pour le groupe. Veuillez réessayer avec un nom.");
        }
       // Normalisation du nom du groupe pour éviter les problèmes liés à la casse
        nom = nom.toLowerCase();
        // Validation du nom du groupe (pas de caractères spéciaux, longueur maximale de 30 caractères)
        if (!/^[a-z0-9\-]{1,30}$/.test(nom)) {
            return message.reply("Le nom du groupe doit être alphanumérique et ne peut pas dépasser 30 caractères.");
        }

        const membres = message.mentions.users.size > 0 ? message.mentions.users.map(user => user.id) : [];
        console.log("Membres du groupe :", membres);

        const parentCategory = message.channel.parent;
        if (!parentCategory) {
            return message.reply("Hmm, je ne trouve pas la catégorie parente. Assurez-vous d'exécuter cette commande dans un salon qui appartient à une catégorie.");
        }

        try {
            // Vérifier si le groupe existe déjà dans la base de données
            const existingGroup = await Group.findOne({ name: nom });
            if (existingGroup) {
                return message.reply(`Il semble que le groupe "${nom}" existe déjà. Essayez avec un autre nom.`);
            }

            // Créer un salon avec le nom du groupe dans la catégorie parente
            const groupChannel = await message.guild.channels.create({
                name: nom,
                type: ChannelType.GuildText,
                parent: parentCategory,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    ...membres.map(memberId => ({
                        id: memberId,
                        allow: [PermissionFlagsBits.ViewChannel],
                    })),
                ],
            });

            // Créer les canaux associés
            const associatedChannels = await Promise.all([
                // Ajouter ici d'autres canaux associés si nécessaire
            ]);

            const newGroup = new Group({
                name: nom,
                channelId: groupChannel.id,
                members: membres,
                associatedChannels: associatedChannels.map(channel => ({
                    channelId: channel.id,
                    channelName: channel.name,
                })),
            });

            await newGroup.save();

            console.log("Groupe créé avec succès :", newGroup);
            return message.reply(`Super ! Le groupe "${nom}" a été créé avec succès.`);
        } catch (error) {
            console.error("Erreur lors de la création du groupe :", error);
            return message.reply("Oups, quelque chose s'est mal passé lors de la création du groupe. Veuillez réessayer plus tard ou contacter le support si le problème persiste.");
        }
    },
};


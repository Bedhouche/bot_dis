# DiscordBotGestionGroupes

Discord Bot de Gestion de Groupes d'Étudiants

## Description
ce bot est destiné a gerer les groupes d'etudiantsur un serveur Discord et qui a été développé pour faciliter a gestion efficace des groupes d'étudiants existants. Il offre des fonctionnalités telles que la création de groupes, la gestion des membres, les annonces, la gestion des profils, et bien plus encore.


# Discord Bot Gestion Groupes

Bienvenue dans le bot Discord de gestion des groupes d'étudiants ! Ce bot offre une variété de fonctionnalités pour simplifier la coordination et la communication au sein de votre serveur Discord.

## Fonctionnalités

### Commande `!help`

La commande `!help` affiche une liste des commandes disponibles avec des descriptions détaillées.

- **Utilisation :** `!help`
- **Fonctionnement :**
  - La commande génère un message avec une liste de toutes les commandes disponibles.
  - Chaque commande est affichée avec son nom et une description (ou "Pas de description disponible").
- **Exemple d'utilisation :** `!help`

### Commande `!ping`

La commande `!ping` permet de vérifier la latence du bot et la latence de l'API Discord.
- Le bot mesure la différence de temps entre l'envoi du message initial et la réception de la réponse.
- Les informations sont affichées dans un format agréable avec un titre "Pong!" et deux champs pour la latence du bot et de l'API.



### Commande `!pin`
- **Syntaxe :** `!pin`

La commande `!pin` permet d'épingler le dernier message envoyé dans le canal. Voici comment elle fonctionne :

- La commande récupère le dernier message du canal .
- Si aucun message n'est trouvé, le bot répond avec ":warning: Aucun message récent trouvé dans ce canal.".
- Sinon, le bot épinglera le dernier message trouvé .
- En cas d'opération réussie, le bot réagira avec l'emoji ✅.

### Commande `!unpin`
- **Syntaxe :** `!unpin`

La commande `!unpin` permet de désépingler le premier message épinglé dans le canal. Voici comment elle fonctionne :

- La commande récupère tous les messages épinglés du canal .
- Si aucun message épinglé n'est trouvé, le bot répond avec ":warning: Aucun message épinglé trouvé dans ce canal.".
- Sinon, le bot désépinglera le premier message épinglé `.
- En cas d'opération réussie, le bot réagira avec l'emoji ✅.

### Commande !poll

La commande `!poll` permet de créer facilement un sondage interactif dans le canal où elle est invoquée. Voici comment elle fonctionne :

- **Syntaxe :** `!poll`
- **Fonctionnement :**
  - Lorsque la commande est invoquée, le bot supprime le message de commande original pour maintenir la propreté du canal.
  - Ensuite, il ajoute deux réactions ("👍" et "👎") au dernier message dans le canal.
  - Les membres du serveur peuvent voter en réagissant à ce message avec l'une des deux réactions ajoutées.
- **Exemple d'utilisation :** `!poll`
- **Remarques :**
  - La commande est conçue pour simplifier la création de sondages interactifs sans avoir à créer un nouveau message dédié pour chaque sondage.
  - Les résultats du sondage peuvent être observés en comptant le nombre de réactions sur le dernier message.


### Commande !calculate

La commande `!calculate` permet d'évaluer des expressions mathématiques avancées dans votre serveur Discord. Elle utilise la bibliothèque `mathjs` pour effectuer les calculs.

- **Utilisation :** `!calculate <expression>`
- **Exemples :**
  1. Addition : `!calculate 5 + 3`
  2. Soustraction : `!calculate 10 - 4`
  3. Multiplication : `!calculate 6 * 7`
  4. Division : `!calculate 20 / 4`
  5. Exponentiation : `!calculate 2 ^ 3`
  6. Racine carrée : `!calculate sqrt(25)`
  7. Fonctions trigonométriques : `!calculate sin(30)`
  8. Fonctions logarithmiques : `!calculate log(100)`
  9. Utilisation de parenthèses : `!calculate (4 + 2) * 3`
  10. Expressions plus complexes : `!calculate 2 * (sin(45) + cos(30))`
- **Remarque :** Assurez-vous que l'expression est correctement formatée. En cas d'erreur, le bot affichera un message indiquant qu'une erreur est survenue lors du calcul.

### Commande !motivation

La commande `!motivation` permet d'obtenir une citation de motivation ou une vidéo motivante pour inspirer les membres du serveur. Voici comment elle fonctionne :

- **Syntaxe :** `!motivation`
- **Fonctionnement :**
  - Lorsque la commande est invoquée, le bot génère aléatoirement une citation de motivation parmi une liste prédéfinie.
  - Il existe également une probabilité (configurable) d'obtenir une vidéo motivante au lieu d'une citation.
  - Si la vidéo est sélectionnée, un lien vers une vidéo motivante est fourni.
- **Exemple d'utilisation :** `!motivation`
- **Remarques :**
  - La commande vise à encourager et à motiver les membres du serveur avec des citations inspirantes ou des vidéos motivantes.
  - La probabilité d'obtenir une vidéo peut être ajustée en modifiant la variable `chanceVideo` dans le code.
  - Assurez-vous que le canal où la commande est invoquée est correctement défini dans le code.

  

### Commande `!addresource`

La commande `!addresource` permet d'ajouter une ressource à la base de données du bot. Voici une explication détaillée :

- **Utilisation :** `!addresource [type] [sujet] [lien]`
- **Paramètres :**
  - `[type]` : Le type de la ressource. Doit appartenir à la liste prédéfinie des types autorisés : 'books', 'websites', 'videos', 'others'.
  - `[sujet]` : Le sujet ou le titre de la ressource.
  - `[lien]` : Le lien vers la ressource.
- **Exemple d'utilisation :** `!addresource books JavaScript https://example.com/js-basics`
- **Validation du type :**
  - La commande vérifie si le type spécifié est valide en comparant avec la liste des types autorisés.
  - Si le type n'est pas valide, le bot renvoie un message d'erreur avec les types autorisés.

### Commande `!getresources`

La commande `!getresources` permet de récupérer les ressources de la base de données en fonction du type et éventuellement du sujet. Voici une explication détaillée :

- **Utilisation :** `!getresources [type] [sujet]`
- **Paramètres :**
  - `[type]` : Le type de ressource pour la recherche.
  - `[sujet]` : (Optionnel) Le sujet ou le titre de la ressource pour une recherche plus spécifique.
- **Exemple d'utilisation :**
  - Recherche par type : `!getresources books`
  - Recherche par type et sujet : `!getresources books JavaScript`
- **Affichage :**
  - Si des ressources sont trouvées, elles sont affichées dans un message embed avec des liens cliquables.
  - Si aucune ressource n'est trouvée, le bot renvoie un message indiquant qu'aucune ressource n'a été trouvée.


### Commande `!allresources`

La commande `!allresources` affiche toutes les ressources de la base de données organisées par type. Voici une explication détaillée :

- **Utilisation :** `!allresources`
- **Affichage :**
  - Les ressources sont organisées par type, chaque type ayant sa propre couleur distinctive dans l'embed.
  - Chaque section contient les ressources du type correspondant avec des liens cliquables.
  - Le pied de page indique la source des ressources (Gestion des ressources) avec un message personnalisable.


### Commande `!deleteresource`

La commande `!deleteresource` permet de supprimer une ressource de la base de données en fonction du type, du sujet et du lien. Voici une explication détaillée :

- **Utilisation :** `!deleteresource [type] [sujet] [lien]`
- **Paramètres :**
  - `[type]` : Le type de la ressource à supprimer.
  - `[sujet]` : Le sujet ou le titre de la ressource à supprimer.
  - `[lien]` : Le lien de la ressource à supprimer.
- **Exemple d'utilisation :** `!deleteresource books JavaScript  https://example.com/js-basics`
- **Suppression :**
  - La commande recherche la ressource correspondante dans la base de données et la supprime.
  - Si aucune ressource correspondante n'est trouvée, le bot renvoie un message indiquant qu'aucune ressource n'a été trouvée.

### Commande `!addgroup`

La commande `!addgroup` permet de créer un groupe et un salon associé.

- **Utilisation :** `!addgroup <nom> [@membre1 @membre2 ...]`
- **Fonctionnement :**
  - Crée un groupe avec le nom spécifié.
  - Crée un salon texte dans la catégorie parente du canal d'origine.
  - Restreint l'accès au salon aux membres du groupe et aux utilisateurs mentionnés.
- **Syntaxe :**
  - `<nom>` : Le nom du groupe (alphabétique et alphanumérique, 1 à 30 caractères).
  - `[@membre1 @membre2 ...]` : (Optionnel) Mention d'utilisateurs à ajouter directement au groupe.
- **Exemple d'utilisation :**
  - `!addgroup MonGroupe @Utilisateur1 @Utilisateur2`
- **Remarques :**
  - Si des utilisateurs sont mentionnés, ils seront ajoutés directement au groupe lors de sa création.
  - Le nom du groupe doit être alphanumérique et ne peut pas dépasser 30 caractères.
  - La commande doit être exécutée dans un salon qui appartient à une catégorie pour que le groupe soit correctement créé.

### Commande `!deletegroup`

La commande `!deletegroup` permet de supprimer un groupe et son salon associé.

- **Utilisation :** `!deletegroup <nom>`
- **Fonctionnement :**
  - Vérifie si l'utilisateur a la permission de gérer les salons.
  - Demande une confirmation avant de procéder à la suppression.
  - Supprime le salon associé au groupe.
  - Supprime le groupe de la base de données.
- **Exemple d'utilisation :** `!deletegroup MonGroupe`
- **Remarque :** Cette commande vérifie si l'utilisateur a la permission de gérer les salons avant de procéder à la suppression. Elle demande également une confirmation pour éviter les suppressions accidentelles.


### Commande `adduser`

La commande `adduser` permet d'ajouter un utilisateur à un groupe existant. Voici comment elle fonctionne :

- **Syntaxe :** `!adduser <nom-du-groupe> <@utilisateur1> <@utilisateur2> ...`
- **Description :**
  - Cette commande peut être utilisée par les administrateurs du serveur.
  - Elle prend en paramètres le nom du groupe auquel les utilisateurs doivent être ajoutés, ainsi que les mentions des utilisateurs à ajouter.
  - Les utilisateurs sont ajoutés au groupe seulement s'ils ne sont pas déjà membres.
- **Exemple d'utilisation :** `!adduser MonGroupe @Utilisateur1 @Utilisateur2`
- **Remarques :**
  - Les utilisateurs déjà membres du groupe ne seront pas ajoutés à nouveau.
  - La commande informera sur les utilisateurs qui sont déjà membres du groupe et sur ceux qui ont été ajoutés avec succès.

### Commande `deleteuser`

La commande `deleteuser` permet de supprimer un utilisateur d'un groupe existant. Voici comment elle fonctionne :

- **Syntaxe :** `!deleteuser <nom-du-groupe> <@utilisateur1> <@utilisateur2> ...`
- **Description :**
  - Cette commande peut être utilisée par les administrateurs du serveur.
  - Elle prend en paramètres le nom du groupe duquel les utilisateurs doivent être supprimés, ainsi que les mentions des utilisateurs à supprimer.
  - Les utilisateurs sont supprimés du groupe seulement s'ils sont actuellement membres.
- **Exemple d'utilisation :** `!deleteuser MonGroupe @Utilisateur1 @Utilisateur2`
- **Remarques :**
  - Les utilisateurs qui ne sont pas membres du groupe ne seront pas supprimés.
  - La commande informera sur les utilisateurs qui ne sont pas membres du groupe et sur ceux qui ont été supprimés avec succès.

### Commande `!announce`

La commande `!announce` permet de créer une annonce dans le salon à partir duquel la commande a été envoyée. Elle est conçue pour les administrateurs du serveur et nécessite la permission de gérer les messages.

- **Syntaxe :** `!announce <nom-du-groupe> <message-de-l'annonce> -date <date> -time <heure>`
- **Paramètres :**
  - `<nom-du-groupe>` : Le nom du groupe pour lequel l'annonce est destinée.
  - `<message-de-l'annonce>` : Le contenu du message d'annonce.
  - `-date <date>` : L'indicateur de date suivi de la date au format YYYY-MM-DD.
  - `-time <heure>` : L'indicateur de l'heure suivi de l'heure au format HH:mm.
- **Exemple d'utilisation :** `!announce MonGroupe Réunion générale -date 2024-01-10 -time 18:30`
- **Fonctionnement :**
  - Vérifie si l'utilisateur a la permission de gérer les messages.
  - Extrait le nom du groupe, le message de l'annonce, la date et l'heure à partir des arguments de la commande.
  - Vérifie si les indicateurs `-date` et `-time` sont présents.
  - Enregistre l'annonce dans la base de données avec le nom du groupe, le message, le canal et la date spécifiée.
  - Planifie des rappels pour l'annonce 24 heures et 2 heures avant la date spécifiée.
  - Envoie le message d'annonce dans le canal avec un message intégré.
- **Remarques :**
  - Le nom du groupe doit être spécifié correctement, et le groupe doit exister dans la base de données.
  - Les rappels sont envoyés automatiquement 24 heures et 2 heures avant l'heure spécifiée.
  - Si la date spécifiée est dans le passé, l'annonce ne sera pas planifiée ni envoyée.
  - Assurez-vous que la date est au format YYYY-MM-DD et l'heure au format HH:mm.
  - Utilisez cette commande avec précaution, car elle envoie des annonces à tous les membres du canal.


### Commande `!listannounces`

La commande `!listannounces` permet d'afficher la liste des annonces pour un groupe spécifié ou toutes les annonces, selon les permissions de l'utilisateur.

- **Syntaxe :** `!listannounces [nom-du-groupe]`
- **Paramètres :**
  - `[nom-du-groupe]` : (Optionnel) Le nom du groupe pour lequel vous souhaitez voir les annonces. Si aucun groupe n'est spécifié, toutes les annonces de tous les groupes seront affichées.
- **Exemple d'utilisation :**
  - Afficher les annonces pour un groupe spécifié : `!listannounces MonGroupe`
  - Afficher toutes les annonces pour chaque groupe : `!listannounces`
- **Fonctionnement :**
  - Vérifie si l'utilisateur a la permission de gérer les messages.
  - Si `[nom-du-groupe]` est spécifié, la commande affiche toutes les annonces associées à ce groupe.
  - Si aucun `[nom-du-groupe]` n'est spécifié, la commande affiche toutes les annonces pour chaque groupe.
  - Les annonces sont affichées dans un message intégré avec des informations telles que le message, la date et l'heure de chaque annonce.
- **Remarques :**
  - Cette commande est destinée aux utilisateurs ayant la permission de gérer les messages.
  - Si `[nom-du-groupe]` est spécifié, le bot recherche toutes les annonces pour ce groupe en particulier.
  - Si aucun `[nom-du-groupe]` n'est spécifié, le bot affiche toutes les annonces pour tous les groupes.
  - Les informations affichées comprennent le groupe associé, le message de l'annonce, ainsi que la date et l'heure de chaque annonce.
  - Utilisez cette commande pour vérifier les annonces existantes sur le serveur.





## Comment Utiliser le Bot

1. Clonez le répertoire.
2. Installez les dépendances avec `npm install`.
3. Configurez le fichier `config.js` avec le token de votre bot.
4. Exécutez le bot avec `node index.js`.

N'oubliez pas de consulter le fichier d'aide avec `!help` pour obtenir des informations sur les commandes disponibles !

---


<<<<<<< HEAD

## Fonctionnalités

<<<<<<< HEAD
!creer_groupe [nom_du_groupe] : Permet de créer un nouveau groupe.

!rejoindre_groupe [nom_du_groupe] : Permet à un utilisateur de rejoindre un groupe existant.

!quitter_groupe [nom_du_groupe] : Permet à un utilisateur de quitter un groupe.

!groupes_disponibles : Affiche la liste des groupes disponibles sur le serveur.

!info_groupe [nom_du_groupe] : Affiche des informations sur un groupe spécifique.

!creer_salon_textuel [nom_du_salon] : Crée un nouveau salon textuel pour le groupe actuel.

!creer_salon_vocal [nom_du_salon] : Crée un nouveau salon vocal pour le groupe actuel.

!annoncer [message] : Permet d'envoyer une annonce à tous les membres du serveur.

!sondage [question] [option1] [option2] ... : Crée un sondage pour recueillir l'opinion des membres.

!points [utilisateur] : Affiche les points d'un utilisateur.

!classement : Affiche le classement des membres en fonction de leur activité.

!aide : Affiche une liste des commandes disponibles.

- **Création de Groupes :** Permet aux utilisateurs de créer des groupes d'étudiants avec avec un nom pour le groupe et une description avec une simple commande "!create-group [nom] [description]".
=======
- **Création de Groupes :** Permet aux utilisateurs de créer des groupes d'étudiants avec avec un nom pour le groupe et une description avec une simple commande "/create-group [nom] [description]".
>>>>>>> 192e5c2137a49254e89c2fc5bce449991827ee9e
  
- **Modification de Groupes :** Permet de modifier les détails des groupes existants comme le nom du groupe , la description "!update-group-nom [nouveau-nom]" et pour la description  "!update-group-description [nouvel-description]".

- **Suppression de Groupes :** Permet de supprimer des groupes, en supprimant également tous les membres associés donc on peut supprmer des groupes a partir de leurs noms ou bien meme supprimer tout les groupes en meme temps en utilisant la commande "!delete-group-all" , "!delete-group [nom]".

### Gestion des Membres, Rôles et Salons

- **Gestion des Membres :** Autorisations pour gérer les membres du serveur Discord, offrant un contrôle administratif essentiel comme :  


## l'expulsion :
 l'administrateur prend la decision de retirer un utilisateur temporairement en specifiant la mention du membre  et une raison facultative et cela a l'aide de la commande suivante "!expulser @membre_raison" .

## Interdiction d'un membre 
l'administrateur prend la decision d'interdire a un utilisateur d'entree dans le serveur definitivement en specifiant la mention du membre  et une raison facultative et cela a l'aide de la commande suivante " !interdire @membre_raison " .


- **Gestion des Rôles :** Autorisations pour gérer les rôles sur le serveur d'une autre facon permettant d'attribuer un role a un membre specifie  en utilisant la mention du membre et le mention de role et cela a l'aide de la commande " !ajouter_role @membre @role " et " !retirer_role @membre @role " et cette commande  qui permet de retirer un rôle à un membre spécifié en utilisant la mention du membre et la mention du rôle.


- **Gestion des Salons :** Autorisations de géstion des salons confèrent au bot le pouvoir de créer, modifier et supprimer des salons sur le serveur. a l'aide des commandes suivante: 

## Création d'un Salon Textuel : 
qui permet aux administrateurs de créer un nouveau salon textuel en spécifiant le nom du salon a l'aide de la commande " !creer_salon_textuel nom_du_salon "

## Création d'un Salon Vocal :
qui permet aux administrateurs la creation d'un nouveau salon vocal en spécifiant le nom du salon a l'aide de la commande " !creer_salon_vocal nom_du_salon "

## Suppression d'un Salon :
permet aux administrateurs de supprimer un salon existant en spécifiant le nom du salona l'aide de la commande "!supprimer_salon nom_du_salon "

- **Invitations Instantanées :** Autorisations pour créer des invitations instantanées pour le serveur Discord.

- **Envoyer des Messages :** Autorisations pour envoyer des messages sur les salons textuels.

- **Gestion des Messages :** Autorisations pour gérer les messages dans les salons textuels.

- **Historique des Messages :** Autorisations pour lire l'historique des messages dans les salons textuels.

- **Ajouter des Réactions :** Autorisations pour ajouter des réactions aux messages.

- **Connexion Vocale :** Autorisations pour se connecter à un salon vocal.

- **Parler :** Autorisations pour parler dans un salon vocal.
-!google->permet de faire des recherches
!quiz:permet de faire des quizs
!date_anniversaire: configurer sa date de naissance pour que le bot le souhaite automatiquement joyeux annoiversaire
!regles: affiches  les regles
!delete_date_naissance:supprimer la date de naissance

=======
>>>>>>> c675d6f8cfcadb55d71b3461a97cab0ac68e1139
## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.univ-lr.fr/projets-l2-2023/botcreators/discordbotgestiongroupes.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.univ-lr.fr/projets-l2-2023/botcreators/discordbotgestiongroupes/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy 

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.

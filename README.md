
##Server connexion

Pour se connecter au projet : 

Il faut au préalable posséder Node.js, Mysql et Git. 

-Créez une base de donnée Mysql. Voilà les informations qu'il vous faut pour que Sequelize puisse se connecter à la BDD : 

Nom de BDD : groupomania_db
Nom utilisateur : mdub
Mot de passe : cocochanel337

SINON vous pouvez à tout moment modifier ces informations pour Sequelize dans : backend/utils/database.js

##Liste des dépendances : 

Normalement elles sont déjà présentes. Si le serveur crashe et vous demande une de ces dépendances, il faut effectuer la commande suivante : npm install --save "nom de la dépendance" :

-express
-mysql2
-sequelize
-body-parser
-bcrypt
-jsonwebtoken
-multer
-path
-fs


##Connexion au serveur

Se rendre dans le dossier backend. Ouvrir l'invite de commande et lancer la commande "npm install" pour installer toutes les dépendances. Puis lancer le serveur avec la commande "node server". Le serveur devrait écouter sur le Port 3000. 

Enfin, il ne vous reste plus qu'à ouvrir signup.html dans le frontend avec votre navigateur ! 
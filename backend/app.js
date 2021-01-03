/*Importation des modules pour l'application*/
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

/*Importation des routes sauces et user*/
const messagesRoutes = require('./routes/messages');
const userRoutes = require('./routes/users');



/*--------------- Synchronisation des modèles dans la base de donnée ---------------------*/

// Import the user model we have defined
const sequelize = require('./utils/database'); 
const User = require('./models/User'); 
const Message = require('./models/Message');
  
// Sync all models that are not 
// already in the database 
sequelize.sync(); 
  
// Force sync all models 
// It will drop the table first  
// and re-create it afterwards 
// sequelize.sync({force:true}) ;

const { dirname } = require('path');

const app = express();

/*Headers des requêtes de l'API*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/*Utilisation du body parser pour les requêtes*/
app.use(bodyParser.json());

// /*Utilisation du dossier images pour les images des sauces*/
app.use('/images', express.static(path.join(__dirname, 'images')));

// /*Utilisation des routes sauces et user sur les adresses requises*/
app.use('/api/messages', messagesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
const Sequelize = require('sequelize');
/*Connexion à la base de données*/
const sequelize = new Sequelize('groupomania_db', 'mdub', 'cocochanel337', {
    host: 'localhost',
    dialect: 'mysql'
  });
  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  module.exports = sequelize;
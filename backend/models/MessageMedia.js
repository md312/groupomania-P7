// Include Sequelize module. 
const Sequelize = require('sequelize');

// Import sequelize object,  
// Database connection pool managed by Sequelize. 
const sequelize = require('../utils/database');

// Define method takes two arrguments 
// 1st - name of table 
// 2nd - columns inside the table 
const MessageMedia = sequelize.define('messageMedia', {


    messageMedia_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },

    user_id: {
        type: Sequelize.UUID,
        allowNull: false
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    image : {
        type: Sequelize.STRING(4000),
        required : false,
        allowNull: true
    },

    moderate: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue : false
    },

    
    deleted_at: Sequelize.DATE
})

// Exporting User, using this constant 
// we can perform CRUD operations on 
// 'user' table. 
module.exports = MessageMedia;

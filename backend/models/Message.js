// Include Sequelize module. 
const Sequelize = require('sequelize');

// Import sequelize object,  
// Database connection pool managed by Sequelize. 
const sequelize = require('../utils/database');

// Define method takes two arrguments 
// 1st - name of table 
// 2nd - columns inside the table 
const Message = sequelize.define('message', {


    message_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },

    user_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    
    moderate: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue : false
    },

    content: {
        type: Sequelize.TEXT,
        required: true
    },

    deleted_at: Sequelize.DATE
})

// Exporting User, using this constant 
// we can perform CRUD operations on 
// 'user' table. 
module.exports = Message;

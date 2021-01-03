// Include Sequelize module. 
const Sequelize = require('sequelize');

// Import sequelize object,  
// Database connection pool managed by Sequelize. 
const sequelize = require('../utils/database');

// Define method takes two arrguments 
// 1st - name of table 
// 2nd - columns inside the table 
const Message = sequelize.define('message', {


    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },

    user_id: {
        type: Sequelize.UUID,
        allowNull: false
    },

    imageUrl : {
        type: Sequelize.STRING(4000),
        required : false,
        allowNull: true
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

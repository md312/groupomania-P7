// Include Sequelize module. 
const Sequelize = require('sequelize');
  
// Import sequelize object,  
// Database connection pool managed by Sequelize. 
const sequelize = require('../utils/database'); 
  
// Define method takes two arrguments 
// 1st - name of table 
// 2nd - columns inside the table 
const User = sequelize.define('user', { 
  
    // Column-1, user_id is an object with  
    // properties like type, keys,  
    // validation of column. 
    user_id:{ 
  
        // Sequelize module has INTEGER Data_Type. 
        type: Sequelize.UUID,

        defaultValue: Sequelize.UUIDV4,
  
        // user_id can not be null. 
        allowNull:false, 
  
        // For uniquely identify user. 
        primaryKey:true
    }, 
  
    // Column-2, name 
    username: { type: Sequelize.STRING, allowNull:false, unique: true }, 
    
    image : {type: Sequelize.STRING(4000), required : false, allowNull: true},

    // Column-3, email 
    email: { type: Sequelize.STRING, allowNull:false, unique: true }, 

    password:{type : Sequelize.STRING, allowNull: false},

    isAdmin: {type : Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
  
     
}) 

// Exporting User, using this constant 
// we can perform CRUD operations on 
// 'user' table. 
module.exports = User

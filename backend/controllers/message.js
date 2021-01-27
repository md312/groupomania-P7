/*Modèle d'un message*/
const Message = require('../models/Message');
const User = require('../models/User');

/*Import du module fs*/
const fs = require('fs');
const multer = require ('../middleware/multer-config');

/*Relations entre Messages et Users*/
User.hasMany(Message, {foreignKey: 'user_id'});
Message.belongsTo(User, {foreignKey: 'user_id'});

/*FONCTIONS DTO*/
const dtoUser = require('../dto/user');


function dtoMessage(message) {
  
    return Object.assign(
      {},
      {
        message_id: message.message_id,
        content: message.content,
        createdAt: message.createdAt,
        user: dtoUser(message.user),
      }
    )
};



function dtoMessages(messages) {

  let allMessages = messages.map(message => {
      return Object.assign(
        {},
        {
          message_id: message.message_id,
          content: message.content,
          createdAt: message.createdAt,
          moderate: message.moderate,
          user: dtoUser(message.user),
        }
      )
  })
  return allMessages;
};




/*MESSAGES TEXTE*/

/*Middleware création de message*/
exports.createMessage = (req, res, next) => {
  const messageObject = req.body;

  const message = Message.create({
    ...messageObject
  })
    .then((message) => res.status(201).json(message))
    .catch(error => res.status(400).json({ error }));
};




/*PUT Message :*/

exports.updateMessage = (req, res, next) => {
  var value = {
    content: req.body.content,
    moderate : req.body.moderate,
  };
  var condition = { where: { message_id: req.params.id } };
  var options = { multi: true };

  Message.update(value, condition, options)

    .then(response => {
      let message = Message.findOne({ where: { message_id: req.params.id } }
      ).then(message => res.status(200).json((message)))
    }).catch(error => res.status(400).json({ error }))

}

/*Middleware suppression de message*/

exports.deleteMessage = (req, res, next) => {
  /*Recherche du message suivant l'id des paramètres de requête*/
  const deletedMessage = Message.findOne({ where: { message_id: req.params.id } })
    .then(deletedMessage => {
        deletedMessage.destroy()
        .then(() => res.status(204).json())
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

/*Middleware affichage d'une sauce*/  

exports.getOneMessage = (req, res, next) => {
  Message.findOne({ where: { message_id: req.params.id }, 
    include: [
      {
        model: User,
      }
    ]
  }).then(response =>   
   res.status(200).json(dtoMessage(response)))
    .catch(error => res.status(400).json({ error }));
};


/*Middleware affichage de tous les messages*/
exports.getAllMessages = (req, res, next) => {
   Message.findAll({
    include: [
      {
        model: User
      }
    ],
 order: [ [ 'createdAt', 'DESC' ]]
})    .then((messages) => res.status(200).json((dtoMessages(messages))))
       .catch(error => res.status(400).json({ error }));

};
/*Modèle d'un message*/
const MessageMedia = require('../models/MessageMedia');
const User = require('../models/User');

/*Import du module fs*/
const fs = require('fs');
const multer = require ('../middleware/multer-config');

/*Relations entre Messages et Users*/
User.hasMany(MessageMedia, {foreignKey: 'user_id'});
MessageMedia.belongsTo(User, {foreignKey: 'user_id'});

/*FONCTIONS DTO*/
const dtoUser = require('../dto/user');


function dtoMessage(message) {
  
    return Object.assign(
      {},
      {
        messageMedia_id: message.id,
        title: message.title,
        image: message.image,
        createdAt: message.createdAt,
        moderate: message.moderate,
        user: dtoUser(message.user),
      }
    )
};



function dtoMessages(messages) { 
  const allMessages = messages.map( message => {
  return Object.assign(
    {},
    {
      messageMedia_id: message.messageMedia_id,
      title: message.title,
      image: message.image,
      createdAt: message.createdAt,
      moderate: message.moderate,
      user: dtoUser(message.user),
    }
  )
  }
  
)
return allMessages;
};


/*MESSAGES TEXTE*/

/*Middleware création de message*/
exports.createMessage = (req, res, next) => {
  const messageObject = req.body;

  const message = MessageMedia.create({
    ...messageObject,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
    .then((message) => res.status(201).json(message))
    .catch(error => res.status(400).json({ error }));
};

/*PUT Message :*/

exports.updateMessage = (req, res, next) => {
  const values = req.file ?
    {    /*Récupération du corps de la requête et transformation de l'url image en nom de fichier*/
        ...req.body,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
  var condition = { where: { messageMedia_id: req.params.id } };
  var options = { multi: true };

  MessageMedia.update(values, condition, options)

    .then(response => {
      let message = MessageMedia.findOne({ where: { messageMedia_id: req.params.id } }
      ).then(message => res.status(200).json((message)))
    }).catch(error => res.status(400).json({ error }))

}

  

/*Middleware suppression de message*/

exports.deleteMessage = (req, res, next) => {
  /*Recherche du message suivant l'id des paramètres de requête*/
  MessageMedia.findOne({ where: { messageMedia_id : req.params.id } })
    .then(deletedMessage => {
      /*Recherche et suppression de l'image*/
      const filename = deletedMessage.image.split('/images/')[1];
     
      fs.unlink(`images/${filename}`, () => {
        /*Suppression de la sauce*/
        deletedMessage.destroy()
          .then(() => res.status(204).json())
          .catch(error => res.status(400).json({ error }));
      })
    })
    .catch(error => res.status(500).json({ error }));
};

/*Middleware affichage d'une sauce*/  

exports.getOneMessage = (req, res, next) => {
  MessageMedia.findOne({ where: { messageMedia_id: req.params.id }, 
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
   MessageMedia.findAll({
    include: [
    {
    model: User
    }
  ],
 order: [ [ 'createdAt', 'DESC' ]]
})    .then((messages) => res.status(200).json(dtoMessages(messages)))
       .catch(error => res.status(400).json({ error }));

};

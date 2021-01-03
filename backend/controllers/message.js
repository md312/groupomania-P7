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

function dtoUser(user) {

  return Object.assign(
    {},
    {
      user_id: user.id,
      username: user.username
    }
  )
};

function dtoUsers(users) {
  users.map(user => {

    dtoUser(user);
})};

/*MESSAGES TEXTE*/

/*Middleware création de message*/
exports.createMessage = (req, res, next) => {
    const messageObject = req.body;
  // if (req.body.imageUrl === null){
  //   const message = Message.create({
  //     ...messageObject
  // })}
    /*Création d'une nouvelle entrée dans la base de donnée avec importation de l'image*/
  
     Message.create({
        ...messageObject,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    
    })    
        .then((message) => res.status(201).json(message))
        .catch(error => res.status(400).json({ error }));
};




/*PUT Message :*/

exports.updateMessage = (req,res,next) => {
const updatedMessage = Message.findOne({ where: { id: req.params.id } })
.then (updatedMessage => {
 Message.update(
   {content: req.body.content},
   {returning: true, where: {id: req.params.id} }
 )
 .then(function([ rowsUpdate, [updatedMessage] ]) {
   res.json(updatedMessage)
 })
 .catch(next)
})}

  

/*Middleware suppression de message*/

exports.deleteMessage = (req, res, next) => {
  /*Recherche du message suivant l'id des paramètres de requête*/
  const deletedMessage = Message.findOne({ where: { id: req.params.id } })
    .then(deletedMessage => {
      /*Recherche et suppression de l'image*/
      // const filename = message.imageUrl.split('/images/')[1];
      // fs.unlink(`images/${filename}`, () => {
      /*Suppression de la sauce*/
      deletedMessage.destroy()
        .then(() => res.status(204).json())
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

/*Middleware affichage d'une sauce*/  

exports.getOneMessage = (req, res, next) => {
  Message.findOne({ where: { id: req.params.id }, 
    include: [
      {
        model: User,

      }
    ]
  }).then((response) => dtoUser(response))
    .catch(error => res.status(400).json({ error }));
};


/*Middleware affichage de tous les messages*/
exports.getAllMessages = (req, res, next) => {
   Message.findAll({
    include: [{
    model: User
  }],
 order: [ [ 'createdAt', 'DESC' ]]
})    .then((messages) => res.status(200).json(messages))
       .catch(error => res.status(400).json({ error }));

};

// /*Middleware des likes et dislikes*/
// exports.likeSauce = (req, res, next) => {
//   /*Création des constantes nécessaires*/
//   const userId = req.body.userId;
//   const like = req.body.like;
//   const sauceId = req.params.id;

// /*Recherche de la sauce appropriée*/
//   Sauce.findOne({ _id: sauceId })
//     .then(sauce => {
//       /*Création des variables pour récupérer les champs de la base de donnée appropriés*/
//       let usersLiked = sauce.usersLiked;
//       let likes = sauce.likes;
//       let usersDisliked = sauce.usersDisliked;
//       let dislikes = sauce.dislikes;
      
//       /*Si l'utilisateur like la sauce*/
//       if (like == 1) {
//         /*Si l'id de l'utilisateur n'est pas déjà compris dans le tableau des usersLiked*/
//         if (!usersLiked.includes(userId)) {
//           /*On ajoute l'id de l'utilisateur dans le tableau*/
//           usersLiked.push(userId);
//           /*On ajoute un like*/
//           likes++;
//         }
//         /*Si l'utilisateur dislike la sauce*/
//       } else if (like == -1) {
//         /*Si l'id de l'utilisateur n'est pas déjà compris dans le tableau des usersDisliked*/
//         if (!usersDisliked.includes(userId)) {
//           /*On ajoute l'id de l'utilisateur dans le tableau*/
//           usersDisliked.push(userId);
//           /*On ajoute un dislike*/
//           dislikes = dislikes + 1;
//         }
//       } else {
//         /*Si l'utilisateur enlève son like*/
//         if (usersLiked.includes(userId)) {
//           /*On va chercher l'id utilisateur dans le tableau des usersLiked*/
//           var index = usersLiked.indexOf(userId);
//           /*On enlève l'id utilisateur du tableau*/
//           usersLiked.splice(index, 1);
//           /*On retire un like*/
//           likes = likes - 1;
//         }
//          /*Si l'utilisateur enlève son dislike*/
//         if (usersDisliked.includes(userId)) {
//           /*On va chercher l'id utilisateur dans le tableau des usersDisliked*/
//           var index = usersDisliked.indexOf(userId);
//           /*On enlève l'id utilisateur du tableau*/
//           usersDisliked.splice(index, 1);
//           /*On retire un dislike*/
//           dislikes = dislikes - 1;
//         }
//       }
//       /*On met à jour tous les champs nécessaires dans la sauce*/
//       Sauce.updateOne({ _id: sauceId },
//         { dislikes: dislikes, usersDisliked: usersDisliked, likes: likes, usersLiked: usersLiked }
//       )
//         .then(() => res.status(200).json({ message: "L'utilisateur a mis un like ! " }))
//         .catch(error => res.status(400).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));
//  } 
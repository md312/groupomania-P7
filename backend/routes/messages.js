/*Création des routes sauces du serveur*/

// /*Importation des modules Express et du router*/
const express = require('express');
const router = express.Router();

/*Importation des middlewares dans des variables*/
const messagesCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// /*Route likes*/
// router.post('/:id/like', auth, messagesCtrl.likeSauce);
/*Route création du message*/
router.post('/', auth, multer, messagesCtrl.createMessage);
// /*Route modification du message*/
// router.put('/:id', auth, multer, messagesCtrl.modifySauce);
/*Route suppression de message*/
router.delete('/:id', auth, messagesCtrl.deleteMessage);
/*Affichage d'un message*/
router.get('/:id', auth, messagesCtrl.getOneMessage);
/*Affichage de tous les messages*/
router.get('/', auth, messagesCtrl.getAllMessages);

/*


/*Exportation du router*/
module.exports = router;
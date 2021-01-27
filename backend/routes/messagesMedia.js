/*Création des routes messages du serveur*/

// /*Importation des modules Express et du router*/
const express = require('express');
const router = express.Router();

/*Importation des middlewares dans des variables*/
const messagesMediaCtrl = require('../controllers/messageMedia')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// /*Route likes*/
// router.post('/:id/like', auth, messagesCtrl.likeSauce);
/*Route création du message*/
router.post('/', auth, multer, messagesMediaCtrl.createMessage);
// /*Route modification du message*/
router.put('/:id', auth, multer, messagesMediaCtrl.updateMessage);
/*Route suppression de message*/
router.delete('/:id', auth, multer, messagesMediaCtrl.deleteMessage);
/*Affichage d'un message*/
router.get('/:id', auth, multer, messagesMediaCtrl.getOneMessage);
/*Affichage de tous les messages*/
router.get('/', auth, multer, messagesMediaCtrl.getAllMessages);

/*


/*Exportation du router*/
module.exports = router;
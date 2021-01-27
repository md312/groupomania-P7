/*Création des routes user du serveur*/

/*Importation des modules Express et du router*/
const express = require('express');
const router = express.Router();

/*Middleware du user*/
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/*Création d'un user*/
router.post('/signup', userCtrl.signup);
/*Identification d'un user*/
router.post('/login', userCtrl.login);
/*Modification d'un utilisateur*/
router.put('/update/:id', auth, multer, userCtrl.update);
/*Suppression d'un utilisateur*/
router.delete('/delete/:id', auth, multer, userCtrl.delete);
/*Récupérer un user*/
router.get('/:id', auth, multer, userCtrl.getUser);
/*Récupérer tous les users*/
router.get('/', auth, multer, userCtrl.getUsers);

/*Exportation du router*/
module.exports = router;    
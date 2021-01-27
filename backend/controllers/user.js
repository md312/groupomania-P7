/*Module de cryptage du mot de passe*/
const bcrypt = require('bcrypt');
/*Module de création de token utilisateur*/
const jwt = require('jsonwebtoken');
/*Importation de multer*/ 
/*Import du module fs*/
const fs = require('fs');
const multer = require ('../middleware/multer-config');

/*Importation du modèle User*/
const User = require('../models/User');
const Message = require('../models/Message');
const MessageMedia = require('../models/MessageMedia');

/*Importation DTO User*/
const dtoUser = require('../dto/user');
const dtoUsers= require('../dto/users');

User.hasMany(Message, {foreignKey: 'user_id'});
Message.belongsTo(User, {foreignKey: 'user_id'});

User.hasMany(MessageMedia, {foreignKey: 'user_id'});

/*Création d'un utilisateur*/
exports.signup = (req, res, next) => {
    /*Cryptage du mot de passe*/
   bcrypt.hash(req.body.password, 10)
        .then(hash => {
            /*Création d'un nouvel utilisateur dans la base de donnée*/
             User.create({
                username: req.body.username,    
                age : req.body.age,
                fonction: req.body.fonction,
                about: req.body.about,
                email: req.body.email,
                password: hash
            })
                .then(user => res.status(201).json(dtoUser(user)))
                .catch(error => res.status(400).json({ error }));
        })
       
};

/*Connexion d'un utilisateur*/
exports.login = (req, res, next) => {
    /*Recherche de l'utilisateur dans la base de donnée*/
    User.findOne({ where: {username: req.body.username }})
        .then(user => {
            /*Si on ne trouve pas l'utilisateur*/
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }
            /*Sinon on compare le hash du mot de passe*/
            bcrypt.compare(req.body.password, user.password)
            
                .then(valid => {
                    /*Si le mot de passe ne correspond pas*/
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    /*S'il correspond on envoie un token utilisateur pour une durée de 15mn*/
                    res.status(200).json({
                        userId: user.user_id,
                        username: user.username,
                        isAdmin: user.isAdmin,
                        token: jwt.sign(
                            { userId: user.user_id },
                            '8uVGAuQuD7b2zmWzi0kgTJOSEHfZrIitUMDdjBUr1n_ZBHwV8CU_sgE8UrsBUVvzw8jWPe9p3kVDtekcUemA9WhmPlmR4HTMOKFCP-4bTeX4Un1cPET9kLLzIMUdieZV6lqKx8oxKflcp0UT86hK3T2IPqpAdA8',
                            { expiresIn: 60 * 60 }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}; 

exports.update = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const values = req.file ?
                {    /*Récupération du corps de la requête et transformation de l'url image en nom de fichier*/
                    username: req.body.username,
                    age: req.body.age,
                    fonction: req.body.fonction,
                    about: req.body.about,
                    email: req.body.email,
                    password: hash,
                    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : {
                    username: req.body.username,
                    age: req.body.age,
                    fonction: req.body.fonction,
                    about: req.body.about,
                    email: req.body.email,
                    password: hash
                };
            var condition = { where: { user_id: req.params.id } }
            var options = { multi: true };

            User.update(values, condition, options)
        })

        .then(response => {
            let user = User.findOne({ where: { user_id: req.params.id } }
            ).then(user => res.status(200).json((dtoUser(user)))
            )
        })
        .catch(error => res.status(400).json({ error }))
}


exports.delete = (req, res, next) => {

    User.findOne({ where: { user_id: req.params.id } })
        .then(deletedUser => {
            if (deletedUser.image !== null) {
            const filename = deletedUser.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                /*Création d'un nouvel utilisateur dans la base de donnée*/
                deletedUser.destroy()
            })
        }else{
            deletedUser.destroy()
        }
        
        }) .then(res.status(204).json({ message: "Utilisateur supprimé !" }))
                    .catch(error => res.status(400).json({ error }));
       
};

exports.getUser = (req, res, next) => {
    User.findOne({
        where: { user_id: req.params.id },
        include: [
            {
                model: Message,
            },
            {
                model: MessageMedia,
            }
        ],
        
    }).then(response =>
        res.status(200).json(dtoUser(response)))
        .catch(error => res.status(400).json({ error }));
};

exports.getUsers = (req, res, next) => {
    User.findAll().then(response =>
        res.status(200).json(dtoUsers(response)))
        .catch(error => res.status(400).json({ error }));
};
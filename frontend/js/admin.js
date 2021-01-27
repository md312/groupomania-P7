
let params = (new URL(document.location)).searchParams;
let userId = params.get("id");
const id = JSON.parse(localStorage.getItem("userID"));

/*------------> RECUPERATION DES MESSAGES A MODERER <------------ */
function accessAdmin(){
    if(id.isAdmin === false){
        window.location.replace("index.html");
    }
}
accessAdmin();

function getAdmin() {
    if (id.isAdmin === true) {
        let admin = document.getElementById("openAdmin");
        admin.innerHTML = '<a href="admin.html?id=' + id.userId + '"><button class="btn btn-warning text-light" type="button" id="userAccount"><i class="bi bi-eye-fill">  Admin </i></button></a>'
    }
}
getAdmin();

function getProfile(){
    let a = document.getElementById("getProfile");

    a.innerHTML = '<a href="account.html?id=' + id.userId + '"><button class="btn btn-outline-primary" type="button" id="userAccount"><i class="bi bi-person-square">  Profil </i></button></a>'
}
getProfile();


/*------------> RECUPERATION DES MESSAGES ET IMAGES A MODERER <------------ */

/*Récupération des messages*/

function getMessages() {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + id.token,
    };

    /*Va chercher l'adresse de l'API*/
    fetch("http://localhost:3000/api/messages/", {
        method: 'get',
        headers: headers,
        /*Récupère la réponse envoyée par l'API*/
    }).then(
        function (response) {
            /*Réponse si fonctionne correctement*/
            response.json().then(function (messages) {
                let html = "";
                /*Boucle for pour itérer les éléments*/
                messages.forEach(message => {
                    if (message.moderate === true) {
                
                        /*Liste des produits avec balises html*/
                        html = html + '<div class="message-container bg-secondary bg-gradient pb-2"><div class="message-header card-header"><div class="d-flex align-items-center"> <div class="mr-2"><img class="rounded-circle" height="50" width="50" src="' + (message.user.image ? message.user.image : "images/img_avatar2.png")  + '" alt=""></div> <div class="h5 m-0 text-left text-muted">@' + message.user.username + '</div> </div> </div></div> <div class="message-body card-body bg-secondary bg-gradient p-2"> <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> Posté le : ' + message.createdAt + ' </div> <p class="message-text text-muted">' + message.content + '</p> <div class="authorize d-flex justify-content-end"> <button data-id="'+ message.message_id +'" cl class="allowMessage btn btn-success"<i class="bi bi-dash-circle-fill">Autoriser</i></button></div></div></div>';
                        document.getElementById("moderateMessage").innerHTML = html;
           
                    }else{

                    html = html +  ' <div class="message-container"><div class="message-header card-header"><div class="d-flex align-items-center"> <div class="mr-2"><img class="rounded-circle" height="50" width="50" src="' + (message.user.image ? message.user.image : "images/img_avatar2.png")  + '" alt=""></div> <div class="h5 m-0 text-left">@' + message.user.username + '</div> </div> </div> </div> <div class="message-body card-body p-2"> <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> Posté le : ' + message.createdAt + ' </div> <p class="message-text">' + message.content + '</p><div class="moderate d-flex justify-content-end"> <button data-id="'+ message.message_id +'" class="moderateMessage btn btn-danger"<i class="bi bi-dash-circle-fill">Modérer</i></button></div></div></div>'
                    
                    document.getElementById("moderateMessage").innerHTML = html;
                     
                }
                })
            });
        }).catch(function (err) {
            alert("Impossible d'afficher les fichiers !");
        });
}

getMessages();

/*Récupération des images*/

function getImages() {
    const headers = {
        "Authorization": "Bearer " + id.token,
    };

    /*Va chercher l'adresse de l'API*/
    fetch("http://localhost:3000/api/messagesMedia/", {
        method: 'get',
        headers: headers,
        /*Récupère la réponse envoyée par l'API*/
    }).then(
        function (response) {
            /*Réponse si fonctionne correctement*/
            response.json().then(function (images) {
                let html = "";
                /*Création d'une boucle pour récupérer chaque image*/
                images.forEach(image => {
                    /*Si l'image est modérée*/
                    if(image.moderate === true){
                    html =  html + '<div class="card-container"><div class="card-header bg-secondary bg-gradient"><div class="d-flex justify-content-between align-items-center mt-2"><div class="d-flex justify-content-between align-items-center"><div class="mr-2"><img class="rounded-circle" height="50" width="50" src="' + (image.user.image ? image.user.image : "images/img_avatar2.png") + '" alt=""></div><div class="ml-2"><div class="h5 m-0">@' + image.user.username + '</div></div></div></div></div><div class="card-body bg-secondary bg-gradient"><div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> Posté le : ' + image.createdAt + '</div><a class="card-link" href="#"></a><h2 class="card-text">'+ image.title + '</h2><img class="messageImage" src="' + image.image +'"></img><div class="moderate d-flex justify-content-end"> <button data-id="'+ image.messageMedia_id +'" class="allowImage btn btn-success"<i class="bi bi-dash-circle-fill">Autoriser</i></button></div></div>';

                    document.getElementById("moderateImage").innerHTML = html;

                    }else{
                        /*Si elle n'est pas modérée*/
                       html = html + '<div class="card-container"><div class="card-header"><div class="d-flex justify-content-between align-items-center mt-2"><div class="d-flex justify-content-between align-items-center"><div class="mr-2"><img class="rounded-circle" height="50" width="50" src="' +(image.user.image ? image.user.image : "images/img_avatar2.png") + '" alt=""></div><div class="ml-2"><div class="h5 m-0">@' + image.user.username + '</div></div></div></div></div><div class="card-body"><div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> Posté le : ' + image.createdAt + '</div><h2 class="card-text">'+ image.title + '</h2><img class="messageImage" src="' + image.image +'"></img><div class="moderate d-flex justify-content-end"> <button data-id="'+ image.messageMedia_id +'" class="moderateImage btn btn-danger"<i class="bi bi-dash-circle-fill">Modérer</i></button></div></div>';
                   
                        document.getElementById("moderateImage").innerHTML = html;
                    }
                } )  
            }); 
        }).catch(function (err) {
            alert("Impossible d'afficher les fichiers !");
        });
}
getImages();



/*------------> MODERATION DU MESSAGE <------------ */

document.addEventListener("click", e => {
    if (!e.target.classList.contains("moderateMessage")) {
        return;
    }

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + id.token,
    };

    let messageName = e.target.dataset.id;

    let message = {
        moderate: true,
    }

    fetch('http://localhost:3000/api/messages/' + messageName, {
        method: 'put',
        headers: headers,
        body: JSON.stringify(message),

    }).then(function (response) {
        if (response.status == 200) {

            response.json().then(data => {
                return getMessages();
            })
        }
    }).catch(function (err) {
        window.alert("Erreur lors de la modération de votre message !")
    });
})

/*------------> AUTHORISATION DU MESSAGE <------------ */

document.addEventListener("click", e => {
    if (!e.target.classList.contains("allowMessage")) {
        return;
    }

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + id.token,  
    };

    let messageName = e.target.dataset.id;

    let message = {
        moderate: false,
    }

    fetch('http://localhost:3000/api/messages/' + messageName, {
        method: 'put',
        headers: headers,
        body: JSON.stringify(message),

    }).then(function (response) {
        if (response.status == 200) {

            response.json().then(data => {
                return getMessages();
            })
        }
    }).catch(function (err) {
        window.alert("Erreur lors de l'authorisation de votre message !")
    });
})

/*------------> MODERATION DE L'IMAGE <------------ */

document.addEventListener("click", e => {
    if (!e.target.classList.contains("moderateImage")) {
        return;
    }

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + id.token,
    };

    let imageName = e.target.dataset.id;

    let image = {
        moderate: true,
    }

    fetch('http://localhost:3000/api/messagesMedia/' + imageName, {
        method: 'put',
        headers: headers,
        body: JSON.stringify(image),

    }).then(function (response) {
        if (response.status == 200) {

            response.json().then(data => {
                return getImages();
            })
        }
    }).catch(function (err) {
        window.alert("Erreur lors de la modération de votre  image !")
    });
})

/*------------> AUTHORISATION DE L'IMAGE <------------ */

document.addEventListener("click", e => {
    if (!e.target.classList.contains("allowImage")) {
        return;
    }

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + id.token,  
    };

    let imageName = e.target.dataset.id;

    let image = {
        moderate: false,
    }

    fetch('http://localhost:3000/api/messagesMedia/' + imageName, {
        method: 'put',
        headers: headers,
        body: JSON.stringify(image),

    }).then(function (response) {
        if (response.status == 200) {

            response.json().then(data => {
                return getImages();
            })
        }
    }).catch(function (err) {
        window.alert("Erreur lors de l'authorisation' de votre image !")
    });
})




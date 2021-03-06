const id = JSON.parse(localStorage.getItem("userID"));

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
                    if (message.moderate === false) {

                       html = html + ' <div class="message-container"><div class="message-header card-header"><div class="d-flex align-items-center"><div class="mr-2"><a class="text-decoration-none" href="account.html?id=' + message.user.user_id + '"><img class="rounded-circle" height="50" width="50" src="' + 
                       (message.user.image ? message.user.image : "images/img_avatar2.png") + '" alt=""></div> <div class="h5 m-0 text-left">@' + message.user.username + '</a></div> </div> </div> <div class="message-body card-body"> <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> Posté le : ' + message.createdAt + ' </div> <p class="message-text">' + message.content + '</p></div>' +
                       
                       (id.userId === message.user.user_id ? '<div class="buttonModify d-flex justify-content-end m-2"><button id="putMessage" class="btn btn-primary" onclick=window.open("message.html?id=' + message.message_id + '","","toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,top=200,left=100,width=800,height=400")><i class="bi bi-pencil-square"></i></button></div></div>' : "");

                        document.getElementById("messagesList").innerHTML = html;
                        
                    }
                })
            });
        }).catch(function (err) {
            alert("Impossible d'afficher les fichiers !");
        });
}

getMessages();




function postMessage() {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userID")).token,
    };

    let message = {
        content: document.getElementById('content').value,
        user_id: JSON.parse(localStorage.getItem("userID")).userId
    }


    fetch('http://localhost:3000/api/messages/', {
        method: 'post',
        headers: headers,
        body: JSON.stringify(message),

        /*Récupère la réponse envoyée par l'API*/
    }).then(function (response) {
        if (response.status == 201) {

            response.json().then(function (data) {
                return getMessages();
            })
        }
    }).catch(function (err) {
        window.alert("Nom d'utilisateur ou mot de passe incorrect    !")
    });
}


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

    a.innerHTML = '<a href="account.html?id=' + id.userId + '"><button class="btn btn-outline-primary" type="button" id="userAccount"><i class="bi bi-person-square">  Profil</i></button></a>'
}
getProfile();

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
                /*Boucle for pour itérer les éléments*/
                images.forEach(image => {
                    console.log(image);
                    if (image.moderate === false) {
                        
                        html = html + '<div class="message-container"><div class="message-header card-header"><div class="d-flex align-items-center"><div class="mr-2"><a class="text-decoration-none" href="account.html?id=' + image.user.user_id + '"><img class="rounded-circle" height="50" width="50" src="' +  
                        
                        (image.user.image ? image.user.image : "images/img_avatar2.png")  + '" alt=""></div><div class="ml-2"><div class="h5 m-0">@' + image.user.username + '</div></div></div></div></div><div class="card-body"><div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> Posté le : ' + image.createdAt + '</div><a class="card-link" href="#"></a><h2 class="card-text">' + image.title + '</h2><img class="messageImage" src="' + image.image + '"></img></div>' + 
                        
                        (id.userId === image.user.user_id ?'<div id="modifyImage" class="modifyPost p-2"><button class="putImage btn btn-primary" onclick=window.open("image.html?id=' + image.messageMedia_id + '","","toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,top=200,left=100,width=800,height=400")><i class="bi bi-pencil-square"></i></button></div></div></div></div>' : "");
                        
                        document.getElementById("messagesList").innerHTML = html;

                     
                    }
                })
            });
        }).catch(function (err) {
            alert("Impossible d'afficher les fichiers !");
        });
}

getImages();

function postImage(){ 
const headers = {
    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userID")).token
};

    let userId =  JSON.parse(localStorage.getItem("userID")).userId
    let title = document.getElementById('title').value;
    let formData = new FormData();
    let image = document.getElementById('image').files[0];    
         
    formData.append("image", image);
    formData.append("title", title);
    formData.append("user_id", userId);
    

    fetch('http://localhost:3000/api/messagesMedia/', {
        method: 'post',
        headers: headers,
        body: formData,

        /*Récupère la réponse envoyée par l'API*/
    }).then(function (response) {
        if (response.status == 201) {
       
            response.json().then(function (data) {
                return getImages();
            })
        }
    }).catch(function (err) {
        window.alert("Image non envoyée !")
    });
}

function getUsers(){
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + id.token,
    };

    /*Va chercher l'adresse de l'API*/
    fetch("http://localhost:3000/api/users/", {
        method: 'get',
        headers: headers,
        /*Récupère la réponse envoyée par l'API*/
    }).then(
        function (response) {
            if (response.status == 200) {
                /*Réponse si fonctionne correctement*/
                response.json().then(function (users) {
                    let htmlAdmin = "";
                    let htmlUsers = "";
                   users.forEach(user => {
                        if (user.isAdmin === true) {
                            user.image ? htmlAdmin = htmlAdmin + '<li class="text-center"><a href="account.html?id=' + user.user_id + '"><img class="rounded-circle" height="50" width="50" src="' + user.image + '" alt=""> <div class="h5 m-0 text-left">@' + user.username + '</div></a></li>'
                            : htmlAdmin = htmlAdmin + '<li class="text-center"><a href="account.html?id=' + user.user_id + '"><img class="rounded-circle" height="50" width="50" src="images/img_avatar2.png" alt=""><div class="h5 m-0 text-left">@' + user.username + '</div></a></li>';

                            document.getElementById('adminList').innerHTML = htmlAdmin;
                        }else{
                        user.image ? htmlUsers = htmlUsers + '<li class="text-center"><a href="account.html?id=' + user.user_id + '"><img class="rounded-circle" height="50" width="50" src="' + user.image + '" alt=""><a href="account.html?"<div class="h5 m-0 text-left">@' + user.username + '</div></a></li>'
                        : htmlUsers = htmlUsers + '<li class="text-center"><a href="account.html?id=' + user.user_id + '"><img class="rounded-circle" height="50" width="50" src="images/img_avatar2.png" alt=""><div class="h5 m-0 text-left">@' + user.username + '</div></a></li>';
                        
                        document.getElementById('usersList').innerHTML = htmlUsers;
                    }
                    })
                });
            }
        }) .catch(function (err) {
            alert("Impossible d'afficher les utilisateurs !");
        });                          

}
getUsers();

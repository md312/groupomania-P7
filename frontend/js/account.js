let params = (new URL(document.location)).searchParams;
let userId = params.get("id");


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

function getUser() {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + id.token,
    };

    /*Va chercher l'adresse de l'API*/
    fetch("http://localhost:3000/api/users/" + userId, {
        method: 'get',
        headers: headers,
        /*Récupère la réponse envoyée par l'API*/
    }).then(
        function (response) {
            if (response.status == 200) {
                /*Réponse si fonctionne correctement*/
                response.json().then(function (user) {
                    let html = "";
                 
                       
                    html = html + '<div class=" profile-head px-4"><img class="profileImage rounded-circle" src="' + (user.image === null ? "images/img_avatar2.png" : user.image) + '" alt="image de profil"><h2 class="text-center"> @' + user.username + '</h2>' + (id.userId === user.user_id ? '<button onclick=window.open("accountModify.html?id=' + user.user_id + '","","toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,top=200,left=100,width=800,height=400") class="btn btn-outline-dark btn-sm btn-block mb-5" >Editer le profil</button></div>' : "");
                        
                    
                        document.getElementById("userProfile").innerHTML = html;
                    
             

                    let messages = "";
                    for (element in user.messages) {

                        id.userId === user.messages[element].user_id ? messages = messages + ' <div class="message-body card-body  bg-light mt-2"> <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> Posté le : ' + user.messages[element].createdAt + ' </div> <p class="message-text">' + user.messages[element].content + '</p><div class="buttonModify d-flex justify-content-end"><button id="putMessage" class="btn btn-primary" onclick=window.open("message.html?id=' + user.messages[element].message_id + '","","toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,top=200,left=100,width=800,height=400")><i class="bi bi-pencil-square"></i></button></div></div>' 

                        : messages = messages + ' <div class="message-body card-body bg-light mt-2"> <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> Posté le : ' + user.messages[element].createdAt + ' </div> <p class="message-text">' + user.messages[element].content + '</p></div>'
                        ;

                        document.getElementById("userMessages").innerHTML = messages;

                    }

                    let messagesMedia = "";
                    for (element in user.messagesMedia) {
                         
                        id.userId === user.messagesMedia[element].user_id ? messagesMedia = messagesMedia + '<div class="card-body  bg-light mt-2"><div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> Posté le : ' + user.messagesMedia[element].createdAt + '</div><a class="card-link" href="#"></a><h2 class="card-text">' + user.messagesMedia[element].title + '</h2><img class="messageImage" src="' + user.messagesMedia[element].image + '"></img><div id="modifyImage" class="modifyPost p-2"><button class="putImage btn btn-primary" onclick=window.open("image.html?id=' + user.messagesMedia[element].messageMedia_id + '","","toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,top=200,left=100,width=800,height=400")><i class="bi bi-pencil-square"></i></button></div>' 
                        
                        : messagesMedia = messagesMedia + '<div class="card-body  bg-light mt-2"><div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> Posté le : ' + user.messagesMedia[element].createdAt + '</div><a class="card-link" href="#"></a><h2 class="card-text">' + user.messagesMedia[element].title + '</h2><img class="messageImage" src="' + user.messagesMedia[element].image + '"></img></div>';

                        document.getElementById("userImages").innerHTML = messagesMedia;
                   
                    }


                    

                });


            }
        }).catch(function (err) {
            alert(err);
        });
}

getUser();


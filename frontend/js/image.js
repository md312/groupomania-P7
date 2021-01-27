let params = (new URL(document.location)).searchParams;
let imageName= params.get("id");

function tokenExpired() {
    if (localStorage.getItem("userID") === null) {
        window.location.replace("tokenExpired.html");
    }
}
tokenExpired();

const id = JSON.parse(localStorage.getItem("userID"));

function putImage(){
    const headers = {
        "Authorization": "Bearer " + id.token
    };

    let userId = JSON.parse(localStorage.getItem("userID")).userId
    let title = document.getElementById('title').value;
    let image = document.getElementById('image').files[0];
    let formData = new FormData();
    
    if (title === "" && image === undefined ){
        window.alert("Vous devez modifier le titre ou l'image! ")
        throw ("Aucune modification repérée ! ")

    } if(title === "" && image !== undefined) {
        window.alert("Vous devez insérer un titre ! ")
        throw ("Aucun titre repéré ! ")
    } if (title !== "" && image === undefined){
        formData.append("title", title);
        formData.append("user_id", userId);
    }else{

    formData.append("title", title);
    formData.append("image", image);
    formData.append("user_id", userId);
    }
    
    fetch('http://localhost:3000/api/messagesMedia/' + imageName, {
        method: 'put',
        headers: headers,
        body: formData,

        /*Récupère la réponse envoyée par l'API*/
    }).then(function (response) {
        if (response.status == 200) {

            response.json().then(function (data) {
                window.opener.location = "indexImages.html";
                window.self.close();
            })
        }
    }).catch(function (err) {
        window.alert("Image non modifiée !")
    });
}

function deleteImage(){
    const headers = {
        "Authorization": "Bearer " + id.token,
    };
    fetch('http://localhost:3000/api/messagesMedia/'+ imageName, {
        method: 'delete',
        headers: headers,
        /*Récupère la réponse envoyée par l'API*/
    }).then( response => {
        if (response.status == 204) {               
            window.opener.location = "indexImages.html";
            window.self.close();
         }
    }).catch(function (err) {
        window.alert("Erreur lors de la suppression de votre message !")
    });
}

let params = (new URL(document.location)).searchParams;
let messageName= params.get("id");

function tokenExpired() {
    if (localStorage.getItem("userID") === null) {
        window.location.replace("tokenExpired.html");
    }
}
tokenExpired();

const id = JSON.parse(localStorage.getItem("userID"));

function putMessage(){
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + id.token,
    };

    let message = {
        content: document.getElementById('content').value,
        user_id:  id.userId
    }

    if (message.content === ""){
        window.alert("Vous n'avez rien modifié !");
        throw ("Pas de contenu detecté! ");
    }

    fetch('http://localhost:3000/api/messages/'+ messageName, {
        method: 'put',
        headers: headers,
        body: JSON.stringify(message),

        /*Récupère la réponse envoyée par l'API*/
    }).then(function (response) {
        if (response.status == 200) {
       
            response.json().then( data => {
                window.opener.location = "index.html";
                window.self.close();
            })
        }
    }).catch(function (err) {
        window.alert("Erreur lors de la modification de votre message !")
    });
}


function deleteMessage(){
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + id.token,
    };



    fetch('http://localhost:3000/api/messages/'+ messageName, {
        method: 'delete',
        headers: headers,
        /*Récupère la réponse envoyée par l'API*/
    }).then( response => {
        if (response.status == 204) {               
            window.opener.location = "index.html";
            window.self.close();
         }
    }).catch(function (err) {
        window.alert("Erreur lors de la suppression de votre message !")
    });
}


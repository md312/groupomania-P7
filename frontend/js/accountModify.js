let params = (new URL(document.location)).searchParams;
let userId= params.get("id");


function tokenExpired() {
    if (localStorage.getItem("userID") === null) {
        window.location.replace("tokenExpired.html");
    }
}
tokenExpired();

const id = JSON.parse(localStorage.getItem("userID"));


function checkInput() {
    /*Toutes les Regex de contrôle à utiliser sur les formulaires*/
    let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;

    let checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
    /*Message lorsque le contrôle est terminé*/
    let checkMessage = "";

    /*Récupération des inputs*/

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    /*TEST DES INPUTS DU FORMULAIRE*/
    /*Test du nom => aucun chiffre ou charactère spécial permis*/
    if (username == "") {
        checkMessage = "Renseigner votre nom";
    };;
    /*Test du mail selon le regex Email*/
    if (checkMail.test(email) == false || email == "") {
        checkMessage = checkMessage + "\n" + "Renseigner votre email";
    };
    /*Test du téléphone selon le regex Phone*/
    if (checkPassword.test(password) == false || password == "") {
        checkMessage = checkMessage + "\n" + "Votre mot de passe doit contenir au minimum 8 caractères, à savoir :au moins une lettre minuscule et une lettre majuscule, un caractère spécial et un chiffre. ";
    };
    
    if (checkMessage != "") {
        alert("Il est nécessaire de :" + "\n" + checkMessage);
        return false;
    }
    return true;
};
  

function putUser(){
    if (checkInput() == true) {
    const headers = {
        "Authorization": "Bearer " + id.token,
    };

    let user = {
	  username: document.getElementById('username').value,
	  email : document.getElementById('email').value,
	  password: document.getElementById('password').value,
      image : document.getElementById('image').files[0],
    }
    let formData = new FormData();

    if(user.image === undefined){
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    }else{
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", user.image); 
    }   

    fetch('http://localhost:3000/api/users/update/'+ userId, {
        method: 'put',
        headers: headers,
        body: formData

        /*Récupère la réponse envoyée par l'API*/
    }).then(function (response) {
        if (response.status == 200) {
       
            response.json().then( data => {
                window.opener.location = "account.html?id=" + id.userId;
                window.self.close();               
            })
        }
    }).catch(function (err) {
        window.alert("Erreur lors de la modification de votre profil !")
    });
}
}

function deleteUser(){
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + id.token,
    };


    fetch('http://localhost:3000/api/users/delete/'+ userId, {
        method: 'delete',
        headers: headers,
        /*Récupère la réponse envoyée par l'API*/
    }).then( response => {
        if (response.status == 204) { 
            localStorage.clear();              
            window.opener.location = "signup.html";
            window.self.close();   
         }
    }).catch(function (err) {
        window.alert("Erreur lors de la suppression de votre compte !")
    });
}



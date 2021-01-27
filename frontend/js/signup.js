const headers = {
    "Content-Type": "application/json"
};

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
    let rePassword = document.getElementById('rePassword').value;

    /*TEST DES INPUTS DU FORMULAIRE*/
    /*Test du nom => aucun chiffre ou charactère spécial permis*/
    if (username == "") {
        checkMessage = "Renseigner votre nom d'utilisateur";
    };;
    /*Test du mail selon le regex Email*/
    if (checkMail.test(email) == false || email == "") {
        checkMessage = checkMessage + "\n" + "E-mail incorrect !";
    };
    /*Test du téléphone selon le regex Phone*/
    if (checkPassword.test(password) == false || password == "") {
        checkMessage = checkMessage + "\n" + "Votre mot de passe doit contenir au minimum 8 caractères, à savoir :au moins une lettre minuscule et une lettre majuscule, un caractère spécial et un chiffre. ";
    }
    
    if(password !== rePassword){
        checkMessage = checkMessage + "\n" + "Votre mot de passe n'est pas similaire !";
    };
    if (checkMessage != "") {
        alert("\n" + checkMessage);
        return false;
    }
    return true;
};


function signupUser() {
    
    if (checkInput() == true) {
    let user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

 


    fetch('http://localhost:3000/api/users/signup', {
        method: 'post',
        headers: headers,
        body: JSON.stringify(user),

        /*Récupère la réponse envoyée par l'API*/
    }).then(function (response) {
        if (response.status == 201) {
       
            response.json().then(function (data) {
                console.log(JSON.stringify(data));
                /*Envoie les informations renvoyées par l'API dans le sessionStorage*/
                localStorage.setItem("userID", JSON.stringify(data));
                /*Ouvre une fenêtre avec un Query Param basé sur l'id de commande*/
                window.location.replace("login.html");
            })
        }
    }).catch(function (err) {
        window.alert("Impossible d'afficher les fichiers !")
    });
}
}

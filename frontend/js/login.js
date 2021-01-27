const headers = {
    "Content-Type": "application/json"
};


function loginUser() {

    let user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    fetch('http://localhost:3000/api/users/login', {
        method: 'post',
        headers: headers,
        body: JSON.stringify(user),

        /*Récupère la réponse envoyée par l'API*/
    }).then(function (response) {
        if (response.status == 200) {
       
            response.json().then(function (data) {
                localStorage.clear();
                /*Envoie les informations renvoyées par l'API dans le sessionStorage*/
                localStorage.setItem("userID", JSON.stringify(data));
                /*Ouvre une fenêtre avec un Query Param basé sur l'id de commande*/
                window.open("index.html");
            })
        }
    }).catch(function (err) {
        window.alert("Nom d'utilisateur ou mot de passe incorrect !")
    });
}


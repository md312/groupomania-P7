const headers = {
    "Content-Type": "application/json"
};


// var  timerId;

// function throttleFunction(func, delay) {
// 	// If setTimeout is already scheduled, no need to do anything
// 	if (timerId) {
// 		return ('Timeout already scheduled !')
// 	}

// 	// Schedule a setTimeout after delay seconds
// 	timerId  =  setTimeout(function () {
//         func
//         console.log("fhfsfsd");
//    	// Once setTimeout function execution is finished, timerId = undefined so that in <br>
// 		// the next scroll event function execution can be scheduled by the setTimeout
// 		timerId  =  undefined;
//     }, delay)
  
// }


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

// throttleFunction(loginUser, 2000);    


function tokenExpired() {
    if (localStorage.getItem("userID") === null) {
        window.location.replace("tokenExpired.html");
    }
}
tokenExpired();


function logout(){
    localStorage.clear(),
    window.location.replace("login.html");
}
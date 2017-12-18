
var register = document.getElementById("register-user");

function login() {
    var xhttp = new XMLHttpRequest();

    var user = document.getElementById("name").value;
    var pass = document.getElementById("pass").value;

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.sessionStorage.accessToken = xhttp.getResponseHeader('access_token');
            window.location.assign(xhttp.getResponseHeader('Location'));
        } else if (this.readyState == 4 && this.status == 401) {
            alert("Unauthorized user");
            window.location.reload();
        }
    };
    xhttp.open("POST", "login", true);
    xhttp.withCredentials = true;
    xhttp.setRequestHeader('Authorization', 'Basic ' + btoa(`${user}:${pass}`));
    xhttp.send(); 
}

register.onclick = login;
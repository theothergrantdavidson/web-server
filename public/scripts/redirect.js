var test = document.getElementById("auth-test");

window.onload = function(e) {
    if (window.sessionStorage.getItem('accessToken') == null) {
        alert("You are currently not logged in");
        window.location.replace("http://127.0.0.1:3000/index.html");
    }
}

window.onbeforeunload = function(e) {
    window.sessionStorage.clear();
};
function test_func() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        }
        if (this.readyState == 4 && this.status == 401) {
            console.log("error");
            window.location.replace("http://127.0.0.1:3000/index.html");
        }
    };
    xhttp.open("GET", "auth", true);
    xhttp.withCredentials = true;
    xhttp.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('accessToken'));
    xhttp.send(); 
}

test.onclick = test_func;
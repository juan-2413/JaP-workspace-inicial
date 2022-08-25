function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btn-login").addEventListener('click', function(){
        let email = document.getElementById("email-user").value;
        let password = document.getElementById("password-user").value;
        let flagVar = true;

        if (email == '' || email.search('@') === -1) {
            flagVar = false;
            showAlertError();
        }

        if (password == '') {
            flagVar = false;
            showAlertError();
        }

        if(flagVar) {
            window.location.href = "home.html";
            localStorage.setItem("user", email);
        }



    })






})




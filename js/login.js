    var form = document.getElementById('needs-validation');
    var button = document.getElementById('btn-login');
    
        button.addEventListener('click', function (e) {
            var email = document.getElementById("email-user").value;
            
          if (form.checkValidity()) {
            window.location = "home.html";
            localStorage.setItem("user", email);
          } 

          form.classList.add('was-validated');
        })





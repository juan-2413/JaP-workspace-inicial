  document.addEventListener('DOMContentLoaded', ()=> {

    //Estructura que se encarga de insertar la imagen correspondiente en el perfil según si ya se aloja en el almacenamiento o no el src de una imagen cargada previamente.
    if(localStorage.getItem(`${localStorage.getItem('user')}_photo`) === null) {
      document.getElementById('perfil-photo').src = 'img/img_perfil.png'
    } else {
      document.getElementById('perfil-photo').src = localStorage.getItem(`${localStorage.getItem('user')}_photo`);
    }

          document.getElementById('email').value = localStorage.getItem('user'); //Se muestra el E-mail del usuario dentro del perfil al cargar la página.
          var form = document.getElementById('perfil-form'); // Formulario del perfil
          var button = document.getElementById('btn-perfil'); // Botón para "Guardar cambios"
          var inputs = [...form.querySelectorAll('.inputs-data')]; // Todos los inputs existentes del perfil (Nombre, Segundo nombre, Primer apellido, etc).


          button.addEventListener('click', function (e) {

            //Al hacer click en el button:
            //Se valida el formulario y en caso de que estén todos los datos correctos se guardan en el almacenamiento local y se carga la página.
            

            if(!form.checkValidity()) {
              e.preventDefault();
              e.stopPropagation();
              form.classList.add('was-validated');
              return;
            }  
  
            inputs.forEach((input)=> {
                localStorage.setItem(`${localStorage.getItem('user')}_${input.id}`, input.value)
            })
          })

          
          //Una vez se carga la página se muestran los inputs con los valores cargados.
          inputs.forEach((input)=>{
            if(localStorage.getItem(`${localStorage.getItem('user')}_${input.id}`) != null){
              input.value = localStorage.getItem(`${localStorage.getItem('user')}_${input.id}`);
            }
          })


          //Función que guarda el nuevo src de la imagen en el almacenamiento local y lo integra a la imagen predeterminada.
          function saveAndPutImage(e){
            var imageSource = e.target.result;
            localStorage.setItem(`${localStorage.getItem('user')}_photo`, imageSource)
            document.getElementById('perfil-photo').src = localStorage.getItem(`${localStorage.getItem('user')}_photo`);
          }

          //Función que realiza la lectura de la imagen mediante el objeto FileReader una vez se detecta el evento 'change' en el input del tipo file.
          function readImage(e) {
              var imagen = e.target.files[0];
              var lector = new FileReader();
              lector.readAsDataURL(imagen);
              lector.addEventListener('load', saveAndPutImage);

          }


          document.getElementById('formFile').addEventListener('change', readImage);
          
         

  })
        


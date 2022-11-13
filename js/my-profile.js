  document.addEventListener('DOMContentLoaded', ()=> {

          document.getElementById('email').value = localStorage.getItem('user'); //Se muestra el E-mail del usuario dentro del perfil al cargar la página.
          var form = document.getElementById('perfil-form'); // Formulario del perfil
          var button = document.getElementById('btn-perfil'); // Botón para "Guardar cambios"
          var inputs = [...form.querySelectorAll('input')]; // Todos los inputs existentes del perfil (Nombre, Segundo nombre, Primer apellido, etc).


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
  })
        


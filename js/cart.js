const USER_CART_URL = CART_INFO_URL + "25801" + EXT_TYPE; //URL DEL JSON DEL CARRITO DE COMPRAS DEL USUARIO 25801
var articles = JSON.parse(localStorage.getItem('cartArticles')); //OBJETO QUE CONTIENE LOS ARTICULOS AGREGADOS AL CARRITO GUARDADOS EN EL LOCALSTORAGE
var envio; //VARIABLE QUE GUARDA EL PORCENTAJE DEL TIPO DE ENVÍO SELECCIONADO
let USER_CART = []; //OBJETO DONDE SE GUARDAN TODOS LOS ARTICULOS UNA VEZ TERMINADO EL PROCESO DE LA FUNCION getJSONData.



function deliveryControl() {

  //ESTA FUNCION SE ENCARGA DE IMPRIMIR EN PANTALLA LOS APARTADOS DE DIRECCION DE ENVIO, TIPO DE ENVIO Y COSTO.
  //INTRODUCE LA PLANTILLA DE LOS APARTADOS DE DIRECCION DE ENVIO, TIPO DE ENVIO Y COSTO EN EL div#deliveryControl DEL ARCHIVO cart.html
  document.getElementById('deliveryControl').innerHTML =

    `
  <h2 class="mt-5 text-center text-md-start">Dirección de envío</h2>
  <hr class="my-4">
  
  <div class="container row row-cols-1 row-cols-lg-3 row-cols-sm-2 p-3">
    <div class="col-md-6 mb-3">
      <label for="streetInput" class="form-label">Calle</label>
      <input type="text" class="form-control" id="streetInput" required>
      <div class="valid-feedback">
      Perfecto!
      </div>
      <div class="invalid-feedback">
        Por favor, ingrese la calle de la localidad donde recibirá el envío.
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="callNumberInput" class="form-label">Número</label>
      <input type="text" class="form-control" id="callNumberInput" required>
      <div class="valid-feedback">
      Perfecto!
      </div>
      <div class="invalid-feedback">
        Por favor, ingrese el número de puerta.
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="streetDetailsInput" class="form-label">Esquina</label>
      <input type="text" class="form-control" id="streetDetailsInput" required>
      <div class="valid-feedback">
      Perfecto!
      </div>
      <div class="invalid-feedback">
        Por favor, ingrese la esquina de la localidad donde recibirá el envío.
      </div>
    </div>
    <div class="col-sm-12 col-md-6 mb-3 g-4 "> 
      <ul class="list-group">
        <div class="list-group-item justify-content-between align-items-center">
          <h2 class="fs-4 d-block">Tipo de envío</h2>
          <hr class="my-2"> 
          <div class="custom-control custom-radio">
            <input id="premiumRadioDelivery" name="deliveryType" type="radio" class="custom-control-input" checked="" required value="0.13">
            <label class="custom-control-label" for="premiumRadioDelivery">Premium 2 a 5 días (13%)</label>
          </div>
          <div class="custom-control custom-radio">
            <input id="expressRadioDelivey" name="deliveryType" type="radio" class="custom-control-input" required value="0.07">
            <label class="custom-control-label" for="expressRadioDelivey">Express 5 a 8 días (7%)</label>
          </div>
          <div class="custom-control custom-radio">
            <input id="standardRadioDelivery" name="deliveryType" type="radio" class="custom-control-input" required value="0.05">
            <label class="custom-control-label" for="standardRadioDelivery">Estándar 12 a 15 días (5%)</label>
          </div>
        </div>
      </ul>
    </div>
  </div>
  <div class="col-md-12 text-center text-md-start">
  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#compra" aria-controls="offcanvasRight">Comprar</button>
  </div>
  

<div class="offcanvas offcanvas-end" tabindex="-1" id="compra" aria-labelledby="offcanvasRightLabel" style="color:black !important">
  <div class="offcanvas-header">
    <h5 class="fs-3 m-auto" id="offcanvasRightLabel">Costos</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
  <div class="list-group">
  <a href="#" class="list-group-item rounded list-group-item my-3" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1 fs-4">Subtotal</h5>
      <small id="subtotalInner">**SUBTOTAL**</small>
    </div>
    <p class="mb-1">Costo total sin envío agregado.</p>
    <p class="mb-1"><small>Productos: <span class="badge bg-primary rounded-pill">${USER_CART.articles.length}</span></small></p>
  </a>
  <a href="#" class="list-group-item rounded list-group-item my-3" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1 fs-4">Costo de envío</h5>
      <small id="envio-inner">**ENVÍO**</small>
    </div>
    <p class="mb-1">Según el tipo de envío</p>
  </a>
  <a href="#" class="list-group-item rounded list-group-item my-3" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1 fs-4">Total</h5>
      <small id="total-inner">**TOTAL**</small>
    </div>
  </a>
  </div>
    <div class="col-md-12 m-auto">
      <a class="link-primary pe-auto" data-bs-toggle="modal" data-bs-target="#paymentModal" data-bs-whatever="@mdo">Selecciona forma de pago</a>
      <div class="valid-feedback">
      Perfecto!
      </div>
      <div class="invalid-feedback">
        Por favor, complete el formulario.
      </div>
    </div>
    <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="paymentModalLabel">Forma de pago</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <div class="mb-5">
          <input id="creditCard" name="payment" type="radio" class="custom-control-input" checked="" required value="creditCard">
          <label class="custom-control-label" for="creditCard">Tarjeta de crédito</label>
          <div class="valid-feedback">
          Perfecto!
          </div>
          <hr>
          <div class="mb-3 row row-cols-1 row-cols-lg-3 row-cols-sm-2 p-3">
            <div class="col-md-6 mb-3">
              <label for="CardNumber" class="form-label">Número de tarjeta</label>
              <input type="text" class="form-control" id="CardNumber" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" required>
              <div class="valid-feedback">
              Perfecto!
              </div>
              <div class="invalid-feedback">
                Por favor, ingrese el número de tarjeta.
              </div>
            </div>
            <div class="alert alert-success alert-dismissible fade" role="alert">
              <strong>Se ha realizado exitosamente la compra.</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div class="alert alert-danger alert-dismissible fade" role="alert">
              <strong>Al parecer no se han completados todos los campos. Verifique la forma de pago, dirección de envío o el número de productos a comprar</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div class="col-md-6 mb-3">
              <label for="secureCodeCard" class="form-label">Código de seguridad</label>
              <input type="text" class="form-control" id="secureCodeCard" required>
              <div class="valid-feedback">
              Perfecto!
              </div>
              <div class="invalid-feedback">
                Por favor, ingrese el código de seguridad de la tarjeta.
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="CardExpiration" class="form-label">Vencimiento (MM/AA)</label>
              <input type="datetime" class="form-control" id="CardExpiration" required>
              <div class="valid-feedback">
              Perfecto!
              </div>
              <div class="invalid-feedback">
                Por favor, ingrese la fecha de vencimiento de su tarjeta.
              </div>
            </div>
          </div>
          </div>
          <div class="mb-3">
          <input id="bankTransfer" name="payment" type="radio" class="custom-control-input" required value="bankTransfer">
          <label class="custom-control-label" for="bankTransfer">Transferencia bancaria</label>
          <div class="valid-feedback">
          Perfecto!
          </div>
          <hr>
            <div class="col-md-6 mb-3">
              <label for="bankNumberAccount" class="form-label">Número de cuenta</label>
              <input type="text" class="form-control" id="bankNumberAccount" required>
              <div class="valid-feedback">
              Perfecto!
              </div>
              <div class="invalid-feedback">
                Por favor, ingrese el número de su cuenta bancaria.
              </div>
            </div>
          </div>
      </div>
      <div class="modal-footer m-auto">
        <button type="submit" class="btn btn-primary">Finalizar compra</button>
      </div>
    </div>
  </div>
</div>  
  </div>
</div>
    `;
} 

function showUserCart(USER_CART) {
  //ESTA FUNCION SE ENCARGA DE MOSTRARLE AL USUARIO TODA LA INTERFAZ DEL CARRITO DE COMPRAS
  //EN LA VARIABLE cart SE GUARDA EL VALOR DE RETORNO DEL METODO REDUCE APLICADO SOBRE EL ARRAY GUARDADO EN EL CAMPO 'articles' DEL OBJETO USER_CART.
  //El REDUCE GUARDA EN EL acumulador INICIALIZADO EN '' LA PLANTILLA DE COMPRA(un elemento del array) Y RETORNA SU VALOR ACTUAL POR CADA ITERACIÓN.
  var cart = USER_CART["articles"].reduce((acumulador, compra, index) => {

    return acumulador +

      ` 
  <div class="table-responsive-sm bg-white rounded mb-5">
    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Nombre</th>
          <th scope="col">Costo</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table">
          <th scope="row">
            <img class="img-thumbnail img-fluid d-none d-md-block" style="width:7em" src="${compra.image}" alt="imagen de ${compra.name}">
            <a class="d-block d-md-none text-center" data-bs-toggle="modal" data-bs-target="#selector${compra.id}">ver imagen</a>
          </th>
          <td>${compra.name}</td>
          <td>${compra.currency} ${compra.unitCost}</td>
          <td class="col-2 tdata-input">
          <input class="form-control" type="number" placeholder="cant." min="1" name="userCount${index}" id="userCount${index}" value="${compra.count}" required>
          <div class="valid-feedback">
          Perfecto!
          </div>
          <div class="invalid-feedback cantidadFeedback">
            Ingrese una cantidad valida (${compra.count} max).
          </div>
          </td>
          <td class="tdata-subtotal">${compra.currency} ${parseInt(compra.count) * parseInt(compra.unitCost)}</td>
        </tr>
      </tbody>
    </table>
    <div class="modal fade" id="selector${compra.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${compra.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <img class="img-thumbnail" src="${compra.image}" alt="imagen de ${compra.name}">
          </div>
        </div>
      </div>
    </div>  
  </div>
`;
  }, '');

  //UNA VEZ TERMINADA CADA ITERACIÓN DEL METODO REDUCE SE INSERTA CART EN EL div#productbought DEL cart.html
  //LUEGO, LLAMA A LA FUNCIÓN deliveryControl.

  document.getElementById('productbought').innerHTML += cart;
  deliveryControl();
}

function showCartArticles() {
//ESTA FUNCION SE ENCARGA DE: 
//1)VALIDAR LA EXISTENCIA DE POSIBLES PRODUCTOS AGREGADOS AL CARRITO EN EL LOCALSTORAGE MEDIANTE UN CONDICIONAL IF, 
//2)ADAPTAR CADA ARTICULO EXISTENTE CREANDO CLAVES CON SUS RESPECTIVOS VALORES MEDIANTE UN forEach PARA QUE PUEDAN SER PASADOS COMO PARAMETRO EN LA FUNCION showUserCart SIN INCONVENIENTES,
//3)AGREGAR CADA ARTICULO DENTRO DEL ARRAY DEL CAMPO articles DEL OBJETO USER_CART CON EL METODO push,
//4)LLAMAR A LA FUNCION showUserCart Y PASARLE USER_CART COMO PARAMETRO PARA MOSTRAR LOS PRODUCTOS AÑADIDOS.

  if (articles != null ) { //1
    articles.articles.forEach(article => { //2
      article.unitCost = article.cost;
      article.image = article.images[0];
      article.count = 10;
      USER_CART.articles.push(article); //3
    });
  }
  showUserCart(USER_CART); //4
}

function CalcSubtotalEnvíoTotal(envio) {
//ESTA FUNCION SE ENCARGA DE:
//1) CALCULAR EL SUBTOTAL EN DOLARES QUE SE DEDUCE DE LA SUMA DE LOS SUBTOTALES DE CADA PRODUCTO.
//2) CALCULAR EL ENVIO EXPRESADO EN DOLARES
//3) CALCULAR EL TOTAL
//4) MOSTRAR LOS TRES VALORES EN PANTALLA
  let subtotales = document.querySelectorAll('.tdata-subtotal'); //SE GUARDA UN NodeList CON CADA td QUE TIENE COMO HIJO EL SUBTOTAL DEL PRODUCTO Y LA MONEDA.
  subtotales = [...subtotales]; //SE GUARDA EN UN ARRAY CADA ELEMENTO DEL NodeList.

  subtotales = subtotales.reduce((acumulador, subtotal) => {  //1)

    if (subtotal.firstChild.textContent.slice(0, 3) === 'USD') { //VERIFICA QUÉ MONEDA TIENE EL SUBTOTAL
      return acumulador + parseInt(subtotal.firstChild.textContent.slice(4)); //SI TIENE USD, SE CONVIERTE EN UN NUMERO EL TEXTO QUE CONTIENE EL td SIN INCLUIR LA MONEDA Y SE SUMA AL ACUMULADOR
    } else {
      return acumulador + (parseInt(subtotal.firstChild.textContent.slice(4)) / 41.05); //SE HACE EL PROCEDIMIENTO ANTERIOR PERO ESTA VEZ HACIENDO LA CONVERSION DE PERSOS A DOLARES
    }


  }, 0);
  
  //4)
  document.getElementById('subtotalInner').innerHTML = `USD ${Math.round(subtotales)}`
  document.getElementById('envio-inner').innerHTML = `USD ${Math.round(subtotales*envio)}` //2)
  document.getElementById('total-inner').innerHTML = `USD ${Math.round(subtotales + (subtotales*envio))}`; //3)

}

function CalcSubtotalesIndividuales() {
  //CALCULA LOS SUBTOTALES DE CADA PRODUCTO SEGÚN LA CANTIDAD ESTABLECIDA, EL SUBTOTAL DE LA COMPRA Y MODIFICA A AMBOS EN VIVO.

  let tdatas = document.querySelectorAll('td');    
  let inputsDeCantidad = document.querySelectorAll('td.tdata-input');

  inputsDeCantidad.forEach((tdata, index) => { 
    tdata.addEventListener('input', (e) => {
      
      
        let tdIndex = [...tdatas].indexOf(tdata) //POSICIÓN DEL tdata QUE ACTIVA EL EVENTO INPUT Y QUE SE UBICA DENTRO DEL ARRAY QUE CONTIENE TODOS LOS td QUE HAY EN LA PAGINA.
        let inputValue = parseInt(e.target.value); //VALOR DEL tdata QUE ACTIVA EL EVENTO INPUT.
        switch (true) {

          case inputValue !== '' && inputValue > 0:  
            var subtotal = `${USER_CART.articles[index].currency} ${inputValue * parseInt(USER_CART.articles[index].unitCost)}`; //CALCULO DEL SUBTOTAL DEL PRODUCTO AL QUE LE ESTOY MODIFICANDO LA CANTIDAD.
            document.getElementsByTagName("td")[tdIndex + 1].innerHTML = subtotal; //TENIENDO EN CUENTA QUE EL SUBTOTAL DE CADA PRODUCTO SE ENCUENTRA DENTRO DE UN tdata QUE ESTA EN UNA POSICIÓN MÁS ADELANTE A SU RESPECTIVO INPUT DE CANTIDAD, ...
            //SUMO tdIndex + 1 PARA QUE SE INSERTE EL NUEVO SUBTOTAL EN LA COLUMNA ADECUADA.
            break;
          default:
            subtotal = 0
            document.getElementsByTagName("td")[tdIndex + 1].innerHTML = `${USER_CART.articles[index].currency} ${subtotal}`;
            e.target.value = "";
        }

        CalcSubtotalEnvíoTotal(envio); //CALCULA NUEVAMENTE EL COSTO DE LA COMPRA.

    })
});


}

function envio() {
  //INICIALIZA LA VARIABLE envio CON EL VALOR DEL ATRIBUTO VALUE DEL INPUT RADIO QUE HAYA SIDO SELECCIONADO EN EL APARTADO DE TIPO DE ENVIO.
  //SE LLAMA A LA FUNCION CalcSubtotalDescTotal QUE RECIBE COMO PARAMETRO LA VARIABLE ENVIO CON SU VALOR ACTUAL Y MUESTRA EL SUBTOTAL, ENVIO Y TOTAL CON SUS VALORES ACTUALIZADOS.
  let inputsRadio = [...document.querySelectorAll('input[name="deliveryType"]')];

      inputsRadio.forEach((radio)=> {

        if (radio.checked) {
          envio = radio.value;
          CalcSubtotalEnvíoTotal(envio);
        }

        radio.addEventListener('input', ()=>{
          if (radio.checked) {
            envio = radio.value;
            CalcSubtotalEnvíoTotal(envio);
          }
        })
      });
}






document.addEventListener("DOMContentLoaded", function () {
  getJSONData(USER_CART_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      USER_CART = resultObj.data;
      showCartArticles();
      CalcSubtotalesIndividuales();
      envio();

     
    var modalInputs = [...document.getElementById('paymentModal').querySelectorAll('input')]; //TODOS LOS INPUT DEL MODAL
    let paymentType = [...document.getElementsByName('payment')];//LOS RADIOS PARA ELEGIR LA FORMA DE PAGO

    function disableBankOptions() {
      //DESACTIVA LOS INPUT DE TRANSFERENCIA BANCARIA (CUYOS ID CONTIENEN LA PALABRA bank).
      modalInputs.forEach((input) => {
        if(input.id.includes('bank') && input.type != 'radio') {
          input.disabled = true; 
          input.value = '';
        } else {
          input.disabled = false;
        }
      })   
    }

    function disableCardOptions() {
      //DESACTIVA LOS INPUT DE TARJETA DE CREDITO (CUYOS ID CONTIENEN LA PALABRA Card).
      modalInputs.forEach((input) => {
        if(input.id.includes('Card') && input.type != 'radio') {
          input.disabled = true;
          input.value = '';
        } else {
        input.disabled = false;
        }
    })
    }    

    function CheckValiditySeleccionDePago() {
      //VALIDA LA SELECCION DE PAGO MEDIANTE LA ADICION DE LAS CLASES is-valid E is-invalid SEGÚN ESTEN TODOS LOS CAMPOS DEL MODAL COMPLETOS O NO.
      if (modalInputs.every((input1)=> input1.checkValidity() === true)) {
        
        document.getElementsByClassName('link-primary')[0].classList.add('is-valid', 'link-success');
        document.getElementsByClassName('link-primary')[0].classList.remove('is-invalid', 'link-danger');
        
      } else {
        
        document.getElementsByClassName('link-primary')[0].classList.remove('is-valid', 'link-success');
        document.getElementsByClassName('link-primary')[0].classList.add('is-invalid', 'link-danger');
    
      }
    }

    paymentType.forEach((radio) => {

      disableBankOptions(); //DESACTIVA LOS INPUT DE TRANSFERENCIA AL RECARGAR LA PAGINA (DE FORMA PREDETERMINADA)

          radio.addEventListener('input', (e)=> {
             //DESACTIVA LOS INPUTS DE LA FORMA DE PAGO QUE NO ESTÉ SELECCIONADO EN VIVO
             if(radio.checked && radio.id.includes('Card')){
                disableBankOptions();

             }else if (radio.checked && radio.id.includes('bank')){
                disableCardOptions();
             }
          })
    });

      (function () {
        'use strict'
      
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation');
        // Loop over them and prevent submission

        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {

              CheckValiditySeleccionDePago(); //SE CHEQUEA LA VALIDEZ DE LA FORMA DE PAGO UNA VEZ SE HAGA EL SUBMIT.

              if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                document.getElementsByClassName('alert-danger')[0].classList.remove('show');
                document.getElementsByClassName('alert-danger')[0].classList.add('show');// SE MUESTRA ALERTA DE PELIGRO.
              } else {
                document.getElementsByClassName('alert-success')[0].classList.add('show');// SE MUESTRA ALERTA DE EXITO.
              }

              modalInputs.forEach((input) => {      
                input.addEventListener('input',() =>{
                  CheckValiditySeleccionDePago(); // SE CHEQUEA LA VALIDEZ DE LA FORMA DE PAGO EN VIVO.
                })
              })
              
              form.classList.add('was-validated');
            }, false)
          })
      })()
    }
  });
});



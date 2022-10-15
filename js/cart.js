const USER_CART_URL = CART_INFO_URL + "25801" + EXT_TYPE;
let USER_CART = [];


const deliveryControl = () => {

  

  document.getElementById('deliveryControl').innerHTML =

  `
  <h2 class="mt-5 d-block">Dirección de envío</h2>
  <hr class="my-4">
  <div class="container row row-cols-1 row-cols-lg-3 row-cols-sm-2 p-3">
    <div class="col-md-6 mb-3">
      <label for="streetInput" class="form-label">Calle</label>
      <input type="text" class="form-control" id="streetInput">
    </div>
    <div class="col-md-6 mb-3">
      <label for="callNumberInput" class="form-label">Número</label>
      <input type="text" class="form-control" id="callNumberInput">
    </div>
    <div class="col-md-6 mb-3">
      <label for="streetDetailsInput" class="form-label">Esquina</label>
      <input type="text" class="form-control" id="streetDetailsInput">
    </div>
    <div class="col-sm-12 col-md-12 col-lg-6 mb-3 g-4"> 
      <ul class="list-group">
        <div class="list-group-item justify-content-between align-items-center">
          <h2 class="fs-4 d-block">Tipo de envío</h2>
          <hr class="my-2"> 
          <div class="custom-control custom-radio">
            <input id="premiumRadioDelivery" name="deliveryType" type="radio" class="custom-control-input" checked="" required="">
            <label class="custom-control-label col-sm-6" for="premiumRadioDelivery">Premium 2 a 5 días (13%)</label>
          </div>
          <div class="custom-control custom-radio">
            <input id="expressRadioDelivey" name="deliveryType" type="radio" class="custom-control-input" required="">
            <label class="custom-control-label" for="expressRadioDelivey">Express 5 a 8 días (7%)</label>
          </div>
          <div class="custom-control custom-radio">
            <input id="standardRadioDelivery" name="deliveryType" type="radio" class="custom-control-input" required="">
            <label class="custom-control-label" for="standardRadioDelivery">Estándar 12 a 15 días (5%)</label>
          </div>
        </div>
      </ul>
    </div>
    <div class="col-md-12 text-center text-md-start">
      <button class="btn btn-primary">Comprar</button>
    </div>
  </div>
    `
} 


const showUserCart = (USER_CART) => {
USER_CART["articles"].reduce((acumulador, compra, index) => {

  acumulador +=



`
  <div class="table-responsive-sm bg-white rounded">
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
          <td class="col-2"><input class="form-control" type="number" placeholder="max ${compra.count}" name="userCount${index}" id="userCount${index}" value="${compra.count}"></td>
          <td>${compra.currency} ${parseInt(compra.count) * parseInt(compra.unitCost)}</td>
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



    document.getElementById('productbought').innerHTML = acumulador;


  }, '');

  deliveryControl();
}

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(USER_CART_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      USER_CART = resultObj.data;
      showUserCart(USER_CART);
      
      USER_CART.articles.forEach((element, index) => {
        let cantidadInput = document.getElementById(`userCount${index}`);
        
          cantidadInput.addEventListener("input", function () {
          switch (true) {
            case parseInt(cantidadInput.value) !== '' 
            && parseInt(cantidadInput.value) > 0
            && parseInt(cantidadInput.value) <= parseInt(element.count):  
              let total = `${element.currency}${parseInt(cantidadInput.value) * parseInt(element["unitCost"])}`;
              document.getElementsByTagName("td")[3].innerHTML = total;
              break;
            default:
              document.getElementsByTagName("td")[3].innerHTML = `${element.currency} ${0}`;
              cantidadInput.value = "";
          }
        })
      })
    } 
  });
});


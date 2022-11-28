const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function setProductID(id) {
  localStorage.setItem("ProductID", id);
  window.location = "product-info.html"
}

//Función para mostrar el menú desplegable
function showDropDownMenu(nickname) {

  if(nickname == null) {
    nickname= 'Anónimo';
  }

  document.getElementsByClassName("nav-item")[3].innerHTML =  

  `<li class="dropdown">  
      <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        ${nickname}
      </a>
      <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
        <li><a class="dropdown-item" href="./cart.html">Mi carrito</a></li>
        <li><a class="dropdown-item" href="./my-profile.html">Mi perfil</a></li>
        <li><a onclick="localStorage.removeItem('user')" class="dropdown-item" href="./index.html">Cerrar sesión</a></li>
      </ul>
  </li>`

}

document.addEventListener("DOMContentLoaded", function() {

    //Si un usuario que no ha iniciado sesión intenta entrar al perfil, será redireccionado al login.
  if (localStorage.getItem("user") == null && !window.location.href.includes('home.html')) { 
    window.location = 'index.html'
  }

  showDropDownMenu(localStorage.getItem('user'))

});
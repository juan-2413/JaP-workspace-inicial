let ProductInfo = [];
let Comments = [];
let Comment_id = localStorage.getItem("ProductID"); //Variable que será la clave donde se guarde el contenido del comentario realizado(valor) en el localStorage.
let score = 0; // Variable que almacena el puntaje que seleccione el usuario.
let Comment_Storaged = ''; //Variable donde se guarda el contenido del comentario.
let hoy = new Date();
let fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2); //Fecha actual
let hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2) + ':' + ('0' + hoy.getSeconds()).slice(-2); //Hora actual
let fechaYhora = fecha + ' ' + hora // Combinación de fecha y hora.
const PRODUCT_INFO_URL_MODIFY = `${PRODUCT_INFO_URL}${localStorage.getItem("ProductID")}${EXT_TYPE}`;
const PRODUCT_INFO_URL_COMMENTS_MODIFY = `${PRODUCT_INFO_COMMENTS_URL}${localStorage.getItem("ProductID")}${EXT_TYPE}`;

function setProductID(id) {
  localStorage.setItem("ProductID", id);
  window.location = "product-info.html"
}

function showProductInfo(ProductInfo) {
  let Box_Content = document.getElementsByTagName("main")[0]

  Box_Content.innerHTML = `
    
    <div class="p-4">
      <h2 class="mb-5">${ProductInfo.name}</h2> 
      <hr class="my-4">
    </div>

    <div class="col">
      <ul>
        <li class="list-group">
          <p class="mb-1 fw-bold">Precio</p>
          <p>${ProductInfo.currency} ${ProductInfo.cost}</p>
        </li>
        <li class="list-group">
          <p class="mb-1 fw-bold">Descripción</p>
          <p>${ProductInfo.description}</p>
        </li>
        <li class="list-group">
          <p class="mb-1 fw-bold">Categoría</p>
          <p class>${ProductInfo.category}</p>
        </li>
        <li class="list-group">
          <p class="mb-1 fw-bold">Cantidad de vendidos</p>
          <p class>${ProductInfo.soldCount}</p>
        </li>
        <li class="list-group">
          <p class="mb-1 mt-4 fw-bold">Imagenes ilustrativas</p> 

          <div id="carouselProducts" class="carousel slide" data-bs-touch="true" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselProductIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselProductIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselProductIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselProductIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
          </div>
           <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="2000">
              <img src="${ProductInfo.images[0]}" class="d-block w-100" alt="imagen 1">
            </div>
           </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselProducts" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselProducts" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </li>
      </ul>
    </div>`;

  for (let i = 1; i < ProductInfo.images.length; i++) {
    let image_inner = ProductInfo.images[i]
      
    document.getElementsByClassName('carousel-inner')[0].innerHTML += `

      <div class="carousel-item" data-bs-interval="2000">
        <img src="${image_inner}" class="d-block w-100" alt="imagen 2">
      </div> `;

  }

}


function showComments(Comments) {

  let htmlContentToAppend = '';
  document.getElementById('comments-box').innerHTML = ` <h4 class="mt-4">Comentarios</h4><ul class="list-group mb-3" id="comments-list"></ul>`

  if (Comments.length != 0) {
    for (let i = 0; i < Comments.length; i++) {

      let comment = Comments[i];
      htmlContentToAppend += `

            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div class="flex-row justify-content-between">
                <h6 class="my-0 fw-bold" id="star-content">${comment.user}<small class="fw-normal"> - ${comment.dateTime} - </small> ${'<span class="fas fa-star checked"></span>'.repeat(comment.score)}${'<span class="fas fa-star void"></span>'.repeat(5 - Comments[i].score)}</h6> 
                <small class="text-muted">${comment.description}</small>
              </div>
            </li> `;

    }

    document.getElementById('comments-list').innerHTML += htmlContentToAppend;

  } else {

    if (localStorage.getItem(`${Comment_id}`) == null) {

      document.getElementById('comments-list').innerHTML += `<p>Aún no hay comentarios para este producto. Se el primero en comentar!</p> `

    }

  }

  if(localStorage.getItem(`${Comment_id}`) != null){

    document.getElementById('comments-list').innerHTML += localStorage.getItem(`${Comment_id}`);

  }
}




function ShowRelatedProducts(ProductInfo) {

  let htmlContentToAppend ='';

  if (ProductInfo.relatedProducts.length != 0) {

      htmlContentToAppend += 

      `  
<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner carousel-inner2">
    <div class="carousel-item active" data-bs-interval="2000">
     <img onclick="setProductID(${ProductInfo.relatedProducts[0].id})" style="cursor:pointer;" src="${ProductInfo.relatedProducts[0].image}" class="card-img-top" alt="relatedProduct">
    <div class="card-body">
     <h5 class="card-title text-center">${ProductInfo.relatedProducts[0].name}</h5>
     </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      
      `;

      document.getElementById('relatedProducts').innerHTML += htmlContentToAppend

    for (let i = 1; i < ProductInfo.relatedProducts.length; i++) {
      let image_inner = ProductInfo.relatedProducts[i]
        
      document.getElementsByClassName('carousel-inner2')[0].innerHTML += `
      
      <div class="carousel-item" data-bs-interval="2000">
       <img onclick="setProductID(${image_inner.id})" src="${image_inner.image}" style="cursor:pointer;" class="card-img-top" alt="relatedProduct">
        <div class="card-body">
        <h5 class="card-title text-center">${image_inner.name}</h5>
        </div>
      </div>
      `
    }
      
    } else {


      document.getElementById('relatedProducts').innerHTML +=`<p>No hay productos relacionados</p> `

    }    

  }
  





document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(PRODUCT_INFO_URL_MODIFY).then(function (resultObj) {
    if (resultObj.status === "ok") {
      ProductInfo = resultObj.data;
      showProductInfo(ProductInfo);
      ShowRelatedProducts(ProductInfo);

      getJSONData(PRODUCT_INFO_URL_COMMENTS_MODIFY).then(function (resultObj) {
        if (resultObj.status === "ok") {
          Comments = resultObj.data;
          showComments(Comments);
          

        }


      })

      for (let i = 1; i <= 5; i++) {
        let num = i;

        document.getElementById(`rate-${num}`).addEventListener('click', function(){

          score = num;

          if (document.getElementById(`rate-${num}`).checked) {

        
            for (let i = (num - 1); i != -1; i--) {
                
              document.getElementsByTagName('label')[i].classList.add('checked');
              
            }

            for (let i = (num); i < document.getElementsByTagName('label').length; i++) {
                
              document.getElementsByTagName('label')[i].classList.remove('checked');
              
            }

          }  

        })
        
      }




      document.getElementById('reload-rate').addEventListener('click', function(){

        for (let i = 0; i < document.getElementsByTagName('label').length; i++) {
          let star = document.getElementsByTagName('label')[i];

          score = 0;
          star.classList.remove('checked')
          document.getElementsByTagName('textarea')[0].value = ''
          
        }

      })






      document.getElementById('submitComment').addEventListener('click', function(){ //Escucha de evento para mostrar el comentario hecho en pantalla

          Comment_Storaged += `

        <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div class="flex-row justify-content-between">
                <h6 class="my-0 fw-bold" id="star-content">${localStorage.getItem('user')}<small class="fw-normal"> - ${fechaYhora}- </small> ${'<span class="fas fa-star checked"></span>'.repeat(parseInt(score))}${'<span class="fas fa-star void"></span>'.repeat(5 - parseInt(score))}</h6> 
                <small class="text-muted">${document.getElementsByTagName('textarea')[0].value}</small>
              </div>
            </li> `;

        if (localStorage.getItem(`${Comment_id}`) == null) {

          localStorage.setItem(`${Comment_id}`, Comment_Storaged);
          location.reload();

        } else {

          localStorage.setItem(`${Comment_id}`, localStorage.getItem(`${Comment_id}`) + Comment_Storaged) 
          location.reload();

        }

        

      })

    }

  }) 

})

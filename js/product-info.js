let ProductInfo = [];
let Comments = [];
let score = undefined
const PRODUCT_INFO_URL_MODIFY = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("ProductID")}${EXT_TYPE}`;
const PRODUCT_INFO_URL_COMMENTS_MODIFY = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("ProductID")}${EXT_TYPE}`;


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

    document.getElementById('comments-list').innerHTML += `<p>Aún no hay comentarios para este producto. Se el primero en comentar!</p> `

  }

}




document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(PRODUCT_INFO_URL_MODIFY).then(function (resultObj) {
    if (resultObj.status === "ok") {
      ProductInfo = resultObj.data;
      showProductInfo(ProductInfo);

      getJSONData(PRODUCT_INFO_URL_COMMENTS_MODIFY).then(function (resultObj) {
        if (resultObj.status === "ok") {
          Comments = resultObj.data;
          showComments(Comments);

        }


      })

      for (let i = 1; i <= 5; i++) {
        let num = i;

        document.getElementById(`rate-${num}`).addEventListener('click', function(){

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

          star.classList.remove('checked')
          document.getElementsByTagName('textarea')[0].value = ''
          
        }

      })

    }

  }) 

})

let CategoryProducts = [];
const CAT_PRODUCTS = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") +  ".json";

function showProductsList() {
    let htmlContentToAppend = '<div class="text-center p-4"> <h2>Productos</h2> <p class="lead">Verás aquí todos los productos de la categoría '+ CategoryProducts.catName+ '.</p> </div> ';
    
    for (let i = 0; i < CategoryProducts.products.length; i++) {
        let product = CategoryProducts.products[i];
        htmlContentToAppend += `

     <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active"> 
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency}${product.cost} </h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
    </div>
   
            `
    }
       document.getElementsByTagName("main")[0].innerHTML = htmlContentToAppend;
      
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CAT_PRODUCTS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            CategoryProducts = resultObj.data;
            showProductsList(CategoryProducts);
        }


    });
});



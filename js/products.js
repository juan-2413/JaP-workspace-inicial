let CategoryProducts = [];
const CAT_PRODUCTS = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json";
const ORDER_ASC_BY_PRIZE = "x$-0$";
const ORDER_DESC_BY_PRIZE = "0$-x$";
const ORDER_BY_SOLD_COUNT = "Cant.";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let buscando = undefined;




function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRIZE) {
        result = array.sort(function (a, b) {
            if (parseInt(a.cost) < parseInt(b.cost)) { return 1; }
            if (parseInt(a.cost) > parseInt(b.cost)) { return -1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRIZE) {
        result = array.sort(function (a, b) {
            if (parseInt(a.cost) > parseInt(b.cost)) { return 1; }
            if (parseInt(a.cost) < parseInt(b.cost)) { return -1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}



function showProductsList() {

    document.getElementById("products-head").innerHTML = 'Verás aquí todos los productos de la categoría ' + CategoryProducts.catName + '.';
   
    let htmlContentToAppend = '';
    for (let i = 0; i < CategoryProducts.products.length; i++) {
        let product = CategoryProducts.products[i];
        console.log("For")
        
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) && 
            ((buscando === undefined) || (product.name.search(buscando) > -1) || (product.description.search(buscando) > -1) || (buscando ==''))) {
        
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
        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    }
}

 
function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    CategoryProducts.products = sortCategories(currentSortCriteria, CategoryProducts.products);

    showProductsList();
}





document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CAT_PRODUCTS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            CategoryProducts = resultObj.data;
            showProductsList();
        }

      
        document.getElementById("sortAsc").addEventListener("click", function(){
            sortAndShowCategories(ORDER_ASC_BY_PRIZE);
        });
    
        document.getElementById("sortDesc").addEventListener("click", function(){
            sortAndShowCategories(ORDER_DESC_BY_PRIZE);
        });
    
        document.getElementById("sortByCount").addEventListener("click", function(){
            sortAndShowCategories(ORDER_BY_SOLD_COUNT);
        });
    
        document.getElementById("clearRangeFilter").addEventListener("click", function(){
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";
    
            minCount = undefined;
            maxCount = undefined;
    
            showProductsList();
        });
    
        document.getElementById("rangeFilterCount").addEventListener("click", function(){
          
            minCount = document.getElementById("rangeFilterCountMin").value;
            maxCount = document.getElementById("rangeFilterCountMax").value;
    
            if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
                minCount = parseInt(minCount);
            }
            else{
                minCount = undefined;
            }
    
            if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
                maxCount = parseInt(maxCount);
            }
            else{
                maxCount = undefined;
            }
    
            showProductsList();
        });

        document.getElementById('search-btn').addEventListener('click', function(){
            document.getElementById('search-input').focus();


        }) 

        document.getElementById('search-input').addEventListener('focusin', function() {

            document.getElementById('search-input').addEventListener('input', function() { 
            
                buscando = document.getElementById('search-input').value
                showProductsList();
   
           })
        })
    });
});

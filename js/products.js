let CategoryProducts = [];
const CAT_PRODUCTS = `${PRODUCTS_URL}${localStorage.getItem("catID")}${EXT_TYPE}`;
const ORDER_ASC_BY_PRICE = "x$-0$";
const ORDER_DESC_BY_PRICE = "0$-x$";
const ORDER_BY_SOLD_COUNT = "Cant.";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let buscando = undefined;


//Función que recibe un criterio de ordenación y un array como parámetro. 
//Se ordenan los elementos del array según el criterio establecido mediante el método sort y se retorna la lista ordenada.
function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (parseInt(a.cost) < parseInt(b.cost)) { return 1; }
            if (parseInt(a.cost) > parseInt(b.cost)) { return -1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
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

//Función que elimina los tildes de un string y lo retorna.
function quitarAcento(string) {
    return string.normalize("NFD").replace(/\u0301/g, "");
} 

//Filtra y muestra los productos.
function showProductsList() {
    
    let htmlContentToAppend = '';
    for (let i = 0; i < CategoryProducts.products.length; i++) {

        
        let product = CategoryProducts.products[i]; //producto del array
        let superString = product.name.toLowerCase() + product.description.toLowerCase(); //suma de el nombre y la descripción del producto en minúscula.
        let superStringJoined = quitarAcento(superString.split(' ').join('')); // superString sin espacios y sin acentos


            //Se filtran los productos.
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) &&
            (buscando === undefined || superStringJoined.includes(quitarAcento(buscando.split(' ').join(''))))) {   
            
            
            htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active"> 
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1 fw-normal">${product.name} - ${product.currency}${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("products-head").innerHTML = `Verás aquí todos los productos de la categoría ${CategoryProducts.catName}.`;
        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que ordena y muestra los productos.
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        CategoryProducts.products = productsArray;
    }

    CategoryProducts.products = sortCategories(currentSortCriteria, CategoryProducts.products);
    
    showProductsList();
}

document.addEventListener("DOMContentLoaded", e => {

    getJSONData(CAT_PRODUCTS).then((resultObj) => {
        if (resultObj.status === "ok") {
            CategoryProducts = resultObj.data;
            showProductsList();
        }

        document.getElementById("sortAsc").addEventListener("click", e => sortAndShowProducts(ORDER_ASC_BY_PRICE));

        document.getElementById("sortDesc").addEventListener("click", e => sortAndShowProducts(ORDER_DESC_BY_PRICE));

        document.getElementById("sortByCount").addEventListener("click", e => sortAndShowProducts(ORDER_BY_SOLD_COUNT));

        document.getElementById("clearRangeFilter").addEventListener("click", e => {

            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";

            
            minCount = undefined;
            maxCount = undefined;

            
            showProductsList();
        });

        document.getElementById("rangeFilterCount").addEventListener("click", e => {

            minCount = document.getElementById("rangeFilterCountMin").value;
            maxCount = document.getElementById("rangeFilterCountMax").value;

            if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
                minCount = parseInt(minCount);
            }
            else {
                minCount = undefined;
            }

            if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
                maxCount = parseInt(maxCount);
            }
            else {
                maxCount = undefined;
            }

            showProductsList();
        });
    
        document.getElementById('search-input').addEventListener('input', e => {

            buscando = document.getElementById('search-input').value //Sobreescribe el valor de la variable "buscando" por el texto que escriba el usuario.
            buscando = buscando.toLowerCase();
            showProductsList();
        })

    });
});

let CategoryProducts = [];
const CAT_PRODUCTS = `${PRODUCTS_URL}${localStorage.getItem("catID")}${EXT_TYPE}`;
const ORDER_ASC_BY_PRICE = "x$-0$";
const ORDER_DESC_BY_PRICE = "0$-x$";
const ORDER_BY_SOLD_COUNT = "Cant.";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

let buscando = undefined;


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

function setProductID(id) {
    localStorage.setItem("ProductID", id);
    window.location = "product-info.html"
}


function showProductsList() {

    document.getElementById("products-head").innerHTML = 'Verás aquí todos los productos de la categoría ' + CategoryProducts.catName + '.';

    
    let htmlContentToAppend = '';
    for (let i = 0; i < CategoryProducts.products.length; i++) {

        
        let product = CategoryProducts.products[i];
        let name_lowerCase = product.name.toLowerCase(); //Nombre del producto en minúscula
        let description_lowerCase = product.description.toLowerCase(); //Descripción del producto en minúscula
        let name_without_spaces = name_lowerCase.split(' ').join(''); //Nombre del producto en minúscula y sin espacios
        let description_without_spaces = description_lowerCase.split(' ').join(''); //Descripción del producto en minúscula y sin espacios 
       
        

       
       
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) &&

            //CONJUNTO DE CONDICIONES QUE FILTRAN LOS PRODUCTOS SEGÚN LO QUE ESCRIBA EL USUARIO EN EL INPUT SEARCH
            
            //Nota: Cuando el usuario escribe en el input search, dicho texto será guardado en la variable "buscando" como un string y su valor se actualizará a medida que el texto insertado vaya cambiando.
            
            ((buscando === undefined) || 
            (name_lowerCase.search(buscando) > -1) || 
            (name_without_spaces.search(buscando.split(' ').join('')) > -1) || 
            (quitarAcento(name_without_spaces).search(quitarAcento(buscando.split(' ').join(''))) > -1) || 
            (description_lowerCase.search(buscando) > -1) || 
            (description_without_spaces.search(buscando.split(' ').join('')) > -1) || 
            (quitarAcento(description_without_spaces).search(quitarAcento(buscando.split(' ').join(''))) > -1) || 
            (buscando == ''))) {   
            
            
            htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active"> 
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


function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        CategoryProducts.products = productsArray;
    }

    CategoryProducts.products = sortCategories(currentSortCriteria, CategoryProducts.products);
    
    showProductsList();
}

 //Función que elimina los tildes contenidos en el string recibido por parámetro. Emplea la normalización NFD para adquirir cada carácter del string codificado en unicode por separado y utiliza el método replace que recibe como parámetro una expresión regular correspondiente al "acento agudo" codificado en unicode junto con el flag g para encontrar todos los tildes existentes y un string vacío el cual sustituirá cada uno de ellos.

function quitarAcento (string) {
    return string.normalize("NFD").replace(/\u0301/g, "");
  } 



document.addEventListener("DOMContentLoaded", function (e) {



    getJSONData(CAT_PRODUCTS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            CategoryProducts = resultObj.data;
    
            showProductsList();
        }


        document.getElementById("sortAsc").addEventListener("click", function () {
            sortAndShowProducts(ORDER_ASC_BY_PRICE);
        });

        document.getElementById("sortDesc").addEventListener("click", function () {
            sortAndShowProducts(ORDER_DESC_BY_PRICE);
        });

        document.getElementById("sortByCount").addEventListener("click", function () {
            sortAndShowProducts(ORDER_BY_SOLD_COUNT);
        });

        document.getElementById("clearRangeFilter").addEventListener("click", function () {
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";

            
            minCount = undefined;
            maxCount = undefined;

            location.reload(); //recarga la pagina.
            showProductsList();
        });

        document.getElementById("rangeFilterCount").addEventListener("click", function () {

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

        
        document.getElementById('search-btn').addEventListener('click', function () {
            document.getElementById('search-input').focus();

            //Escucha de evento cuyo fin es hacer que el search quede focus una vez el usuario haga click en el botón-lupa. 

        })

        document.getElementById('search-input').addEventListener('focus', function () {

            //Cuando el search esté focus y por ende se haya escuchado su respectivo evento, se escuchará el evento input una vez el usuario escriba el primer carácter en el buscador.

            document.getElementById('search-input').addEventListener('input', function () {

                buscando = document.getElementById('search-input').value //Sobreescribe el valor de la variable "buscando" por el texto que escriba el usuario.

                buscando = buscando.toLowerCase();

                showProductsList();
            })

        })

        
           

    });
});

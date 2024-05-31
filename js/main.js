var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productImageInput = document.getElementById("productImage");
var productSaleInput = document.getElementById("productSale");
var productDescInput = document.getElementById("productDescription");
var productCategoryInput = document.getElementById("productCategory");
var addBtnInput = document.getElementById("addBtn");
var updateBtnInput = document.getElementById("updateBtn");
var searchInput = document.getElementById("search");
var currentIndex = 0;
var foundName = document.querySelector('.foundName')

var productList = [];
if(localStorage.getItem("productList") != null){
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProduct();
}

function addProduct(){
    let nameList = productList.filter((el)=>{
        return el.name == productNameInput.value;
    })
    if(nameList.length == 0){
        if(priceValid() == true){
            var product = {
                name : productNameInput.value,
                price : Number(productPriceInput.value),
                image : productImageInput.files[0].name,
                sale : productSaleInput.checked,
                desc : productDescInput.value,
                category : productCategoryInput.value,
            }
            productList.push(product);
            localStorage.setItem("productList", JSON.stringify(productList));
            displayProduct();
            clearForm();
        }
    }
    else{
        foundName.classList.remove('d-none');
    }
}

function displayProduct(){
    var cartoona = ``;
    for(var i=0 ; i<productList.length; i++){
        cartoona += `
        <div class="col-md-3">
            <div class="border text-center border-info">
                <img height="200" src="images/${(productList[i].image)? productList[i].image : '1.jpg'}" class="w-100" alt="">
                <h5 class="mt-4">Name : `+productList[i].name+`</h5>
                <h5 class="my-2 ${(productList[i].price > 5000) ? 'text-danger' : 'text-info'}" >Price : `+productList[i].price+`</h5>
                <h5 class="text-success">Category : `+productList[i].category+`</h5>
                <h6 class="my-2 text-danger">${productList[i].sale ? 'Sale' : 'No Sale'}</h6>
                <h6 class="mb-4">`+productList[i].desc+`</h6>
                <button onclick="setData(`+i+`)" class="btn btn-outline-warning mb-3">Update</button>
                <button onclick="deleteProduct(`+i+`)" class="btn btn-outline-danger mb-3">delete</button>
            </div>
        </div>
    `
    }
    document.getElementById("myRow").innerHTML = cartoona;
}

function deleteProduct(index){
    productList.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct();
}

function setData(index){
    currentIndex = index;
    productNameInput.value = productList[index].name;
    productPriceInput.value = productList[index].price;
    productSaleInput.checked = productList[index].sale;
    productDescInput.value = productList[index].desc;
    productCategoryInput.value = productList[index].category;
    addBtnInput.classList.add("d-none");
    updateBtnInput.classList.remove("d-none");
}

function updateProduct(){
    addBtnInput.classList.remove("d-none");
    updateBtnInput.classList.add("d-none");
    productList[currentIndex].name = productNameInput.value;
    productList[currentIndex].price = Number(productPriceInput.value);
    productList[currentIndex].sale = productSaleInput.checked;
    productList[currentIndex].desc = productDescInput.value;
    productList[currentIndex].category = productCategoryInput.value;
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct();
    clearForm();
}

function clearForm(){
    productNameInput.value = "";
    productPriceInput.value = "";
    productImageInput.value = "";
    productSaleInput.checked = "";
    productDescInput.value = "";
    // productCategoryInput.value = "";
    productNameInput.classList.remove("is-invalid");
    productNameInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-invalid");
    productPriceInput.classList.remove("is-valid");
}

function search(){
    var searchWord = searchInput.value;
    var cartoona = ``;
    for(var i=0 ; i<productList.length; i++){
        if(productList[i].name.toLowerCase().includes(searchWord.toLowerCase())){
        //    cartoona = productList.filter((el)=> {
        //         return el.name.toLowerCase() === searchWord.toLowerCase()
        //     }) 
            cartoona += `
                    <div class="col-md-3">
                        <div class="border text-center border-info">
                            <img height="200" src="images/`+productList[i].image+`" class="w-100" alt="">
                            <h5 class="mt-4">Name : `+productList[i].name.replace(searchWord, `<span class="bg-warning">${searchWord}</span>`)+`</h5>
                            <h5 class="my-3 ${productList[i].price > 5000 ? 'text-danger': 'text-info'}">Price : `+productList[i].price+`</h5>
                            <h5 class="text-success"> Category : `+productList[i].category+`</h5>
                            <h6 class="my-3 ${productList[i].sale ? 'text-info':'text-danger'}">${productList[i].sale? 'Sale' : 'No sale'}</h6>
                            <h6 class="mb-4">`+productList[i].desc+`</h6>
                            <button onclick="setData(`+i+`)" class="btn btn-outline-warning mb-3">Update</button>
                            <button onclick="deleteProduct(`+i+`)" class="btn btn-outline-danger mb-3">delete</button>
                        </div>
                    </div>
                 `
        }
    }
    document.getElementById("myRow").innerHTML = cartoona;
}


productNameInput.addEventListener("change", nameValid)

function nameValid(){
    regexName = /^[a-z]+[0-9]{0,5}$/;
   if(regexName.test(productNameInput.value))
    {
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        document.querySelector(".name").classList.add("d-none");
        return true;
    }
    else{
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        document.querySelector(".name").classList.remove("d-none");
        return false;
    }
}

productPriceInput.addEventListener("change", priceValid)

function priceValid(){
    regexPrice = /^([1-9][0-9]{1,5}|1000000)$/;
    if(regexPrice.test(productPriceInput.value)){
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        document.querySelector(".price").classList.add("d-none");
        return true;
    }
    else{
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        document.querySelector(".price").classList.remove("d-none");
        return false;
    }
}

var icon = document.querySelector('.icon');
icon.addEventListener("click", ()=>{
    productList.sort((a,b)=> {
       return a.price - b.price;
    })
    displayProduct();
    console.log('hello');
})



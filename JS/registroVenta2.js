// ============================= VARIABLES ======================
const userActiveUI = document.querySelector('#user-active');
const listaProductosUI = document.querySelector('#list-products');
const formUI = document.querySelector('form');
const searchTermUI = document.querySelector('#search-input');
const productPriceUI = document.querySelector('#inputPriceUI');
const productCantUI = document.querySelector('#inputCantUI');
const inputsUI = document.querySelectorAll('input');
const listaVentaProductosUI = document.querySelector('#list-products-sale');
const productsList = localStorage.getItem('productos') ? JSON.parse(localStorage.getItem('productos')) : [];
const listaVentas = localStorage.getItem('ventas-realizadas') ? JSON.parse(localStorage.getItem('ventas-realizadas')) : []
let productSaleList = [];
let productsFilter = [];
let productModel = {};
let paramProductRute = null
let indexProductEdit = null;
// ============================ FUNCIONES =======================


/* -------------------- CONCRETAR VENTA ------------------------------*/
const _productsTotal = () =>{
   return productSaleList.reduce((acc, item) => acc += item.precio * item.existencia, 0)
};

const _validSaleUpdate = (idParam) =>{
   if (idParam) {
      listaVentas[_getListIndex(idParam)].productos = productSaleList;
      localStorage.setItem('ventas-realizadas', JSON.stringify(listaVentas));       
      alert('venta actualizada');
      window.location.href = `ventasRealizadas.html`
   };
};

const _guardarVenta = () =>{
   if(_validSaleUpdate(paramProductRute)) {
   }else{
      _validateFinSale()
   };
};


const _validateFinSale = () => {
   if (productSaleList[0]){
      if(paramProductRute !== null) return
      listaVentas.push({
         id: Date.now(),
         fecha: new Date().toLocaleDateString(),
         total: _productsTotal(),
         productos: productSaleList
      });
      alert('venta realizada con exito :)');
      productSaleList = [];
      _printSaleList();
      localStorage.setItem('ventas-realizadas', JSON.stringify(listaVentas));       
   }else{
      alert('aun no se ingresan articulos')
   };
};


// modelo
// es el que se enarga de llevar el estado de la aplicacion 


const _initProduct = (product) =>{
   productModel = {
      nameProduct : product ? product.nameProduct  : '',
      Precio      : product ? product.Precio       : '',
      existencia  : product ? product.existencia   : '',
   };
   searchTermUI.value   = productModel.nameProduct;
   productPriceUI.value = productModel.Precio;
   productCantUI.value  = productModel.existencia;
};
_initProduct();

const _addSale = () =>{
   productModel.nameProduct = searchTermUI.value;
   productModel.precio      = productPriceUI.value;
   productModel.existencia  = productCantUI.value;
   if (indexProductEdit) {
      const updateProduct = productSaleList[indexProductEdit];
      updateProduct.nameProduct = searchTermUI.value;
      updateProduct.precio      = productPriceUI.value;
      updateProduct.existencia  = productCantUI.value;
   }else{
      productSaleList.push(productModel);
   };
   indexProductEdit = null
   _printSaleList();
};

const _deleteProduct = (index) =>{
   event.stopPropagation();
   productSaleList.splice(index,1)
   _printSaleList();
};

function _editSale(index) {
   indexProductEdit = index
   product = productSaleList[index];
   _initProduct(product)
};

const _printSaleList = () =>{
   listaVentaProductosUI.innerHTML = ''
   productSaleList.forEach((elem, index) => {
      listaVentaProductosUI.innerHTML += `
         <li class="list-group-item d-flex justify-content-between align-items-start" onclick="_editSale('${index}')">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${elem.nameProduct}</div>
            Precio $ ${elem.precio}
            </div>
            <i class="fas fa-trash my-1 mx-2" style="cursor: pointer;" onclick="_deleteProduct(${index})"></i>
            <span class="badge bg-primary rounded-pill">${elem.existencia}</span>
         </li>
      `
   });
};

// ---------------------- OBTENER ELEMENTO DE RUTA Y PINTAR -------------------->
const _getListIndex = (idParam) => listaVentas.findIndex(elem => elem.id == idParam);

const _productRoute = () =>{
   const productId = window.location.search;
   const urlParam = new URLSearchParams(productId);
   paramProductRute = urlParam.get('id');
   if (paramProductRute) {
      indexProductEdit = _getListIndex(paramProductRute);
      if (indexProductEdit > -1) {
         productSaleList = listaVentas[indexProductEdit].productos;
         _printSaleList()
      };
   };
};
_productRoute();
// --------------------------------------------------------------------<


const _statusChange = (input) =>{
   input.classList.add('is-invalid')
};

const _validateVenta = () =>{
   let status = true
   if (searchTermUI.value === '') {
      _statusChange(searchTermUI);
      status = false
   };
   if(productPriceUI.value === '') {
      _statusChange(productPriceUI);
      status = false
   };
   if(productCantUI.value === '') {
      _statusChange(productCantUI);
      status = false
   };
   if(status === false) {
      alert('completa todos los campos')
   }else{
      _addSale();
   };
};

// <------------------------------------------------------------------------------------

const _printProductsList = (listado) => {
   listaProductosUI.innerHTML = ''
   listado.forEach((product, index) => {
      listaProductosUI.innerHTML += `
         <li class="list-group-item d-flex align-items-start" style="cursor: pointer;" onclick="_productSelect(${index})">
            <div class="ms-2 me-auto">
               <div class="fw-bold">${product.nameProduct}</div>
                  Precio $${product.Precio}
               </div>
            <span class="badge bg-primary rounded-pill">${product.existencia}</span>                
         </li>
      `;
   });
};

const _productSelect = (index) => {
   _initProduct(productsFilter[index]);
   searchTermUI.classList.remove('is-invalid');
   productPriceUI.classList.remove('is-invalid');
   productCantUI.classList.remove('is-invalid');
   listaProductosUI.innerHTML = ''
};

function _validateEnter() {
   if (productsFilter.length === 1) {
      productsFilter.forEach(elem => {
         searchTermUI.value = elem.nameProduct;
         productPriceUI.value = elem.Precio;
         productCantUI.value = elem.existencia;
      });
   };
};

const _validateTextSearch = () =>{
   if (searchTermUI.value === '') {
      listaProductosUI.className = 'list-group list-group-numbered mt-3 visually-hidden';
   }else{
      listaProductosUI.className = 'list-group list-group-numbered mt-3 visually';
   };
};

const _filterProducts = () =>{
   _validateTextSearch();
   productsFilter = productsList.filter(prod => prod.nameProduct.includes(searchTermUI.value));
   _printProductsList(productsFilter);
};

const _validateUserActive = () =>{
   let userActive = localStorage.getItem('user-active');
   if (!userActive) {
      window.location.href="/HTML/loginAPP.html"
   }else{
      userActiveUI.innerText = localStorage.getItem('user-active');
   };
};

const _singOff = () =>{
   localStorage.removeItem('user-active');
   _validateUserActive();
};

// ============================ EVENTOS ========================

_validateUserActive();

searchTermUI.addEventListener('keyup', e =>{
   var keycode = e.keyCode;
   if(keycode === 13){
      _validateEnter();
      listaProductosUI.innerHTML = '';
   }else{
      _filterProducts();
   };
});

inputsUI.forEach(input => input.addEventListener('focus', function() {
   this.classList.remove('is-invalid');
}));


formUI.addEventListener('submit', e => {
   e.preventDefault();
   _validateVenta();
   formUI.reset();
});

document.addEventListener('DOMContentLoaded', e => {
   e.preventDefault();
});

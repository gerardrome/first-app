// ============================= VARIABLES ======================
const userActiveUI = document.querySelector('#user-active');
const listaProductosUI = document.querySelector('#list-products');
const formUI = document.querySelector('form');
const searchTermUI = document.querySelector('#search-input');
const productPriceUI = document.querySelector('#inputPriceUI');
const productCantUI = document.querySelector('#inputCantUI');
const listaVentaProductosUI = document.querySelector('#list-products-sale');
let productSaleList = localStorage.getItem('productos-venta') ? JSON.parse(localStorage.getItem('productos-venta')) : [];
let productsList = localStorage.getItem('productos') ? JSON.parse(localStorage.getItem('productos')) : [];
let indexProduct = null;
let productsFilter = '';

// ============================ FUNCIONES =======================
// ---------------- AGREGAR PRODUCTO PARA VENTA ------------------>
const _agregarVenta = (producto, precio, cantidad) => {
   newSale = {
      producto: producto,
      precio: precio,
      cantidad: cantidad,
   };
   productSaleList.push(newSale);
};

const _printSaleList = () =>{
   listaVentaProductosUI.innerHTML = ''
   productSaleList.forEach(elem => {
      listaVentaProductosUI.innerHTML += `
         <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${elem.producto}</div>
            Precio $ ${elem.precio}
            </div>
            <span class="badge bg-primary rounded-pill">${elem.cantidad}</span>
         </li>
      `
   });
};

const _guardarVentaLS = ()=>{
   localStorage.setItem('productos-venta', JSON.stringify(productSaleList));
};

const _statusChange = (input, status) =>{
   input.className = status;
};

const _validateVenta = () =>{
   const valido = 'form-control';
   const inValido = 'form-control is-invalid';
   let change = true;
   switch (searchTermUI.value === '') {
      case true:
         change = false
         _statusChange(searchTermUI, inValido);
         break;
      case false:
         _statusChange(searchTermUI, valido);
   };
};

// <------------------------------------------------------------------------------------

const _printProductsList = (listado) => {
   listaProductosUI.innerHTML = ''
   listado.forEach(product => {
      listaProductosUI.innerHTML += `
         <li class="list-group-item d-flex align-items-start" style="cursor: pointer;" onclick="_productSelect('${product.nameProduct}')">
            <div class="ms-2 me-auto">
               <div class="fw-bold">${product.nameProduct}</div>
                  Precio $${product.Precio}
               </div>
            <span class="badge bg-primary rounded-pill">${product.existencia}</span>                
         </li>
      `;
   });
};

const _productSelect = (product) => {
   // -------------------expresion regular para eliminar saltos de linea-----------------
   // let expRegular = /[^\r\n]+/g;
   // let nameProduct = event.currentTarget.innerText.match(expRegular)[0];
   let productClick = productsList.filter((elem, index) => {
      if (elem.nameProduct === product) {
         indexProduct = index;
         return elem
      };
   });

   searchTermUI.value = productClick[0].nameProduct;
   productPriceUI.value = productClick[0].Precio;
   productCantUI.value = productClick[0].existencia;
   listaProductosUI.innerHTML = '';
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
   console.log(productsList,'que esta pasando -----------> D:');
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
_printSaleList();

searchTermUI.addEventListener('keyup', e =>{
   var keycode = e.keyCode;
   if(keycode === 13){
      _validateEnter();
      listaProductosUI.innerHTML = '';
   }else{
      _filterProducts();
   };
});

formUI.addEventListener('submit', e => {
   e.preventDefault();
   _agregarVenta(searchTermUI.value, productPriceUI.value, productCantUI.value);
   _printSaleList();
   formUI.reset();
   _guardarVentaLS();
});

document.addEventListener('DOMContentLoaded', e => {
   e.preventDefault();
});

// ============================= VARIABLES ======================
const userActiveUI = document.querySelector('#user-active');
const listaProductosUI = document.querySelector('#list-products');
const formUI = document.querySelector('form');
const searchTermUI = document.querySelector('#search-input');
const productPriceUI = document.querySelector('#inputPriceUI');
const productCantUI = document.querySelector('#inputCantUI');
const inputsUI = document.querySelectorAll('input');
const listaVentaProductosUI = document.querySelector('#list-products-sale');
let productSaleList = [];
let productsList = localStorage.getItem('productos') ? JSON.parse(localStorage.getItem('productos')) : [];
let indexProduct = null;
let productsFilter = '';

// ============================ FUNCIONES =======================

// ---------------- AGREGAR PRODUCTO PARA VENTA ------------------>
const _addSale = (producto, precio, cantidad) => {
   newSale = {
      producto: producto,
      precio: precio,
      cantidad: cantidad,
   };
   productSaleList.push(newSale);
   _printSaleList();

};

const _deleteProduct = (index) =>{
   productSaleList.splice(index,1)
   _printSaleList();
   console.log(productSaleList);
};

const _printSaleList = () =>{
   listaVentaProductosUI.innerHTML = ''
   productSaleList.forEach((elem, index) => {
      listaVentaProductosUI.innerHTML += `
         <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${elem.producto}</div>
            Precio $ ${elem.precio}
            </div>
            <i class="fas fa-trash my-1 mx-2" style="cursor: pointer;" onclick="_deleteProduct(${index})"></i>
            <span class="badge bg-primary rounded-pill">${elem.cantidad}</span>
         </li>
      `
   });
};

const _statusChange = (input) =>{
   input.classList.add('is-invalid')
};

const _validateVenta = () =>{
   let status = true
   if (searchTermUI.value === '') {
      _statusChange(searchTermUI);
      status = false
   }if(productPriceUI.value === '') {
      _statusChange(productPriceUI);
      status = false
   }if(productCantUI.value === '') {
      _statusChange(productCantUI);
      status = false
   }
   if(status === false) {
      alert('completa todos los campos')
   }else{
      _addSale(searchTermUI.value, productPriceUI.value, productCantUI.value)
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

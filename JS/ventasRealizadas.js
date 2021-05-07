// =================== VARIABLES ==================
const userActiveUI = document.querySelector('#user-active');
const tableUI = document.querySelector('#table-sales');
const fecha = new Date().toLocaleDateString();
const idDate = new Date().getTime();
const listaVentas = localStorage.getItem('ventas-realizadas') ? JSON.parse(localStorage.getItem('ventas-realizadas')) : productSaleList


// ==================== _FUNCIONES ==================

const _locationRoute = (id) => {
   window.location.href = `registroVenta.html?id=${id}`
};

const _deleteSale = (index) =>{
   event.stopPropagation()
   event.preventDefault()
   listaVentas.splice(index,1);
   localStorage.setItem('ventas-realizadas', JSON.stringify(listaVentas));       
   _printSales();
};

const _printSales = () => {
   tableUI.innerHTML = '';
   listaVentas.forEach((elem, index) => {
      tableUI.innerHTML += `
         <tr style="text-align: center;" onclick="_locationRoute(${elem.id})">
         <td>${elem.id}</td>
         <td>${elem.fecha}</td>
         <td>${elem.total}</td>
         <td>
            <a href="">
               <i class="fas fa-minus-circle"onclick="_deleteSale(${index})"></i>
            </a>
         </td>
         </tr>
      `
   });
};

const _validateUserActive = () =>{
   let userActive = localStorage.getItem('user-active');
   if (!userActive) {
      window.location.href="/HTML/loginAPP.html"
   }else{
      userActiveUI.innerText = localStorage.getItem('user-active')
   };
};

const _singOff = () =>{
   localStorage.removeItem('user-active');
   _validateUserActive();
};
// ==================== EVENTOS =====================
_validateUserActive();
_printSales();
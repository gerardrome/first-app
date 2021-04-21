// ======================= VARIABLES ====================
const tableUI = document.querySelector('#table-users tbody');
const userActiveUI = document.querySelector('#user-active');
let productsList = localStorage.getItem('productos') ? JSON.parse(localStorage.getItem('productos')) : [];


// ======================= FUNCIONES ====================

const _guardarLS = () =>{
    localStorage.setItem('productos', JSON.stringify(productsList));
};

const _eliminarProducto = (product) => {
    productsList = productsList.filter(elem => elem.nameProduct !== product);
    _guardarLS();
    _printProductTable();
};

const _fileRoute = (imagen) => imagen.replace(/fakepath/g, '/img/').replace(/\\/g, '').replace(/C:/g, '');

const _location = (param) => window.location.href = `registerProduct.html?nombre=${param}`



const _printProductTable = () => {
    tableUI.innerHTML = '';
    productsList.forEach(elem => {
        // console.log(elem.imagen.replace(/fakepath/g, '/img/').replace(/\\/g, '').replace(/C:/g, ''))
        tableUI.innerHTML += `
            <tr style="text-align: center;" onclick="_location('${elem.nameProduct}')">
                <td>${elem.nameProduct}</td>
                <td>${elem.Precio}</td>
                <td>${elem.existencia}</td>
                <td>${elem.categoria}</td>
                <td>
                    <img style="width: 40px; height: 40px;" src="${_fileRoute(elem.imagen)}"></img>
                </td>
                <td>
                    <a href="#">
                        <i class="fas fa-minus-circle" onclick="_eliminarProducto('${elem.nameProduct}')"></i>
                    </a>
                </td>
            </tr>
        `;
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
// ====================== EVENTOS ======================
_validateUserActive();
document.addEventListener('DOMContentLoaded', e => {
    e.preventDefault();
    _printProductTable();
});
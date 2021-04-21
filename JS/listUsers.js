//============================== VARIABLES
const tableUI = document.querySelector('#table-users tbody');
const userSelected = document.querySelectorAll('#table-users a');
const userActiveUI = document.querySelector('#user-active');
let recordUsers = localStorage.getItem('registro usuarios') ? JSON.parse(localStorage.getItem('registro usuarios')) : [];

//=========================== FUNCIONES
const _guardarLS = () =>{
    localStorage.setItem('registro usuarios', JSON.stringify(recordUsers));
};

const _validateContentUsers = () =>{
    if (recordUsers.length === 0 ) {
        tableUI.innerHTML = `
            <tr style="text-align: center;">
                <td colspan="3"><h3>SIN USUARIOS REGISTRADOS</h3></td>
            </tr>
        `
    };
};

const _deleteUser = (index)=>{
    recordUsers.splice(index, 1);
    _guardarLS();
    _printUsersList();
    _validateContentUsers();
    
};

const _printUsersList = () =>{
    tableUI.innerHTML = ''
    recordUsers.forEach((elem, index) => {
        tableUI.innerHTML += `
            <tr style="text-align: center;">
                <td>${elem.nombre}</td>
                <td>${elem.contraseña}</td>
                <td>
                    <a href="#" onclick="_deleteUser(${index})">
                        <i class="fas fa-minus-circle"></i>
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
    }
};

const _singOff = () =>{
    localStorage.removeItem('user-active');
    _validateUserActive();
};



//========================== EVENTOS

document.addEventListener('DOMContentLoaded', e => {
    e.preventDefault();
    _validateUserActive()
    _printUsersList();
    _validateContentUsers();
    
});


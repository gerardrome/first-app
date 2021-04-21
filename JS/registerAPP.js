//========================= VARIABLES
const formularioUI = document.getElementById('formulario');
const userNameUI = document.getElementById('user-name');
const userPassUI = document.getElementById('user-pass');
const passConfirm = document.getElementById('pass-confirm');
const userActiveUI = document.querySelector('#user-active');
let recordUsers = localStorage.getItem('registro usuarios') ? JSON.parse(localStorage.getItem('registro usuarios')) : [];

//========================= FUNCIONES

const _agergarUsuario = (user, password) =>{
    newUser = {
        nombre: user,
        contraseña: password
    };
    recordUsers.push(newUser);
};

const _validateUser = (user, password, passwordConf) => {
    let usersName = recordUsers.filter(elem => elem.nombre === user)
    if (usersName.length !== 0) {
        userNameUI.className = 'form-control is-invalid';
        return alert('El usuario ya existe, ingresar otro nombre');
        
    }else{
        userNameUI.className = 'form-control';
    };
    if(password !== passwordConf){
        passConfirm.className = 'form-control is-invalid'
        passConfirm.value = ''
        alert('La contraseña no coincide')
        console.log('no pasa');
    }else{
        _agergarUsuario(user, passwordConf);
        alert('USUARIO AGREGADO');
        passConfirm.className = 'form-control'
        formularioUI.reset();

    };
};

const _guardarLS = () =>{
    localStorage.setItem('registro usuarios', JSON.stringify(recordUsers));
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


//========================= EVENTOS

_validateUserActive();
formularioUI.addEventListener('submit', e => {
    e.preventDefault();
    _validateUser(userNameUI.value, userPassUI.value, passConfirm.value);
    // _agergarUsuario(userNameUI.value, passConfirm.value);
    _guardarLS();
})
// document.addEventListener('DOMContentLoaded')

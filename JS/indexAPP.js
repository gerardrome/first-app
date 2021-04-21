//========================= VARIABLES
const formularioUI = document.getElementById('formulario')
const userNameUI = document.getElementById('user-name');
const userPassUI = document.getElementById('user-pass');
const passConfirm = document.getElementById('pass-confirm');
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
    if(password !== passwordConf){
        passConfirm.className = 'input is-medium is-danger'
        passConfirm.value = ''
        alert('La contraseña no coincide')
        console.log('no pasa');
    }else{
        _agergarUsuario(user, passwordConf);
        alert('USUARIO AGREGADO');
        passConfirm.className = 'input is-medium is-primary'
        formularioUI.reset();

    }
}

const _guardarLS = () =>{
    localStorage.setItem('registro usuarios', JSON.stringify(recordUsers));
};


//========================= EVENTOS

formularioUI.addEventListener('submit', e => {
    e.preventDefault();
    _validateUser(userNameUI.value, userPassUI.value, passConfirm.value)
    // _agergarUsuario(userNameUI.value, passConfirm.value);
    _guardarLS();
})
// document.addEventListener('DOMContentLoaded')

console.log(recordUsers);
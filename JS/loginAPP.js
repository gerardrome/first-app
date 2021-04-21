//=================== VARIABLES

const formularioUI = document.getElementById('formulario');
const userNameUI = document.getElementById('user-name');
const userPassUI = document.getElementById('user-pass');
let recordUsers = localStorage.getItem('registro usuarios') ? JSON.parse(localStorage.getItem('registro usuarios')) : [];
// let usersLogin = localStorage.getItem('login-users') ? JSON.parse(localStorage.getItem('login-users')) : []

//=================== FUNCIONES


const _validateUserLogin = (user, password) => {
    recordUsers.forEach(elem => {
        if (user === elem.nombre) {
        }else{
            alert('usuario no registrado')
            return;

        }if (password === elem.contraseña) {
            
        }else{
            alert('contraseña incorrecta')
            return
        }if (user === elem.nombre && password === elem.contraseña) {
            window.location.href="/HTML/listUsers.html"
        };
    });
};


//================== EVENTOS

formularioUI.addEventListener('submit', e => {
    e.preventDefault();
    _validateUserLogin(userNameUI.value, userPassUI.value);
    localStorage.setItem('user-active', userNameUI.value);
    formularioUI.reset();
});
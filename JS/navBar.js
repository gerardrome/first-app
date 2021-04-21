const bodyUI = document.querySelector('body');
const menuList = [
    {
        nombre: 'registro usuario',
        url: 'registerAPP.html',
    },
    {
        nombre: 'lista usuarios',
        url: 'listUsers.html',
    },
    {
        nombre: 'registro producto',
        url: 'registerProduct.html'
    },
    {
        nombre: 'lista productos',
        url: 'listaProductos.html',
    },
    {
        nombre: 'Nueva venta',
        url: 'registroVenta.html',
    },
];

const _getLinks = () => {
    let links = '';
    const activeRute = window.location.pathname.split('HTML/')[1];
    menuList.forEach(elem => {
        links += `
            <li class="nav-item">
                <a class="nav-link ${activeRute === elem.url ? 'active' : 'inactive'}" aria-current="page" href="${elem.url}">${elem.nombre}</a>
            </li>
        `
    });
    return links
};

const _renderNavBar = () =>{
    const structurNavBar = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"><h2>Flare</h2></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        ${_getLinks()}
                    </ul>
                    <span id="user-active" class="badge bg-info" style="cursor: pointer;" onclick="_singOff()">New</span></h4>
                </div>
            </div>
        </nav>
    `;
    bodyUI.insertAdjacentHTML('afterbegin', structurNavBar);
};

_renderNavBar();

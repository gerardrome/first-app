// ========================== VARIABLES ==================
const footerUI = document.querySelector('footer');
const contactList = [
    {
        cantac: 'fas fa-phone-alt',
        date: '330003330000'
    },
    {
        cantac: 'fas fa-street-view',
        date: 'Fatima 4Ever'
    },
    {
        cantac: 'fas fa-envelope',
        date: 'Flare@gmail.com'
    }
];


// ========================= FUNCIONES ===================
const _getInfoCantact = () => {
    let infoContact = '';
    contactList.forEach(elem => {
        infoContact += `
            <li class="text-reset">
                <i class="${elem.cantac} p-4 fs-3 text-center d-block" ></i>
                <span> ${elem.date}</span>
            </li>
        `;
    });
    return infoContact
};

const _renderFooter = () =>{
    const structurFooter = `
        <footer class="bg-dark text-white py-4 mt-5">
            <div class="container">
                <nav class="row">
                    <!-- icono  -->
                    <a href="" class="col-6 text-reset text-uppercase d-flex align-items-center text-decoration-none">
                        <i class="fab fa-flipboard fs-1"> Flare</i>
                    </a>
                    <!-- contenido contacto -->
                    <ul class="col-6 list-unstyled d-flex justify-content-between">
                        ${_getInfoCantact()}
                    </ul>
                </nav>
            </div>
        </footer>
    `;
    footerUI.insertAdjacentHTML('afterbegin', structurFooter);
};

_renderFooter();

















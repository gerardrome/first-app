//==================== VARIABLES =====================
const formularioUI = document.getElementById('formulario');
const productUI = document.getElementById('product');
const precioUI = document.getElementById('precio');
const existenciaUI = document.getElementById('existencia');
const categoriaUI = document.getElementById('categoria');
const imageUI = document.getElementById('imagen');
const userActiveUI = document.querySelector('#user-active');
let productsList = localStorage.getItem('productos') ? JSON.parse(localStorage.getItem('productos')) : [];
let indexProduct = null;
// let statusValidate = true


//=================== FUNCIONES =====================

const _guardarProduct = () =>{
    if (indexProduct) {
        const updateProduct = productsList[indexProduct];
            updateProduct.nameProduct = productUI.value;
            updateProduct.Precio = precioUI.value;
            updateProduct.existencia = existenciaUI.value;
            updateProduct.categoria = categoriaUI.value;
        console.log(updateProduct);
    }else{
        let product = {
            nameProduct: productUI.value,
            Precio: precioUI.value,
            existencia: existenciaUI.value,
            categoria: categoriaUI.value,
            imagen: imageUI.value
        };
        productsList.push(product);
        
    }
};

const _guardarLS = () =>{
    localStorage.setItem('productos', JSON.stringify(productsList));
};

const _statusChange = (input, status) =>{
    input.className = status;
};

const _validateProduct3 = () => {
    const valido = 'form-control';
    const inValido = 'form-control is-invalid';
    let change = true;
    switch (productUI.value === '') {
        case true:
            change = false
            _statusChange(productUI, inValido);
            break;
        case false:
            _statusChange(productUI, valido);
    }switch (precioUI.value === '') {
        case true:
            change = false
            _statusChange(precioUI, inValido);
            break;
        case false:
            _statusChange(precioUI, valido);
    }switch (existenciaUI.value === '') {
        case true:
            change = false
            _statusChange(existenciaUI, inValido);
            break;
        case false:
            _statusChange(existenciaUI, valido);
    }switch (categoriaUI.value === 'Selecciona una categoria') {
        case true:
            change = false
            _statusChange(categoriaUI, inValido);
            break;
        case false:
            _statusChange(categoriaUI, valido);
    }switch (imageUI.value === '') {
        case true:
            change = false
            _statusChange(imageUI, inValido);
            break;
        case false:
            _statusChange(imageUI, valido);
    }switch (change) {
        case true:
            // _guardarProduct();
            _validateExistence(productUI.value, imageUI.value)
            // formularioUI.reset();
            break;
        case false:
            alert(' Por favor completa todos los campos');
            break;
    };
};

const _validateExistence = (product, imagen) =>{
    const resultado = productsList.filter(elem => elem.nameProduct === product || elem.imagen === imagen)
    if (resultado.length === 0) {
        _guardarProduct();
        alert('producto guardado');
        formularioUI.reset();
    }else{
        alert('El producto ya esta registrado')
    };
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

const _getProductIndex = nameProduct => productsList.findIndex(product => product.nameProduct === nameProduct);

const _editProductRute = () =>{
    const productEdit = productsList[indexProduct]
    productUI.value = productEdit.nameProduct;
    precioUI.value = productEdit.Precio;
    existenciaUI.value = productEdit.existencia;
    categoriaUI.value = productEdit.categoria;
};

const _productoEditar = () =>{
    const productValue = window.location.search;
    const urlParams = new URLSearchParams(productValue);
    let paramProductRute = urlParams.get('nombre');
    if (paramProductRute) {
        indexProduct = _getProductIndex(paramProductRute);
        if (indexProduct > -1) {
            _editProductRute();
        };
    };
};
_productoEditar()
//================== EVENTOS ========================
_validateUserActive();
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    // _validateExistence(productUI.value, imageUI.value)
    // _validateProduct()
    _validateProduct3();
    // _validateProduct2()
    _guardarLS();
});
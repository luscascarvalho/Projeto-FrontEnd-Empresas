import { registerUser } from "./requests.js";

//criar usuario
export async function createUser() {
    const button = document.querySelector('#registered');
    const name = document.querySelector('#name');
    const mail = document.querySelector('#email');
    const password = document.querySelector('#password');
    const nivel = document.querySelector('#nivel-pr');

    button.addEventListener('click', (e) => {
        e.preventDefault()

        const userCreated = {
            username: name.value,
            email: mail.value,
            password: password.value,
            professional_level: nivel.value
        }

        registerUser(userCreated);

    });
}

createUser();

//voltar para a home.
function backToHome() {
    const home = document.querySelector('#home');

    home.addEventListener('click', () => {
        window.location.replace('../../index.html')
    })
}

backToHome();

//Ir para o login
function goToLogin() {
    const login = document.querySelector('#login');

    login.addEventListener('click', () => {
        window.location.replace('../pages/login.html');
    })
}

goToLogin();

//Voltar para o index.
function goBacktoIndex() {
    const index = document.querySelector('#index');

    index.addEventListener('click', () => {
        window.location.replace('../../index.html')
    })
}

goBacktoIndex();

function showSuccessToast(message) {
    toastr["success"](message);

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
}
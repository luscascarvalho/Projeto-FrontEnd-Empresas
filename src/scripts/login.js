import { login, tokenUsers } from "./requests.js";

function backToHome() {
    const home = document.querySelector('#home');

    home.addEventListener('click', () => {
        window.location.replace('../../index.html')
    })
}

backToHome();

function goToRegister() {
    const login = document.querySelectorAll('.register');

    login.forEach(click => {
        click.addEventListener('click', () => {
            window.location.replace('../pages/register.html')
        })
    })


}

goToRegister();

export async function goToProfile() {
    const button = document.querySelector('#login');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    button.addEventListener('click', (e) => {
        e.preventDefault()

        const userLogon = {
            email: email.value,
            password: password.value
        }

        login(userLogon);
    });
}

goToProfile()

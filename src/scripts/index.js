import { getCompanies } from "./requests.js";

const seeCompanies = await getCompanies();
console.log(seeCompanies);

function goToLoginScreen() {
    const btnLogin = document.querySelector('#login');

    btnLogin.addEventListener('click', () => {
        window.location.replace('./src/pages/login.html')
    })
}

function goToRegisterScreen() {
    const btnLogin = document.querySelector('#register');

    btnLogin.addEventListener('click', () => {
        window.location.replace('./src/pages/register.html')
    })
}

//renderizando os options
export async function renderOption() {
    const select = document.querySelector('#selectSector');

    seeCompanies.forEach(selected => {
        const option = document.createElement('option');

        option.innerText = selected.name;
        
        select.append(option);
    });

}

goToRegisterScreen();
goToLoginScreen();
renderOption();

//filtrar e renderizar cada departamento.
function selectCompany() {
    const select = document.querySelector('#selectSector');
    const ul = document.querySelector('.render-companys');

    select.addEventListener('change', () => {
        const currentCompany = select.value;

        ul.innerText = '';

        if (select.value == 0) {
            renderDepartments();
        }

        seeCompanies.forEach((department) => {
            const teste = department.name

            if (currentCompany == teste) {
                renderDepartments(department);
            }
        })
    })
}
selectCompany();

//criar uma li pro departamento.
function createLi(department) {
    const li = document.createElement('li');
    const h1 = document.createElement('h1');
    const span = document.createElement('span');
    const a = document.createElement('a');
    const hr = document.createElement('hr')

    h1.innerText = department.name;

    span.innerText = department.opening_hours;

    a.classList = 'btnNotBtn'
    a.innerText = department.sectors.description;

    li.append(h1, span, a, hr);

    return li;
}

//Renderizando os departamentos. 
async function renderDepartments(obj) {
    const ul = document.querySelector('.render-companys');
    if (obj) {
        const liCreated = createLi(obj);
        ul.append(liCreated);
    } else {
        seeCompanies.forEach(department => {
            createLi(department);
            const teste = createLi(department);
            ul.append(teste);
        })
    }
}
renderDepartments();
import { getCompanies, getDepartments, getDepartmentsById, getUsers, deletedDep, editDep, newDep, deleteUser, editUser, hireEmployees, getUsersOutOfWork, dissmisUser } from "./requests.js";

const showCompanies = await getCompanies();

const showDepartments = await getDepartments();

const departmentsById = await getDepartmentsById();

let showUsers = await getUsers();

const seeEmployees = await getUsersOutOfWork();

//voltar para o index. 
function backToHome() {
    const home = document.querySelector('#home');

    home.addEventListener('click', () => {
        window.location.replace('../../index.html')
    })
}

backToHome();

//renderizar os options com nome das empresas.
async function optionsCompanies() {
    const select = document.querySelector('#companys');

    showCompanies.forEach(department => {
        const option = document.createElement('option');

        option.value = department.name;
        option.innerText = department.name;

        select.append(option);
    });
}
optionsCompanies();

//filtrar e renderizar cada departamento.
function selectCompany() {
    const select = document.querySelector('#companys');
    const ul = document.querySelector('.cards');

    select.addEventListener('change', () => {
        const currentCompany = select.value;

        ul.innerText = '';

        if (select.value == 0) {
            renderDepartments();
        }

        showDepartments.forEach((department) => {
            const created = department.companies.name

            if (currentCompany == created) {
                renderDepartments(department);
            }
        })
    })
}
selectCompany();

//criar uma li pro departamento.
function createLi(department) {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const span = document.createElement('span');
    const span2 = document.createElement('span');
    const div = document.createElement('div');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    const btn3 = document.createElement('button');
    const hr = document.createElement('hr');

    li.classList = 'li-company'

    h3.innerText = department.name;

    span.innerText = department.description;

    span2.innerText = department.companies.name;

    div.classList = 'li-btn';

    btn1.innerText = '';
    btn1.classList = 'btn-eyeIcon'
    btn1.dataset.id = department.uuid;
    btn1.addEventListener('click', (e) => {
        const targetId = e.target.dataset.id;
        openModal(department.uuid);
        renderModalDep(department.companies.name, department.name, department.description, targetId);
    })

    btn2.innerText = '';
    btn2.classList = 'btn-penIcon'
    btn2.addEventListener('click', () => {
        openModalEdit(department.uuid);
    })

    btn3.innerText = '';
    btn3.classList = 'btn-iconTrash'
    btn3.id = 'deleteDep';
    btn3.addEventListener('click', () => {
        openDeleteModal(department.uuid);
    });

    div.append(btn1, btn2, btn3);
    li.append(h3, span, span2, div, hr);

    return li;
}

//Renderizando os departamentos. 
async function renderDepartments(obj) {
    const ul = document.querySelector('.cards');
    if (obj) {
        const liCreated = createLi(obj);
        ul.append(liCreated);
    } else {
        showDepartments.forEach(department => {
            createLi(department);
            const create = createLi(department);
            ul.append(create);
        })
    }
}
renderDepartments();

//Renderizando todos os users.
function renderAllUsers() {
    const ul = document.querySelector('.user-cards');

    showUsers.filter(user => user.username !== "ADMIN").forEach(user => {
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const span = document.createElement('span');
        const span2 = document.createElement('span');
        const div = document.createElement('div');
        const btn2 = document.createElement('button');
        const btn3 = document.createElement('button');
        const hr = document.createElement('hr');

        li.classList = 'li-users';
        div.classList = 'li-btn';

        h3.innerText = user.username;

        span.innerText = user.professional_level;

        span2.innerText = user.kind_of_work;

        btn2.innerText = '';
        btn2.classList = 'btn-penIcon'
        btn2.addEventListener('click', () => {
            modalEditUser(user.uuid);
        })

        btn3.innerText = '';
        btn3.classList = 'btn-iconTrash';
        btn3.addEventListener('click', () => {
            modalDeleteUser(user.uuid);
        })

        div.append(btn2, btn3);
        li.append(h3, span, span2, div, hr);
        ul.append(li);
    })
}

renderAllUsers();


//abrir modal e confirmar a exclusão!
export async function openDeleteModal(id) {
    const modal = document.querySelector('#deleteModal');
    const btn = document.querySelector('#deleteDep');

    modal.showModal();

    btn.addEventListener('click', () => {
        deletedDep(id);
        modal.close();
        showSuccessToast('Departamento excluído!');
        setTimeout(() => window.location.reload(), 1000);
    })
}

//fechar modal de delete. 
export async function closeDeleteModal() {
    const modal = document.querySelector('#deleteModal');
    const btn = document.querySelector('#closeModalDelete');

    btn.addEventListener('click', () => {
        modal.close();
    })
}

closeDeleteModal();

//abrir modal de editar
export async function openModalEdit(id) {
    const modal = document.querySelector('#editModal');
    const btn = document.querySelector('#saveChanges');
    const textArea = document.querySelector('#textEdit');

    const obj = {};

    modal.showModal();

    btn.addEventListener('click', () => {
        obj[textArea.name] = textArea.value;
        editDep(id, obj);
        modal.close();
        showSuccessToast('Departamento editado com sucesso!');
        setTimeout(() => window.location.reload(), 1000);
    })
}

//fechar modal de editar
export async function closeModalEdit() {
    const modal = document.querySelector('#editModal');
    const btn = document.querySelector('#closeModalEdit');

    btn.addEventListener('click', () => {
        modal.close();
    })
}

closeModalEdit()

//abrir modal de olhar.
function openModal(nomeDep, descDep, comp) {
    const modal = document.querySelector('#infoModal');

    modal.showModal();
    closeModal();
}

//fechar modal de olhar.
function closeModal() {
    const modal = document.querySelector('#infoModal');
    const btn = document.querySelector('#closeDialog');

    btn.addEventListener('click', () => {
        modal.close();
    })
}

//modal de criar departamentos.
function createDep() {
    const modal = document.querySelector('#createModal');
    const btn = document.querySelector('#btnCreate');

    btn.addEventListener('click', () => {
        modal.showModal();
        newDepCreated();
    })
}

createDep();

//fechar modal de criar dep.
function closeCreateDep() {
    const modal = document.querySelector('#createModal');
    const btn = document.querySelector('#cancelCreate');

    btn.addEventListener('click', () => {
        modal.close();
    })
}

closeCreateDep();

//renderizar os options do select de criar departamentos
export async function optionsCreateModal() {
    const select = document.querySelector('#selectComp');

    showCompanies.forEach(department => {
        const option = document.createElement('option');

        option.value = department.uuid;
        option.innerText = department.name;

        select.append(option);
    });
}

optionsCreateModal();

//Criando um novo departamento.
export async function newDepCreated() {
    const inputs = document.querySelectorAll('.btn-input-CreateDep > input');
    console.log(inputs)

    const select = document.querySelector('#selectComp');
    const btn = document.querySelector('#saveCreateDep')
    console.log(btn)

    const obj = {};

    select.addEventListener('change', () => {
        obj[select.name] = select.value;
    })

    btn.addEventListener('click', async () => {
        inputs.forEach(input => {
            obj[input.name] = input.value;
            console.log(obj);
            newDep(obj);
            showSuccessToast('Departamento criado!');
            setTimeout(() => window.location.reload(), 1000);
        })
    })
}

// renderizar o modal de vizualizar o departamento e seus funcionários
export async function renderModalDep(nameDep, descriptionDep, nameCompany, depId) {
    const modal = document.querySelector('#infoModal');
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');
    const h1 = document.createElement('h1');
    const btn = document.createElement('button');
    const span = document.createElement('span');
    const span2 = document.createElement('span');
    const btn2 = document.createElement('button');

    const select = document.querySelector('#selectInfoModal');

    modal.classList = 'myModalInfo'
    div.classList = 'myCompanies'
    div2.classList = 'myCompanies2'
    div3.classList = 'myCompanies3'
    div4.classList = 'myCompanies4'
    btn.classList = 'close'


    seeEmployees.forEach(employee => {
        const option = document.createElement('option');

        option.value = employee.uuid;
        option.innerText = employee.username;
        select.append(option);
    })

    h1.innerText = nameDep;

    btn.innerText = 'X';
    btn.id = 'closeDialog';
    btn.addEventListener('click', () => {
        closeModal();
    })

    span.innerText = descriptionDep;

    span2.innerText = nameCompany;

    btn2.innerText = 'Contratar';
    btn2.classList = 'hire'
    btn2.dataset.id = depId;
    btn2.addEventListener('click', async (e) => {
        const targetId = e.target.dataset.id;
        const newHired = {
            user_uuid: select.value,
            department_uuid: targetId
        }

        await hireEmployees(newHired);

        showSuccessToast('Usuário contratado!')

        select.innerHTML = '';
        showUsers = await getUsers();
        render(showUsers, depId, nameDep);

        const seeNewEmp = await getUsersOutOfWork();

        seeNewEmp.forEach(employee => {
            const option = document.createElement('option');

            option.value = employee.uuid;
            option.innerText = employee.username;
            select.append(option);
        })
    })

    const ul = document.querySelector('.ul-dialog');

    render(showUsers, depId, nameDep);

    modal.innerHTML = '';
    div.append(h1, btn)
    div2.append(span, span2);
    div3.append(btn2, select)
    div4.append(div2, div3);
    modal.append(div, div4, ul);
}

//abrir modal de excluir user & confirmar exclusão do user.
export async function modalDeleteUser(id) {
    const modal = document.querySelector('#deleteUserModal');
    const btn = document.querySelector('#deleteThisUser');

    modal.showModal();

    btn.addEventListener('click', () => {
        deleteUser(id);
        modal.close();
        showSuccessToast('Deletado com sucesso!');
        setTimeout(() => window.location.reload(), 1000)
    })
}

//fechar modal de excluir user
export async function closeModalDeleteUser() {
    const modal = document.querySelector('#deleteUserModal');
    const btn = document.querySelector('#closeDeleteUserModal');

    btn.addEventListener('click', () => {
        modal.close();
    })
}

closeModalDeleteUser();

//abrir modal de editar user.
export async function modalEditUser(id) {
    const modal = document.querySelector('#editUserModal');
    const btn = document.querySelector('#saveEdit');
    const select1 = document.querySelector('#optionWork');
    const select2 = document.querySelector('#nivprof')

    modal.showModal();

    btn.addEventListener('click', () => {
        const edit = {
            kind_of_work: select1.value,
            professional_level: select2.value
        }

        editUser(id, edit);
        showSuccessToast('Editado com sucesso!');
        setTimeout(() => window.location.reload(), 1000);
        console.log(edit);

    })
}

//fechar modal de editar user. 
export async function closeModalEditUser() {
    const modal = document.querySelector('#editUserModal');
    const btn = document.querySelector('#closeEditModal');

    btn.addEventListener('click', () => {
        modal.close();
    })
}

closeModalEditUser();

function render(test, depId, nameDep) {
    const ul = document.querySelector('.ul-dialog');
    ul.innerHTML = '';
    test.forEach(user => {
        if (user.department_uuid == depId) {

            const li = document.createElement('li');
            const h3 = document.createElement('h3');
            const span3 = document.createElement('span');
            const span4 = document.createElement('span2');
            const btn3 = document.createElement('button');
            const hr = document.createElement('hr');

            li.classList = 'li-dialog';

            h3.innerText = user.username;

            span3.innerText = user.professional_level;

            span4.innerText = nameDep;


            btn3.innerText = 'Desligar';
            btn3.addEventListener('click', () => {
                dissmisUser(user.uuid);
                showSuccessToast('Usuário demitido!');
                setTimeout(() => window.location.reload(), 2000)
            })

            li.append(h3, span3, span4, btn3, hr);
            ul.append(li);
        }
    })
}

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
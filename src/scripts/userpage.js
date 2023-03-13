import { getProfileUser, editMyUserProfile, getCoworkers, userDepartment } from "./requests.js";

const dep = await userDepartment();
console.log(dep);

const userInfo = await getProfileUser();

const getWorkers = await getCoworkers();

//voltar para o index.
function backToHome() {
    const home = document.querySelector('#home');

    home.addEventListener('click', () => {
        window.location.replace('../../index.html')
    })
}

backToHome();

//renderizar a seção de informações do usuários
export async function renderMyInfo() {
    const myUser = document.querySelector('.myUser');
    const h1 = document.createElement('h1');
    const div = document.createElement('div');
    const span = document.createElement('span');
    const span2 = document.createElement('span');
    const span3 = document.createElement('span');
    const btn = document.createElement('button');

    h1.innerText = userInfo.username;

    div.classList = 'infoMyUser';

    span.innerText = userInfo.email;

    span2.innerText = userInfo.professional_level;

    span3.innerText = userInfo.kind_of_work;

    btn.innerText = '';
    btn.classList = 'btnpenIcon'
    btn.id = 'openEdits'

    div.append(span, span2, span3, btn);
    myUser.append(h1, div);
}

renderMyInfo();

//abrir dialog de editar 
export async function dialogEdit() {
    const modal = document.querySelector('#editUser');
    const btn = document.querySelector('#openEdits');

    btn.addEventListener('click', () => {
        modal.showModal();

        closeDialogEdit();
    })
}

dialogEdit();

//fechar modal de editar
export async function closeDialogEdit() {
    const modal = document.querySelector('#editUser');
    const btn = document.querySelector('#closeEditUser');

    btn.addEventListener('click', () => {
        modal.close();
    })
}

// editar um perfil e salvar
export async function saveChangesProfile() {
    const name = document.querySelector('#username');
    const password = document.querySelector('#passwordUser');
    const mail = document.querySelector('#mailUser');
    const btnSave = document.querySelector('#saveEditChanges');

    btnSave.addEventListener('click', async () => {
        const obj = {
            username: name.value,
            password: password.value,
            email: mail.value
        }
        editMyUserProfile(obj);
        closeDialogEdit();
        showSuccessToast('Editado com sucesso!')
        setTimeout(() => window.location.reload(), 2000);
    })
}
saveChangesProfile();


//renderizar os amiguinhos do user
export async function renderMyFriends() {
    const section = document.querySelector('.companyWorkers');
    const ul = document.querySelector('ul');
    const h1 = document.querySelector('.dep-name')

    h1.innerText = `${dep.name} - ${dep.departments[0].name}`

    getWorkers[0].users.forEach(element => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const span2 = document.createElement('span');

        span.classList = 'spanBold'

        span.innerText = element.username;
        span2.innerText = element.professional_level;

        ul.append(li);
        li.append(span, span2)
        section.append(ul)
    });
}

//renderizando o aviso de não estar trabalhando. 
export async function messageUmp() {
    const ul = document.querySelector('ul');
    const div = document.querySelector('#alertUmp');


    if (getWorkers == 0) {
        const h1 = document.createElement('h1');
        h1.innerText = 'Você ainda não foi contratado.';
        div.classList.toggle('umP')
        ul.append(h1);
    } else {
        renderMyFriends();
    }
}

messageUmp();

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
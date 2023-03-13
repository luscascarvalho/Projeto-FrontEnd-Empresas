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

function showErrorToast(message) {
    toastr["error"](message);

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

//registrar
export async function registerUser(userBody) {
    const newUser = await fetch(`http://localhost:6278/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(userBody)
    })

        .then(response => {
            if (response.ok) {
                response.json()
                showSuccessToast('Usuário cadastrado com sucesso!')
                setTimeout(() => window.location.replace('/src/pages/login.html'), 1000);
            } else {
                response.json().then(resError => showErrorToast(resError))
            }
        })

    return newUser
}


//login
export async function login(user) {
    try {
        const loggedUser = await fetch(`http://localhost:6278/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(user)
        })

        const response = loggedUser;
        const responseJSON = await response.json();

        if (response.ok) {
            localStorage.setItem('user: token', responseJSON.token);

            const tokenValid = await tokenUsers(responseJSON.token);

            if (tokenValid.is_admin == true) {
                window.location.replace('../pages/admin.html')
            } else {
                window.location.replace('../pages/userpage.html')
            }

            return responseJSON.token
        }
    } catch (error) {
        console.log(error);
    }

    return loggedUser
}

//validar usuarios 
export async function tokenUsers(token) {
    const allTokens = await fetch(`http://localhost:6278/auth/validate_user`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    const tokens = await allTokens.json();

    return tokens;
}


//todas as companias
export async function getCompanies() {
    try {
        const allCompanies = await fetch(`http://localhost:6278/companies`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })

        const response = await allCompanies.json();

        return response;

    } catch (error) {
        console.log(error)
    }
}

const tokenAdm = localStorage.getItem('user: token');

//todos os departamentos
export async function getDepartments() {
    try {
        const allDepartments = await fetch(`http://localhost:6278/departments`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`
            }
        })

        const response = await allDepartments.json();

        return response;

    } catch (error) {
        console.log(error)
    }
}


//departamento por ID
export async function getDepartmentsById(companyId) {
    try {
        const departmentsById = await fetch(`http://localhost:6278/departments/${companyId}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`

            }
        })

        const department = await departmentsById.json();

        return department;

    } catch (error) {
        console.log(error);
    }
}

//pegar os usuários. 
export async function getUsers() {
    try {
        const AllUsers = await fetch(`http://localhost:6278/users`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`
            }
        })

        const user = await AllUsers.json()

        return user;

    } catch (error) {
        console.log(error);
    }
}

//deletar um departamento. 
export async function deletedDep(id) {
    const depDeleted = await fetch(`http://localhost:6278/departments/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${tokenAdm}`
        }
    });

    const yesDepDeleted = await depDeleted.json();

    console.log(yesDepDeleted);

    return yesDepDeleted;
}

//editar um departamento
export async function editDep(id, bodyDescription) {
    try {
        const editedDep = await fetch(`http://localhost:6278/departments/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`
            },
            body: JSON.stringify(bodyDescription)
        });

        const yesEditedDep = await editedDep.json();

        console.log(yesEditedDep);

        return yesEditedDep;

    } catch (error) {
        console.error(error)
    }
}

//criar um departamento para uma empresa. 
export async function newDep(createdDep) {
    try {
        const newDepCreated = await fetch(`http://localhost:6278/departments`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`
            },
            body: JSON.stringify(createdDep)
        });

        const created = await newDepCreated.json();

        console.log(created);

        return created

    } catch (error) {
        console.error(error);
    }
}

//deletar um user
export async function deleteUser(id) {
    try {
        const userDeleted = await fetch(`http://localhost:6278/admin/delete_user/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`
            }
        })

        const deleted = await userDeleted.json();

        console.log(deleted)

    } catch (error) {
        console.error(error)
    }
}

//editar um user
export async function editUser(id, bodyUser) {
    try {
        const editedUser = await fetch(`http://localhost:6278/admin/update_user/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`
            },
            body: JSON.stringify(bodyUser)
        })

        const edit = await editedUser.json();

        console.log(edit);

        return edit;

    } catch (error) {
        console.error(error);
    }
}

//pegar a informação do usuário logado
export async function getProfileUser() {
    try {
        const profileLog = await fetch(`http://localhost:6278/users/profile`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`
            }
        })

        const logg = await profileLog.json();

        return logg;

    } catch (error) {
        console.error(error);
    }
}

//requisicao de um usuario poder mudar seu perfil
export async function editMyUserProfile(userBody) {
    try {
        const userEdit = await fetch(`http://localhost:6278/users`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`
            },
            body: JSON.stringify(userBody)
        })

        const edited = await userEdit.json();

        console.log(edited)

        return edited;

    } catch (error) {
        console.error(error);
    }
}

//requisição p contratar os users sem trampo. 
export async function hireEmployees(userHire) {
    try {
        const newHire = await fetch(`http://localhost:6278/departments/hire/`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`
            },
            body: JSON.stringify(userHire)
        })

        const hired = await newHire.json();

        console.log(hired)

        return hired;

    } catch (error) {
        console.error(error);
    }
}

//req para ver os users sem trampo.
export async function getUsersOutOfWork() {
    try {
        const unemployed = await fetch(`http://localhost:6278/admin/out_of_work`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`
            }
        })

        const user = await unemployed.json();

        return user;

    } catch (error) {
        console.error(error);
    }
}

//req para ver os funcionarios trabalhando na empresa. 
export async function getCoworkers() {
    try {
        const workers = await fetch(`http://localhost:6278/users/departments/coworkers`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`
            }
        })

        const coWorkers = await workers.json();

        return coWorkers;

    } catch (error) {
        console.log(error)
    }
}

//req para demitir um funcionário 
export async function dissmisUser(id) {
    try {
        const dissmiss = await fetch(`http://localhost:6278/departments/dismiss/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`
            }
        })
        const diss = await dissmiss.json();

        return diss;

    } catch (error) {
        console.log(error);
    }
}

//requisição pra pegar informação da empresa
export async function userDepartment() {
    try {
        const infoDep = await fetch(`http://localhost:6278/users/departments`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenAdm}`
            }
        })

        const infoUser = await infoDep.json();

        return infoUser;
    } catch (error) {
        console.log(error);
    }
}
var emailValid = false;
var passwordEqual = false;

function register() {
    if (!validateRegisterFields()) {
        return
    }
    if (!emailValid) {
        alertify.alert('Atenção!', 'Por favor, insira um e-mail válido.');
        return
    }
    if (!passwordEqual) {
        alertify.alert('Atenção!', 'Por favor, insira a mesma senha no campo "Confirmação de senha".');
        return
    }

    ajaxData['adm'] = false;
    ajaxData['active'] = true;
    $.ajax({
        type: "POST", url: "/api/users/create/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert('Atenção!', 'E-mail ou Cpf já estão sendo usados!');
            return
        } else {
            localStorage.setItem('loggedUserName', ajaxData['firstName']);
            localStorage.setItem('loggedUserLastName', ajaxData['lastName']);
            localStorage.setItem('loggedUserEmail', ajaxData['email']);
            window.location.href = "./home.html";
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação no momento.');
        return
    });

}

function login() {
    var email = $('#email').val();
    var password = $('#password').val();

    if (!email) {
        alertify.alert('Atenção!', 'Favor preencha o campo "E-mail".');
        return
    }
    if (!password) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Senha".');
        return
    }

    if (!emailValid) {
        alertify.alert('Atenção!', 'Por favor, insira um e-mail válido.');
        return
    }

    ajaxData = {};
    ajaxData['email'] = email;
    ajaxData['password'] = password;

    $.ajax({
        type: "POST", url: "/api/users/login/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert('Atenção!', 'E-mail ou senha incorretos.');
            return
        } else {
            if (!res.active) {
                alertify.alert('Atenção!', 'Este usuário está inativo, favor entrar em contato com um administrador.');
                return
            }
            localStorage.setItem('loggedUserName', res.firstName);
            localStorage.setItem('loggedUserEmail', res.email);
            localStorage.setItem('loggedUserNameLvl', res.adm);
            $.redirect("/home.html", { currentUser: res.firstName, currentEmail: res.email, currentAdmlvl: res.adm }, 'POST');
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação.');
        return
    });
}

function listUser() {
    if (!$("#userTableList").hasClass("tableListed") && localStorage.loggedUserNameLvl == "true") {
        $.ajax({
            type: "POST", url: "/api/users/list/"
        }).done(function (res) {
            if (!res) {
                alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                ajaxData = {};
                ajaxData = res;
                $('#userManageButtonCreate').prop("disabled", false);
                $('#userManageButtonList').prop("disabled", true);
                $("#userTableList").removeClass("hidden").addClass("tableListed");
                $("#userTableCreate").addClass("hidden");

                var len = ajaxData.length;
                for (var i = 0; i < len; i++) {

                    var email = ajaxData[i].email;
                    var name = ajaxData[i].firstName;
                    var lastname = ajaxData[i].lastName;
                    var cpf = ajaxData[i].cpf;
                    var phone = ajaxData[i].phone;
                    var active = ajaxData[i].active;
                    var adm = ajaxData[i].adm;
                    buttonEmail = "'" + email + "'";
                    var editButton = '<button type="button" onclick="showUpdateUser(' + buttonEmail + ')" class="btn btn-primary btn-flat">Editar</button>';

                    if (active == true) {
                        active = '<span class="fa fa-check" aria-hidden="true"></span>'
                    } else {
                        active = '<span class="fa fa-times" aria-hidden="true"></span>'
                    }
                    if (adm == true) {
                        adm = '<span class="fa fa-check" aria-hidden="true"></span>'
                    } else {
                        adm = '<span class="fa fa-times" aria-hidden="true"></span>';
                    }

                    $("#userTableList").append(
                        "<tr class='listed'>" +
                        "<td>" + name + "</td>" +
                        "<td>" + lastname + "</td>" +
                        "<td>" + cpf + "</td>" +
                        "<td>" + email + "</td>" +
                        "<td>" + phone + "</td>" +
                        "<td>" + active + "</td>" +
                        "<td>" + adm + "</td>" +
                        "<td>" + editButton + "</td>" +
                        "</tr>");

                }
            }

        })
        //insert list on data table after all page is loaded to avoid errors
        setTimeout(function(){ $('#userTableList').DataTable(); }, 300);
    }
}

function registerByAdm() {
    if (!validateRegisterFields()) {
        return
    }
    if (!emailValid) {
        alertify.alert('Atenção!', 'Por favor, insira um e-mail válido.');
        return
    }
    if (!passwordEqual) {
        alertify.alert('Atenção!', 'Por favor, insira a mesma senha no campo "Confirmação de senha".');
        return
    }

    ajaxData['active'] = true;
    ajaxData['adm'] = $('#adm').val();
    $.ajax({
        type: "POST", url: "/api/users/create/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert('Atenção!', 'E-mail ou Cpf já estão sendo usados!');
            return
        } else {
            alertify.alert('Atenção!', 'Usuário criado com sucesso!', function () { window.location.href = "./manageUser.html" });
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação no momento.');
        return
    });

}

function findUserForUpdate(userEmail) {
    if (localStorage.loggedUserNameLvl == "true") {
        ajaxData = {};
        ajaxData['email'] = userEmail;

        $.ajax({
            type: "POST", url: "/api/users/find/",
            data: ajaxData
        }).done(function (res) {
            if (!res) {
                alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                ajaxData = {};
                ajaxData = res;

                if (!ajaxData['active']) {
                    $('#activeUp').val("false");
                } else {
                    $('#activeUp').val("true");
                }
                if (!ajaxData['adm']) {
                    $('#admUp').val("false");
                } else {
                    $('#admUp').val("true");
                }
                $('#firstNameUp').val(ajaxData['firstName']);
                $('#lastNameUp').val(ajaxData['lastName']);
                $('#emailUp').val(ajaxData['email']);
                $('#cpfUp').val(ajaxData['cpf']);
                $('#phoneUp').val(ajaxData['phone']);
            }

        })
    }
}

function updateUser() {
    if (!validateUpdateFields()) {
        return
    }
    $.ajax({
        type: "POST", url: "/api/users/update/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert(res);
            return
        } else {
            alertify.alert('Atenção!', 'Usuário atualizado com sucesso!', function () { window.location.href = "./manageUser.html" });
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação no momento.');
        return
    });

}
function sendEmail() {

    ajaxData = {};
    ajaxData['email'] = $('#emailForRecovery').val();
    console.log(ajaxData)

    $.ajax({
        type: "POST", url: "/api/users/find/",
        data: ajaxData
    }).done(function (res) {
        if (!res|| res =='') {
            alertify.alert('Atenção!', 'E-mail não encontrado!', function () { window.location.href = "./forgotPass.html" });

        }
    })

    $.ajax({
        type: "POST", url: "/api/recoverpass/sendtoken/",
        data: ajaxData
    }).done(function (res) {
        if (!res|| res =='') {
            alertify.alert('Atenção!', 'Houve algum problema ao mandar código de autenticação, favor tentar novamento em alguns minutos!', function () { window.location.href = "./forgotPass.html" });
        } else {
            window.location.href = "./insertPass.html";
        }
    })
}
function insertToken() {

    ajaxData = {};
    ajaxData['token'] = $('#inputToken').val();
    console.log(ajaxData)

    $.ajax({
        type: "POST", url: "/api/users/readtorecoverUser/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert('Atenção!', 'Token inválido');
            return
        } else {
            window.location.href = "./changePass.html";
        }
    })
}
function changePass() {
    
    if (!passwordEqual) {
        alertify.alert('Atenção!', 'Por favor, insira a mesma senha no campo "Confirmação de senha".');
        return
    }

    ajaxData = {};
    ajaxData['password'] = $('#password').val();

    $.ajax({
        type: "POST", url: "/api/users/updatepassrecovered/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert('Atenção!', 'Token inválido');
            return
        } else {
            alertify.alert('Atenção!', 'Senha alterada com sucesso, favor faça login para continuar!', function () { window.location.href = "./logout" });
        }
    })
}
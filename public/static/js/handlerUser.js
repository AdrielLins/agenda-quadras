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
            if(!res.active){
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
                alertify.alert('Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                ajaxData = {};
                ajaxData = res;
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
            alertify.alert('Usuário criado com sucesso!', function () { alertify.success(window.location.href = "./manageUser.html"); });
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
                alertify.alert('Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                ajaxData = {};
                ajaxData = res;

                var email = ajaxData['email'];
                var name = ajaxData['firstName'];
                var lastname = ajaxData['lastName'];
                var cpf = ajaxData['cpf'];
                var phone = ajaxData['phone'];
                var password = ajaxData['password'];
                var active = ajaxData['active'];
                var adm = ajaxData['adm'];

                $('#firstNameUp').val(name);
                $('#lastNameUp').val(lastname);
                $('#emailUp').val(email);
                $('#cpfUp').val(cpf);
                $('#phoneUp').val(phone);
                $('#activeUp').val(active);
                $('#admUp').val(adm);             

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
            alertify.alert('Usuário atualizado com sucesso!', function () { alertify.success(window.location.href = "./manageUser.html"); });
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação no momento.');
        return
    });

}
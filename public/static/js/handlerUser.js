var emailValid = false;
var passwordEqual = false;

function register() {
    if (!validateRegisterFields()) {
        return
    }
    if(!emailValid){
        alertify.alert('Atenção!', 'Por favor, insira um e-mail válido.');
        return
    }
    if(!passwordEqual){
        alertify.alert('Atenção!', 'Por favor, insira a mesma senha no campo "Confirmação de senha".');
        return
    }

    ajaxData['adm'] = false;
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
    
    if(!emailValid){
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
            localStorage.setItem('loggedUserName', res.firstName);
            localStorage.setItem('loggedUserLastName', res.lastName);
            localStorage.setItem('loggedUserEmail', res.email);
            localStorage.setItem('loggedUserLevel', res.adm);
            window.location.href = "./home.html";
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação.');
        return
    });
}
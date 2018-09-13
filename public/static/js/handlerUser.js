function login() {
    var email = $('#userEmail').val();
    var senha = $('#userPassword').val();

    if (!email) {
        alertify.alert('Atenção!', 'Favor preencha o campo de email.');
        return
    }
    if (!senha) {
        alertify.alert('Atenção!', 'Favor preencha o campo de senha.');
        return
    }

    ajaxData = {};
    ajaxData['email'] = email;
    ajaxData['password'] = senha;

    $.ajax({
        type: "POST", url: "/api/users/find/",
        data: ajaxData
    }).done(function (res) {
        console.log(res)
        if (!res) {
            alertify.alert('Atenção!', 'E-mail ou senha inválidos.');
            return
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação.');
        return
    });
}

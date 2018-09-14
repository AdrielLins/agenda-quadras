function login() {
    var email = $('#email').val();
    var senha = $('#senha').val();

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

function isValidEmailAddress() {
    var email = $("#email").val();
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if(!pattern.test(email)){
        alertify.error('Este não é um e-mail válido!');
    }
    return 
}
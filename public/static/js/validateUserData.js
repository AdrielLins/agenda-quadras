var passwordEqual = false;

function isEqualPassword() {
    var password = $("#password").val();
    var passwordConfirm = $("#passwordConfirm").val();


    if (password == passwordConfirm) {
        passwordEqual = true;
    } else {
        alertify.error('As senhas não coincidem!');
    }
    return passwordEqual
}

function validateUpdateFields() {

    var firstName = $('#firstNameUp').val();
    var lastName = $('#lastNameUp').val();
    var cpf = $('#cpfUp').val();
    var phone = $('#phoneUp').val();
    var password = $('#passwordUp').val();

    if (!firstName) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Nome".');
        return false;
    }
    if (!lastName) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Sobrenome".');
        return false;
    }
    if (!phone) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Telefone".');
        return false;
    }
    if (password.length >= 1 && password.length < 6) {
        alertify.alert('Atenção!', 'A senha deve ter no mínimo seis caracteres!');
        return false;
    } if (!isEqualPassword()) {
        alertify.alert('Atenção!', 'As senhas não coincidem!');
        return false;
    }

    ajaxData = {};

    ajaxData['firstName'] = firstName;
    ajaxData['lastName'] = lastName;
    ajaxData['cpf'] = cpf;
    ajaxData['phone'] = phone;
    ajaxData['password'] = password;

    return ajaxData;
}
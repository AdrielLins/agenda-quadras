var emailValid = false;
var passwordEqual = false;

function isValidEmailAddress() {
    var email = $("#email").val();
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!email) {
        //is blank e-mail
        emailValid = true;
        return emailValid
    }
    if (!pattern.test(email)) {
        alertify.error('Este não é um e-mail válido!');
    } else {
        emailValid = true;
    }
    return emailValid
}
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

function validateRegisterFields() {

    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();
    var cpf = $('#cpf').val();
    var phone = $('#phone').val();
    var password = $('#password').val();

    if (!firstName) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Nome".');
        return false;
    }
    if (!lastName) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Sobrenome".');
        return false;
    }
    if (!cpf) {
        alertify.alert('Atenção!', 'Favor preencha o campo de "CPF".');
        return false;
    }
    if (!email) {
        alertify.alert('Atenção!', 'Favor preencha o campo "E-mail".');
        return false;
    }
    if (!phone) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Telefone".');
        return false;
    }
    if (!password) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Senha".');
        return false;
    }
    ajaxData = {};

    ajaxData['firstName'] = firstName;
    ajaxData['lastName'] = lastName;
    ajaxData['cpf'] = cpf;
    ajaxData['email'] = email;
    ajaxData['phone'] = phone;
    ajaxData['password'] = password;

    return ajaxData;
}
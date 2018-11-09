var passwordEqual = false;

function findUserForUpdate() {
    ajaxData = {};
    $.ajax({
        type: "POST", url: "/api/users/currentFind/",
    }).done(function (res) {
        if (!res) {
            alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
            return
        } else {
            ajaxData = {};
            ajaxData = res;

            $('#firstNameUp').val(ajaxData['firstName']);
            $('#lastNameUp').val(ajaxData['lastName']);
            $('#emailUp').val(ajaxData['email']);
            $('#cpfUp').val(ajaxData['cpf']);
            $('#phoneUp').val(ajaxData['phone']);
        }

    })
}


function updateUser() {
    if (!validateUpdateFields()) {
        return
    }
    $.ajax({
        type: "POST", url: "/api/users/updateCurrent/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert(res);
            return
        } else {
            alertify.alert('Atenção!', 'Dados atualizados com sucesso!', function () { alertify.success(window.location.href = "./userData.html"); });
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação no momento.');
        return
    });

}
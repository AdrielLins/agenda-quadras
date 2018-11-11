function listField() {
    if (!$("#fieldTableList").hasClass("tableListed") && localStorage.loggedUserNameLvl == "true") {
        $.ajax({
            type: "POST", url: "/api/fields/list/"
        }).done(function (res) {
            if (!res) {
                alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                ajaxData = {};
                ajaxData = res;
                $("#fieldTableList").removeClass("hidden").addClass("tableListed");
                $("#fieldTableCreate").addClass("hidden");
                $('#fieldManageButtonCreate').prop("disabled", false);
                $('#fieldManageButtonList').prop("disabled", true);

                var len = ajaxData.length;
                for (var i = 0; i < len; i++) {

                    var numero = ajaxData[i].numero;
                    var descricao = ajaxData[i].descricao;
                    buttonNumero = "'" + numero + "'";
                    var editButton = '<button type="button" onclick="showUpdateField(' + buttonNumero + ')" class="btn btn-primary btn-flat">Editar</button>';

                    $("#fieldTableList").append(
                        "<tr class='listed'>" +
                        "<td>" + numero + "</td>" +
                        "<td>" + descricao + "</td>" +
                        "<td>" + editButton + "</td>" +
                        "</tr>");

                }
            }

        })
    }
}

function registerFieldByAdm() {
    if (!validateRegisterFields()) {
        return
    }

    $.ajax({
        type: "POST", url: "/api/fields/create/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert('Atenção!', 'Este número já está sendo usado!');
            return
        } else {
            alertify.alert('Atenção!', 'Quadra criada com sucesso!', function () { alertify.success(window.location.href = "./manageField.html"); });
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação no momento.');
        return
    });

}

function findFieldForUpdate(fieldNumber) {
    if (localStorage.loggedUserNameLvl == "true") {
        ajaxData = {};
        ajaxData['numero'] = fieldNumber;

        $.ajax({
            type: "POST", url: "/api/fields/find/",
            data: ajaxData
        }).done(function (res) {
            if (!res) {
                alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                ajaxData = {};
                ajaxData = res;

                var numero = ajaxData['numero'];
                var descricao = ajaxData['descricao'];

                $('#numeroUp').val(numero);
                $('#descricaoUp').val(descricao);

            }

        })
    }
}

function updateField() {
    if (!validateUpdateFields()) {
        return
    }
    $.ajax({
        type: "POST", url: "/api/fields/update/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert(res);
            return
        } else {
            alertify.alert('Atenção!', 'Quadra atualizada com sucesso!', function () { alertify.success(window.location.href = "./manageField.html"); });
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação no momento.');
        return
    });

}
function listSport() {
    if (!$("#sportTableList").hasClass("tableListed") && localStorage.loggedUserNameLvl == "true") {
        $.ajax({
            type: "POST", url: "/api/sports/list/"
        }).done(function (res) {
            if (!res) {
                alertify.alert('Atenção!','Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                ajaxData = {};
                ajaxData = res;
                $("#sportTableList").removeClass("hidden").addClass("tableListed");
                $("#sportTableCreate").addClass("hidden");

                var len = ajaxData.length;
                for (var i = 0; i < len; i++) {

                    var id = ajaxData[i]._id;
                    var valor = ajaxData[i].valor;
                    var modalidade = ajaxData[i].modalidade;
                    buttonModalidade = "'" + id + "'";
                    var editButton = '<button type="button" onclick="showUpdateSport(' + buttonModalidade + ')" class="btn btn-primary btn-flat">Editar</button>';

                    $("#sportTableList").append(
                        "<tr class='listed'>" +
                        "<td>R$ " + valor + "</td>" +
                        "<td>" + modalidade + "</td>" +
                        "<td>" + editButton + "</td>" +
                        "</tr>");

                }
            }

        })
    }
}

function registerSportByAdm() {
    if (!validateRegisterSports()) {
        return
    }

    $.ajax({
        type: "POST", url: "/api/sports/create/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert('Atenção!', 'Esta modalidade já está sendo usada!');
            return
        } else {
            alertify.alert('Atenção!','Esporte criado com sucesso!', function () { alertify.success(window.location.href = "./manageSport.html"); });
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação no momento.');
        return
    });

}

function findSportForUpdate(sportUpdate) {
    if (localStorage.loggedUserNameLvl == "true") {
        ajaxData = {};
        ajaxData['_id'] = sportUpdate;

        $.ajax({
            type: "POST", url: "/api/sports/find/",
            data: ajaxData
        }).done(function (res) {
            if (!res) {
                alertify.alert('Atenção!','Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                ajaxData = {};
                ajaxData = res;

                var _id = ajaxData['_id'];
                var valor = ajaxData['valor'];
                var modalidade = ajaxData['modalidade'];

                $('#sport_IdUp').val(_id);
                $('#valorUp').val(valor);
                $('#modalidadeUp').val(modalidade);

            }

        })
    }
}

function updateSport() {
    if (!validateUpdateSports()) {
        return
    }
    $.ajax({
        type: "POST", url: "/api/sports/update/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert(res);
            return
        } else {
            alertify.alert('Atenção!','Esporte atualizado com sucesso!', function () { alertify.success(window.location.href = "./manageSport.html"); });
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação no momento.');
        return
    });

}
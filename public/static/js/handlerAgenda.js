//listar todos os horários
function listAgenda() {
    if (!$("#agendaTableList").hasClass("tableListed") && localStorage.loggedUserNameLvl == "true") {
        $.ajax({
            type: "POST", url: "/api/agendas/list/"
        }).done(function (res) {
            if (!res) {
                alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                ajaxData = {};
                ajaxData = res;
                $("#agendaTableList").removeClass("hidden").addClass("tableListed");
                $("#agendaTableCreate").addClass("hidden");

                var len = ajaxData.length;
                for (var i = 0; i < len; i++) {

                    var id = ajaxData[i]._id;
                    var dateAgendaCombined = ajaxData[i].dateAgenda;
                    var quadraNumero = ajaxData[i].quadraNumero;
                    var esporteValor = ajaxData[i].esporteValor;
                    var esporteModalidade = ajaxData[i].esporteModalidade;
                    var status = ajaxData[i].status;
                    var userEmail = ajaxData[i].userEmail;
                    var resultado = ajaxData[i].resultado;
                    buttonModalidade = "'" + id + "'";
                    var editButton = '<button type="button" onclick="showUpdateAgenda(' + buttonModalidade + ')" class="btn btn-primary btn-flat">Editar</button>';

                    dateAgendaSplited = dateAgendaCombined.split("T");

                    var agendaDay = "<input type='date' disabled value='" + dateAgendaSplited[0] + "'>";
                    var agendaHour = "<input type='text' disabled value='" + dateAgendaSplited[1] + "'>";



                    if (userEmail == undefined) {
                        userEmail = "Sem usuário vinculado"
                    }
                    if (resultado == undefined) {
                        resultado = "Sem resultado disponível"
                    }

                    $("#agendaTableList").append(
                        "<tr class='listed'>" +
                        "<td> " + agendaDay + "</td>" +
                        "<td> " + agendaHour + "</td>" +
                        "<td> " + quadraNumero + "</td>" +
                        "<td>R$ " + esporteValor + "</td>" +
                        "<td> " + esporteModalidade + "</td>" +
                        "<td> " + status + "</td>" +
                        "<td> " + resultado + "</td>" +
                        "<td> " + userEmail + "</td>" +
                        "<td>" + editButton + "</td>" +
                        "</tr>");

                }

            }

        })
    }
}


function registerAgendaByAdm() {

    //get form values
    var combinedSport = $('#esporteModalidade').val();
    var dayAgenda = $('#dayAgenda').val();
    var hourAgenda = $('#hourAgenda').val();
    var quadraNumero = $('#quadraNumero').val();
    var status = $('#status').val();
    var userEmail = $('#userEmail').val();

    //transform hour and date on ISODate
    var dateAgenda = dayAgenda + hourAgenda

    //split combinedSports into an array to get valor and modalidade separated      
    var sportSplited = combinedSport.split("-");

    //prepare data to send by ajax
    ajaxData = {};
    ajaxData['dateAgenda'] = dateAgenda;
    ajaxData['hourAgenda'] = hourAgenda;
    ajaxData['esporteModalidade'] = sportSplited[0];
    ajaxData['esporteValor'] = sportSplited[1];
    ajaxData['quadraNumero'] = quadraNumero;
    ajaxData['status'] = status;

    if (userEmail) {
        ajaxData['userEmail'] = userEmail;
    }

    $.ajax({
        type: "POST", url: "/api/agendas/create/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert('Atenção!', 'Este horário e quadra já está em uso!');
            return
        } else {
            alertify.alert('Agenda criada com sucesso!', function () { alertify.success(window.location.href = "./manageAgenda.html"); });
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação no momento.');
        return
    });

}
//update de um horário
function findAgendaForUpdate(agendaUpdate) {
    $('#registerByAdm').prop("disabled", true)
    if (localStorage.loggedUserNameLvl == "true") {
        ajaxData = {};
        ajaxData['_id'] = agendaUpdate;

        $.ajax({
            type: "POST", url: "/api/agendas/find/",
            data: ajaxData
        }).done(function (res) {
            if (!res) {
                alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                ajaxData = {};
                ajaxData = res;

                var _id = ajaxData['_id'];
                var dateAgenda = ajaxData['dateAgenda'];
                var quadraNumero = ajaxData['quadraNumero'];
                var esporteValor = ajaxData['esporteValor'];
                var esporteModalidade = ajaxData['esporteModalidade'];
                var status = ajaxData['status'];
                var userEmail = ajaxData['userEmail'];
                var resultado = ajaxData['resultado'];

                $('#agenda_IdUp').val(_id);
                $('#dateAgendaUp').val(dateAgenda);
                $('#quadraNumeroUp').val(quadraNumero);
                $('#esporteValorUp').val(esporteValor);
                $('#esporteModalidadeUp').val(esporteModalidade);
                $('#statusUp').val(status);
                $('#userEmailUp').val(userEmail);
                $('#resultadoUp').val(resultado);

            }

        })
        $('#registerByAdm').prop("disabled", false)
    }
}
//atualizar horários existentes
function updateAgenda() {
    if (!validateUpdateAgendas()) {
        return
    }
    $.ajax({
        type: "POST", url: "/api/agendas/update/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert(res);
            return
        } else {
            alertify.alert('Agenda atualizada com sucesso!', function () { alertify.success(window.location.href = "./manageAgenda.html"); });
        }
    }).fail(function (err) {
        alertify.alert('Erro', 'Não foi possível realizar esta solicitação no momento.');
        return
    });

}
//criar novos horários
function listFieldsToCreateAgenda() {
    if (localStorage.loggedUserNameLvl == "true") {
        //popular campo de quadras
        $.ajax({
            type: "POST", url: "/api/fields/list/"
        }).done(function (res) {
            if (!res) {
                alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                ajaxData = {};
                ajaxData = res;
                var len = ajaxData.length;
                for (var i = 0; i < len; i++) {
                    var numero = ajaxData[i].numero;
                    var descricao = ajaxData[i].descricao;

                    $("#quadraNumero").append("<option value='" + numero + "'>" + numero + " - " + descricao + "</option>");

                }
            }

        })

        //popular campo de esportes
        $.ajax({
            type: "POST", url: "/api/sports/list/"
        }).done(function (res) {
            if (!res) {
                alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                ajaxData = {};
                ajaxData = res;
                var len = ajaxData.length;
                for (var i = 0; i < len; i++) {

                    var _id = ajaxData[i]._id;
                    var modalidade = ajaxData[i].modalidade;
                    var valor = ajaxData[i].valor;
                    var combinedSport = modalidade + '-' + valor
                    $("#esporteModalidade").append("<option value='" + combinedSport + "'>" + modalidade + " - R$: " + valor + "</option>");

                }
            }

        })

        //popular campo de usuários
        $.ajax({
            type: "POST", url: "/api/users/list/"
        }).done(function (res) {
            if (!res) {
                alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                ajaxData = {};
                ajaxData = res;
                var len = ajaxData.length;
                for (var i = 0; i < len; i++) {

                    var _id = ajaxData[i]._id;
                    var email = ajaxData[i].email;

                    $("#userEmail").append("<option value='" + email + "'>" + email + "</option>");

                }
            }

        })
    }

}
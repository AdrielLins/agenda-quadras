//listar todos os horários disponíveis para o usuário
function listAvaliableAgenda() {
    if (!$("#agendaTableList").hasClass("tableListed")) {
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

                    var status = ajaxData[i].status;
                    var userEmail = ajaxData[i].userEmail;

                    if (status != "Disponível" || userEmail != undefined) {
                        continue
                    }

                    var id = ajaxData[i]._id;
                    var dateAgendaCombined = ajaxData[i].dateAgenda;
                    var quadraNumero = ajaxData[i].quadraNumero;
                    var esporteValor = ajaxData[i].esporteValor;
                    var esporteModalidade = ajaxData[i].esporteModalidade;
                    var resultado = ajaxData[i].resultado;
                    buttonAgendaId = "'" + id + "'";

                    dateAgendaSplited = dateAgendaCombined.split("T");
                    var hourAgendaSplited = dateAgendaSplited[1].split(":00.000Z");
                    var editButton = '<button type="button" onclick="setAgendaForUser(' + buttonAgendaId + ')" class="btn btn-primary btn-flat">Agendar</button>';

                    var totalTime = hourAgendaSplited[0].split(":");
                    totalTime = parseInt(totalTime[0]) + 1;
                    if (totalTime == 24) {
                        totalTime = "00:00";
                    } else {
                        totalTime = String(totalTime) + ":00";
                    }
                    var agendaDay = "<input  style='border: none;background: white' type='date' disabled value='" + dateAgendaSplited[0] + "'>";
                    var agendaHour = "<input type='text' style='border: none;background: white' disabled value='" + hourAgendaSplited[0] + " - " + totalTime +  "'>";

                    $("#agendaTableList").append(
                        "<tr class='listed'>" +
                        "<td> " + agendaDay + "</td>" +
                        "<td> " + agendaHour +  "</td>" +
                        "<td> " + quadraNumero + "</td>" +
                        "<td>R$ " + esporteValor + "</td>" +
                        "<td> " + esporteModalidade + "</td>" +
                        "<td>" + editButton + "</td>" +
                        "</tr>");

                }

            }

        })
    }
}
// setar agendamento para o usuário
function setAgendaForUser(agendaId){
    ajaxData = {};
    ajaxData['_id'] = agendaId;
    $.ajax({
        type: "POST", url: "/api/agendas/setAgenda/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert('Erro', 'Não foi possível realizar esta solicitação no momento.');
            return
        } else {
            alertify.alert('Horário marcado com sucesso!','O pagamento deve ser realizado no local, Bom jogo!', function () { alertify.success(window.location.href = "./agenda.html"); });
        }
    })
}
// listar agendamentos concluídos do usuário
function listFinishedAgenda(){
    $.ajax({
        type: "POST", url: "/api/agendas/listUserFinishedAgenda/"
    }).done(function (res) {
        if (!res) {
            alertify.alert('Erro', 'Não foi possível realizar esta solicitação no momento.');
            return
        } else {
            ajaxData = {};
            ajaxData = res;
            $("#agendaTableList").removeClass("hidden").addClass("tableListed");
            $("#agendaTableCreate").addClass("hidden");

            var len = ajaxData.length;
            for (var i = 0; i < len; i++) {

                var status = ajaxData[i].status;
                var userEmail = ajaxData[i].userEmail;

                if (status != "Disponível" || userEmail != undefined) {
                    continue
                }

                var id = ajaxData[i]._id;
                var dateAgendaCombined = ajaxData[i].dateAgenda;
                var quadraNumero = ajaxData[i].quadraNumero;
                var esporteValor = ajaxData[i].esporteValor;
                var esporteModalidade = ajaxData[i].esporteModalidade;
                var resultado = ajaxData[i].resultado;
                buttonAgendaId = "'" + id + "'";

                dateAgendaSplited = dateAgendaCombined.split("T");
                var hourAgendaSplited = dateAgendaSplited[1].split(":00.000Z");
                var editButton = '<button type="button" onclick="setAgendaForUser(' + buttonAgendaId + ')" class="btn btn-primary btn-flat">Agendar</button>';

                var totalTime = hourAgendaSplited[0].split(":");
                totalTime = parseInt(totalTime[0]) + 1;
                if (totalTime == 24) {
                    totalTime = "00:00";
                } else {
                    totalTime = String(totalTime) + ":00";
                }
                var agendaDay = "<input  style='border: none;background: white' type='date' disabled value='" + dateAgendaSplited[0] + "'>";
                var agendaHour = "<input type='text' style='border: none;background: white' disabled value='" + hourAgendaSplited[0] + " - " + totalTime +  "'>";

                $("#agendaTableList").append(
                    "<tr class='listed'>" +
                    "<td> " + agendaDay + "</td>" +
                    "<td> " + agendaHour +  "</td>" +
                    "<td> " + quadraNumero + "</td>" +
                    "<td>R$ " + esporteValor + "</td>" +
                    "<td> " + esporteModalidade + "</td>" +
                    "<td>" + editButton + "</td>" +
                    "</tr>");

            }

        }
    })
}
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
                $('#agendaManageButtonCreate').prop("disabled", false);
                $('#agendaManageButtonList').prop("disabled", true);

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
                    buttonAgendaId = "'" + id + "'";                    
                    
                    dateAgendaSplited = dateAgendaCombined.split("T");
                    var hourAgendaSplited = dateAgendaSplited[1].split(":00.000Z");
                    var editButton;
                    
                    if (!todayDate(dateAgendaSplited)) {
                        editButton = "Horário encerrado"
                    } else{
                        editButton = '<button type="button" onclick="showUpdateAgenda(' + buttonAgendaId + ')" class="btn btn-primary btn-flat">Editar</button>';
                    }
                    
                    var agendaDay = "<input  style='border: none;background: white' type='date' disabled value='" + dateAgendaSplited[0] + "'>";
                    var agendaHour = "<input type='time' style='border: none;background: white' disabled value='" + hourAgendaSplited[0] + "'>";


                    //style='border: none;background: white'
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
    var dayAgenda = $('#dayAgenda').val();
    
    if (!todayDate(dayAgenda)) {
        alertify.alert('Atenção!', 'Por favor, preencha uma data válida!');
        return
    }
    //get form values
    var combinedSport = $('#esporteModalidade').val();
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
    var ajaxDataAgenda = {};

    //desahabilita botão para update até popular todos os campos
    $('#updateAgendaByAdm').prop("disabled", true);

    $('#registerByAdm').prop("disabled", true)
    if (localStorage.loggedUserNameLvl == "true") {
        ajaxDataAgenda['_id'] = agendaUpdate;

        $.ajax({
            type: "POST", url: "/api/agendas/find/",
            data: ajaxDataAgenda
        }).done(function (res) {
            console.log(res);
            if (!res) {
                alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
                return
            } else {
                $('#agendaForUpdate').val(agendaUpdate);
                populateFieldsForUpdate(res);
            }

        })
    }
}

function populateFieldsForUpdate(agendaData) {
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

    $.ajax({
        type: "POST", url: "/api/fields/list/",
        async: false
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
                $("#quadraNumeroUp").append("<option value='" + numero + "'>" + numero + " - " + descricao + "</option>");
            }
            $("#quadraNumeroUp").val(agendaData['quadraNumero']);
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
                $("#esporteModalidadeUp").append("<option value='" + combinedSport + "'>" + modalidade + " - R$: " + valor + "</option>");
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

                var email = ajaxData[i].email;
                $("#userEmailUp").append("<option value='" + email + "'>" + email + "</option>");
            }

            $("#userEmailUp").val(agendaData['userEmail']);
        }

    })
    var dateAgendaSplited = agendaData['dateAgenda'].split("T");
    var hourAgendaSplited = dateAgendaSplited[1].split(":00.000Z");
    
    $("#statusUp").val(agendaData['status']);
    $("#resultadoUp").val(agendaData['resultado']);
    $("#dayAgendaUp").val(dateAgendaSplited[0]);
    $("#hourAgendaUp").val("T" + hourAgendaSplited[0]);

    //habilita botão para update após popular todos os campos
    $('#updateAgendaByAdm').prop("disabled", false);

}
//atualizar horários existentes
function updateAgenda(idAgenda) {
    if (!todayDate($('#dayAgendaUp').val())) {
        alertify.alert('Atenção!', 'Por favor, preencha uma data válida!');
        return
    }
    //get form values
    var combinedSport = $('#esporteModalidade').val();
    var dayAgenda = $('#dayAgendaUp').val();
    var hourAgenda = $('#hourAgendaUp').val();
    var quadraNumero = $('#quadraNumeroUp').val();
    var status = $('#statusUp').val();
    var userEmail = $('#userEmailUp').val();
    var resultado = $('#resultadoUp').val();

    //transform hour and date on ISODate
    var dateAgenda = dayAgenda + hourAgenda

    //split combinedSports into an array to get valor and modalidade separated      
    var sportSplited = combinedSport.split("-");

    //prepare data to send by ajax
    ajaxData = {};
    ajaxData['_id'] = $('#agendaForUpdate').val();
    ajaxData['dateAgenda'] = dateAgenda;
    ajaxData['esporteModalidade'] = sportSplited[0];
    ajaxData['esporteValor'] = sportSplited[1];
    ajaxData['quadraNumero'] = quadraNumero;
    ajaxData['status'] = status;

    if (userEmail) {
        ajaxData['userEmail'] = userEmail;
    }
    if (resultado) {
        ajaxData['resultado'] = resultado;
    }

    $.ajax({
        type: "POST", url: "/api/agendas/update/",
        data: ajaxData
    }).done(function (res) {
        if (!res) {
            alertify.alert(res);
            return
        } else {
            alertify.alert('Atenção!','Agenda atualizada com sucesso!', function () { alertify.success(window.location.href = "./manageAgenda.html"); });
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

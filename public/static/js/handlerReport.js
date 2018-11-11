function listBetweenAgendas() {
    $(".listed").remove();
    $("#extraInfo").remove();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    actualIsoDate = yyyy + "-" + mm + "-" + dd + "T00:00:00.000Z";
    futureIsoDate = yyyy + "-" + (mm + 1) + "-" + dd + "T00:00:00.000Z";

    ajaxData = {};
    ajaxData['startDate'] = actualIsoDate;
    ajaxData['endDate'] = futureIsoDate;

    $.ajax({
        type: "POST", url: "/api/agendas/listBetweenAgenda/",
        data: ajaxData,
    }).done(function (res) {
        if (!res) {
            alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
            return
        } else {
            ajaxData = {};
            ajaxData = res;

            $("#agendaReportsTableList").removeClass("hidden").addClass("tableListed");
            $("#usersReportsTableList").addClass("hidden").removeClass("tableListed");
            $("#paymentReportsTableList").addClass("hidden").removeClass("tableListed");
            
            $('#agendaManageButtonList').prop("disabled", true);
            $('#userManageButtonList').prop("disabled", false);
            $('#paymentManageButtonList').prop("disabled", false);

            //appears pdf button
            $("#exportpdfUser").addClass("hidden");
            $("#exportpdfPayment").addClass("hidden");
            $("#exportpdfAgenda").removeClass("hidden");

            var len = ajaxData.length;
            var countAgendas = 0
            for (var i = 0; i < len; i++) {

                var id = ajaxData[i]._id;
                var userEmail = ajaxData[i].userEmail;
                var dateAgendaCombined = ajaxData[i].dateAgenda;
                var quadraNumero = ajaxData[i].quadraNumero;
                var esporteValor = ajaxData[i].esporteValor;
                var esporteModalidade = ajaxData[i].esporteModalidade;
                var status = ajaxData[i].status;

                if (status != "Agendado") {
                    continue
                }
                countAgendas++
                dateAgendaSplited = dateAgendaCombined.split("T");
                var hourAgendaSplited = dateAgendaSplited[1].split(":00.000Z");

                var totalTime = hourAgendaSplited[0].split(":");
                totalTime = parseInt(totalTime[0]) + 1;

                if (totalTime == 24) {
                    totalTime = "00:00";
                } else {
                    totalTime = String(totalTime) + ":00";
                }

                var agendaDay = "<input  style='border: none;background: white' type='date' disabled value='" + dateAgendaSplited[0] + "'>";
                var agendaHour = "<input type='text' style='border: none;background: white' disabled value='" + hourAgendaSplited[0] + " - " + totalTime + "'>";

                $("#agendaReportsTableList").append(
                    "<tr class='listed'>" +
                    "<td> " + userEmail + "</td>" +
                    "<td> " + agendaDay + "</td>" +
                    "<td> " + agendaHour + "</td>" +
                    "<td> " + quadraNumero + "</td>" +
                    "<td>R$ " + esporteValor + "</td>" +
                    "<td> " + esporteModalidade + "</td>" +
                    "</tr>");

            }
            startDateCalc = dd + "/" + mm + "/" + yyyy;
            endDateDateCalc = dd + "/" + (mm + 1) + "/" + yyyy;

            var divCount = "<span id='extraInfo'><br><br><h3>Total de horários marcados entre " + startDateCalc + " - " + endDateDateCalc + " : " + countAgendas + "</h3><span>"

            $("#agendaReportsTableList").append(divCount);

        }

    })

}

function listUser() {
    $(".listed").remove();
    $("#extraInfo").remove();
    $.ajax({
        type: "POST", url: "/api/users/list/"
    }).done(function (res) {
        if (!res) {
            alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
            return
        } else {
            ajaxData = {};
            ajaxData = res;

            $("#usersReportsTableList").removeClass("hidden").addClass("tableListed");
            $("#agendaReportsTableList").addClass("hidden").removeClass("tableListed");
            $("#paymentReportsTableList").addClass("hidden").removeClass("tableListed");

            $('#agendaManageButtonList').prop("disabled", false);
            $('#userManageButtonList').prop("disabled", true);
            $('#paymentManageButtonList').prop("disabled", false);

            //appears pdf button
            $("#exportpdfAgenda").addClass("hidden");
            $("#exportpdfPayment").addClass("hidden");
            $("#exportpdfUser").removeClass("hidden");

            var len = ajaxData.length;
            for (var i = 0; i < len; i++) {

                var email = ajaxData[i].email;
                var name = ajaxData[i].firstName;
                var lastname = ajaxData[i].lastName;
                var cpf = ajaxData[i].cpf;
                var phone = ajaxData[i].phone;
                var active = ajaxData[i].active;

                if (active == true) {
                    active = '<span class="fa fa-check" aria-hidden="true"></span>'
                } else {
                    active = '<span class="fa fa-times" aria-hidden="true"></span>'
                }

                $("#usersReportsTableList").append(
                    "<tr class='listed'>" +
                    "<td>" + name + "</td>" +
                    "<td>" + lastname + "</td>" +
                    "<td>" + cpf + "</td>" +
                    "<td>" + email + "</td>" +
                    "<td>" + phone + "</td>" +
                    "</tr>");

            }

            var divCount = "<span id='extraInfo'><br><br><h3>Total de usuários registrados: " + len + "</h3></span>"

            $("#usersReportsTableList").append(divCount);
        }

    })
}

function lisPaymenttUser() {
    $(".listed").remove();
    $("#extraInfo").remove();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    actualIsoDate = yyyy + "-" + mm + "-" + dd + "T00:00:00.000Z";

    ajaxData = {};
    ajaxData['startDate'] = "2000-01-01T04:00:00.000Z";//old date
    ajaxData['endDate'] = actualIsoDate;//get all agendas until today

    $.ajax({
        type: "POST", url: "/api/agendas/listBetweenAgenda/",
        data: ajaxData,
    }).done(function (res) {
        if (!res) {
            alertify.alert('Atenção!', 'Desculpe, tivemos algum erro no sistema :(');
            return
        } else {
            ajaxData = {};
            ajaxData = res;

            $("#paymentReportsTableList").removeClass("hidden").addClass("tableListed");
            $("#usersReportsTableList").addClass("hidden").removeClass("tableListed");
            $("#agendaReportsTableList").addClass("hidden").removeClass("tableListed");

            $('#userManageButtonList').prop("disabled", false);
            $('#agendaManageButtonList').prop("disabled", false);
            $('#paymentManageButtonList').prop("disabled", true);

            //appears pdf button
            $("#exportpdfUser").addClass("hidden");
            $("#exportpdfAgenda").addClass("hidden");
            $("#exportpdfPayment").removeClass("hidden");

            var len = ajaxData.length;
            var countUsers = 0;
            var totalVal = 0;
            for (var i = 0; i < len; i++) {

                var id = ajaxData[i]._id;
                var userEmail = ajaxData[i].userEmail;
                var dateAgendaCombined = ajaxData[i].dateAgenda;
                var quadraNumero = ajaxData[i].quadraNumero;
                var esporteValor = ajaxData[i].esporteValor;
                var esporteModalidade = ajaxData[i].esporteModalidade;
                var status = ajaxData[i].status;

                if (status != "Agendado") {
                    continue
                }
                countUsers++
                totalVal = totalVal + parseFloat(esporteValor);
                dateAgendaSplited = dateAgendaCombined.split("T");
                var hourAgendaSplited = dateAgendaSplited[1].split(":00.000Z");

                var totalTime = hourAgendaSplited[0].split(":");
                totalTime = parseInt(totalTime[0]) + 1;

                if (totalTime == 24) {
                    totalTime = "00:00";
                } else {
                    totalTime = String(totalTime) + ":00";
                }

                var agendaDay = "<input  style='border: none;background: white' type='date' disabled value='" + dateAgendaSplited[0] + "'>";
                var agendaHour = "<input type='text' style='border: none;background: white' disabled value='" + hourAgendaSplited[0] + " - " + totalTime + "'>";

                $("#paymentReportsTableList").append(
                    "<tr class='listed'>" +
                    "<td> " + userEmail + "</td>" +
                    "<td> " + agendaDay + "</td>" +
                    "<td> " + agendaHour + "</td>" +
                    "<td> " + quadraNumero + "</td>" +
                    "<td>R$ " + esporteValor + "</td>" +
                    "<td> " + esporteModalidade + "</td>" +
                    "</tr>");

            }
            var divCount = "<span id='extraInfo'><br><br><h3>Total de usuários inadimplentes: " + countUsers + "</h3><br><h3>Total devido pelos usuários: R$" + totalVal + "</h3></span>"

            $("#paymentReportsTableList").append(divCount);

        }

    })

}

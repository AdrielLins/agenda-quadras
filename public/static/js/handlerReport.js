var contInfoList = 0;
var totalDebit = 0;

function listBetweenAgendas() {
    $(".listed").remove();
    var table = $('#usersReportsTableList').DataTable();
    var tableTwo = $('#paymentReportsTableList').DataTable();
    table.destroy();
    tableTwo.destroy();

    $("#extraInfo").remove();

    var dateStart = $('#dateStart').val();
    var dateEnd = $('#dateEnd').val();
    var initalIsodate = dateStart + "T00:00:00.000Z";
    var finalIsoDate = dateEnd + "T00:00:00.000Z";

    ajaxData = {};
    ajaxData['startDate'] = initalIsodate;
    ajaxData['endDate'] = finalIsoDate;

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

                var agendaDay = dateAgendaSplited[0];
                var splitDay = agendaDay.split("-")

                var day = splitDay[2];
                var month = splitDay[1];
                var year = splitDay[0];

                dateToShow = day + "/" + month + "/" + year;

                var agendaHour = hourAgendaSplited[0].toString() + " - " + totalTime.toString();

                $("#agendaReportsTableList").append(
                    "<tr class='listed'>" +
                    "<td> " + userEmail + "</td>" +
                    "<td> " + dateToShow + "</td>" +
                    "<td> " + agendaHour + "</td>" +
                    "<td> " + quadraNumero + "</td>" +
                    "<td>R$ " + esporteValor + "</td>" +
                    "<td> " + esporteModalidade + "</td>" +
                    "</tr>");

            }
            if(countAgendas > 0){
                var divCount = "<span id='extraInfo'><br><br><h3>Total de horários marcados neste período: " + countAgendas + "</h3><span>"
                contInfoList = countAgendas;
                $("#agendaReportsTableList").append(divCount);
            }
        }

    })
    //insert list on data table after all page is loaded to avoid errors
    setTimeout(function(){ $('#agendaReportsTableList').DataTable(); }, 300);

}

function listUser() {
    $(".listed").remove();
    $("#extraInfo").remove();

    var table = $('#agendaReportsTableList').DataTable();
    var tableTwo = $('#paymentReportsTableList').DataTable();
    table.destroy();
    tableTwo.destroy();

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
            contInfoList = len;
            $("#usersReportsTableList").append(divCount);
        }

    })
    //insert list on data table after all page is loaded to avoid errors
    setTimeout(function(){ $('#usersReportsTableList').DataTable(); }, 300);
}

function lisPaymenttUser() {
    $(".listed").remove();
    $("#extraInfo").remove();

    var table = $('#usersReportsTableList').DataTable();
    var tableTwo = $('#agendaReportsTableList').DataTable();
    table.destroy();
    tableTwo.destroy();

    var dateStart = $('#dateStart').val();
    var dateEnd = $('#dateEnd').val();
    var initalIsodate = dateStart + "T00:00:00.000Z";
    var finalIsoDate = dateEnd + "T00:00:00.000Z";

    ajaxData = {};
    ajaxData['startDate'] = initalIsodate;
    ajaxData['endDate'] = finalIsoDate;

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

                var dateAgendaSplited = dateAgendaCombined.split("T");
                var agendaDay = dateAgendaSplited[0];
                var splitDay = agendaDay.split("-")
                var day = splitDay[2];
                var month = splitDay[1];
                var year = splitDay[0];
                
                var dateToTest = year+"-"+month+"-"+day
                var dateToShow = day + "/" + month + "/" + year;

                var dayOfToday = startTodayDate()
                if (status != "Agendado") {
                    continue
                } if (Date.parse(dateToTest) > Date.parse(dayOfToday)){
                    continue
                }
                countUsers++
                totalVal = totalVal + parseFloat(esporteValor);
                var hourAgendaSplited = dateAgendaSplited[1].split(":00.000Z");

                var totalTime = hourAgendaSplited[0].split(":");
                totalTime = parseInt(totalTime[0]) + 1;

                if (totalTime == 24) {
                    totalTime = "00:00";
                } else {
                    totalTime = String(totalTime) + ":00";
                }

                var agendaHour = hourAgendaSplited[0].toString() + " - " + totalTime.toString();
                $("#paymentReportsTableList").append(
                    "<tr class='listed'>" +
                    "<td> " + userEmail + "</td>" +
                    "<td> " + dateToShow + "</td>" +
                    "<td> " + agendaHour + "</td>" +
                    "<td> " + quadraNumero + "</td>" +
                    "<td>R$ " + esporteValor + "</td>" +
                    "<td> " + esporteModalidade + "</td>" +
                    "</tr>");

            }
            var divCount = "<span id='extraInfo'><br><br><h3>Total de usuários inadimplentes: " + countUsers + "</h3><br><h3>Total devido pelos usuários: R$" + totalVal + "</h3></span>"
            contInfoList = countUsers;
            totalDebit = totalVal;
            $("#paymentReportsTableList").append(divCount);

        }

    })
    //insert list on data table after all page is loaded to avoid errors
    setTimeout(function(){ $('#paymentReportsTableList').DataTable(); }, 300);
}

function startTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    return today;
}
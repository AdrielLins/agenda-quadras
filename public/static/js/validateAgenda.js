var isDateValid = false;

function todayDate(testDate) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;

    if (testDate < today) {
        alertify.error('Esta data não pode ser usada!');
    } else {
        isDateValid = true;
    }
    return isDateValid

}
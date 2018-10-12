function validateRegisterSports() {

    var valor = $('#valor').val();
    var modalidade = $('#modalidade').val();

    if (!valor) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Valor".');
        return false;
    }
    if (!modalidade) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Modalidade".');
        return false;
    }
    ajaxData = {};

    ajaxData['valor'] = valor;
    ajaxData['modalidade'] = modalidade;

    return ajaxData;
}

function validateUpdateSports() {

    var _id = $('#sport_IdUp').val();
    var valor = $('#valorUp').val();
    var modalidade = $('#modalidadeUp').val();

    if (!valor) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Valor".');
        return false;
    }
    if (!modalidade) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Modalidade".');
        return false;
    }
    
    ajaxData = {};

    ajaxData['_id'] = _id;
    ajaxData['valor'] = valor;
    ajaxData['modalidade'] = modalidade;

    return ajaxData;
}
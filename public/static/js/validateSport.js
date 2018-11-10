function validateRegisterSports() {

    var valor = $('#valor').val();
    var modalidade = $('#modalidade').val();
    var valorFixed = valor.replace(',','.'); 
    valorFixed = parseFloat(valorFixed).toFixed(2);
    
    if (!valor) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Valor".');
        return false;
    }
    if (!modalidade) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Modalidade".');
        return false;
    }
    ajaxData = {};

    ajaxData['valor'] = valorFixed;
    ajaxData['modalidade'] = modalidade;

    return ajaxData;
}

function validateUpdateSports() {

    var _id = $('#sport_IdUp').val();
    var valor = $('#valorUp').val();
    var modalidade = $('#modalidadeUp').val();
    var valorFixed = valor.replace(',','.');  
    valorFixed = parseFloat(valor).toFixed(2);

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
    ajaxData['valor'] = valorFixed;
    ajaxData['modalidade'] = modalidade;

    return ajaxData;
}
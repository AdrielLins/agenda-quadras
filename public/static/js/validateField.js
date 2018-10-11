function validateRegisterFields() {

    var numero = $('#numero').val();
    var descricao = $('#descricao').val();

    if (!numero) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Número".');
        return false;
    }
    if (!descricao) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Descrição".');
        return false;
    }
    ajaxData = {};

    ajaxData['numero'] = numero;
    ajaxData['descricao'] = descricao;

    return ajaxData;
}

function validateUpdateFields() {

    var numero = $('#numeroUp').val();
    var descricao = $('#descricaoUp').val();

    if (!numero) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Número".');
        return false;
    }
    if (!descricao) {
        alertify.alert('Atenção!', 'Favor preencha o campo "Descrição".');
        return false;
    }
    
    ajaxData = {};

    ajaxData['numero'] = numero;
    ajaxData['descricao'] = descricao;

    return ajaxData;
}
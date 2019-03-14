var validate = (dados)=>{
    var status = false;
    if(dados.nome == '' || dados.valor == '' || dados.descricao == '' || dados.categoria == 'default'){
        console.warn('Falta alguns valores');
        status = false;
    }
    if(dados.nome != '' && dados.valor != '' && dados.descricao != '' && dados.categoria == 'default'){
        console.warn('deverá escolher uma categoria');
        status = false;
    }
    if(dados.nome != '' && dados.valor != '' && dados.descricao != '' && dados.categoria != 'default'){
        console.warn('dados ok pode salvar no db');
        status = true;
    }

    return status;
}

module.exports = validate;
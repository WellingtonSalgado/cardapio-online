$(document).ready(function(){
    $('#btnEntrar').submit(function(e){
        let usuario = $('#usuario').val();
        let senha = $('#senha').val();
        let query = {
            "usuario": usuario,
            "senha": senha
        }
        return query;
    })
})

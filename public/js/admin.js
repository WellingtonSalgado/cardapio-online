$(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton({
        direction:'left'
    });

    $('#btnProdutos').click(e=>{
        alert('Botao Produtos');
    });


    $('#btnEventos').click(e=>{
        alert('Botao Eventos');
    });
});
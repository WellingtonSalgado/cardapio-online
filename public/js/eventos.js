$(document).ready(function(){
    mostraEventos();
});


function mostraEventos(){
    var divEventos = document.querySelector('#evento');
    var imagemEvento = document.createElement('img');
    imagemEvento.src = 'img/delicias0.jpg';
    divEventos.appendChild(imagemEvento);
    var index = 0; 
    var interv = setInterval(function(){


        var timeOut = setTimeout(function(){
            imagemEvento.style.transition = '2s';
            imagemEvento.src = `img/delicias${index}.jpg`;
        },2500)
        index ++;
        if(index > 8){
            index = 0;
        }
        if(imagemEvento.src == null || imagemEvento.src == undefined){
            clearInterval(interv);
            clearTimeout(timeOut);
        }
    },4000);
    
    
}
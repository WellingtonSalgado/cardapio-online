$(document).ready(function(){
  infoCards();
  buscarProduto();
  cards();
  abreListaProdutos();
});

function loadProducts(){
  $.get('http://localhost:3000/products',function(data, status){
    console.log(data);
    var obj = JSON.parse(data);
    console.log(obj);
    
  });
}

function criarSecoes(){
  
}
//Função de Busca
function buscarProduto(){
  var btnBuscar = document.getElementById('btnBuscar');
  btnBuscar.addEventListener('click', function(){
    console.log('Pesquisar');
  });
}

//Função de Informações de Seções
function infoCards(){
  var info = document.querySelector('.info');
  info.addEventListener('touchstart',function(){
    info.children[0].innerHTML = 'info';
  });
  info.addEventListener('touchend',function(){
    info.children[0].innerHTML = 'info_outline';
  });
}

//Função do Cards
function cards(){
  var cards = document.querySelectorAll('.cards');
  cards.forEach(function(item, index){
    item.addEventListener('touchstart', function(){
      console.log(item.id);
    });
    item.addEventListener('touchend', function(){
      
    });
  })
}

function abreListaProdutos(){
  var irProdutos = document.querySelector('.irProdutos');
  irProdutos.addEventListener('touchstart', function(){
    var secao = irProdutos.parentNode.parentNode.parentNode.id;
    alert('Abrir modal com lista de produtos da: '+ secao);
  });
}
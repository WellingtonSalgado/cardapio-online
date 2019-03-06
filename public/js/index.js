$(document).ready(function(){
  buscarProduto();
  abrirCard();
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


function abrirCard(){
  var stado = false;
  let btnAbre = document.querySelector('#abre');
  var produtos = [
    {
      "nome":"Tapioca Nordestina",
      "valor":"7,90"
    },
    {
      "nome":"Tapioca Catufrango",
      "valor":"6,90"
    },
    {
      "nome":"Tapioca Frango",
      "valor":"4,50"
    },
    {
      "nome":"Tapioca Sem Recheio",
      "valor":"1,80"
    }
]

  var lista = document.querySelector('#lista');
  
  

  btnAbre.addEventListener('click',function(){
    

    if(stado == false){
      //Muda Icone
      btnAbre.childNodes[0].innerHTML = 'keyboard_arrow_up';
      
      produtos.forEach(function(elemento, index){
        var item = document.createElement('li');
        var valorItem = document.createElement('span');
        valorItem.innerHTML = elemento.valor;
        item.innerHTML = elemento.nome;
        item.append(valorItem);
        item.classList.add('produtos');
        lista.append(item);
        detalhesItem(item);
      });
      stado = !stado;
    }else{
      //Muda Icone Para Original
      btnAbre.childNodes[0].innerHTML = 'keyboard_arrow_down';
      var itens = Array.from(lista.childNodes);
      itens.forEach(function(element){
        lista.removeChild(element);
      })
     
      stado = !stado;
    }

  });
}

function detalhesItem(obj){
  let stado = false;

  obj.addEventListener('click', function(){

    if(stado == false){
      obj.classList.add('detalhes');
      stado = !stado;
    }else{
      obj.classList.remove('detalhes');
      stado = !stado;
    }
    
  })
}
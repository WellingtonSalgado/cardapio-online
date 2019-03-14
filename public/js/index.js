'use-strict';

$(document).ready(function(){
  //buscarProduto();
  loadMenus();





});


//Requisição GET

//$.get('http://localhost:3000/products',function(data, status){
    //console.log(data);
    //return data;
//});
  

//Javascript puro GET
var products = '';
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       products = xhttp.responseText;
    }
};
xhttp.open("GET", "http://192.168.3.108:3000/products", false);
xhttp.send();
var produtos = JSON.parse(products);




//Função de Busca
function buscarProduto(){
  var btnBuscar = document.getElementById('btnBuscar');
  btnBuscar.addEventListener('click', function(){
    console.log('Pesquisar');
  });
}


//Cria menus dinamicamente
function loadMenus(){
  if(produtos != undefined){
    produtos.forEach(function(element,index){
      criarMenu(element.secao,element.produtos,element.slug);
    });
  }else{
    alert('Sem produtos Cadastrados :(')
  }
  
}

function criarMenu(secaoName,secaoProdutos,idSecao){
  //Recuperando referencia da div conteudo
  let divConteudoLista = document.getElementById('conteudoLista');

  //Criação do elemento menu
  let card = document.createElement('div');
  card.classList.add('card');

  //Criação do icone do menu
  var icone = document.createElement('i');
  icone.classList.add('material-icons');
  icone.innerHTML = 'local_cafe';

  //Criação do nome do menu
  var spanTitulo = document.createElement('span');
  spanTitulo.innerHTML = secaoName;

  //Criação de botão de abertura de lista
  var spanAbreLista = document.createElement('span');
  spanAbreLista.classList.add('abreLista');
  spanAbreLista.id = idSecao;
  var iconSpanAbreLista = document.createElement('i');
  iconSpanAbreLista.classList.add('material-icons');
  iconSpanAbreLista.innerHTML = 'keyboard_arrow_down';
  spanAbreLista.append(iconSpanAbreLista);

  //Adicionando nome, icones, e botão de abrir lista
  card.append(icone);
  card.append(spanTitulo);
  card.append(spanAbreLista);

  //Cria ul para listar produtos
  var listaItens = document.createElement('ul');
  listaItens.id = idSecao + '-list';

  //Adicionando os menus ao conteudo da pagina
  divConteudoLista.append(card);
  divConteudoLista.append(listaItens);

  //Metodo que cria a lista
  abrirCard(spanAbreLista.id, listaItens.id, secaoProdutos)
}

function abrirCard(idBotao,idLista,produtos){
  var stado = false;
  let btnAbre = document.querySelector('#'+idBotao);
  

  var lista = document.querySelector('#'+idLista);
  
  

  btnAbre.addEventListener('click',function(){
    

    if(stado == false){
      //Muda Icone
      btnAbre.childNodes[0].innerHTML = 'keyboard_arrow_up';

      //Cria lista de itens
      produtos.forEach(function(elemento){
        var item = document.createElement('li');
        var valorItem = document.createElement('span');
        valorItem.innerHTML = elemento.valor;
        item.innerHTML = elemento.nome;
        item.append(valorItem);
        item.classList.add('produtos');
        lista.append(item);
        detalhesItem(item,produtos);
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

function detalhesItem(obj,secao){
  let stado = false;

  obj.addEventListener('click', function(){
    

    if(stado == false){
      
      //cria elementos dinamicamente
      let divDetalhes = document.createElement('div');
      divDetalhes.classList.add('detalhesProdutos');
      let desc = document.createElement('span');

      //forEach para verificação de itens
      let valorDesc = '';
      let nomeObjeto = Array.from(obj.childNodes)
      secao.forEach(function(item, index){
        console.log(item.nome);
        if(item.nome == nomeObjeto[0].data){
          valorDesc = item.descricao;
        }
      });
      console.log(valorDesc);
      console.log(nomeObjeto[0])
      
      //Atribui valores
      desc.innerHTML = valorDesc;
      divDetalhes.append(desc);
      obj.append(divDetalhes);
      obj.classList.add('detalhes');
      stado = !stado;
    }else{
      obj.classList.remove('detalhes');
      obj.removeChild(obj.childNodes[2])
      stado = !stado;
    }
    
  })
}
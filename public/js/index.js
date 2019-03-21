'use-strict';

$(document).ready(function(){
  //buscarProduto();
  loadMenus();
  pesquisar();




});



function pesquisar(){
  var arrayPesquisa = ['Café P','tapioca nordestina','tapioca de manteiga','suco de cajú', 'Café G', 'suco de manga']
  let btnPesquisa = document.getElementById('iconeMenu');
  let state = false;
  var produtoPesquisado = '';
  var input = document.createElement('input');
  var div = document.createElement('div');
  btnPesquisa.addEventListener('click', ()=>{
    if(state == false){
      btnPesquisa.classList.add('pesquisar');
      input.type = 'search';
      btnPesquisa.appendChild(input);
      btnPesquisa.appendChild(div);
      input.focus();
      state = true;
    }
    
  })

  //Evento do Input
  input.addEventListener('input', (e)=>{
    
    div.childNodes.forEach((e)=>{
      div.removeChild(e);
    })
    
    
    produtoPesquisado = input.value.trim();
    //Ordena os produtos
    arrayPesquisa = arrayPesquisa.sort();
    arrayPesquisa.forEach(function(item, index){
      if(input.value.trim() != '' ){
        //Verifica se contem produtos que correspondem a pesquisa
        if(item.includes(produtoPesquisado) && produtoPesquisado.length >= 3){
          //console.log(`${produtoPesquisado} in ${item}`);
          
          var itens = document.createElement('p');

          //Criar eventos de click e chama funçao de busca
          itens.addEventListener('click',(e)=>{
          
            buscarProduto(e.target.innerHTML);
          })


          itens.innerHTML = item;
          //Adiciona os itens
          div.appendChild(itens);
          
          //Verifica a presença de itens repetidos
          var list = [];
          div.childNodes.forEach((elemento,index)=>{
            if(elemento.innerHTML.includes(itens.innerHTML)){
              
              list.push(elemento.innerHTML);
              list.forEach(()=>{

                if(list.length > 1){
                  //Verifica a exitencia do item
                  if(div.contains(elemento)){
                    div.removeChild(elemento);
                  }
                  
                }
              })
            }
            
             
          })
          
          
          
        }
        
      }
      
    })

    //Limpa toda a pesquisa e suas variaveis
    if(e.inputType == 'deleteContentBackward'){
      input.value = '';
      produtoPesquisado = '';
      div.childNodes.forEach((i)=>{
        div.removeChild(i);
      })
      if(div.childNodes.length >= 1){
        div.removeChild(div.firstChild)
      }
      
    }
    
  });

  btnPesquisa.addEventListener('focusout',()=>{
    setTimeout(()=>{
      input.value = '';
      input.parentNode.removeChild(input);
      btnPesquisa.classList.remove('pesquisar');
      state = false;
      div.childNodes.forEach((i)=>{
      
        div.removeChild(i);
      })
      if(div.childNodes.length >= 1){
        div.removeChild(div.firstChild)
      }
      btnPesquisa.removeChild(div);
    },300)
    
  })
}

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
xhttp.open("GET", "http://192.168.3.109:3000/products", false);
xhttp.send();
var produtos = JSON.parse(products);




//Função de Busca
function buscarProduto(produtoPesquisado){
  var cardSecao = document.getElementById('cafeteria');
  var listSecao = document.getElementById('cafeteria-list');
  scrollTo(cardSecao.offsetLeft, cardSecao.offsetTop);
  //Abre o card
  cardSecao.click()
  //Busca o elemento pesquisado
  listSecao.childNodes.forEach((elemt)=>{
    elemt.childNodes.forEach((e)=>{
      //Adiciona num array
      var produtoText = e.textContent.split('\n');
      if(produtoText[0] === produtoPesquisado){
        //Abre os detalhes do item
        elemt.click();
      }
      
      
    })
  })

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
  switch(secaoName){
    case "Cafeteria":
      icone.innerHTML = 'local_cafe';
      break;
    case "Sucos e Vitaminas":
      icone.innerHTML = 'local_bar';
      break;
    case "Bebidas":
      icone.innerHTML = 'local_bar';
      break;
    case "Sanduiches":
      icone.innerHTML = 'local_pizza';
      break;
    case "Beirutes":
      icone.innerHTML = 'local_pizza';
      break;
    case "Sobremesas":
      icone.innerHTML = 'cake';
      break;
    case "Petiscos":
      icone.innerHTML = 'bubble_chart';
      break;
    case "Self Service":
      icone.innerHTML = 'restaurant_menu';
      break;
    case "A la Carte":
      icone.innerHTML = 'room_service';
      break;
    default:
      icone.innerHTML = 'restaurant';
  }
  
  
  

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
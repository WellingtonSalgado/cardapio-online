'use-strict';

/*$(document).ready(function(){
  
  loadMenus();
  


  buscarArrayProdutos();


});*/

window.onload = function(){
  loadMenus();
  buscarArrayProdutos();
}

var produtos = []

function buscarArrayProdutos(produtos){
  var arrayProdutos = [];
  for(let categ in produtos[0]){
    for(let key in produtos[0][categ]){
      
      produtos.push(produtos[0][categ][key].nome);  
      
    }
  }

  produtos.forEach(function(produt, index){
    if (index != 0) {
      arrayProdutos.push(produt);
    }
  })
  //Função de pesquisa
  pesquisar(arrayProdutos);
}



function pesquisar(produtos){

  var arrayProducts = produtos;
  
  var arrayPesquisa = [];
  
  //Adiciona ao array de pesquisa
  arrayProducts.forEach((e)=>{
    
    
    arrayPesquisa.push(e);
    
  });
  
  let btnPesquisa = document.getElementById('iconeMenu');
  let state = false;
  var produtoPesquisado = '';
  var secao = '';
  //Span que abre lista (Aqui deve ser colocado a secao)
  var spansAbreLista = document.querySelectorAll('.abreLista');
  //console.log(spanAbreLista);
  var input = document.createElement('input');
  var div = document.createElement('div');
  btnPesquisa.addEventListener('click', ()=>{
    //Verifica estado do botao de pesquisa
    if(state == false){
      //Verifica se a seção ja esta aberta e fecha a mesma
      fecharCards();
      
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

    div.innerHTML = '';
    
    produtoPesquisado = input.value.trim();
    //Ordena os produtos
    arrayPesquisa = arrayPesquisa.sort();

    let arrayProd = new Set([]);

    arrayPesquisa.forEach(function(item){
      if(input.value.trim() != '' ){
        //Verifica se contem produtos que correspondem a pesquisa
        if(item.includes(produtoPesquisado) && produtoPesquisado.length >= 3){
          
          
          var itens = document.createElement('p');

          //Criar eventos de click e chama funçao de busca
          itens.addEventListener('click',(e)=>{
            var productSearch = e.target.innerHTML
            
            for(let cat in produtosFetch[0]){

              //console.log(secao);

              for(let prodt in produtosFetch[0][cat]){
                

                if (productSearch == produtosFetch[0][cat][prodt].nome) {
                  secao = (cat.toLowerCase()).replace(/ /g, '-');

                }
              }

            }

            //Verificar a secao do produto
            arrayProducts.forEach(e => {
                
                if(e == productSearch){
                  
                  //secao = e.toLowerCase();
                  //console.log(secao);
                }
              
            })
            productSearch = productSearch.toUpperCase();
            buscarProduto(productSearch, secao);
          })
           
            
            arrayProd.add(item)

            arrayProd.forEach(function(i){
              itens.innerHTML = i;
              div.appendChild(itens);
              
            })
            
        }
        
      }
      
    })
    
  });

  btnPesquisa.addEventListener('focusout',()=>{
    setTimeout(()=>{
      input.value = '';
      input.parentNode.removeChild(input);
      btnPesquisa.classList.remove('pesquisar');
      state = false;

      if(div.childNodes.length >= 1){
        div.removeChild(div.firstChild)
      }
      btnPesquisa.removeChild(div);
    },300)
    
  })
}


//Request via fetch

var produtosFetch = [];

var fetchProdutos = fetch('https://delicias-app-db.firebaseio.com/produtos.json');
fetchProdutos
.then(function(response){
  
  return response.json()
})
.then(function(myJson){
  
  produtosFetch.push(myJson);

  criarMenuFetch(produtosFetch);
  buscarArrayProdutos(produtosFetch);
  //getProdutosFetch(produtosFetch);
  
})
.catch(function(error){
  console.log(error.message)
})



//Função de Busca
function buscarProduto(produtoPesquisado, secaoPesquisada){
  
  var cardSecao = document.getElementById(secaoPesquisada);
  var listSecao = document.getElementById(`${secaoPesquisada}-list`);
  
  setTimeout(()=>{
    scrollTo(cardSecao.offsetLeft, cardSecao.offsetTop);
  },400)
  
  //Abre o card
  setTimeout(()=>{
    cardSecao.click()
    //Busca elemento pesquisado
    for(let key in listSecao.childNodes){
      var itemContent = listSecao.childNodes[key].innerHTML;
      if(itemContent != undefined){
        var nomeItem = itemContent.substring(0, itemContent.indexOf('<'));  
      }
      
      if (nomeItem.toUpperCase() == produtoPesquisado) {
        listSecao.childNodes[key].click();
      }
    }

  },400);

}

//Função que fecha todos os cards

function fecharCards(){
  if (window.scrollY <= 70) {
    
    let cardsAbertos = document.querySelectorAll('.abreLista');

    for(let key in cardsAbertos){
      if (!isNaN(key)) {
        if (cardsAbertos[key].childNodes[0].innerHTML == 'keyboard_arrow_up') {
          cardsAbertos[key].click();
        }
      }
    }
  }
}

//Cria menus dinamicamente
function loadMenus(){
  pesquisar();
  criarMenuFetch(produtosFetch);
  
}

//Cria menus via fetch

function criarMenuFetch(produtos){
  

  produtos.forEach( function(element) {
    // statements
    

    for(let key in element){

        //Recuperando referencia da div conteudo
        let divConteudoLista = document.getElementById('conteudoLista');

        //Criação do elemento menu
        let card = document.createElement('div');
        card.classList.add('card');

        //Criação do icone do menu
        var icone = document.createElement('i');
        icone.classList.add('material-icons');
        switch(key){
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
        spanTitulo.innerHTML = key;

        //Criação de botão de abertura de lista
        var spanAbreLista = document.createElement('span');
        spanAbreLista.classList.add('abreLista');
        spanAbreLista.id = key.toLowerCase().replace(/ /g,'-');
        spanAbreLista.openState = false;
        var iconSpanAbreLista = document.createElement('i');
        iconSpanAbreLista.classList.add('material-icons');
        iconSpanAbreLista.innerHTML = 'keyboard_arrow_down';
        spanAbreLista.appendChild(iconSpanAbreLista);

        //Adicionando nome, icones, e botão de abrir lista
        card.appendChild(icone);
        card.appendChild(spanTitulo);
        card.appendChild(spanAbreLista);

        //Cria ul para listar produtos
        var listaItens = document.createElement('ul');
        listaItens.id = spanAbreLista.id + '-list';

        //Adicionando os menus ao conteudo da pagina
        divConteudoLista.appendChild(card);
        divConteudoLista.appendChild(listaItens);

        
        
        //Metodo que cria a lista
        abrirCardFetch(spanAbreLista.id, listaItens.id, produtos);

    }

  });
  
}



function abrirCardFetch(idBotao,idLista, produtos){
  var stado = false;

  let btnAbre = document.querySelector('#'+idBotao);
  

  var lista = document.querySelector('#'+idLista);

  
  //Array de Categorias
  var arrayCateg = Object.keys(produtos[0]);


  btnAbre.addEventListener('click',function(e){


    //estado do botao 
    btnAbre.openState = !btnAbre.openState;

    if(stado == false){
      //Muda Icone
      btnAbre.childNodes[0].innerHTML = 'keyboard_arrow_up';

        arrayCateg.forEach( function(categ) {
          // statements

          var arrayId = Object.keys(produtos[0][categ]);

          arrayId.forEach( function(id) {
            // statements

            if (idBotao == categ.toLowerCase().replace(/ /g, '-')) {
              

              var produto = produtos[0][categ][id];


              var item = document.createElement('li');
              var valorItem = document.createElement('span');
              valorItem.innerHTML = produto.valor;
              item.innerHTML = produto.nome;
              item.appendChild(valorItem);
              item.classList.add('produtos');
              lista.appendChild(item);

              //Eventos de detalhes
              detalhesItem(item, produto);

            }  


          });


        });

      
      stado = !stado;
    }else{
      //Muda Icone Para Original

      var itens = Array.from(lista.childNodes);
      itens.forEach(function(element){
        lista.removeChild(element);
      })

      btnAbre.childNodes[0].innerHTML = 'keyboard_arrow_down';
      stado = !stado;
    }

  });
}

//Função de detalhes dos produtos
function detalhesItem(obj,produto){
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
      
        
      if(produto.nome == nomeObjeto[0].data){
        valorDesc = produto.descricao;
      }
      
      
      
      //Atribui valores
      desc.innerHTML = valorDesc;
      desc.style.marginTop = '10px';
      desc.style.paddingBottom = '0px';
      divDetalhes.appendChild(desc);
      obj.appendChild(divDetalhes);
      obj.classList.add('detalhes');
      stado = !stado;
    }else{
      obj.classList.remove('detalhes');
      obj.removeChild(obj.childNodes[2])
      stado = !stado;
    }
    
  })
}
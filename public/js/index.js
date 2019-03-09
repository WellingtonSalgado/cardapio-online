
$(document).ready(function(){
  
  abreCategorias('#abreCafeteria');
  abreCategorias('#abreSucosVitaminas');

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
xhttp.open("GET", "http://localhost:3000/products", false);
xhttp.send();
var produtos = JSON.parse(products);




//Função de Busca
function buscarProduto(){
  var btnBuscar = document.getElementById('btnBuscar');
  btnBuscar.addEventListener('click', function(){
    console.log('Pesquisar');
  });
}
//Array de teste
var cafeteria = {
  "secao":"Cafeteria",
  "slug":"cafeteria",
  "produtos":[
  {
    "nome":"Tapioca Nordestina",
    "valor":"7,90",
    "descricao":"tapioca feita com carne de sol",
    "curtiu": false,
    "mensagem": ""
  },
  {
    "nome":"Tapioca Catufrango",
    "valor":"6,90",
    "descricao":"tapioca com frango e catupiry",
    "curtiu": false,
    "mensagem": ""
  },
  {
    "nome":"Tapioca Frango",
    "valor":"4,50",
    "descricao":"tapioca de frango desfiado",
    "curtiu": false,
    "mensagem": ""
  },
  {
    "nome":"Tapioca Sem Recheio",
    "valor":"1,80",
    "descricao":"tapioca basica sem conteudo",
    "curtiu": false,
    "mensagem": ""
  },
  {
    "nome":"Café P",
    "valor":"1,20",
    "descricao":"Café pequeno (80ml)",
    "curtiu": false,
    "mensagem": ""
  }
]
}

var sucosVitamina = {
"secao":"Sucos e Vitaminas",
"slug":"sucos-vitaminas",
"produtos":[
  {
    "nome":"Suco de Cajú",
    "valor":"4,00",
    "descricao":"Suco da polpa de cajú",
    "curtiu": false,
    "mensagem": ""
  },
  {
    "nome":"Vitamina de Manga",
    "valor":"5,50",
    "descricao":"Vitamina da polpa de manga",
    "curtiu": false,
    "mensagem": ""
  }
]
}
// Menus de Testes
var menus = [cafeteria, sucosVitamina];

//Função de abrir categorias
function abreCategorias(id){
  var btnCateg = document.querySelector(id);
  var state = false;
  btnCateg.addEventListener('click',(e)=>{
    if(state == false){
      e.target.innerHTML = 'keyboard_arrow_up';
      
      state = !state;
    }else{
      e.target.innerHTML = 'keyboard_arrow_down';
      
      state = !state;
    }
    
  });
}


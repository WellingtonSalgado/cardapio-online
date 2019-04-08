$(document).ready(function(){
    addProduto();
    fecharCadastro();
    cadastrar();
    atualizarEstatisticas();
    salvarProdutos();
    recuperaProdutos();
    listarProdutos();
});

//Get no servidor
var produtos = [];
let xhtp = new XMLHttpRequest();
xhtp.onload = function(){
    if(this.status == 200){
        produtos.push(JSON.parse(this.responseText));
    }
}
xhtp.open('get', 'http://192.168.1.5:3000/products',false);
xhtp.send();

//Salva no sessionstorage
function salvarProdutos(){
    sessionStorage.setItem('produtos', JSON.stringify(produtos[0]));
}
function recuperaProdutos(){
    var products = JSON.parse(sessionStorage.getItem('produtos'));
    return products; 
}
//Valores do sessionstorage
var produt = recuperaProdutos();




//Post no servidor
function postProdutos(obj,method = 'post'){
    let xhttpost = new XMLHttpRequest();
    xhttpost.open('POST','http://192.168.1.5:3000/products',false);
    xhttpost.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhttpost.send(`nome=${obj.nome}&valor=${obj.valor}&descricao=${obj.descricao}&categoria=${obj.categoria}&method=${method}`);
}
//Delete no servidor
function deleteProdutos(produto,method = 'delete'){
    let xhttpost2 = new XMLHttpRequest();
    xhttpost2.open('POST','http://192.168.1.5:3000/products',false);
    xhttpost2.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhttpost2.send(`produto=${produto}&method=${method}`);
}
//Atualiza dados estatisticos

function atualizarEstatisticas(){
    let categoriasCadastradas = document.querySelector('#categoriasCadastradas');
    let produtosCadastrados = document.querySelector('#produtosCadastrados');
    var numeroCategorias = 0;
    var numeroProdutos = 0;
    if(produtos[0] !== null){
        produtos[0].forEach(function(elem){
            numeroCategorias ++;
            numeroProdutos += elem.produtos.length;
        })
    }else{
        produtos[0].forEach(function(elem){
            numeroCategorias ++;
            numeroProdutos += elem.produtos.length;
        })
    }
    
    //Atualizando campos
    categoriasCadastradas.childNodes[1].innerHTML= `${numeroCategorias} categ.`;
    produtosCadastrados.childNodes[1].innerHTML = `${numeroProdutos} und.`;
    
    
}

//Listar os produtos
function listarProdutos(){
    let divListaProdutos = document.getElementById('listaProdutos');
    let arrayProdutos = produtos[0];
    arrayProdutos.forEach( function(categoria) {
        categoria.produtos.forEach( function(produto) {
            var divNome = document.createElement('div');
            var spanEdit = document.createElement('span');
            var iconeEdit = document.createElement('i');
            var spanDelete = document.createElement('span');
            var iconeDelete = document.createElement('i');
            iconeEdit.classList.add('material-icons');
            iconeEdit.innerHTML = 'edit';
            iconeDelete.classList.add('material-icons');
            iconeDelete.innerHTML = 'delete';
            spanEdit.appendChild(iconeEdit);
            spanEdit.addEventListener('click', function(e){
                let produto = e.target.parentNode.parentNode.firstChild.textContent;
                alert('edicao do produto : '+ produto)
                
            })
            spanDelete.appendChild(iconeDelete);
            spanDelete.addEventListener('click', function(e){
                let produto = e.target.parentNode.parentNode.firstChild.textContent;
                let divProduto = e.target.parentNode.parentNode;
                alert('Deletando o produto : '+ produto);
                divListaProdutos.removeChild(divProduto);
                //Deletando o produto do servidor
                deleteProdutos(produto);
                window.reload();

            })
            divNome.innerHTML = produto.nome;
            divNome.appendChild(spanEdit);
            divNome.appendChild(spanDelete);
            divListaProdutos.appendChild(divNome);
        });
    });
    
}

//Abre modal de cadastro
function addProduto(){
    let btnAdd = document.querySelector('#floatAdd');
    let containerCadastro = document.querySelector('#containerCadastro');
    let selectCategoria = document.querySelector('#categoria');

    btnAdd.addEventListener('click',()=>{
        
        containerCadastro.style.display = 'flex';
        if(selectCategoria.length == 0){
            let optionDefault = document.createElement('option');
            //Option Default
            optionDefault.value = 'default';
            optionDefault.innerHTML = '--Categoria--';
            selectCategoria.appendChild(optionDefault);
            //ForEach no array de produtos
            produt.forEach((element,index) => {
                let option = document.createElement('option');
                option.value = element.secao;
                option.innerHTML = element.secao;
                selectCategoria.appendChild(option);
            });
        }
        
        
    });
    
    
}
//Fecha modal de cadastro
function fecharCadastro(){
    let btnFechar = document.querySelector('#btnFechar');
    let containerCadastro = document.querySelector('#containerCadastro');
    

    btnFechar.addEventListener('click',()=>{
        
        containerCadastro.style.display = 'none';
        
        //Limpa os campos de inputs
        let produto = document.querySelector('#produto');
        produto.value = '';
        let valor = document.querySelector('#valor');
        valor.value = '';
        let descricao = document.querySelector('#descricao');
        descricao.value = '';
        
    });
    
}
//Eventos de cadastrar
function cadastrar(){
    let containerCadastro = document.querySelector('#containerCadastro');
    let produto = document.querySelector('#produto');
    let valor = document.querySelector('#valor');
    let descricao = document.querySelector('#descricao');
    let selectCategoria = document.querySelector('#categoria');
    let btnCadastro = document.querySelector('#btnCadastrar');


    btnCadastro.addEventListener('click',(e)=>{
        e.preventDefault();
        var obj = {
            "nome": `${produto.value.trim()}`,
            "valor": `${valor.value.trim()}`,
            "descricao": `${descricao.value.trim()}`,
            "categoria": `${selectCategoria.value.trim()}`
        }

        //Post do obj
        postProdutos(obj);
        containerCadastro.style.display = 'none';
        
        //Limpa os campos de inputs
        
        produto.value = '';
        valor.value = '';
        descricao.value = '';
        selectCategoria.value = 'default';
        
        window.reload();
    })
    
}

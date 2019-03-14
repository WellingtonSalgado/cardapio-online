$(document).ready(function(){
    addProduto();
    fecharCadastro();
    cadastrar();
    atualizarEstatisticas();
});

//Get no servidor
var produtos = [];
let xhtp = new XMLHttpRequest();
xhtp.onload = function(){
    if(this.status == 200){
        produtos.push(JSON.parse(this.responseText));
    }
}
xhtp.open('get', 'http://192.168.3.108:3000/products',true);
xhtp.send();

//Post no servidor
function postProdutos(obj){
    let xhttpost = new XMLHttpRequest();
    xhttpost.open('POST','http://192.168.3.108:3000/products',true);
    xhttpost.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhttpost.send(`nome=${obj.nome}&valor=${obj.valor}&descricao=${obj.descricao}&categoria=${obj.categoria}`);
}
//Atualiza dados estatisticos

function atualizarEstatisticas(){
    let categoriasCadastradas = document.querySelector('#categoriasCadastradas');
    let produtosCadastrados = document.querySelector('#produtosCadastrados');
    var numeroCategorias = 0;
    var numeroProdutos = 0;
    produtos[0].forEach(function(elem){
        numeroCategorias ++;
        numeroProdutos += elem.produtos.length;
    })
    //Atualizando campos
    categoriasCadastradas.childNodes[1].innerHTML= `${numeroCategorias} categ.`;
    produtosCadastrados.childNodes[1].innerHTML = `${numeroProdutos} und.`;
    
    
}

//Abre modal de cadastro
function addProduto(){
    let btnAdd = document.querySelector('#floatAdd');
    let containerCadastro = document.querySelector('#containerCadastro');
    let selectCategoria = document.querySelector('#categoria');
    
    
    btnAdd.addEventListener('click',(e)=>{
        
        console.log('categorias: '+selectCategoria.length);
        console.log('produtos: '+ produtos[0].length)
        
        containerCadastro.style.display = 'flex';
        if(selectCategoria.length == 0){
            let optionDefault = document.createElement('option');
            //Option Default
            optionDefault.value = 'default';
            optionDefault.innerHTML = '--Categoria--';
            selectCategoria.appendChild(optionDefault);
            //ForEach no array de produtos
            produtos[0].forEach((element,index) => {
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
        
    })
}

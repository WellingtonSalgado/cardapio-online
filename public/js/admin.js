$(document).ready(function(){
    addProduto();
    fecharCadastro();
});


function addProduto(){
    let btnAdd = document.querySelector('#floatAdd');
    let containerCadastro = document.querySelector('#containerCadastro');
    btnAdd.addEventListener('click',(e)=>{
        containerCadastro.style.display = 'flex';
    });
}

function fecharCadastro(){
    let btnFechar = document.querySelector('#btnFechar');
    let containerCadastro = document.querySelector('#containerCadastro');
    console.log(btnFechar);
    btnFechar.addEventListener('click',()=>{
        containerCadastro.style.display = 'none';
    });
}
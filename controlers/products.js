const fs = require('fs')
const arqProducts = './db/products.json'

//Função de leitura do db
var produtos = {
    read: function(){
        var data = fs.readFileSync(arqProducts,{encoding:'utf8'})
        return JSON.parse(data);
    },
    post: function(obj){
        var products = produtos.read();
        
        products.forEach(element => {
            if(element.secao == obj.categoria){
                let produto = {
                    "nome": obj.nome,
                    "valor": obj.valor,
                    "descricao": obj.descricao
                }
                //Criar função para verificar existencia do produto
                
                element.produtos.push(produto);
                fs.writeFileSync(arqProducts, JSON.stringify(products));
            }
            
        });
    }
}

module.exports = produtos; 
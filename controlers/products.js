const fs = require('fs')
const arqProducts = './db/products.json'

//Função de leitura do db
var produtos = {
    read: function(){
        var data = fs.readFileSync(arqProducts,{encoding:'utf8'})
        return JSON.parse(data);
    },
    post: function(obj){
        let products = produtos.read();
        
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
    },
    delete: function(obj){
        let products = produtos.read();
        console.log(obj.method);
        products.forEach(element => {
            element.produtos.forEach( (produto, indice) => {
                if (produto.nome == obj.produto) {
                    element.produtos.splice(indice,1);
                }
            });
            //Salva alterações no db
            fs.writeFileSync(arqProducts,JSON.stringify(products));
        
        });
    }
}

module.exports = produtos; 
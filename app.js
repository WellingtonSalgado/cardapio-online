const express = require('express')
const bodyParser = require('body-parser')
//Import dos dados do db
var produtos = require('./controlers/products.js')
//Import do validate
var validate = require('./controlers/validate.js')

const app = express()

const PORT = 3000

//Body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

//Serve Arquivos css e js
app.use(express.static('public'))

//Rotas
app.get('/', (req, res)=>{
    res.status(200).sendFile(__dirname + '/index.html' )
    
});

app.get('/admin', (req, res)=>{
    //res.send(`${ip}`);
    res.status(200).sendFile(__dirname + '/admin.html');
    
});

app.post('/admin', (req, res)=>{
    //console.log(req.body);
    let data = req.body;
    let user = data.usuario;
    let pass = data.senha;
    usuario(user,pass);
    res.status(200).send('Post no admin');

});

app.get('/products', (req, res)=>{
    res.status(200).send(produtos.read());
})

app.post('/products',(req, res)=>{
    let status = validate(req.body);
    console.log(status);
    if(status){
        if (req.body.method == 'post') {
            produtos.post(req.body); 
            console.log('entrou no post')   
        }
        else if (req.body.method == 'delete') {
            produtos.delete(req.body);
            console.log('entrou no delete')
        }
        
    }else{
        console.error('obj nao aceito');
    }
    
    res.status(200).send('Produto cadastrado');
});

//Servidor 
app.listen(PORT, ()=>{
    console.log(`Servidor ouvindo na porta: ${PORT}`)

})
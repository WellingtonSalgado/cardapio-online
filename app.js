const express = require('express')
const bodyParser = require('body-parser')

var produtos = require('./controlers/products.js')

const app = express()

const PORT = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.status(200).sendFile(__dirname + '/index.html' )
});

app.get('/admin', (req, res)=>{
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
    res.status(200).send(produtos);
})

app.listen(PORT, ()=>{
    console.log(`Servidor ouvindo na porta: ${PORT}`)
    //console.log(produtos)
})
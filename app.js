const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const PORT = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.status(200).sendFile(__dirname + '/index.html' )
});

app.get('/login', (req, res)=>{
    res.status(200).sendFile(__dirname + '/login.html')
    let dados = req.query
    let usuario = dados.user;
    let senha = dados.pass;
    if(usuario == 'wellington' && senha == 'welldev' && dados != undefined){
        console.log('Usuario Aceito');
        console.log(req.query);
    }else{
        console.log('Usuario Invalido');
    }
});

app.post('/login', (req, res)=>{
    let dados = req.body;
    

    res.send(dados);
});

app.get('/admin', (req, res)=>{
    res.status(200).sendFile(__dirname + '/admin.html');
})

app.listen(PORT, ()=>{
    console.log(`Servidor ouvindo na porta: ${PORT}`)
})
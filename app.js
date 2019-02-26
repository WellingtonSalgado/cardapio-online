const express = require('express')
const app = express()
const PORT = 3000

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
    }else{
        console.log('Usuario Invalido');
    }
});

app.get('/admin', (req, res)=>{
    res.status(200).sendFile(__dirname + '/admin.html');
})

app.listen(PORT, ()=>{
    console.log(`Servidor ouvindo na porta: ${PORT}`)
})
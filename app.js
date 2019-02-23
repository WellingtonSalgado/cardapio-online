const express = require('express')
const app = express()
const PORT = 3000

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.status(200).sendFile(__dirname + '/index.html' )
});

app.listen(PORT, ()=>{
    console.log(`Servidor ouvindo na porta: ${PORT}`)
})
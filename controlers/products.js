const fs = require('fs')
const arqProducts = './db/products.json'

var data = fs.readFileSync(arqProducts,{encoding:'utf8'})
module.exports = data
const fs = require('fs');

var criarUser = function(user,pass){
    fs.open('../db/user.json','w', function(fd,err){
        fs.write({usuario:user,senha:pass});
        fs.close();
    })
}



module.exports = criarUser;
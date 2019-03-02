$(document).ready(function(){

});

function loadProducts(){
  $.get('http://localhost:3000/products',function(data, status){
    console.log(data);
    var obj = JSON.parse(data);
    console.log(obj);
    
  });
}

function criarSecoes(){
  
}
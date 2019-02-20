var setoresCardapio = Array('Salgados', 'Caféteria', 'Bolos', 'Bebidas', 'Sucos', 'Vinhos', 'A lacart');

function initialize(){
    criarCards()
    console.log('entrei');
}

function criarCards(){
    let divCards = document.getElementById('cards');
    for(let i = 0; i < setoresCardapio.length; i++){
        let cards = document.createElement('div');
        let h1 = document.createElement('h1');
        h1.innerHTML = setoresCardapio[i];
        cards.append(h1);
        cards.className = 'card';
    
        divCards.appendChild(cards);

        // Adicionar eventos

        cards.addEventListener('click', (e)=>{
            console.log(window.location)
            window.location.href = 'file:///Users/wellingtongadelha/Desktop/cardapio-online/lista.html';
            window.location.search = 'comida';
        });
        

    };
    
    console.log(cards)
}

class Card{
    constructor(code, image){
        this.code = code;
        this.image = image;
    }
}
class Game{
    constructor(deck_id){
        this.deck_id = deck_id;
        this.lastCard = null;
    }
    getNewCard(){
        $.getJSON(`https://www.deckofcardsapi.com/api/deck/${this.deck_id}/draw/`, function(json){
            $('.divDeck').append(`<img id="${json.cards[0].code}" src="${json.cards[0].image}" alt="${json.cards[0].code}">`);
        });
    }
    drawCardFromDeck(code){
        $.getJSON(`https://www.deckofcardsapi.com/api/deck/${this.deck_id}/draw/?cards=`+code);
    }
    moveCardToUnused(code){
        $.getJSON(`https://www.deckofcardsapi.com/api/deck/${this.deck_id}/pile/unused/add/?cards=${code}`);
    }
    resetDeck(){
        $.getJSON(`https://www.deckofcardsapi.com/api/deck/${this.deck_id}/return/`);
    }
    resetGame(){
        $.getJSON('https://www.deckofcardsapi.com/api/deck/new/', function(json){
            this.deck_id = json.deck_id;
            localStorage.setItem('deck_id', json.deck_id);
            console.log(game.deck_id);
            //need to delete all cards before
            game.generateIMGsOnHTML();
        });
    }
    generateIMGsOnHTML(){
        //Get all the 52 cards
        $.getJSON(`https://www.deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=52`, function(json){
            json.cards.forEach(function(card){
                //Put each card in it respective div by suit
                $('.divDeck'+card.suit).append(`<img id="d${card.code}" src="${card.image}" alt="${card.code}">`);
                $('.divUnused').append(`<img id="u${card.code}" src="${card.image}" alt="${card.code}">`);
                $(`#u${card.code}`).hide();
                $(`#d${card.code}`).click(function(){
                    $(`#d${card.code}`).hide();
                    $(`#u${card.code}`).show();
                });
                $(`#u${card.code}`).click(function(){
                    $(`#u${card.code}`).hide();
                    $(`#d${card.code}`).show();
                });
            });
            //$.getJSON(`https://www.deckofcardsapi.com/api/deck/${this.deck_id}/pile/unused/add/?cards=${card.cards[0].code}`);
        });
    }
}

$(document).ready(function(){
    var urlEnd = (localStorage.getItem('deck_id') === null)?('new/'):(localStorage.getItem('deck_id')+'/');
    $.getJSON(`https://www.deckofcardsapi.com/api/deck/${urlEnd}`, function(deck){
        if (urlEnd == 'new/') localStorage.setItem('deck_id', deck.deck_id);
        var game = new Game(deck.deck_id);
        console.log(game.deck_id);
        $('.buttonNewCard').click(function(){game.getNewCard();});
        $('.buttonResetDeck').click(function(){game.resetDeck();});
        $('.buttonResetGame').click(function(){game.resetGame();});
        game.generateIMGsOnHTML();
    });
});
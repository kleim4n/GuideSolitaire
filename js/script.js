const deck_id = 'zz45tbc98nyy';

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
    generateIMGsOnHTML(){
        //Get all the 52 cards
        $.getJSON(`https://www.deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=52`, function(json){
            json.cards.forEach(function(card){
                //Put each card in it respective div by suit
                $('.divDeck'+card.suit).append(`<img id="${card.code}" src="${card.image}" alt="${card.code}">`);
            });
            //$.getJSON(`https://www.deckofcardsapi.com/api/deck/${this.deck_id}/pile/unused/add/?cards=${card.cards[0].code}`);
        });
    }
}

$(document).ready(function(){
    $.getJSON('https://www.deckofcardsapi.com/api/deck/new/', function(deck){
        var game = new Game(deck.deck_id);
        console.log(game.deck_id);
        $('.buttonNewCard').click(function(){game.getNewCard();});
        $('.buttonResetDeck').click(function(){game.resetDeck();});
        game.generateIMGsOnHTML();
    });
});
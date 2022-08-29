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
            console.log(json.cards[0]);
            this.lastCard = new Card(json.cards[0].code, json.cards[0].image);
            console.log(this.lastCard);
            $('body').append('<img src="'+this.lastCard.image+'" alt="'+this.lastCard.code+'">');
            //this.lastCard.code = json.cards[0].code;
            //this.lastCard.image = json.cards[0].image;
        });
    }
    printLastCard(){
        console.log(this.lastCard);
    }

}
var game;

$(document).ready(function(){
    $.getJSON('https://www.deckofcardsapi.com/api/deck/zz45tbc98nyy/shuffle', function(deck){
        console.log(deck.deck_id);
        game = new Game(deck.deck_id);
        game.getNewCard();
        console.log(game.lastCard);
    });
});
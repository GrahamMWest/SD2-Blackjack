
// cards x & y positions 1-5 for players 1-7 + dealer 
const cardX = [[1061, 965, 847, 705, 559, 428, 330, 705], [1050, 950, 825, 685, 540, 405, 310, 685]];
const cardY = [[269, 361, 421, 445, 421, 355, 263, 75], [250, 350, 400, 420, 400, 335, 243, 55]];
const cardA = [-48, -33, -16, 0, 16, 32, 48, 0];

const spriteNames = ['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 
                    'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
                    'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 
                    'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH']
const spriteValues = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 
                    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 
                    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 
                    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

// doesnt handle splits right now
const player1cards = [];
const player2cards = [];
const player3cards = [];
const player4cards = [];
const player5cards = [];
const player6cards = [];
const player7cards = [];

const playerCards = [[], [], [], [], [], [], []]

const dealerCards = [];

var cardIndex = 0;


//TODO:
// bind values to cards
// print total card value below each player
// make player actions

let gameOptions = {
 
    // card width, in pixels
    cardWidth: 334,
 
    // card height, in pixels
    cardHeight: 440,
 
    // card scale. 1 = original size, 0.5 half size and so on
    cardScale: 0.175
}

class GameScene extends Phaser.Scene {
    
    constructor() {
        super({ key: 'GameScene' });
    };

    // Load assets
    preload() {

        // load background and other assets
        this.load.image('background', '/static/assets/table_layout.png');
        this.load.image('face_down_card', '/static/assets/cards/card_back.png');

        this.load.spritesheet("cards", "/static/assets/cards.png", {
            frameWidth: gameOptions.cardWidth,
            frameHeight: gameOptions.cardHeight
        });
    };

    // called a single time after preload ends
    create() {
        let gameW = this.sys.game.config.width;
        let gameH = this.sys.game.config.height;

        // places the background
        let bg = this.add.image(0, 0, 'background');
        bg.scale = .75;
        bg.setPosition(1400/2, 740/2);

        // places controlPanel
        let controlPanel = this.add.rectangle(700, 875, 1400, 275, 0x008b8b);

        var numDecks = 2;
        var shuffledDeck = this.initializeDeck(numDecks);

        // this.firstCard = shuffledDeck[0];

        let deck = this.add.image(900, 75, 'face_down_card');
        deck.scale = .125;
        //deck.setPosition(1200/2, 900/2);

        var numPlayers = 2;
        var timeline = this.tweens.createTimeline();
        
        // i = card
        // j = player
        for (let i = 0; i < 2; i++)
        {
            for (let j = 0; j < numPlayers; j++)
            {
                playerCards[j] = this.dealCard(cardIndex, shuffledDeck, timeline, i, j);
                cardIndex++;
            }

            // deals to the dealer
            dealerCards[i] = this.dealCard(cardIndex, shuffledDeck, timeline, i, 7);
            console.log(this.getValue(shuffledDeck, cardIndex));
            cardIndex++;
        }
        
        timeline.play();

    };

    initializeDeck(numDecks) {

        // create an array with 52 integers from 0 to 51 * 
        this.deckOfCards = Phaser.Utils.Array.NumberArray(0, (51 * numDecks) + (numDecks - 1));

        for (let i = 0; i < ((51 * numDecks) + (numDecks - 1)); i++)
        {
            this.deckOfCards[i] = this.add.sprite(900, 75, "cards", i % 52);
            this.deckOfCards[i].setScale(gameOptions.cardScale);

            // setData(key, [data])
            // KS, 10
            this.deckOfCards[i].setData(spriteNames[i%52], spriteValues[i%52]);

            //console.log(this.deckOfCards[i].getData('KH'));
            //if (i % 52 == 12)
            //    console.log(this.deckOfCards[i].data.values.KS);

            
        }

        // shuffle the array
        Phaser.Utils.Array.Shuffle(this.deckOfCards);

        return this.deckOfCards;
    }

    dealCard(cardIndex, shuffledDeck, timeline, i, j) {

        // i = card
        // j = player
        // [card][player]
        timeline.add({
            targets: shuffledDeck[cardIndex],
            x: cardX[i][j],
            y: cardY[i][j],
            angle: cardA[j],
            ease: 'Linear',
            duration: 400,
            // repeat: 0,
            yoyo: false,
            delay: 500,
        })
    };

    // extremely cringe function that finds the values of each sprite
    getValue(shuffledDeck, cardIndex){

        if (shuffledDeck[cardIndex].data.values == 'AS')
            return 11;
        else if (shuffledDeck[cardIndex].data.values == '2S')
            return 2;
        else if (shuffledDeck[cardIndex].data.values == '3S')
            return 3;
        else if (shuffledDeck[cardIndex].data.values == '4S')
            return 4;
        else if (shuffledDeck[cardIndex].data.values == '5S')
            return 5;
        else if (shuffledDeck[cardIndex].data.values == '6S')
            return 6;
        else if (shuffledDeck[cardIndex].data.values == '7S')
            return 7;
        else if (shuffledDeck[cardIndex].data.values == '8S')
            return 8;
        else if (shuffledDeck[cardIndex].data.values == '9S')
            return 9;
        else if (shuffledDeck[cardIndex].data.values == '10S')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'JS')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'QS')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'KS')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'AC')
            return 11;
        else if (shuffledDeck[cardIndex].data.values == '2C')
            return 2;
        else if (shuffledDeck[cardIndex].data.values == '3C')
            return 3;
        else if (shuffledDeck[cardIndex].data.values == '4C')
            return 4;
        else if (shuffledDeck[cardIndex].data.values == '5C')
            return 5;
        else if (shuffledDeck[cardIndex].data.values == '6C')
            return 6;
        else if (shuffledDeck[cardIndex].data.values == '7C')
            return 7;
        else if (shuffledDeck[cardIndex].data.values == '8C')
            return 8;
        else if (shuffledDeck[cardIndex].data.values == '9C')
            return 9;
        else if (shuffledDeck[cardIndex].data.values == '10C')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'JC')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'QC')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'KC')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'AD')
            return 11;
        else if (shuffledDeck[cardIndex].data.values == '2D')
            return 2;
        else if (shuffledDeck[cardIndex].data.values == '3D')
            return 3;
        else if (shuffledDeck[cardIndex].data.values == '4D')
            return 4;
        else if (shuffledDeck[cardIndex].data.values == '5D')
            return 5;
        else if (shuffledDeck[cardIndex].data.values == '6D')
            return 6;
        else if (shuffledDeck[cardIndex].data.values == '7D')
            return 7;
        else if (shuffledDeck[cardIndex].data.values == '8D')
            return 8;
        else if (shuffledDeck[cardIndex].data.values == '9D')
            return 9;
        else if (shuffledDeck[cardIndex].data.values == '10D')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'JD')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'QD')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'KD')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'AH')
            return 11;
        else if (shuffledDeck[cardIndex].data.values == '2H')
            return 2;
        else if (shuffledDeck[cardIndex].data.values == '3H')
            return 3;
        else if (shuffledDeck[cardIndex].data.values == '4H')
            return 4;
        else if (shuffledDeck[cardIndex].data.values == '5H')
            return 5;
        else if (shuffledDeck[cardIndex].data.values == '6H')
            return 6;
        else if (shuffledDeck[cardIndex].data.values == '7H')
            return 7;
        else if (shuffledDeck[cardIndex].data.values == '8H')
            return 8;
        else if (shuffledDeck[cardIndex].data.values == '9H')
            return 9;
        else if (shuffledDeck[cardIndex].data.values == '10H')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'JH')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'QH')
            return 10;
        else if (shuffledDeck[cardIndex].data.values == 'KH')
            return 10;

        return 0;
    };

    update() {

    };

}
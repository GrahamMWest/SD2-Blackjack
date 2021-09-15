
// cards x & y positions 1-5 for players 1-7 + dealer 
const cardX = [[1061, 965, 847, 705, 559, 428, 330, 705], [1050, 950, 825, 685, 540, 405, 310, 685]];
const cardY = [[269, 361, 421, 445, 421, 355, 263, 75], [250, 350, 400, 420, 400, 335, 243, 55]];
const cardA = [-48, -33, -16, 0, 16, 32, 48, 0];

const spriteNames = ['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 
                    'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
                    'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 
                    'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH'];

const spriteValues = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 
                    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 
                    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 
                    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

// doesnt handle splits right now
const playerCards = [[], [], [], [], [], [], []];
let player1CardDisplay;
let player2CardDisplay;
let player3CardDisplay;
let player4CardDisplay;
let player5CardDisplay;
let player6CardDisplay;
let player7CardDisplay;

const dealerCards = [];
let dealerCardDisplay;

let runningCountScoreBoard;
let runningCount = 0;
let trueCountScoreBoard;
let trueCount = 0;

let cardIndex = 0;

let numDecks = 2;
let numPlayers = 7;
let deckPen = .75;



//TODO:
// print player total value
// true count = current running count / numDecks left
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
        this.load.image('face_down_card', '/static/assets/card_back.png');

        // action buttons


        // playing card spritesheet
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

        runningCountScoreBoard = this.add.text(1175, 25, "Running Count: 0", {fontSize: '20px', fill: '#fff'});
        trueCountScoreBoard = this.add.text(1175, 50, "True Count: 0", {fontSize: '20px', fill: '#fff'});
        dealerCardDisplay = this.add.text(1175, 75, "Dealer Cards: \n", {fontSize: '20px', fill: '#fff'});
        player1CardDisplay = this.add.text(1175, 125, "Player1 Cards: \n", {fontSize: '20px', fill: '#fff'});
        player2CardDisplay = this.add.text(1175, 175, "Player2 Cards: \n", {fontSize: '20px', fill: '#fff'});
        player3CardDisplay = this.add.text(1175, 225, "Player3 Cards: \n", {fontSize: '20px', fill: '#fff'});
        player4CardDisplay = this.add.text(1175, 275, "Player4 Cards: \n", {fontSize: '20px', fill: '#fff'});
        player5CardDisplay = this.add.text(1175, 325, "Player5 Cards: \n", {fontSize: '20px', fill: '#fff'});
        player6CardDisplay = this.add.text(1175, 375, "Player6 Cards: \n", {fontSize: '20px', fill: '#fff'});
        player7CardDisplay = this.add.text(1175, 425, "Player7 Cards: \n", {fontSize: '20px', fill: '#fff'});

        // places controlPanel
        let controlPanel = this.add.rectangle(700, 875, 1400, 275, 0x008b8b);

        // gets a shuffled deck
        var shuffledDeck = this.initializeDeck(numDecks);
        var cardInts = this.shuffleInts(numDecks);

        // this.firstCard = shuffledDeck[0];

        let deck = this.add.image(900, 75, 'face_down_card');
        deck.scale = .125;
        //deck.setPosition(1200/2, 900/2);

        var timeline = this.tweens.createTimeline();

        trueCount = Math.ceil(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
        
        // i = card
        // j = player
        for (let i = 0; i < 2; i++)
        {
            for (let j = 0; j < numPlayers; j++)
            {
                playerCards[j][i] = (this.getValue(cardInts, cardIndex));
                this.dealCard(cardInts[cardIndex], shuffledDeck, timeline, i, j);

                cardIndex++;
            }

            // deals to the dealer
            dealerCards[i] = (this.getValue(cardInts, cardIndex));
            this.dealCard(cardInts[cardIndex], shuffledDeck, timeline, i, 7);

            // console.log("Dealer Cards: " + dealerCards);
            //dealerCardDisplay.setText("Dealer cards: " + dealerCards[j]);

            cardIndex++;
        }
        
        timeline.play();

        // this.playGame();
    };

    update() {
        
    };

    // done i think
    // creates deck
    initializeDeck(numDecks) {

        // create an array with 52 * numDecks, with one row for card sprites, and one row for card values
        this.deckOfCards = Phaser.Utils.Array.NumberArray((0, (51 * numDecks) + (numDecks - 1)));

        for (let i = 0; i < ((51 * numDecks) + (numDecks - 1)); i++)
        {
            this.deckOfCards[i] = this.add.sprite(900, 75, "cards", i % 52);
            this.deckOfCards[i].setScale(gameOptions.cardScale);
        }

        return this.deckOfCards;
    }

    shuffleInts(numDecks){
        this.cardInts = Phaser.Utils.Array.NumberArray((0, (51 * numDecks) + (numDecks - 1)));

        for (let i = 0; i < ((51 * numDecks) + (numDecks - 1)); i++)
        {
            this.cardInts[i] = i;
        }

        Phaser.Utils.Array.Shuffle(this.cardInts);

        return this.cardInts;
    }

    // done i think
    // plays card dealing animations
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
            duration: 200,
            // repeat: 0,
            yoyo: false,
            delay: 500,
            onComplete: function() {

                shuffledDeck[cardIndex].setDepth(i);

                if (j < 7)
                {
                    if (playerCards[j][i] === "A" || playerCards[j][i] === "K" || playerCards[j][i] === "Q" || 
                    playerCards[j][i] === "J" || playerCards[j][i] === "10")
                    {
                        runningCount = runningCount - 1;
                        trueCount = Math.ceil(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                        runningCountScoreBoard.setText('Running Count: ' + runningCount);
                        trueCountScoreBoard.setText('True Count: ' + trueCount);
                    }
                    else if (playerCards[j][i] === "7" || playerCards[j][i] === "8" || playerCards[j][i] === "9"  )
                    {
                        runningCount = runningCount;
                        trueCount = Math.ceil(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                        runningCountScoreBoard.setText('Running Count: ' + runningCount);
                        trueCountScoreBoard.setText('True Count: ' + trueCount);
                    }
                    else
                    {
                        runningCount = runningCount + 1;
                        trueCount = Math.ceil(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                        runningCountScoreBoard.setText('Running Count: ' + runningCount);
                        trueCountScoreBoard.setText('True Count: ' + trueCount);
                    }

                    if (i == 0)
                    {
                        if (j == 0)
                            player1CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i] + "]");
                        else if (j == 1)
                            player2CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i] + "]");
                        else if (j == 2)
                            player3CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i] + "]");
                        else if (j == 3)
                            player4CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i] + "]");
                        else if (j == 4)
                            player5CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i] + "]");
                        else if (j == 5)
                            player6CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i] + "]");
                        else if (j == 6)
                            player7CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i] + "]");
                    }
                    else if (i == 1)
                    {
                        if (j == 0)
                            player1CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                        else if (j == 1)
                            player2CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                        else if (j == 2)
                            player3CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                        else if (j == 3)
                            player4CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                        else if (j == 4)
                            player5CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                        else if (j == 5)
                            player6CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                        else if (j == 6)
                            player7CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                    }
                    // gonna have to continue this if/else for all card combinations, 
                    // such as having 5 cards, also need to take splits into consideration

                }
                else
                {
                    if (dealerCards[i] === "A" || dealerCards[i] === "K" || dealerCards[i] === "Q" || 
                        dealerCards[i] === "J" || dealerCards[i] === "10")
                    {
                        runningCount = runningCount - 1;
                        trueCount = Math.ceil(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                        runningCountScoreBoard.setText('Running Count: ' + runningCount);
                        trueCountScoreBoard.setText('True Count: ' + trueCount);
                    }
                    else if (dealerCards[i] === "7" || dealerCards[i] === "8" || dealerCards[i] === "9"  )
                    {
                        runningCount = runningCount;
                        trueCount = Math.ceil(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                        runningCountScoreBoard.setText('Running Count: ' + runningCount);
                        trueCountScoreBoard.setText('True Count: ' + trueCount);
                    }
                    else
                    {
                        runningCount = runningCount + 1;
                        trueCount = Math.ceil(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                        runningCountScoreBoard.setText('Running Count: ' + runningCount);
                        trueCountScoreBoard.setText('True Count: ' + trueCount);
                    }

                    if (i == 0)
                    {
                        dealerCardDisplay.setText("Dealer Cards:\n[" + dealerCards[i] + "]");
                    }
                    else if (i == 1)
                    {
                        dealerCardDisplay.setText("Dealer Cards:\n[" + dealerCards[i-1] + "," + dealerCards[i] + "]");
                    }



                }
            }
        })
    };

    // finds the values of each sprite
    getValue(cardInts, cardIndex) {

        if (cardInts[cardIndex] % 13 == 0)
            return "A";
        else if (cardInts[cardIndex] % 13 == 1)
            return "2";
        else if (cardInts[cardIndex] % 13 == 2)
            return "3";
        else if (cardInts[cardIndex] % 13 == 3)
            return "4";
        else if (cardInts[cardIndex] % 13 == 4)
            return "5";
        else if (cardInts[cardIndex] % 13 == 5)
            return "6";
        else if (cardInts[cardIndex] % 13 == 6)
            return "7";
        else if (cardInts[cardIndex] % 13 == 7)
            return "8";
        else if (cardInts[cardIndex] % 13 == 8)
            return "9";
        else if (cardInts[cardIndex] % 13 == 9)
            return '10';
        else if (cardInts[cardIndex] % 13 == 10)
            return "J";
        else if (cardInts[cardIndex] % 13 == 11)
            return "Q";
        else if (cardInts[cardIndex] % 13 == 12)
            return "K";

    };

    playGame() {

    };

}

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
// print player total value (cant really do this cause of aces) (just treat A's as 1 for now)

// set up a game loop
// implement hit and stand actions
// wait for a players actions, then proceed to next player

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

        // chips
        this.load.image('chip_1', '/static/assets/1Chip.png');
        this.load.image('chip_1_angle', '/static/assets/1ChipAngle.png');
        this.load.image('chip_5', '/static/assets/5Chip.png');
        this.load.image('chip_5_angle', '/static/assets/5ChipAngle.png');
        this.load.image('chip_10', '/static/assets/10Chip.png');
        this.load.image('chip_10_angle', '/static/assets/10ChipAngle.png');
        this.load.image('chip_25', '/static/assets/25Chip.png');
        this.load.image('chip_25_angle', '/static/assets/25ChipAngle.png');
        this.load.image('chip_100', '/static/assets/100Chip.png');
        this.load.image('chip_100_angle', '/static/assets/100ChipAngle.png');

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

        // displays info on the top right side of canvas
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

        // places deck on table, will get replaced by boot later on
        let deck = this.add.image(900, 75, 'face_down_card');
        deck.scale = .125;

        // places betting buttons
        let whiteChip_1_Button = this.add.image(500, 925, 'chip_1');
        whiteChip_1_Button.scale = .075;
        let redChip_5_Button = this.add.image(600, 925, 'chip_5');
        redChip_5_Button.scale = .075;
        let blueChip_10_Button = this.add.image(700, 925, 'chip_10');
        blueChip_10_Button.scale = .075;
        let greenChip_25_Button = this.add.image(800, 925, 'chip_25');
        greenChip_25_Button.scale = .075;
        let blackChip_100_Button = this.add.image(900, 925, 'chip_100');
        blackChip_100_Button.scale = .075;

        // placing player turn indicators
        let player7TurnIndicator = this.add.circle(325, 775, 15, 0xFFFFFF);
        let player6TurnIndicator = this.add.circle(450, 775, 15, 0xFFFFFF);
        let player5TurnIndicator = this.add.circle(575, 775, 15, 0xFFFFFF);
        let player4TurnIndicator = this.add.circle(700, 775, 15, 0xFFFFFF);
        let player3TurnIndicator = this.add.circle(825, 775, 15, 0xFFFFFF);
        let player2TurnIndicator = this.add.circle(950, 775, 15, 0xFFFFFF);
        let player1TurnIndicator = this.add.circle(1075, 775, 15, 0x8E1600);

        var textStyle = {
            font: "normal 24px Arial",
            fill: '#000000',
            align: 'center',
            boundsAlignH: "center", // bounds center align horizontally
            boundsAlignV: "middle" // bounds center align vertically
        };

        // placing player action buttons
        let playerHit = this.add.rectangle(400, 845, 150, 50, 0xFFFFFF);
        let hitText = this.add.text(385, 833, "Hit", textStyle);
        let playerDouble = this.add.rectangle(600, 845, 150, 50, 0xFFFFFF);
        let doubleText = this.add.text(563, 833, "Double", textStyle);
        let playerStand = this.add.rectangle(800, 845, 150, 50, 0xFFFFFF);
        let standText = this.add.text(768, 833, "Stand", textStyle);
        let playerSplit = this.add.rectangle(1000, 845, 150, 50, 0xFFFFFF);
        let splitText = this.add.text(975, 833, "Split", textStyle);

        // places gambling warning
        //let gamblingWarning = this.add.graphics();
        //gamblingWarning.fillStyle(0xFFFFFF, 1);
        //gamblingWarning.fillRoundedRect(350, 100, 700, 500, 32);
        //gamblingWarning.setDepth(100000);

        // testing how to stack chips
        let blackChipAngleBot = this.add.image(975, 555, 'chip_100_angle');
        blackChipAngleBot.scale = .075;
        let blackChipAngleTop = this.add.image(975, 550, 'chip_100_angle');
        blackChipAngleTop.scale = .075;

        // WIP Disclaimer
        let disclaimer = this.add.text(25, 25, "Work In Progress", {fontSize: '20px', fill: '#fff'});


        // math and game logic starts here

        var timeline = this.tweens.createTimeline();

        trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
        
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
                        trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                        runningCountScoreBoard.setText('Running Count: ' + runningCount);
                        trueCountScoreBoard.setText('True Count: ' + trueCount);
                    }
                    else if (playerCards[j][i] === "7" || playerCards[j][i] === "8" || playerCards[j][i] === "9"  )
                    {
                        runningCount = runningCount;
                        trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                        runningCountScoreBoard.setText('Running Count: ' + runningCount);
                        trueCountScoreBoard.setText('True Count: ' + trueCount);
                    }
                    else
                    {
                        runningCount = runningCount + 1;
                        trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
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
                        trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                        runningCountScoreBoard.setText('Running Count: ' + runningCount);
                        trueCountScoreBoard.setText('True Count: ' + trueCount);
                    }
                    else if (dealerCards[i] === "7" || dealerCards[i] === "8" || dealerCards[i] === "9"  )
                    {
                        runningCount = runningCount;
                        trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                        runningCountScoreBoard.setText('Running Count: ' + runningCount);
                        trueCountScoreBoard.setText('True Count: ' + trueCount);
                    }
                    else
                    {
                        runningCount = runningCount + 1;
                        trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
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
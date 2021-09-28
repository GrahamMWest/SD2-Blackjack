"use strict";

// cards x & y positions 1-5 for players 1-7 + dealer 
const cardX = [[1061, 965, 847, 705, 559, 428, 330, 705], [1050, 950, 825, 685, 540, 405, 310, 685], [1025, 925, 800, 660, 515, 385, 285, 660]];
const cardY = [[269, 361, 421, 445, 421, 355, 263, 75], [250, 350, 400, 420, 400, 335, 243, 55], [225, 325, 375, 400, 375, 310, 230, 30]];
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
// displays info on right side
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


// changeable settings
let numDecks = 2;
let numPlayers = 7;
let deckPen = .75;
let playerCurrency = 500;

// global variables that were created in create function
let bg;
let controlPanel;
let shuffledDeck;
let cardInts;
let dealerCard;
let dealerIndex
let deck;

let whiteChip_1_Button;
let redChip_5_Button;
let blueChip_10_Button;
let greenChip_25_Button;
let blackChip_100_Button;

let player7TurnIndicator;
let player6TurnIndicator;
let player5TurnIndicator;
let player4TurnIndicator;
let player3TurnIndicator;
let player2TurnIndicator;
let player1TurnIndicator;

let currentPlayer;

let playerHit;
let hitText;
let playerDouble;
let doubleText;
let playerStand;
let standText;
let playerSplit;
let splitText;

let disclaimer;


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

let textStyle = {
    font: "normal 24px Arial",
    fill: '#000000',
    align: 'center',
    boundsAlignH: "center", // bounds center align horizontally
    boundsAlignV: "middle" // bounds center align vertically
};

function updateInfo(i, j) {

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
        else if (i == 2)
        {
            if (j == 0)
                player1CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
            else if (j == 1)
                player2CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-2] + "," + playerCards[j][i-1]  + "," + playerCards[j][i] +  "]");
            else if (j == 2)
                player3CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-2] + "," + playerCards[j][i-1]  + "," + playerCards[j][i] +  "]");
            else if (j == 3)
                player4CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-2] + "," + playerCards[j][i-1]  + "," + playerCards[j][i] +  "]");
            else if (j == 4)
                player5CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-2] + "," + playerCards[j][i-1]  + "," + playerCards[j][i] +  "]");
            else if (j == 5)
                player6CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-2] + "," + playerCards[j][i-1]  + "," + playerCards[j][i] +  "]");
            else if (j == 6)
                player7CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-2] + "," + playerCards[j][i-1]  + "," + playerCards[j][i] +  "]");
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
            dealerCardDisplay.setText("Dealer Cards:\n[?, " + dealerCards[i] + "]");
        }
        else if (i == 2)
        {
            dealerCardDisplay.setText("Dealer Cards:\n[?, " + dealerCards[i-1] + ", " + dealerCards[i] + "]");
        }



    }
};

class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameScene' });
    };
    
    hitCard(cardIndex, shuffledDeck, i, j) {
        
        // const updateInfo = this.updateInfo;
        this.tweens.add({
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
    
                updateInfo(i, j);
            }
        })
    };

    standCard() {

    };

    doubleCard() {

    };

    splitCard() {

    };
    
    // done i think
    // plays card dealing animations
    dealCard(cardIndex, shuffledDeck, timeline, i, j, isDealerCard, dealerCard) {
    
        // i = card
        // j = player
        // [card][player]
    
        if (isDealerCard)
        {
            timeline.add({
                targets: dealerCard,
                x: cardX[i][j],
                y: cardY[i][j],
                angle: cardA[j],
                ease: 'Linear',
                duration: 200,
                // repeat: 0,
                yoyo: false,
                delay: 500,
                onComplete: function() {
    
                    dealerCard.setDepth(i);
                    dealerCardDisplay.setText("Dealer Cards:\n[?]");
                }
            })
        }
        else
        {
            // const updateInfo = this.updateInfo;
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
    
                    updateInfo(i, j);
                }
            })
        }
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

    isBlackjack(playerCards) {
        var length = playerCards.length;
        var sum = 1;
        
        for (let i = 0; i < length; i++)
        {
            // sum = sum + playerCards[i];
            sum = sum;
        }

        return false;
    };

    isBust(){

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

        // places the background
        bg = this.add.image(0, 0, 'background');
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
        controlPanel = this.add.rectangle(700, 875, 1400, 275, 0x008b8b);

        // gets a shuffled deck
        shuffledDeck = this.initializeDeck(numDecks);
        cardInts = this.shuffleInts(numDecks);

        dealerCard = this.add.image(900, 75, 'face_down_card');
        dealerCard.scale = .12;

        // places deck on table, will get replaced by boot later on
        deck = this.add.image(900, 75, 'face_down_card');
        deck.scale = .125;

        // places betting buttons
        whiteChip_1_Button = this.add.image(500, 925, 'chip_1');
        whiteChip_1_Button.scale = .075;
        redChip_5_Button = this.add.image(600, 925, 'chip_5');
        redChip_5_Button.scale = .075;
        blueChip_10_Button = this.add.image(700, 925, 'chip_10');
        blueChip_10_Button.scale = .075;
        greenChip_25_Button = this.add.image(800, 925, 'chip_25');
        greenChip_25_Button.scale = .075;
        blackChip_100_Button = this.add.image(900, 925, 'chip_100');
        blackChip_100_Button.scale = .075;

        // placing player turn indicators
        player7TurnIndicator = this.add.circle(325, 775, 15, 0xFFFFFF);
        player6TurnIndicator = this.add.circle(450, 775, 15, 0xFFFFFF);
        player5TurnIndicator = this.add.circle(575, 775, 15, 0xFFFFFF);
        player4TurnIndicator = this.add.circle(700, 775, 15, 0xFFFFFF);
        player3TurnIndicator = this.add.circle(825, 775, 15, 0xFFFFFF);
        player2TurnIndicator = this.add.circle(950, 775, 15, 0xFFFFFF);
        player1TurnIndicator = this.add.circle(1075, 775, 15, 0x8E1600);

        // placing player action buttons
        playerHit = this.add.rectangle(400, 845, 150, 50, 0x808080);
        hitText = this.add.text(385, 833, "Hit", textStyle);
        playerDouble = this.add.rectangle(600, 845, 150, 50, 0x808080);
        doubleText = this.add.text(563, 833, "Double", textStyle);
        playerStand = this.add.rectangle(800, 845, 150, 50, 0x808080);
        standText = this.add.text(768, 833, "Stand", textStyle);
        playerSplit = this.add.rectangle(1000, 845, 150, 50, 0x808080);
        splitText = this.add.text(975, 833, "Split", textStyle);

        // places gambling warning
        //let gamblingWarning = this.add.graphics();
        //gamblingWarning.fillStyle(0xFFFFFF, 1);
        //gamblingWarning.fillRoundedRect(350, 100, 700, 500, 32);
        //gamblingWarning.setDepth(100000);

        // WIP Disclaimer
        disclaimer = this.add.text(25, 25, "Work In Progress", {fontSize: '20px', fill: '#fff'});

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
                this.dealCard(cardInts[cardIndex], shuffledDeck, timeline, i, j, 0, dealerCard);

                cardIndex++;
            }

            // deals to the dealer
            dealerCards[i] = (this.getValue(cardInts, cardIndex));
            if (i == 0)
            {
                this.dealCard(cardInts[cardIndex], shuffledDeck, timeline, i, 7, 1, dealerCard);
                shuffledDeck[cardIndex].setPosition(cardX[0][7], cardY[0][7]);
                shuffledDeck[cardIndex].setDepth(-1);
                dealerIndex = cardIndex;
            }
            else
            {
                this.dealCard(cardInts[cardIndex], shuffledDeck, timeline, i, 7, 0, dealerCard);
            }

            cardIndex++;
        }
        
        timeline.play();

        // works
        timeline.addListener("complete", function(){
            //Do something when tweens are complete

            // dont need to do these actions yet
            //dealerCard.destroy(true);
            //shuffledDeck[dealerIndex].setDepth(7);

            // activate the buttons
            playerHit.setInteractive({ useHandCursor: true });
            playerDouble.setInteractive({ useHandCursor: true });
            playerStand.setInteractive({ useHandCursor: true });
            playerSplit.setInteractive({ useHandCursor: true });
            playerHit.fillColor = 0xFFFFFF;
            playerDouble.fillColor = 0xFFFFFF;
            playerStand.fillColor = 0xFFFFFF;
            playerSplit.fillColor = 0xFFFFFF;
            playerHit.on('pointerover', function(){
                playerHit.fillColor = 0x808080;
            })

            playerDouble.on('pointerover', function(){
                playerDouble.fillColor = 0x808080;
            })

            playerStand.on('pointerover', function(){
                playerStand.fillColor = 0x808080;
            })

            playerSplit.on('pointerover', function(){
                playerSplit.fillColor = 0x808080;
            })

            playerHit.on('pointerout', function(){
                playerHit.fillColor = 0xFFFFFF;
            })

            playerDouble.on('pointerout', function(){
                playerDouble.fillColor = 0xFFFFFF;
            })

            playerStand.on('pointerout', function(){
                playerStand.fillColor = 0xFFFFFF;
            })

            playerSplit.on('pointerout', function(){
                playerSplit.fillColor = 0xFFFFFF;
            })
        }, this);

        // this.switchedOn = 'playerHit';

        //playerHit.on('pointerdown', function(){
        //    playerCards[0][2] = (this.scene.getValue(cardInts, cardIndex, this));
        //    this.scene.hitCard(cardInts[cardIndex], shuffledDeck, 2, 0, this);
        //})
       
        // 1. check if player has bj or is bust
        // 2. if bj, perform appropriate actions
        // 3. if bust, perform appropriate actions
        // 4. if neither, let player play an action
        // 5. then repeat steps 1-4 
        // 6. then move to next player

        // i = card
        // j = player
        
        currentPlayer = 0;

        if (this.isBlackjack(playerCards[currentPlayer], this))
        {

        }
        else if (this.isBust(playerCards[currentPlayer]))
        {

        }
        else
        {
            playerHit.on('pointerdown', function(){
                playerCards[currentPlayer][2] = (this.scene.getValue(cardInts, cardIndex, this));
                this.scene.hitCard(cardInts[cardIndex], shuffledDeck, 2, currentPlayer, this);
                cardIndex++;
            })

            playerStand.on('pointerdown', function(){

                if (currentPlayer == 0)
                {
                    player1TurnIndicator.fillColor = 0xFFFFFF;
                    player2TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = currentPlayer + 1;
                }
                else if (currentPlayer == 1)
                {
                    player2TurnIndicator.fillColor = 0xFFFFFF;
                    player3TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = currentPlayer + 1;
                }
                else if (currentPlayer == 2)
                {
                    player3TurnIndicator.fillColor = 0xFFFFFF;
                    player4TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = currentPlayer + 1;
                }
                else if (currentPlayer == 3)
                {
                    player4TurnIndicator.fillColor = 0xFFFFFF;
                    player5TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = currentPlayer + 1;
                }
                else if (currentPlayer == 4)
                {
                    player5TurnIndicator.fillColor = 0xFFFFFF;
                    player6TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = currentPlayer + 1;
                }
                else if (currentPlayer == 5)
                {
                    player6TurnIndicator.fillColor = 0xFFFFFF;
                    player7TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = currentPlayer + 1;
                }
                else if (currentPlayer == 6)
                {
                    player7TurnIndicator.fillColor = 0xFFFFFF;
                    player1TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = 0;
                    // add more here since that means the round is over
                }
            })


        }


    };

    update() {
        
    };

}
"use strict";

// cards x & y positions 1-5 for players 1-7 + dealer 
const cardX = [[965, 705, 428, 705], [950, 685, 405, 725], [925, 660, 385, 745], [910, 640, 365, 765], [895, 620, 345, 785]];
const cardY = [[361, 445, 355, 75], [350, 420, 335, 95], [325, 400, 310, 115], [300, 380, 295, 135], [275, 360, 270, 155]];
const cardA = [-33, 0, 32, 0];

const spriteNames = ['AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 
                    'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
                    'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 
                    'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH'];

const spriteValues = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 
                    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 
                    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 
                    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

// doesnt handle splits right now
let playerCards = [[], [], []];
// displays info on right side
let player1CardDisplay;
let player2CardDisplay;
let player3CardDisplay;

let dealerCards = [];
let dealerCardDisplay;

let runningCountScoreBoard;
let runningCount = 0;
let trueCountScoreBoard;
let trueCount = 0;

let cardIndex = 0;


// changeable settings
let numDecks = 2;
let numPlayers = 3;
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

let nextRoundButton;


//TODO:
// dealer needs to draw to 16, and stand on 17
// reset the game for another round

// add money, bets, and doubling

// add splits

let gameOptions = {
 
    // card width, in pixels
    cardWidth: 560,
 
    // card height, in pixels
    cardHeight: 780,
 
    // card scale. 1 = original size, 0.5 half size and so on
    cardScale: 0.125
}

let textStyle = {
    font: "normal 24px Arial",
    fill: '#000000',
    align: 'center',
    boundsAlignH: "center", // bounds center align horizontally
    boundsAlignV: "middle" // bounds center align vertically
};

function updateInfo(i, j) {

    if (j < 3)
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
        }
        else if (i == 1)
        {
            if (j == 0)
                player1CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
            else if (j == 1)
                player2CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
            else if (j == 2)
                player3CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
        }
        else if (i == 2)
        {
            if (j == 0)
                player1CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
            else if (j == 1)
                player2CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-2] + "," + playerCards[j][i-1]  + "," + playerCards[j][i] +  "]");
            else if (j == 2)
                player3CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-2] + "," + playerCards[j][i-1]  + "," + playerCards[j][i] +  "]");
        }
        else if (i == 3)
        {
            if (j == 0)
                player1CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
            else if (j == 1)
                player2CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
            else if (j == 2)
                player3CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
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
            dealerCardDisplay.setText("Dealer Cards:\n[" + dealerCards[i-2] + ", " + dealerCards[i-1] + ", " + dealerCards[i] + "]");
        }
        else if (i == 3)
        {
            dealerCardDisplay.setText("Dealer Cards:\n[" + dealerCards[i-3] + ", " + dealerCards[i-2] + ", " + dealerCards[i-1] + ", " + dealerCards[i] + "]");
        }
        else if (i == 4)
        {
            dealerCardDisplay.setText("Dealer Cards:\n[" + dealerCards[i-4] + ", " + dealerCards[i-3] + ", " + dealerCards[i-2] + ", " + dealerCards[i-1] + ", " + dealerCards[i] + "]");
        }
    }
};

class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameScene' });
    };

    drawDealerCards(dealerCards, cardIndex, cardInts, i) {
        var length = 2;
        var timeline = this.tweens.createTimeline();
        var j = 3;

        while(this.getHandValue(dealerCards) < 17)
        {
            dealerCards[i] = (this.getValue(cardInts, cardIndex));
            this.dealCard(cardInts[cardIndex], shuffledDeck, timeline, i, 3, 0, dealerCard);

            i++;
            cardIndex++;
        }

        timeline.play();
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
            //this.deckOfCards[i].smoothed = false;
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

    getHandValue(playerCards) {
        var length = playerCards.length;
        var sum = 0;
        var aceCount = 0;

        for (let i = 0; i < length; i++)
        {
            if (playerCards[i] === "A")
            {
                aceCount++;
            }
            else if (playerCards[i] === "10" || playerCards[i] === "J" || playerCards[i] === "Q" || playerCards[i] === "K")
            {
                sum = sum + 10;
            }
            else
            {
                sum = sum + parseInt(playerCards[i], 10);
            }
        }

        while (aceCount > 0)
        {
            if (sum + 11 > 21)
                sum = sum + 1;
            else
                sum = sum + 11;

            aceCount--;
        }

        return sum;
    };
    
    isBlackjack(playerCards) {
        var length = playerCards.length;
        var sum = 0;

        if (length != 2)
            return false;
        
        for (let i = 0; i < length; i++)
        {
            if (playerCards[i] === "A")
            {
                sum = sum + 11;
            }
            else if (playerCards[i] === "10" || playerCards[i] === "J" || playerCards[i] === "Q" || playerCards[i] === "K")
            {
                sum = sum + 10;
            }
        }

        if (sum == 21)
            return true;

        return false;
    };

    isBust(playerCards) {
        var length = playerCards.length;
        var sum = 0;
        var aceCount = 0;

        for (let i = 0; i < length; i++)
        {
            if (playerCards[i] === "A")
            {
                aceCount++;
            }
            else if (playerCards[i] === "10" || playerCards[i] === "J" || playerCards[i] === "Q" || playerCards[i] === "K")
            {
                sum = sum + 10;
            }
            else
            {
                sum = sum + parseInt(playerCards[i], 10);
            }
        }

        while (aceCount > 0)
        {
            if (sum + 11 > 21)
                sum = sum + 1;
            else
                sum = sum + 11;

            aceCount--;
        }

        if (sum > 21)
            return true;

        return false;
    };

    isWinOrLoss() {

        let dealerHandValue = this.getHandValue(dealerCards);

        for (let i = 0; i < numPlayers; i++)
        {
            let handValue = this.getHandValue(playerCards[i]);
            
            if (this.isBlackjack(playerCards[i]))
            {
                // blackjack
                if (i == 0)
                {
                    player1CardDisplay.setTint(0xFFD700);
                }
                else if (i == 1)
                {
                    player2CardDisplay.setTint(0xFFD700);
                }
                else if (i == 2)
                {
                    player3CardDisplay.setTint(0xFFD700);
                }
            }
            else if ((handValue > dealerHandValue && handValue < 22) || (handValue < 22 && dealerHandValue > 21))
            {
                // hand wins
                if (i == 0)
                {
                    player1CardDisplay.setTint(0x00FF00);
                }
                else if (i == 1)
                {
                    player2CardDisplay.setTint(0x00FF00);
                }
                else if (i == 2)
                {
                    player3CardDisplay.setTint(0x00FF00);
                }
            }
            else if (handValue == dealerHandValue)
            {
                // push
                if (i == 0)
                {
                    player1CardDisplay.setTint(0xFFFFFF);
                }
                else if (i == 1)
                {
                    player2CardDisplay.setTint(0xFFFFFF);
                }
                else if (i == 2)
                {
                    player3CardDisplay.setTint(0xFFFFFF);
                }
            }
            else
            {
                // hand loses
                if (i == 0)
                {
                    player1CardDisplay.setTint(0x8E1600);
                }
                else if (i == 1)
                {
                    player2CardDisplay.setTint(0x8E1600);
                }
                else if (i == 2)
                {
                    player3CardDisplay.setTint(0x8E1600);
                }
            }
        }
    };

    revealDealerInfo(dealerCards) {

        // updates info on right side based on the dealers faced down card

        if (dealerCards[0] === "A" || dealerCards[0] === "K" || dealerCards[0] === "Q" || 
            dealerCards[0] === "J" || dealerCards[0] === "10")
        {
            runningCount = runningCount - 1;
            trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
            runningCountScoreBoard.setText('Running Count: ' + runningCount);
            trueCountScoreBoard.setText('True Count: ' + trueCount);
        }
        else if (dealerCards[0] === "7" || dealerCards[0] === "8" || dealerCards[0] === "9"  )
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

 
        dealerCardDisplay.setText("Dealer Cards:\n[" + dealerCards[0] + ", " + dealerCards[1] + "]");


    };

    resetBoard() {
        dealerCardDisplay.setText("Dealer Cards: \n");
        player1CardDisplay.setText("Player1 Cards: \n");
        player2CardDisplay.setText("Player2 Cards: \n");
        player3CardDisplay.setText("Player3 Cards: \n");
        player1CardDisplay.setTint(0xFFFFFF);
        player2CardDisplay.setTint(0xFFFFFF);
        player3CardDisplay.setTint(0xFFFFFF);
        nextRoundButton.visible = false;

        dealerCard.setPosition(900, 75);
        dealerCard.visible = true;

        playerCards = [[], [], []];
        dealerCards = [];

        // destroy sprites
        for (let i = 0; i < cardIndex; i++)
        {
            shuffledDeck[cardInts[i]].destroy(true);
        }
    };

    newRound() {

        //playerHit.setInteractive(false);
        //playerDouble.setInteractive(false);
        //playerStand.setInteractive(false);
        //playerSplit.setInteractive(false);
        playerHit.fillColor = 0x808080;
        playerDouble.fillColor = 0x808080;
        playerStand.fillColor = 0x808080;
        playerSplit.fillColor = 0x808080;

        var timeline = this.tweens.createTimeline();
        
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
            //console.log(dealerCards[i]);
            if (i == 0)
            {
                this.dealCard(cardInts[cardIndex], shuffledDeck, timeline, i, 3, 1, dealerCard);
                dealerIndex = cardIndex;
                shuffledDeck[cardInts[dealerIndex]].setPosition(cardX[0][3], cardY[0][3]);
                shuffledDeck[cardInts[dealerIndex]].setDepth(-1);
            }
            else
            {
                this.dealCard(cardInts[cardIndex], shuffledDeck, timeline, i, 3, 0, dealerCard);
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

            // check if any players have blackjack
            for (let i = 0; i < numPlayers; i++)
            {
                if (this.isBlackjack(playerCards[i]))
                {
                    if (i == 0)
                    {
                        player1CardDisplay.setTint(0xFFD700);
                    }
                    else if (i == 1)
                    {  
                        player2CardDisplay.setTint(0xFFD700);
                    }
                    else if (i == 2)
                    {
                        player3CardDisplay.setTint(0xFFD700);
                    }
                }
            }

        }, this);

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
        this.load.image('nextRoundButton', '/static/assets/nextRoundButton.png');

        // playing card spritesheet
        this.load.spritesheet("cards", "/static/assets/classicCards.png", {
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
        player1CardDisplay = this.add.text(1175, 175, "Player1 Cards: \n", {fontSize: '20px', fill: '#fff'});
        player2CardDisplay = this.add.text(1175, 275, "Player2 Cards: \n", {fontSize: '20px', fill: '#fff'});
        player3CardDisplay = this.add.text(1175, 375, "Player3 Cards: \n", {fontSize: '20px', fill: '#fff'});

        // places controlPanel
        controlPanel = this.add.rectangle(700, 875, 1400, 275, 0x008b8b);

        // gets a shuffled deck
        shuffledDeck = this.initializeDeck(numDecks);
        cardInts = this.shuffleInts(numDecks);

        dealerCard = this.add.image(900, 75, 'face_down_card');
        dealerCard.scale = .13;

        // places deck on table, will get replaced by boot later on
        deck = this.add.image(900, 75, 'face_down_card');
        deck.scale = .13;

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

        // places next round button
        nextRoundButton = this.add.image(1000, 925, 'nextRoundButton');
        nextRoundButton.scale = 1.25;
        nextRoundButton.visible = false;


        // placing player turn indicators
        player3TurnIndicator = this.add.circle(450, 775, 15, 0xFFFFFF);
        player2TurnIndicator = this.add.circle(700, 775, 15, 0xFFFFFF);
        player1TurnIndicator = this.add.circle(950, 775, 15, 0x8E1600);


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

        trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));

        this.newRound();
       
        // 1. check if player has bj or is bust
        // 2. if bj, perform appropriate actions
        // 3. if bust, perform appropriate actions
        // 4. if neither, let player play an action
        // 5. then repeat steps 1-4 
        // 6. then move to next player

        // i = card
        // j = player

        currentPlayer = 0;

        // player chooses to hit
        playerHit.on('pointerdown', function(){
            playerCards[currentPlayer][playerCards[currentPlayer].length] = (this.scene.getValue(cardInts, cardIndex, this));
            this.scene.hitCard(cardInts[cardIndex], shuffledDeck, playerCards[currentPlayer].length-1, currentPlayer, this);
            cardIndex++;

            // playerCards[currentPlayer][playerCards[currentPlayer].length + 1]
            // to dynamically hit cards

            if (this.scene.isBust(playerCards[currentPlayer]))
            {
                if (currentPlayer == 0)
                {
                    if (numPlayers != 1)
                    {
                        player1CardDisplay.setTint(0x8E1600);
                        player1TurnIndicator.fillColor = 0xFFFFFF;
                        player2TurnIndicator.fillColor = 0x8E1600;
                        currentPlayer = currentPlayer + 1;
                    }
                    else
                    {
                        // plus more stuff since if its the last player
                        dealerCard.visible = false;
                        shuffledDeck[cardInts[dealerIndex]].setDepth(7);
                        this.scene.revealDealerInfo(dealerCards);
                        // dealer needs to draw to 16, and stand on 17
                        this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                        cardIndex = cardIndex + dealerCards.length - 2;
                        this.scene.isWinOrLoss();
                        //this.scene.resetBoard();
                        nextRoundButton.visible = true;
                        nextRoundButton.setInteractive({ useHandCursor: true });
                    }
                }
                else if (currentPlayer == 1)
                {
                    if (numPlayers != 2)
                    {
                        player2CardDisplay.setTint(0x8E1600);
                        player2TurnIndicator.fillColor = 0xFFFFFF;
                        player3TurnIndicator.fillColor = 0x8E1600;
                        currentPlayer = currentPlayer + 1;
                    }
                    else
                    {
                        // plus more stuff since if its the last player
                        dealerCard.visible = false;
                        shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                        this.scene.revealDealerInfo(dealerCards);
                        // dealer needs to draw to 16, and stand on 17
                        this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                        cardIndex = cardIndex + dealerCards.length - 2;
                        this.scene.isWinOrLoss();
                        //this.scene.resetBoard();
                        nextRoundButton.visible = true;
                        nextRoundButton.setInteractive({ useHandCursor: true });
                    }
                }
                else if (currentPlayer == 2)
                {
                    player3CardDisplay.setTint(0x8E1600);
                    player3TurnIndicator.fillColor = 0xFFFFFF;
                    player1TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = 0;

                    // plus more stuff since if its the last player
                    dealerCard.visible = false;
                    shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                    this.scene.revealDealerInfo(dealerCards);
                    // dealer needs to draw to 16, and stand on 17
                    this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                    cardIndex = cardIndex + dealerCards.length - 2;
                    this.scene.isWinOrLoss();
                    //this.scene.resetBoard();
                    nextRoundButton.visible = true;
                    nextRoundButton.setInteractive({ useHandCursor: true });
                }
            }

        })

        // player chooses to stand
        playerStand.on('pointerdown', function(){

            if (currentPlayer == 0)
            {
                if (numPlayers != 1)
                {
                    player1TurnIndicator.fillColor = 0xFFFFFF;
                    player2TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = currentPlayer + 1;
                }
                else
                {
                    // plus more stuff since if its the last player
                    dealerCard.visible = false;
                    shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                    this.scene.revealDealerInfo(dealerCards);
                    // dealer needs to draw to 16, and stand on 17
                    this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                    cardIndex = cardIndex + dealerCards.length - 2;
                    this.scene.isWinOrLoss();
                    //this.scene.resetBoard();
                    nextRoundButton.visible = true;
                    nextRoundButton.setInteractive({ useHandCursor: true });
                }
            }
            else if (currentPlayer == 1)
            {
                if (numPlayers != 2)
                {
                    player2TurnIndicator.fillColor = 0xFFFFFF;
                    player3TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = currentPlayer + 1;
                }
                else
                {
                    player2TurnIndicator.fillColor = 0xFFFFFF;
                    player1TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = 0;
                    dealerCard.visible = false;
                    shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                    this.scene.revealDealerInfo(dealerCards);
                    // dealer needs to draw to 16, and stand on 17
                    this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                    cardIndex = cardIndex + dealerCards.length - 2;
                    this.scene.isWinOrLoss();
                    //this.scene.resetBoard();
                    nextRoundButton.visible = true;
                    nextRoundButton.setInteractive({ useHandCursor: true });
                }
            }
            else if (currentPlayer == 2)
            {
                player3TurnIndicator.fillColor = 0xFFFFFF;
                player1TurnIndicator.fillColor = 0x8E1600;
                currentPlayer = 0;
                dealerCard.visible = false;
                shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                this.scene.revealDealerInfo(dealerCards);
                // dealer needs to draw to 16, and stand on 17
                this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                cardIndex = cardIndex + dealerCards.length - 2;
                this.scene.isWinOrLoss();
                //this.scene.resetBoard();
                nextRoundButton.visible = true;
                nextRoundButton.setInteractive({ useHandCursor: true });
            }
        })

        nextRoundButton.on('pointerdown', function(){
            this.scene.resetBoard();
            this.scene.newRound();
        })


    };

    update() {
        
    };

}
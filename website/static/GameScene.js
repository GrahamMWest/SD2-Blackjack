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

let currencyScoreBoard;
let pointScoreBoard;
let runningCountScoreBoard;
let runningCount = 0;
let trueCountScoreBoard;
let trueCount = 0;

let cardIndex = 0;


// changeable settings
let numDecks = 1;
let numPlayers = 3;
let deckPen = .1;
let playerCurrency = 5000;
let playerPoints = 0;
let minBet = 5;
let maxBet = 500;

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
let currentBet;
let numChips;
let player1Bet;
let player2Bet;
let player3Bet;
let player1ChipCount = [];
let player2ChipCount = [];
let player3ChipCount = [];

let playerHit;
let hitText;
let playerDouble;
let doubleText;
let playerStand;
let standText;
let playerSplit;
let splitText;

let disclaimer;
let shuffleAnimation;

let nextRoundButton;
let nextBettorButton;


//TODO:
// add double button
// figure out how to do payouts
// replace lower value chips with higher value

// add money, bets, and doubling

// add splits

// updateinfo function not done yet (splits, ect)

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

    currencyScoreBoard.setText("Currency: $" + playerCurrency);
    pointScoreBoard.setText("Points: " + playerPoints);

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
        else if (playerCards[j][i] === "2" || playerCards[j][i] === "3" || playerCards[j][i] === "4" || 
        playerCards[j][i] === "5" || playerCards[j][i] === "6")
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
        else if (i == 4)
        {
            if (j == 0)
                player1CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-4] + "," + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
            else if (j == 1)
                player2CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-4] + "," + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
            else if (j == 2)
                player3CardDisplay.setText("Player" + (j + 1) + " Cards:\n[" + playerCards[j][i-4] + "," + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
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
        else if (dealerCards[i] === "2" || dealerCards[i] === "3" || dealerCards[i] === "4" || 
        dealerCards[i] === "5" || dealerCards[i] === "6")
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

        const enableNextRoundButton = this.enableNextRoundButton;
        while(this.getHandValue(dealerCards) < 17)
        {
            dealerCards[i] = (this.getValue(cardInts, cardIndex));
            this.dealCard(cardInts[cardIndex], shuffledDeck, timeline, i, 3, 0, dealerCard);

            i++;
            cardIndex++;
        }

        timeline.play();

        timeline.addListener("complete", function(){
            enableNextRoundButton();
        })
    };
    
    hitCard(cardIndex, shuffledDeck, i, j) {
        
        // const updateInfo = this.updateInfo;
        const isBust = this.isBust;
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

                if (isBust(playerCards[j]))
                {
                    if (j == 0)
                    {
                        player1CardDisplay.setTint(0x8E1600);
                    }
                    else if (j == 1)
                    {
                        player2CardDisplay.setTint(0x8E1600);
                    }
                    else if (j == 2)
                    {
                        player3CardDisplay.setTint(0x8E1600);
                    }
                }
            }
        })
    };

    splitCard() {

    };
    
    // plays card dealing animations
    dealCard(cardIndex, shuffledDeck, timeline, i, j, isDealerCard, dealerCard) {
    
        // i = card
        // j = player
        // [card][player]

        // console.log(cardInts[cardIndex]);
    
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

    // creates deck
    initializeDeck(numDecks) {

        // create an array with 52 * numDecks, with one row for card sprites, and one row for card values
        // this.deckOfCards = Phaser.Utils.Array.NumberArray((0, (51 * numDecks) + (numDecks - 1)));
        shuffledDeck = Phaser.Utils.Array.NumberArray((0, (51 * numDecks) + (numDecks - 1)));

        for (let i = 0; i < ((51 * numDecks) + (numDecks - 1)); i++)
        {
            // this.deckOfCards[i] = this.add.sprite(900, 75, "cards", i % 52);
            // this.deckOfCards[i].setScale(gameOptions.cardScale);
            
            shuffledDeck[i] = this.add.sprite(900, 75, "cards", i % 52);
            shuffledDeck[i].setScale(gameOptions.cardScale);
        }

        // return this.deckOfCards;
    }

    shuffleInts(numDecks){
        // this.cardInts = Phaser.Utils.Array.NumberArray((0, (51 * numDecks) + (numDecks - 1)));
        cardInts = Phaser.Utils.Array.NumberArray((0, (51 * numDecks) + (numDecks - 1)));

        for (let i = 0; i < ((51 * numDecks) + (numDecks - 1)); i++)
        {
           //  this.cardInts[i] = i;
           cardInts[i] = i;
        }

        // Phaser.Utils.Array.Shuffle(this.cardInts);
        Phaser.Utils.Array.Shuffle(cardInts);

        // return this.cardInts;
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
            
            if (this.isBust(playerCards[i]))
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
            else if (this.isBlackjack(playerCards[i]) && this.isBlackjack(dealerCards))
            {
                //push
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
            else if (this.isBlackjack(playerCards[i]))
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

    disableActionButtons(){
        playerHit.disableInteractive();
        playerDouble.disableInteractive();
        playerStand.disableInteractive();
        playerSplit.disableInteractive();

        playerHit.setTexture('lockedButton');
        playerDouble.setTexture('lockedButton');
        playerStand.setTexture('lockedButton');
        playerSplit.setTexture('lockedButton');

        playerHit.on('pointerover', function(){
            playerHit.setTexture('lockedButton');
        })

        playerDouble.on('pointerover', function(){
            playerDouble.setTexture('lockedButton');
        })

        playerStand.on('pointerover', function(){
            playerStand.setTexture('lockedButton');
        })

        playerSplit.on('pointerover', function(){
            playerSplit.setTexture('lockedButton');
        })

        playerHit.on('pointerout', function(){
            playerHit.setTexture('lockedButton');
        })

        playerDouble.on('pointerout', function(){
            playerDouble.setTexture('lockedButton');
        })

        playerStand.on('pointerout', function(){
            playerStand.setTexture('lockedButton');
        })

        playerSplit.on('pointerout', function(){
            playerSplit.setTexture('lockedButton');
        })

        // idk if these below are needed
        playerHit.on('pointerup', function(){
            playerHit.setTexture('lockedButton');
        })

        playerDouble.on('pointerup', function(){
            playerDouble.setTexture('lockedButton');
        })

        playerStand.on('pointerup', function(){
            playerStand.setTexture('lockedButton');
        })

        playerSplit.on('pointerup', function(){
            playerSplit.setTexture('lockedButton');
        })
    };

    enableActionButtons(){
        playerHit.setInteractive({ useHandCursor: true });
        playerDouble.setInteractive({ useHandCursor: true });
        playerStand.setInteractive({ useHandCursor: true });
        playerSplit.setInteractive({ useHandCursor: true });

        playerHit.setTexture('normalButton');
        playerDouble.setTexture('normalButton');
        playerStand.setTexture('normalButton');
        playerSplit.setTexture('normalButton');

        playerHit.on('pointerover', function(){
            playerHit.setTexture('hoveredButton');
        })

        playerDouble.on('pointerover', function(){
            playerDouble.setTexture('hoveredButton');
        })

        playerStand.on('pointerover', function(){
            playerStand.setTexture('hoveredButton');
        })

        playerSplit.on('pointerover', function(){
            playerSplit.setTexture('hoveredButton');
        })

        playerHit.on('pointerout', function(){
            playerHit.setTexture('normalButton');
        })

        playerDouble.on('pointerout', function(){
            playerDouble.setTexture('normalButton');
        })

        playerStand.on('pointerout', function(){
            playerStand.setTexture('normalButton');
        })

        playerSplit.on('pointerout', function(){
            playerSplit.setTexture('normalButton');
        })

        // idk if these below are needed
        playerHit.on('pointerup', function(){
            playerHit.setTexture('hoveredButton');
        })

        playerDouble.on('pointerup', function(){
            playerDouble.setTexture('hoveredButton');
        })

        playerStand.on('pointerup', function(){
            playerStand.setTexture('hoveredButton');
        })

        playerSplit.on('pointerup', function(){
            playerSplit.setTexture('hoveredButton');
        })
    };

    disableBettingButtons(){

        whiteChip_1_Button.disableInteractive();
        redChip_5_Button.disableInteractive();
        blueChip_10_Button.disableInteractive();
        greenChip_25_Button.disableInteractive();
        blackChip_100_Button.disableInteractive();

        whiteChip_1_Button.on('pointerover', function(){
            whiteChip_1_Button.scale = .075;
        })

        redChip_5_Button.on('pointerover', function(){
            redChip_5_Button.scale = .075;
        })

        blueChip_10_Button.on('pointerover', function(){
            blueChip_10_Button.scale = .075;
        })

        greenChip_25_Button.on('pointerover', function(){
            greenChip_25_Button.scale = .075;
        })

        blackChip_100_Button.on('pointerover', function(){
            blackChip_100_Button.scale = .075;
        })

        whiteChip_1_Button.on('pointerout', function(){
            whiteChip_1_Button.scale = .075;
        })

        redChip_5_Button.on('pointerout', function(){
            redChip_5_Button.scale = .075;
        })

        blueChip_10_Button.on('pointerout', function(){
            blueChip_10_Button.scale = .075;
        })

        greenChip_25_Button.on('pointerout', function(){
            greenChip_25_Button.scale = .075;
        })

        blackChip_100_Button.on('pointerout', function(){
            blackChip_100_Button.scale = .075;
        })
    };

    enableBettingButtons(){

        whiteChip_1_Button.setInteractive({ useHandCursor: true });
        redChip_5_Button.setInteractive({ useHandCursor: true });
        blueChip_10_Button.setInteractive({ useHandCursor: true });
        greenChip_25_Button.setInteractive({ useHandCursor: true });
        blackChip_100_Button.setInteractive({ useHandCursor: true });

        whiteChip_1_Button.on('pointerover', function(){
            whiteChip_1_Button.scale = .08;
        })

        redChip_5_Button.on('pointerover', function(){
            redChip_5_Button.scale = .08;
        })

        blueChip_10_Button.on('pointerover', function(){
            blueChip_10_Button.scale = .08;
        })

        greenChip_25_Button.on('pointerover', function(){
            greenChip_25_Button.scale = .08;
        })

        blackChip_100_Button.on('pointerover', function(){
            blackChip_100_Button.scale = .08;
        })

        whiteChip_1_Button.on('pointerout', function(){
            whiteChip_1_Button.scale = .075;
        })

        redChip_5_Button.on('pointerout', function(){
            redChip_5_Button.scale = .075;
        })

        blueChip_10_Button.on('pointerout', function(){
            blueChip_10_Button.scale = .075;
        })

        greenChip_25_Button.on('pointerout', function(){
            greenChip_25_Button.scale = .075;
        })

        blackChip_100_Button.on('pointerout', function(){
            blackChip_100_Button.scale = .075;
        })
    };

    disableNextBettorButton(){
        nextBettorButton.disableInteractive();
        nextBettorButton.setTexture('nextBettorButtonLocked');

        nextBettorButton.on('pointerover', function(){
            nextBettorButton.setTexture('nextBettorButtonLocked');
        })

        nextBettorButton.on('pointeron', function(){
            nextBettorButton.setTexture('nextBettorButtonLocked');
        })

        nextBettorButton.on('pointerout', function(){
            nextBettorButton.setTexture('nextBettorButtonLocked');
        })

        nextBettorButton.on('pointerup', function(){
            nextBettorButton.setTexture('nextBettorButtonLocked');
        })
    };

    enableNextBettorButton(){
        nextBettorButton.setInteractive({ useHandCursor: true });
        nextBettorButton.setTexture('nextBettorButtonNormal');

        nextBettorButton.on('pointerover', function(){
            nextBettorButton.setTexture('nextBettorButtonHovered');
        })

        nextBettorButton.on('pointerout', function(){
            nextBettorButton.setTexture('nextBettorButtonNormal');
        })

        nextBettorButton.on('pointerup', function(){
            nextBettorButton.setTexture('nextBettorButtonHovered');
        })
    };

    disableNextRoundButton(){
        nextRoundButton.disableInteractive();
        nextRoundButton.setTexture('nextRoundButtonLocked');

        nextRoundButton.on('pointerover', function(){
            nextRoundButton.setTexture('nextRoundButtonLocked');
        })

        nextRoundButton.on('pointeron', function(){
            nextRoundButton.setTexture('nextRoundButtonLocked');
        })

        nextRoundButton.on('pointerout', function(){
            nextRoundButton.setTexture('nextRoundButtonLocked');
        })

        nextRoundButton.on('pointerup', function(){
            nextRoundButton.setTexture('nextRoundButtonLocked');
        })
    };

    enableNextRoundButton(){
        nextRoundButton.setInteractive({ useHandCursor: true });
        nextRoundButton.setTexture('nextRoundButtonNormal');

        nextRoundButton.on('pointerover', function(){
            nextRoundButton.setTexture('nextRoundButtonHovered');
        })

        nextRoundButton.on('pointerout', function(){
            nextRoundButton.setTexture('nextRoundButtonNormal');
        })

        nextRoundButton.on('pointerup', function(){
            nextRoundButton.setTexture('nextRoundButtonHovered');
        })
    };

    resetBoard() {
        dealerCardDisplay.setText("Dealer Cards: \n");
        if (numPlayers == 1)
        {
            player1CardDisplay.setText("Player1 Cards: \n");
            player1CardDisplay.setTint(0xFFFFFF);
        }
        else if (numPlayers == 2)
        {
            player1CardDisplay.setText("Player1 Cards: \n");
            player2CardDisplay.setText("Player2 Cards: \n");
            player1CardDisplay.setTint(0xFFFFFF);
            player2CardDisplay.setTint(0xFFFFFF);
        }
        else if (numPlayers == 3)
        {
            player1CardDisplay.setText("Player1 Cards: \n");
            player2CardDisplay.setText("Player2 Cards: \n");
            player3CardDisplay.setText("Player3 Cards: \n");
            player1CardDisplay.setTint(0xFFFFFF);
            player2CardDisplay.setTint(0xFFFFFF);
            player3CardDisplay.setTint(0xFFFFFF);
        }

        this.disableNextRoundButton();

        dealerCard.setPosition(900, 75);
        dealerCard.visible = true;

        playerCards = [[], [], []];
        dealerCards = [];

        // destroy sprites
        for (let i = 0; i < cardIndex; i++)
        {
            // shuffledDeck[cardInts[i]].visible = false;
            // shuffledDeck[cardInts[i]].setPosition(900, 75);
            shuffledDeck[cardInts[i]].destroy(true);
        }

        // destroy chips as well
        for (let i = 0; i < player1ChipCount.length; i++)
        {
            player1ChipCount[i].destroy(true);
        }

        for (let i = 0; i < player2ChipCount.length; i++)
        {
            player2ChipCount[i].destroy(true);
        }

        for (let i = 0; i < player3ChipCount.length; i++)
        {
            player3ChipCount[i].destroy(true);
        }

        player1Bet = 0;
        player2Bet = 0;
        player3Bet = 0;
        player1ChipCount = [];
        player2ChipCount = [];
        player3ChipCount = [];
        numChips = 0;
        currentBet = 0;
    };

    newRound() {

        this.disableActionButtons();
        this.disableBettingButtons();
        this.disableNextRoundButton();
        this.disableNextBettorButton();

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

            // activate the buttons
            this.enableActionButtons();

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
        this.load.image('normalButton', '/static/assets/normalButton.png');
        this.load.image('hoveredButton', '/static/assets/hoveredButton.png');
        this.load.image('clickedButton', '/static/assets/clickedButton.png');
        this.load.image('lockedButton', '/static/assets/lockedButton.png');

        this.load.image('nextRoundButtonNormal', '/static/assets/nextRoundButtonNormal.png');
        this.load.image('nextRoundButtonLocked', '/static/assets/nextRoundButtonLocked.png');
        this.load.image('nextRoundButtonClicked', '/static/assets/nextRoundButtonClicked.png');
        this.load.image('nextRoundButtonHovered', '/static/assets/nextRoundButtonHovered.png');

        this.load.image('nextBettorButtonNormal', '/static/assets/nextBettorButtonNormal.png');
        this.load.image('nextBettorButtonLocked', '/static/assets/nextBettorButtonLocked.png');
        this.load.image('nextBettorButtonClicked', '/static/assets/nextBettorButtonClicked.png');
        this.load.image('nextBettorButtonHovered', '/static/assets/nextBettorButtonHovered.png');

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
        this.load.spritesheet("cards", "/static/assets/classicCards.png", {
            frameWidth: gameOptions.cardWidth,
            frameHeight: gameOptions.cardHeight
        });

        this.load.spritesheet('shufflingAnim', "/static/assets/Shuffling.png", {
            frameWidth: 822, 
            frameHeight: 850,
        });
    };

    // called a single time after preload ends
    create() {

        // places the background
        bg = this.add.image(0, 0, 'background');
        bg.scale = .75;
        bg.setPosition(1400/2, 740/2);

        // displays info on the top right side of canvas
        currencyScoreBoard = this.add.text(1175, 25, "Currency: $" + playerCurrency, {fontSize: '20px', fill: '#fff'});
        pointScoreBoard = this.add.text(1175, 50, "Points: " + playerPoints, {fontSize: '20px', fill: '#fff'});
        runningCountScoreBoard = this.add.text(1175, 75, "Running Count: 0", {fontSize: '20px', fill: '#fff'});
        trueCountScoreBoard = this.add.text(1175, 100, "True Count: 0", {fontSize: '20px', fill: '#fff'});
        dealerCardDisplay = this.add.text(1175, 125, "Dealer Cards: \n", {fontSize: '20px', fill: '#fff'});

        if (numPlayers == 1)
        {
            player1CardDisplay = this.add.text(1175, 225, "Player1 Cards: \n", {fontSize: '20px', fill: '#fff'});
        }
        else if(numPlayers == 2)
        {
            player1CardDisplay = this.add.text(1175, 225, "Player1 Cards: \n", {fontSize: '20px', fill: '#fff'});
            player2CardDisplay = this.add.text(1175, 325, "Player2 Cards: \n", {fontSize: '20px', fill: '#fff'});
        }
        else if (numPlayers == 3)
        {
            player1CardDisplay = this.add.text(1175, 225, "Player1 Cards: \n", {fontSize: '20px', fill: '#fff'});
            player2CardDisplay = this.add.text(1175, 325, "Player2 Cards: \n", {fontSize: '20px', fill: '#fff'});
            player3CardDisplay = this.add.text(1175, 425, "Player3 Cards: \n", {fontSize: '20px', fill: '#fff'});
        }

        // places controlPanel
        controlPanel = this.add.rectangle(700, 875, 1400, 275, 0x008b8b);

        // gets a shuffled deck
        //shuffledDeck = this.initializeDeck(numDecks);
        // cardInts = this.shuffleInts(numDecks);

        this.initializeDeck(numDecks);
        this.shuffleInts(numDecks);

        dealerCard = this.add.image(900, 75, 'face_down_card');
        dealerCard.scale = .13;

        // places deck on table, will get replaced by boot later on
        deck = this.add.image(900, 75, 'face_down_card');
        deck.scale = .13;
        deck.setDepth(1000000);

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
        nextRoundButton = this.add.image(1000, 925, 'nextRoundButtonLocked');
        nextRoundButton.scale = 1.25;

        // places next bettor button
        nextBettorButton = this.add.image(400, 925, 'nextBettorButtonNormal');
        nextBettorButton.scale = 1.25;

        this.disableNextRoundButton();
        this.disableNextBettorButton();

        // placing player turn indicators
        player3TurnIndicator = this.add.circle(450, 775, 15, 0xFFFFFF);
        player2TurnIndicator = this.add.circle(700, 775, 15, 0xFFFFFF);
        player1TurnIndicator = this.add.circle(950, 775, 15, 0x8E1600);


        // placing player action buttons
        playerHit = this.add.sprite(400, 845, 'lockedButton');
        playerHit.scale = 2;
        hitText = this.add.text(385, 830, "Hit", textStyle);
        playerDouble = this.add.sprite(600, 845, 'lockedButton');
        playerDouble.scale = 2;
        doubleText = this.add.text(563, 830, "Double", textStyle);
        playerStand = this.add.sprite(800, 845, 'lockedButton');
        playerStand.scale = 2;
        standText = this.add.text(768, 830, "Stand", textStyle);
        playerSplit = this.add.sprite(1000, 845, 'lockedButton');
        playerSplit.scale = 2;
        splitText = this.add.text(975, 830, "Split", textStyle);

        // places gambling warning
        //let gamblingWarning = this.add.graphics();
        //gamblingWarning.fillStyle(0xFFFFFF, 1);
        //gamblingWarning.fillRoundedRect(350, 100, 700, 500, 32);
        //gamblingWarning.setDepth(100000);

        // WIP Disclaimer
        disclaimer = this.add.text(25, 25, "Work In Progress", {fontSize: '20px', fill: '#fff'});

        shuffleAnimation = this.add.sprite(700, 300, 'shufflingAnim');
        shuffleAnimation.scale = .2;
        shuffleAnimation.visible = false;

        // math and game logic starts here

        trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));

        // this.newRound();
       
        // 1. check if player has bj or is bust
        // 2. if bj, perform appropriate actions
        // 3. if bust, perform appropriate actions
        // 4. if neither, let player play an action
        // 5. then repeat steps 1-4 
        // 6. then move to next player

        // i = card
        // j = player

        currentPlayer = 0;
        numChips = 0;
        currentBet = 0;
        player1Bet = 0;
        player2Bet = 0;
        player3Bet = 0;
        player1ChipCount = [];
        player2ChipCount = [];
        player3ChipCount = [];

        // add bet
        // subtract currency
        // updateinfo()
        // place chip on table
        // make calculations for where the next chip will go
        // enable action buttons

        this.enableBettingButtons();

        nextBettorButton.on('pointerdown', function(){
            nextBettorButton.setTexture('nextBettorButtonClicked');

            // allow to move to next player only after current players bet surpasses minbet
            if (currentPlayer == 0)
            {
                if (numPlayers != 1)
                {
                    player1TurnIndicator.fillColor = 0xFFFFFF;
                    player2TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = currentPlayer + 1;
                    player1Bet = currentBet;
                }
                else
                {
                    // plus more stuff since if its the last player
                    player1Bet = currentBet;
                    this.scene.newRound();
                }
            }
            else if (currentPlayer == 1)
            {
                if (numPlayers != 2)
                {
                    player2TurnIndicator.fillColor = 0xFFFFFF;
                    player3TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = currentPlayer + 1;
                    player2Bet = currentBet;
                }
                else
                {
                    player2TurnIndicator.fillColor = 0xFFFFFF;
                    player1TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = 0;
                    player2Bet = currentBet;
                    this.scene.newRound();
                }
            }
            else if (currentPlayer == 2)
            {
                player3TurnIndicator.fillColor = 0xFFFFFF;
                player1TurnIndicator.fillColor = 0x8E1600;
                currentPlayer = 0;
                player3Bet = currentBet;
                this.scene.newRound();
            }

            currentBet = 0;
            numChips = 0;
            this.scene.disableNextBettorButton();
            this.scene.enableBettingButtons();
        });

        whiteChip_1_Button.on('pointerdown', function(){

            if (!(currentBet + 1 > maxBet) && (playerCurrency - 1 > 0) && (numChips < 5))
            {
                currentBet = currentBet + 1;
                playerCurrency = playerCurrency - 1;
                updateInfo();
                if (currentPlayer == 0)
                {
                    player1ChipCount[numChips] = this.scene.add.image(1025, 450 - (numChips * 5), 'chip_1');
                    player1ChipCount[numChips].scale = .075;
                }
                else if (currentPlayer == 1)
                {
                    player2ChipCount[numChips] = this.scene.add.image(705, 550 - (numChips * 5), 'chip_1');
                    player2ChipCount[numChips].scale = .075;
                }
                else if (currentPlayer == 2)
                {
                    player3ChipCount[numChips] = this.scene.add.image(355, 450 - (numChips * 5), 'chip_1');
                    player3ChipCount[numChips].scale = .075;
                }
                numChips = numChips + 1;
            }

            if (numChips == 5)
            {
                this.scene.disableBettingButtons();
            }

            if (currentBet >= minBet)
            {
                this.scene.enableNextBettorButton();
            }
        });

        redChip_5_Button.on('pointerdown', function(){

            if (!(currentBet + 5 > maxBet) && (playerCurrency - 5 > 0) && (numChips < 5))
            {
                currentBet = currentBet + 5;
                playerCurrency = playerCurrency - 5;
                updateInfo();
                if (currentPlayer == 0)
                {
                    player1ChipCount[numChips] = this.scene.add.image(1025, 450 - (numChips * 5), 'chip_5');
                    player1ChipCount[numChips].scale = .075;
                }
                else if (currentPlayer == 1)
                {
                    player2ChipCount[numChips] = this.scene.add.image(705, 550 - (numChips * 5), 'chip_5');
                    player2ChipCount[numChips].scale = .075;
                }
                else if (currentPlayer == 2)
                {
                    player3ChipCount[numChips] = this.scene.add.image(355, 450 - (numChips * 5), 'chip_5');
                    player3ChipCount[numChips].scale = .075;
                }
                numChips = numChips + 1;
            }

            if (numChips == 5)
            {
                this.scene.disableBettingButtons();
            }

            if (currentBet >= minBet)
            {
                this.scene.enableNextBettorButton();
            }
        });

        blueChip_10_Button.on('pointerdown', function(){

            if (!(currentBet + 10 > maxBet) && (playerCurrency - 10 > 0) && (numChips < 5))
            {
                currentBet = currentBet + 10;
                playerCurrency = playerCurrency - 10;
                updateInfo();
                if (currentPlayer == 0)
                {
                    player1ChipCount[numChips] = this.scene.add.image(1025, 450 - (numChips * 5), 'chip_10');
                    player1ChipCount[numChips].scale = .075;
                }
                else if (currentPlayer == 1)
                {
                    player2ChipCount[numChips] = this.scene.add.image(705, 550 - (numChips * 5), 'chip_10');
                    player2ChipCount[numChips].scale = .075;
                }
                else if (currentPlayer == 2)
                {
                    player3ChipCount[numChips] = this.scene.add.image(355, 450 - (numChips * 5), 'chip_10');
                    player3ChipCount[numChips].scale = .075;
                }
                numChips = numChips + 1;
            }

            if (numChips == 5)
            {
                this.scene.disableBettingButtons();
            }

            if (currentBet >= minBet)
            {
                this.scene.enableNextBettorButton();
            }
        });

        greenChip_25_Button.on('pointerdown', function(){

            if (!(currentBet + 25 > maxBet) && (playerCurrency - 25 > 0) && (numChips < 5))
            {
                currentBet = currentBet + 25;
                playerCurrency = playerCurrency - 25;
                updateInfo();
                if (currentPlayer == 0)
                {
                    player1ChipCount[numChips] = this.scene.add.image(1025, 450 - (numChips * 5), 'chip_25');
                    player1ChipCount[numChips].scale = .075;
                }
                else if (currentPlayer == 1)
                {
                    player2ChipCount[numChips] = this.scene.add.image(705, 550 - (numChips * 5), 'chip_25');
                    player2ChipCount[numChips].scale = .075;
                }
                else if (currentPlayer == 2)
                {
                    player3ChipCount[numChips] = this.scene.add.image(355, 450 - (numChips * 5), 'chip_25');
                    player3ChipCount[numChips].scale = .075;
                }
                numChips = numChips + 1;
            }

            if (numChips == 5)
            {
                this.scene.disableBettingButtons();
            }

            if (currentBet >= minBet)
            {
                this.scene.enableNextBettorButton();
            }
        });

        blackChip_100_Button.on('pointerdown', function(){

            if (!(currentBet + 100 > maxBet) && (playerCurrency - 100 > 0) && (numChips < 5))
            {
                currentBet = currentBet + 100;
                playerCurrency = playerCurrency - 100;
                updateInfo();
                if (currentPlayer == 0)
                {
                    player1ChipCount[numChips] = this.scene.add.image(1025, 450 - (numChips * 5), 'chip_100');
                    player1ChipCount[numChips].scale = .075;
                }
                else if (currentPlayer == 1)
                {
                    player2ChipCount[numChips] = this.scene.add.image(705, 550 - (numChips * 5), 'chip_100');
                    player2ChipCount[numChips].scale = .075;
                }
                else if (currentPlayer == 2)
                {
                    player3ChipCount[numChips] = this.scene.add.image(355, 450 - (numChips * 5), 'chip_100');
                    player3ChipCount[numChips].scale = .075;
                }
                numChips = numChips + 1;
            }

            if (numChips == 5)
            {
                this.scene.disableBettingButtons();
            }

            if (currentBet >= minBet)
            {
                this.scene.enableNextBettorButton();
            }
        });

        // player chooses to hit
        playerHit.on('pointerdown', function(){

            if(!this.scene.isBust(playerCards[currentPlayer]))
            {
                playerHit.setTexture('clickedButton');
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
                            this.scene.disableActionButtons();
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
                            // plus more stuff since if its the last player
                            dealerCard.visible = false;
                            shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                            this.scene.revealDealerInfo(dealerCards);
                            // dealer needs to draw to 16, and stand on 17
                            this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                            cardIndex = cardIndex + dealerCards.length - 2;
                            this.scene.isWinOrLoss();
                            this.scene.disableActionButtons();
                        }
                    }
                    else if (currentPlayer == 2)
                    {
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
                        this.scene.disableActionButtons();
                    }
                }

            }

        })

        // player chooses to stand
        playerStand.on('pointerdown', function(){

            playerStand.setTexture('clickedButton');

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
                    this.scene.disableActionButtons();
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
                    this.scene.disableActionButtons();
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
                this.scene.disableActionButtons();
            }
        })

        nextRoundButton.on('pointerdown', function(){
            nextRoundButton.setTexture('nextRoundButtonClicked');
            this.scene.resetBoard();
            // .75 pen = 3/4 of the decks are dealt
            // 1 * 52 * .75 = 39 cards get played
            // shuffling
            if (cardIndex > Math.floor(numDecks * 52 * deckPen))
            {
                cardIndex = 0;
                // shuffledDeck = this.scene.initializeDeck(numDecks);
                // cardInts = this.scene.shuffleInts(numDecks);
                this.scene.initializeDeck(numDecks);
                this.scene.shuffleInts(numDecks);
                runningCount = 0;
                trueCount = 0;
                runningCountScoreBoard.setText('Running Count: 0');
                trueCountScoreBoard.setText('True Count: 0');

                
                this.scene.anims.create({
                    key: "shuffle",
                    frameRate: 3,
                    frames: this.scene.anims.generateFrameNumbers("shufflingAnim", {start:0, end:2}),
                    repeat: 2,
                    showOnStart: true,
                    hideOnComplete: true
                });
        
                // play a shuffle animation as a test
                shuffleAnimation.play("shuffle");
            }
            
            // this.scene.newRound();
            this.scene.enableBettingButtons();
        });


    };

    update() {
        
    };

}
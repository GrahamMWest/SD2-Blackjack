"use strict";

// cards x & y positions 1-6 for players 1-3 + dealer 
// flattened
// const cardX = [[965, 705, 425, 705], [952, 692, 412, 718], [939, 679, 399, 731], [926, 666, 386, 744], [913, 653, 373, 757], [900, 640, 360, 770]];
// const cardY = [[425, 425, 425, 65], [420, 420, 420, 70], [415, 415, 415, 75], [410, 410, 410, 80], [405, 405, 405, 85], [400, 400, 400, 90]];
// const cardA = [0, 0, 0, 0];

const cardX = [[965, 705, 425, 705], [952, 692, 412, 718], [939, 679, 399, 731], [926, 666, 386, 744], [913, 653, 373, 757], [900, 640, 360, 770], [887, 627, 347, 787]];
const cardY = [[425, 425, 425, 65], [405, 405, 405, 85], [385, 385, 385, 105], [365, 365, 365, 125], [345, 345, 345, 145], [325, 325, 325, 165], [305, 305, 305, 185]];
const cardA = [0, 0, 0, 0];



const deckCoords = [1075, 75];
// deckCoords[0], deckCoords[1]

// const cardX = [[965, 705, 428, 705], [950, 685, 405, 725], [925, 660, 385, 745], [910, 640, 365, 765], [895, 620, 345, 785]];
// const cardY = [[361, 445, 355, 75], [350, 420, 335, 95], [325, 400, 310, 115], [300, 380, 295, 135], [275, 360, 270, 155]];
// const cardA = [-33, 0, 32, 0];

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

// displays info on left side
let player1CardDisplay;
let player2CardDisplay;
let player3CardDisplay;

let dealerCards = [];
let dealerCardDisplay;


// displays info on right side
let currencyScoreBoard;
let pointScoreBoard;
let runningCountScoreBoard;
let runningCount = 0;
let trueCountScoreBoard;
let trueCount = 0;
let cardIndex = 0;

// unchangeable settings
let playerCurrency = 50000;
let playerPoints = 0;
let maxSplits = 1; // cant go higher due to graphics constraints
let insuranceOption = 1; // 1 = late, 0 = early (SHOULD ALWAYS REMAIN 1)

// changeable settings
let numDecks = 4;
let numPlayers = 3;
let deckPen = .5;
let minBet = 10;
let maxBet = 500;
let countSpoiler = 0; // 1 = true, 0 = false (cant get working due to hitboxes)

let peekingOption = 1; // 1 = peeking, 0 = no peeking, 2 = no surrender at all / peeking is advantagous for player (ALWAYS KEEP PEEKING 1) (this is equivalent to early/late surrender, 1 = late surrender, 0 = early surrender)
let blackjackPayout = 3/2; // 1:1, 6:5, 3:2
let hitSplitAces = 1; // 1 = yes, 0 = no
let doubleAfterSplit = 1; // 1 = yes, 0 = no
let hitStandSoft17 = 0; // 1 = hit, 0 = stand
let doubleOption = 0; // 0 = double on any first 2 cards, 1 = 9-11 only, 2 = 9-10


let settingsNumDecks = numDecks;
let settingsNumPlayers = numPlayers;
let settingsDeckPen = deckPen;
let settingsMinBet = minBet;
let settingsMaxBet = maxBet;
let settingsCountSpoiler = countSpoiler;

let settingsPeekingOption = peekingOption;
let settingsBlackjackPayout = blackjackPayout;
let settingsHitSplitAces = hitSplitAces;
let settingsDoubleAfterSplit = doubleAfterSplit;
let settingsHitStandSoft17 = hitStandSoft17;
let settingsDoubleOption = doubleOption;

let confirmedSettingsNumDecks = numDecks;
let confirmedSettingsNumPlayers = numPlayers;
let confirmedSettingsDeckPen = deckPen;
let confirmedSettingsMinBet = minBet;
let confirmedSettingsMaxBet = maxBet;
let confirmedSettingsCountSpoiler = countSpoiler;

let confirmedSettingsPeekingOption = peekingOption;
let confirmedSettingsBlackjackPayout = blackjackPayout;
let confirmedSettingsHitSplitAces = hitSplitAces;
let confirmedSettingsDoubleAfterSplit = doubleAfterSplit;
let confirmedSettingsHitStandSoft17 = hitStandSoft17;
let confirmedSettingsDoubleOption = doubleOption;

let applySettingsFlag = 0;
let applyDeckSettingsFlag = 0;

// global variables that were created in create function
let bg;
let controlPanel;
let settingsMenuBar;
let logoURL;
let shuffledDeck;
let cardInts;
let dealerCard;
let dealerIndex
let deck;
let trueCountSpoiler;
let runningCountSpoiler;

// buttons and GUI
let whiteChip_1_Button;
let redChip_5_Button;
let blueChip_10_Button;
let greenChip_25_Button;
let blackChip_100_Button;

let player3TurnIndicator;
let player2TurnIndicator;
let player1TurnIndicator;

// player 1 initial chip coords = 965, 540
// player 2 initial chip coords = 705, 540
// player 3 initial chip coords = 425, 540
let player1ChipXCoords = 965;
let player2ChipXCoords = 705;
let player3ChipXCoords = 425;
let playerChipYCoords = 505;

// variables related to betting and chips
let currentPlayer;
let currentBet;
let placeholderBet;
let numChips;
let player1Bet;
let player2Bet;
let player3Bet;
let player1InsuranceBet;
let player2InsuranceBet;
let player3InsuranceBet;
let player1ChipCount = [];
let player2ChipCount = [];
let player3ChipCount = [];
let player1DoubleChipCount = [];
let player2DoubleChipCount = [];
let player3DoubleChipCount = [];
let player1InsuranceChips = [];
let player2InsuranceChips = [];
let player3InsuranceChips = [];
let placeholderChipArray = [];
let didPlayersSurrender = [0, 0, 0];
let isPlayerInsured = [0,0,0];
let insuranceRound = 0;

// actions and displays
let playerHit;
let hitText;
let playerDouble;
let doubleText;
let playerStand;
let standText;
let playerSurrender;
let surrenderText;
let playerInsurance;
let insuranceText;
let playerSplit;
let splitText;

// menu buttons
let settingsHeader;
let settingsDisclaimer;
let menuButton;
let menuScreen;
let applySettingsButton;
let applySettingsText;

let numPlayersHeader;
let numPlayersPlusButton;
let numPlayersMinusButton;
let numPlayersDisplay;
let numPlayersText;

let numDecksHeader;
let numDecksPlusButton;
let numDecksMinusButton;
let numDecksDisplay;
let numDecksText;

let deckPenHeader;
let deckPenPlusButton;
let deckPenMinusButton;
let deckPenDisplay;
let deckPenText;

let minBetHeader;
let minBetPlusButton;
let minBetMinusButton;
let minBetDisplay;
let minBetText;

let maxBetHeader;
let maxBetPlusButton;
let maxBetMinusButton;
let maxBetDisplay;
let maxBetText;

let countSpoilerHeader;
let countSpoilerPlusButton;
let countSpoilerMinusButton;
let countSpoilerDisplay;
let countSpoilerText;

// peekingOption = surrender stuff
let peekingOptionHeader;
let peekingOptionPlusButton;
let peekingOptionMinusButton;
let peekingOptionDisplay;
let peekingOptionText;

let blackjackPayoutHeader;
let blackjackPayoutPlusButton;
let blackjackPayoutMinusButton;
let blackjackPayoutDisplay;
let blackjackPayoutText;

let hitSplitAcesHeader;
let hitSplitAcesPlusButton;
let hitSplitAcesMinusButton;
let hitSplitAcesDisplay;
let hitSplitAcesText;

let doubleAfterSplitHeader;
let doubleAfterSplitPlusButton;
let doubleAfterSplitMinusButton;
let doubleAfterSplitDisplay;
let doubleAfterSplitText;

let hitStandSoft17Header;
let hitStandSoft17PlusButton;
let hitStandSoft17MinusButton;
let hitStandSoft17Display;
let hitStandSoft17Text;

let doubleOptionHeader;
let doubleOptionPlusButton;
let doubleOptionMinusButton;
let doubleOptionDisplay;
let doubleOptionText;


let disclaimer;
let currencyWarningShape;
let currencyWarningText;
let shuffleAnimation;

let nextRoundButton;
let nextBettorButton;

// variables used for splits
let spriteIndex = [[],[],[]];
let numSplits = [0,0,0];
let player1Hands = [[], [], [], []];
let player2Hands = [[], [], [], []];
let player3Hands = [[], [], [], []];
let player1Sprites = [[], [], [], []];
let player2Sprites = [[], [], [], []];
let player3Sprites = [[], [], [], []];
let player1HandBets = [];
let player2HandBets = [];
let player3HandBets = [];
let currentHand = 0;
let handIndicator;
let player1ChipArrays = [[], [], [], []];
let player2ChipArrays = [[], [], [], []];
let player3ChipArrays = [[], [], [], []];
let player1DoubleChipArrays = [[], [], [], []];
let player2DoubleChipArrays = [[], [], [], []];
let player3DoubleChipArrays = [[], [], [], []];

let player1Hand1Display;
let player1Hand2Display;
let player1Hand3Display;
let player1Hand4Display;

let player2Hand1Display;
let player2Hand2Display;
let player2Hand3Display;
let player2Hand4Display;

let player3Hand1Display;
let player3Hand2Display;
let player3Hand3Display;
let player3Hand4Display;

// was 50 originally
let splitSpacing = 60;
let splitChipSpacing = 45;
let handIndicatorSpacing = -15;


//TODO:
// implement surrender (peeking) setting

// friday
// bug test (a lot)

// implement rest of settings
// maybe have settings text boxes reset if u dont apply anything in the settings menu

// fix point system (insurance/surrender/can Split or Not/True Count)
// CHECK WHETHER I NEED TO LOOK FOR WHETHER USER CAN DOUBLE OR NOT (MAYBE A VARIABLE CALLED 'firstAction' OR SOMETHING)
// make suggestion displays on the right side (same y-level as corresponding player displays), also
// show "Correct" or "Incorrect" for the users actions, as well as how much each hand profited/lost that round

// add variation to shoe cutoff (professor suggestion)


// BUGS/TESTING:

// NOTES:
// should only take insurance at a TRUE 3 or above

let gameOptions = {
 
    // card width, in pixels
    cardWidth: 560,
 
    // card height, in pixels
    cardHeight: 780,
 
    // card scale. 1 = original size, 0.5 half size and so on
    cardScale: 0.1325
}

let chipScaling = .055;

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
        if (numSplits[currentPlayer] == 0)
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
                    player1CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i] + "]");
                else if (j == 1)
                    player2CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i] + "]");
                else if (j == 2)
                    player3CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i] + "]");
            }
            else if (i == 1)
            {
                if (j == 0)
                    player1CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                else if (j == 1)
                    player2CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                else if (j == 2)
                    player3CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
            }
            else if (i == 2)
            {
                if (j == 0)
                    player1CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                else if (j == 1)
                    player2CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-2] + "," + playerCards[j][i-1]  + "," + playerCards[j][i] +  "]");
                else if (j == 2)
                    player3CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-2] + "," + playerCards[j][i-1]  + "," + playerCards[j][i] +  "]");
            }
            else if (i == 3)
            {
                if (j == 0)
                    player1CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                else if (j == 1)
                    player2CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                else if (j == 2)
                    player3CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
            }
            else if (i == 4)
            {
                if (j == 0)
                    player1CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-4] + "," + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                else if (j == 1)
                    player2CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-4] + "," + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                else if (j == 2)
                    player3CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-4] + "," + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
            }
            else if (i == 5)
            {
                if (j == 0)
                    player1CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-5] + "," + playerCards[j][i-4] + "," + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                else if (j == 1)
                    player2CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-5] + "," + playerCards[j][i-4] + "," + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                else if (j == 2)
                    player3CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-5] + "," + playerCards[j][i-4] + "," + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
            }
            else if (i == 6)
            {
                if (j == 0)
                    player1CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-6] + "," + playerCards[j][i-5] + "," + playerCards[j][i-4] + "," + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                else if (j == 1)
                    player2CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-6] + "," + playerCards[j][i-5] + "," + playerCards[j][i-4] + "," + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
                else if (j == 2)
                    player3CardDisplay.setText("Seat" + (j + 1) + " Cards:\n[" + playerCards[j][i-6] + "," + playerCards[j][i-5] + "," + playerCards[j][i-4] + "," + playerCards[j][i-3] + "," + playerCards[j][i-2] + "," + playerCards[j][i-1] + "," + playerCards[j][i] + "]");
            }

        }
        else if (numSplits[currentPlayer] == 1)
        {
            // splits
            if (currentPlayer == 0)
            {
                // [hand](0/1) [card]
                if (player1Hands[j][i] === "A" || player1Hands[j][i] === "K" || player1Hands[j][i] === "Q" || 
                player1Hands[j][i] === "J" || player1Hands[j][i] === "10")
                {
                    runningCount = runningCount - 1;
                    trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                    runningCountScoreBoard.setText('Running Count: ' + runningCount);
                    trueCountScoreBoard.setText('True Count: ' + trueCount);
                }
                else if (player1Hands[j][i] === "7" || player1Hands[j][i] === "8" || player1Hands[j][i] === "9"  )
                {
                    runningCount = runningCount;
                    trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                    runningCountScoreBoard.setText('Running Count: ' + runningCount);
                    trueCountScoreBoard.setText('True Count: ' + trueCount);
                }
                else if (player1Hands[j][i] === "2" || player1Hands[j][i] === "3" || player1Hands[j][i] === "4" || 
                player1Hands[j][i] === "5" || player1Hands[j][i] === "6")
                {
                    runningCount = runningCount + 1;
                    trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                    runningCountScoreBoard.setText('Running Count: ' + runningCount);
                    trueCountScoreBoard.setText('True Count: ' + trueCount);
                }

                if (j == 0)
                {
                    if (i == 0)
                        player1Hand1Display.setText("Seat1Hand1 Cards:\n[" + player1Hands[0][i] + "]");
                    else if (i == 1)
                        player1Hand1Display.setText("Seat1Hand1 Cards:\n[" + player1Hands[0][i-1] + "," + player1Hands[0][i] + "]");
                    else if (i == 2)
                        player1Hand1Display.setText("Seat1Hand1 Cards:\n[" + player1Hands[0][i-2] + "," + player1Hands[0][i-1] + "," + player1Hands[0][i] + "]");
                    else if (i == 3)
                        player1Hand1Display.setText("Seat1Hand1 Cards:\n[" + player1Hands[0][i-3] + "," + player1Hands[0][i-2] + "," + player1Hands[0][i-1] + "," + player1Hands[0][i] + "]");
                    else if (i == 4)
                        player1Hand1Display.setText("Seat1Hand1 Cards:\n[" + player1Hands[0][i-4] + "," + player1Hands[0][i-3] + "," + player1Hands[0][i-2] + "," + player1Hands[0][i-1] + "," + player1Hands[0][i] + "]");
                    else if (i == 5)
                        player1Hand1Display.setText("Seat1Hand1 Cards:\n[" + player1Hands[0][i-5] + "," + player1Hands[0][i-4] + "," + player1Hands[0][i-3] + "," + player1Hands[0][i-2] + "," + player1Hands[0][i-1] + "," + player1Hands[0][i] + "]");
                    else if (i == 6)
                        player1Hand1Display.setText("Seat1Hand1 Cards:\n[" + player1Hands[0][i-6] + "," + player1Hands[0][i-5] + "," + player1Hands[0][i-4] + "," + player1Hands[0][i-3] + "," + player1Hands[0][i-2] + "," + player1Hands[0][i-1] + "," + player1Hands[0][i] + "]");
                }
                else if (j == 1)
                {
                    if (i == 0)
                        player1Hand2Display.setText("Seat1Hand2 Cards:\n[" + player1Hands[1][i] + "]");
                    else if (i == 1)
                        player1Hand2Display.setText("Seat1Hand2 Cards:\n[" + player1Hands[1][i-1] + "," + player1Hands[1][i] + "]");
                    else if (i == 2)
                        player1Hand2Display.setText("Seat1Hand2 Cards:\n[" + player1Hands[1][i-2] + "," + player1Hands[1][i-1] + "," + player1Hands[1][i] + "]");
                    else if (i == 3)
                        player1Hand2Display.setText("Seat1Hand2 Cards:\n[" + player1Hands[1][i-3] + "," + player1Hands[1][i-2] + "," + player1Hands[1][i-1] + "," + player1Hands[1][i] + "]");
                    else if (i == 4)
                        player1Hand2Display.setText("Seat1Hand2 Cards:\n[" + player1Hands[1][i-4] + "," + player1Hands[1][i-3] + "," + player1Hands[1][i-2] + "," + player1Hands[1][i-1] + "," + player1Hands[1][i] + "]");
                    else if (i == 5)
                        player1Hand2Display.setText("Seat1Hand2 Cards:\n[" + player1Hands[1][i-5] + "," + player1Hands[1][i-4] + "," + player1Hands[1][i-3] + "," + player1Hands[1][i-2] + "," + player1Hands[1][i-1] + "," + player1Hands[1][i] + "]");
                    else if (i == 6)
                        player1Hand2Display.setText("Seat1Hand2 Cards:\n[" + player1Hands[1][i-6] + "," + player1Hands[1][i-5] + "," + player1Hands[1][i-4] + "," + player1Hands[1][i-3] + "," + player1Hands[1][i-2] + "," + player1Hands[1][i-1] + "," + player1Hands[1][i] + "]");
                }
            }
            else if (currentPlayer == 1)
            {
                if (player2Hands[j][i] === "A" || player2Hands[j][i] === "K" || player2Hands[j][i] === "Q" || 
                player2Hands[j][i] === "J" || player2Hands[j][i] === "10")
                {
                    runningCount = runningCount - 1;
                    trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                    runningCountScoreBoard.setText('Running Count: ' + runningCount);
                    trueCountScoreBoard.setText('True Count: ' + trueCount);
                }
                else if (player2Hands[j][i] === "7" || player2Hands[j][i] === "8" || player2Hands[j][i] === "9"  )
                {
                    runningCount = runningCount;
                    trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                    runningCountScoreBoard.setText('Running Count: ' + runningCount);
                    trueCountScoreBoard.setText('True Count: ' + trueCount);
                }
                else if (player2Hands[j][i] === "2" || player2Hands[j][i] === "3" || player2Hands[j][i] === "4" || 
                player2Hands[j][i] === "5" || player2Hands[j][i] === "6")
                {
                    runningCount = runningCount + 1;
                    trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                    runningCountScoreBoard.setText('Running Count: ' + runningCount);
                    trueCountScoreBoard.setText('True Count: ' + trueCount);
                }

                if (j == 0)
                {
                    if (i == 0)
                        player2Hand1Display.setText("Seat2Hand1 Cards:\n[" + player2Hands[0][i] + "]");
                    else if (i == 1)
                        player2Hand1Display.setText("Seat2Hand1 Cards:\n[" + player2Hands[0][i-1] + "," + player2Hands[0][i] + "]");
                    else if (i == 2)
                        player2Hand1Display.setText("Seat2Hand1 Cards:\n[" + player2Hands[0][i-2] + "," + player2Hands[0][i-1] + "," + player2Hands[0][i] + "]");
                    else if (i == 3)
                        player2Hand1Display.setText("Seat2Hand1 Cards:\n[" + player2Hands[0][i-3] + "," + player2Hands[0][i-2] + "," + player2Hands[0][i-1] + "," + player2Hands[0][i] + "]");
                    else if (i == 4)
                        player2Hand1Display.setText("Seat2Hand1 Cards:\n[" + player2Hands[0][i-4] + "," + player2Hands[0][i-3] + "," + player2Hands[0][i-2] + "," + player2Hands[0][i-1] + "," + player2Hands[0][i] + "]");
                    else if (i == 5)
                        player2Hand1Display.setText("Seat2Hand1 Cards:\n[" + player2Hands[0][i-5] + "," + player2Hands[0][i-4] + "," + player2Hands[0][i-3] + "," + player2Hands[0][i-2] + "," + player2Hands[0][i-1] + "," + player2Hands[0][i] + "]");
                    else if (i == 6)
                        player2Hand1Display.setText("Seat2Hand1 Cards:\n[" + player2Hands[0][i-6] + "," + player2Hands[0][i-5] + "," + player2Hands[0][i-4] + "," + player2Hands[0][i-3] + "," + player2Hands[0][i-2] + "," + player2Hands[0][i-1] + "," + player2Hands[0][i] + "]");
                }
                else if (j == 1)
                {
                    if (i == 0)
                        player2Hand2Display.setText("Seat2Hand2 Cards:\n[" + player2Hands[1][i] + "]");
                    else if (i == 1)
                        player2Hand2Display.setText("Seat2Hand2 Cards:\n[" + player2Hands[1][i-1] + "," + player2Hands[1][i] + "]");
                    else if (i == 2)
                        player2Hand2Display.setText("Seat2Hand2 Cards:\n[" + player2Hands[1][i-2] + "," + player2Hands[1][i-1] + "," + player2Hands[1][i] + "]");
                    else if (i == 3)
                        player2Hand2Display.setText("Seat2Hand2 Cards:\n[" + player2Hands[1][i-3] + "," + player2Hands[1][i-2] + "," + player2Hands[1][i-1] + "," + player2Hands[1][i] + "]");
                    else if (i == 4)
                        player2Hand2Display.setText("Seat2Hand2 Cards:\n[" + player2Hands[1][i-4] + "," + player2Hands[1][i-3] + "," + player2Hands[1][i-2] + "," + player2Hands[1][i-1] + "," + player2Hands[1][i] + "]");
                    else if (i == 5)
                        player2Hand2Display.setText("Seat2Hand2 Cards:\n[" + player2Hands[1][i-5] + "," + player2Hands[1][i-4] + "," + player2Hands[1][i-3] + "," + player2Hands[1][i-2] + "," + player2Hands[1][i-1] + "," + player2Hands[1][i] + "]");
                    else if (i == 6)
                        player2Hand2Display.setText("Seat2Hand2 Cards:\n[" + player2Hands[1][i-6] + "," + player2Hands[1][i-5] + "," + player2Hands[1][i-4] + "," + player2Hands[1][i-3] + "," + player2Hands[1][i-2] + "," + player2Hands[1][i-1] + "," + player2Hands[1][i] + "]");
                }

            }
            else if (currentPlayer == 2)
            {
                if (player3Hands[j][i] === "A" || player3Hands[j][i] === "K" || player3Hands[j][i] === "Q" || 
                player3Hands[j][i] === "J" || player3Hands[j][i] === "10")
                {
                    runningCount = runningCount - 1;
                    trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                    runningCountScoreBoard.setText('Running Count: ' + runningCount);
                    trueCountScoreBoard.setText('True Count: ' + trueCount);
                }
                else if (player3Hands[j][i] === "7" || player3Hands[j][i] === "8" || player3Hands[j][i] === "9"  )
                {
                    runningCount = runningCount;
                    trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                    runningCountScoreBoard.setText('Running Count: ' + runningCount);
                    trueCountScoreBoard.setText('True Count: ' + trueCount);
                }
                else if (player3Hands[j][i] === "2" || player3Hands[j][i] === "3" || player3Hands[j][i] === "4" || 
                player3Hands[j][i] === "5" || player3Hands[j][i] === "6")
                {
                    runningCount = runningCount + 1;
                    trueCount = Math.floor(runningCount / Math.ceil((numDecks * 52 - cardIndex) / 52));
                    runningCountScoreBoard.setText('Running Count: ' + runningCount);
                    trueCountScoreBoard.setText('True Count: ' + trueCount);
                }

                if (j == 0)
                {
                    if (i == 0)
                        player3Hand1Display.setText("Seat3Hand1 Cards:\n[" + player3Hands[0][i] + "]");
                    else if (i == 1)
                        player3Hand1Display.setText("Seat3Hand1 Cards:\n[" + player3Hands[0][i-1] + "," + player3Hands[0][i] + "]");
                    else if (i == 2)
                        player3Hand1Display.setText("Seat3Hand1 Cards:\n[" + player3Hands[0][i-2] + "," + player3Hands[0][i-1] + "," + player3Hands[0][i] + "]");
                    else if (i == 3)
                        player3Hand1Display.setText("Seat3Hand1 Cards:\n[" + player3Hands[0][i-3] + "," + player3Hands[0][i-2] + "," + player3Hands[0][i-1] + "," + player3Hands[0][i] + "]");
                    else if (i == 4)
                        player3Hand1Display.setText("Seat3Hand1 Cards:\n[" + player3Hands[0][i-4] + "," + player3Hands[0][i-3] + "," + player3Hands[0][i-2] + "," + player3Hands[0][i-1] + "," + player3Hands[0][i] + "]");
                    else if (i == 5)
                        player3Hand1Display.setText("Seat3Hand1 Cards:\n[" + player3Hands[0][i-5] + "," + player3Hands[0][i-4] + "," + player3Hands[0][i-3] + "," + player3Hands[0][i-2] + "," + player3Hands[0][i-1] + "," + player3Hands[0][i] + "]");
                    else if (i == 6)
                        player3Hand1Display.setText("Seat3Hand1 Cards:\n[" + player3Hands[0][i-6] + "," + player3Hands[0][i-5] + "," + player3Hands[0][i-4] + "," + player3Hands[0][i-3] + "," + player3Hands[0][i-2] + "," + player3Hands[0][i-1] + "," + player3Hands[0][i] + "]");
                }
                else if (j == 1)
                {
                    if (i == 0)
                        player3Hand2Display.setText("Seat3Hand2 Cards:\n[" + player3Hands[1][i] + "]");
                    else if (i == 1)
                        player3Hand2Display.setText("Seat3Hand2 Cards:\n[" + player3Hands[1][i-1] + "," + player3Hands[1][i] + "]");
                    else if (i == 2)
                        player3Hand2Display.setText("Seat3Hand2 Cards:\n[" + player3Hands[1][i-2] + "," + player3Hands[1][i-1] + "," + player3Hands[1][i] + "]");
                    else if (i == 3)
                        player3Hand2Display.setText("Seat3Hand2 Cards:\n[" + player3Hands[1][i-3] + "," + player3Hands[1][i-2] + "," + player3Hands[1][i-1] + "," + player3Hands[1][i] + "]");
                    else if (i == 4)
                        player3Hand2Display.setText("Seat3Hand2 Cards:\n[" + player3Hands[1][i-4] + "," + player3Hands[1][i-3] + "," + player3Hands[1][i-2] + "," + player3Hands[1][i-1] + "," + player3Hands[1][i] + "]");
                    else if (i == 5)
                        player3Hand2Display.setText("Seat3Hand2 Cards:\n[" + player3Hands[1][i-5] + "," + player3Hands[1][i-4] + "," + player3Hands[1][i-3] + "," + player3Hands[1][i-2] + "," + player3Hands[1][i-1] + "," + player3Hands[1][i] + "]");
                    else if (i == 6)
                        player3Hand2Display.setText("Seat3Hand2 Cards:\n[" + player3Hands[1][i-6] + "," + player3Hands[1][i-5] + "," + player3Hands[1][i-4] + "," + player3Hands[1][i-3] + "," + player3Hands[1][i-2] + "," + player3Hands[1][i-1] + "," + player3Hands[1][i] + "]");
                }
            }
            

        }
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
            dealerCardDisplay.setText("Dealer Cards:\n[" + dealerCards[i] + "]");
        else if (i == 1)
            dealerCardDisplay.setText("Dealer Cards:\n[?, " + dealerCards[i] + "]");
        else if (i == 2)
            dealerCardDisplay.setText("Dealer Cards:\n[" + dealerCards[i-2] + ", " + dealerCards[i-1] + ", " + dealerCards[i] + "]");
        else if (i == 3)
            dealerCardDisplay.setText("Dealer Cards:\n[" + dealerCards[i-3] + ", " + dealerCards[i-2] + ", " + dealerCards[i-1] + ", " + dealerCards[i] + "]");
        else if (i == 4)
            dealerCardDisplay.setText("Dealer Cards:\n[" + dealerCards[i-4] + ", " + dealerCards[i-3] + ", " + dealerCards[i-2] + ", " + dealerCards[i-1] + ", " + dealerCards[i] + "]");
        else if (i == 5)
            dealerCardDisplay.setText("Dealer Cards:\n[" + dealerCards[i-5] + ", " + dealerCards[i-4] + ", " + dealerCards[i-3] + ", " + dealerCards[i-2] + ", " + dealerCards[i-1] + ", " + dealerCards[i] + "]");
        else if (i == 6)
            dealerCardDisplay.setText("Dealer Cards:\n[" + dealerCards[i-6] + ", " + dealerCards[i-5] + ", " + dealerCards[i-4] + ", " + dealerCards[i-3] + ", " + dealerCards[i-2] + ", " + dealerCards[i-1] + ", " + dealerCards[i] + "]");
    }
};

class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameScene' });
    };

    drawDealerCards(dealerCards, cardIndex, cardInts, i) {
       
        const enableNextRoundButton = this.enableNextRoundButton;
        
        if (numPlayers == 1 && numSplits[0] == 0)
        {
            if (this.isBust(playerCards[0]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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

                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else if (numPlayers == 1 && numSplits[0] == 1)
        {
            if (this.splitIsBust(player1Hands[0]) && this.splitIsBust(player1Hands[1]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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
        
                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else if (numPlayers == 2 && numSplits[0] == 0 && numSplits[1] == 0)
        {
            if (this.isBust(playerCards[0]) && this.isBust(playerCards[1]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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
        
                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else if (numPlayers == 2 && numSplits[0] == 1 && numSplits[1] == 0)
        {
            if (this.splitIsBust(player1Hands[0]) && this.splitIsBust(player1Hands[1]) && this.isBust(playerCards[1]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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
        
                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else if (numPlayers == 2 && numSplits[0] == 0 && numSplits[1] == 1)
        {
            if (this.splitIsBust(player2Hands[0]) && this.splitIsBust(player2Hands[1]) && this.isBust(playerCards[0]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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
        
                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else if (numPlayers == 2 && numSplits[0] == 1 && numSplits[1] == 1)
        {
            if (this.splitIsBust(player1Hands[0]) && this.splitIsBust(player1Hands[1]) && this.splitIsBust(player2Hands[0]) && this.splitIsBust(player2Hands[1]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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
        
                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else if (numPlayers == 3 && numSplits[0] == 0 && numSplits[1] == 0 && numSplits[2] == 0)
        {
            if (this.isBust(playerCards[0]) && this.isBust(playerCards[1]) && this.isBust(playerCards[2]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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
        
                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else if (numPlayers == 3 && numSplits[0] == 1 && numSplits[1] == 0 && numSplits[2] == 0)
        {
            if (this.splitIsBust(player1Hands[0]) && this.splitIsBust(player1Hands[1]) && this.isBust(playerCards[1]) && this.isBust(playerCards[2]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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
        
                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else if (numPlayers == 3 && numSplits[0] == 0 && numSplits[1] == 1 && numSplits[2] == 0)
        {
            if (this.isBust(playerCards[0]) && this.splitIsBust(player2Hands[0]) && this.splitIsBust(player2Hands[1]) && this.isBust(playerCards[2]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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
        
                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else if (numPlayers == 3 && numSplits[0] == 0 && numSplits[1] == 0 && numSplits[2] == 1)
        {
            if (this.isBust(playerCards[0]) && this.isBust(playerCards[1]) && this.splitIsBust(player3Hands[0]) && this.splitIsBust(player3Hands[1]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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
        
                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else if (numPlayers == 3 && numSplits[0] == 1 && numSplits[1] == 1 && numSplits[2] == 0)
        {
            if (this.splitIsBust(player1Hands[0]) && this.splitIsBust(player1Hands[1]) && this.splitIsBust(player2Hands[0]) && this.splitIsBust(player2Hands[1]) && this.isBust(playerCards[2]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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
        
                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else if (numPlayers == 3 && numSplits[0] == 1 && numSplits[1] == 0 && numSplits[2] == 1)
        {
            if (this.splitIsBust(player1Hands[0]) && this.splitIsBust(player1Hands[1]) && this.isBust(playerCards[1]) && this.splitIsBust(player3Hands[0]) && this.splitIsBust(player3Hands[1]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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
        
                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else if (numPlayers == 3 && numSplits[0] == 0 && numSplits[1] == 1 && numSplits[2] == 1)
        {
            if (this.isBust(playerCards[0]) && this.splitIsBust(player2Hands[0]) && this.splitIsBust(player2Hands[1]) && this.splitIsBust(player3Hands[0]) && this.splitIsBust(player3Hands[1]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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
        
                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else if (numPlayers == 3 && numSplits[0] == 1 && numSplits[1] == 1 && numSplits[2] == 1)
        {
            if (this.splitIsBust(player1Hands[0]) && this.splitIsBust(player1Hands[1]) && this.splitIsBust(player2Hands[0]) && this.splitIsBust(player2Hands[1]) && this.splitIsBust(player3Hands[0]) && this.splitIsBust(player3Hands[1]))
            {
                // do nothing
                enableNextRoundButton();
            }
            else
            {
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
        
                timeline.addListener("complete", function(){
                    enableNextRoundButton();
                })
            }
        }
        else
        {
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
    
            timeline.addListener("complete", function(){
                enableNextRoundButton();
            })
        }
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

    hitSplitCard(cardIndex, shuffledDeck, i, j, currentHand) {

        const splitIsBust = this.splitIsBust;

        // currentHand = 1, to the right
        // currentHand = 2, to the left
        if (currentHand == 1)
        {
            this.tweens.add({
                targets: shuffledDeck[cardIndex],
                x: cardX[i][j] + splitSpacing, // change X coord
                y: cardY[i][j],
                angle: cardA[j],
                ease: 'Linear',
                duration: 200,
                // repeat: 0,
                yoyo: false,
                delay: 500,
                onComplete: function() {
        
                    shuffledDeck[cardIndex].setDepth(i+1);
        
                    if (currentPlayer == 0)
                    {
                        updateInfo(player1Hands[currentHand-1].length-1, currentHand-1);
                        if (splitIsBust(player1Hands[0]))
                            player1Hand1Display.setTint(0x8E1600);

                        if (splitIsBust(player1Hands[1]))
                            player1Hand2Display.setTint(0x8E1600);
                    }
                    else if (currentPlayer == 1)
                    {
                        updateInfo(player2Hands[currentHand-1].length-1, currentHand-1);
                        if (splitIsBust(player2Hands[0]))
                            player2Hand1Display.setTint(0x8E1600);

                        if (splitIsBust(player2Hands[1]))
                            player2Hand2Display.setTint(0x8E1600);
                    }
                    else if (currentPlayer == 2)
                    {
                        updateInfo(player3Hands[currentHand-1].length-1, currentHand-1);
                        if (splitIsBust(player3Hands[0]))
                            player3Hand1Display.setTint(0x8E1600);

                        if (splitIsBust(player3Hands[1]))
                            player3Hand2Display.setTint(0x8E1600);
                    }
    
                }
            })
        }
        else if (currentHand == 2)
        {
            this.tweens.add({
                targets: shuffledDeck[cardIndex],
                x: cardX[i][j] - splitSpacing, // change X coord
                y: cardY[i][j],
                angle: cardA[j],
                ease: 'Linear',
                duration: 200,
                // repeat: 0,
                yoyo: false,
                delay: 500,
                onComplete: function() {
        
                    shuffledDeck[cardIndex].setDepth(i+1);
        
                    if (currentPlayer == 0)
                    {
                        updateInfo(player1Hands[currentHand-1].length-1, currentHand-1);
                        if (splitIsBust(player1Hands[0]))
                            player1Hand1Display.setTint(0x8E1600);

                        if (splitIsBust(player1Hands[1]))
                            player1Hand2Display.setTint(0x8E1600);
                    }
                    else if (currentPlayer == 1)
                    {
                        updateInfo(player2Hands[currentHand-1].length-1, currentHand-1);
                        if (splitIsBust(player2Hands[0]))
                            player2Hand1Display.setTint(0x8E1600);

                        if (splitIsBust(player2Hands[1]))
                            player2Hand2Display.setTint(0x8E1600);
                    }
                    else if (currentPlayer == 2)
                    {
                        // -1 to length
                        updateInfo(player3Hands[currentHand-1].length-1, currentHand-1);
                        if (splitIsBust(player3Hands[0]))
                            player3Hand1Display.setTint(0x8E1600);
                        
                        if (splitIsBust(player3Hands[1]))
                            player3Hand2Display.setTint(0x8E1600);
                    }
                }
            })
        }

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
            
            shuffledDeck[i] = this.add.sprite(deckCoords[0], deckCoords[1], "cards", i % 52);
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

        if (numSplits[currentHand] == 0)
        {
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
        }
    };

    isBust(playerCards) {

        if (numSplits[currentPlayer] == 0)
        {
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

            if (sum + 11 + (aceCount - 1) > 21)
            {
                sum = sum + aceCount;
                aceCount = 0;
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
        }
    };

    splitGetHandValue(splitHand)
    {
        var sum = 0;
        var aceCount = 0;
        var length = splitHand.length;

        for (let i = 0; i < length; i++)
        {
            if (splitHand[i] === "A")
            {
                aceCount++;
            }
            else if (splitHand[i] === "10" || splitHand[i] === "J" || splitHand[i] === "Q" || splitHand[i] === "K")
            {
                sum = sum + 10;
            }
            else
            {
                sum = sum + parseInt(splitHand[i], 10);
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

    splitIsBust(splitHand) {

        var sum = 0;
        var aceCount = 0;
        var length = splitHand.length;

        for (let i = 0; i < length; i++)
        {
            if (splitHand[i] === "A")
            {
                aceCount++;
            }
            else if (splitHand[i] === "10" || splitHand[i] === "J" || splitHand[i] === "Q" || splitHand[i] === "K")
            {
                sum = sum + 10;
            }
            else
            {
                sum = sum + parseInt(splitHand[i], 10);
            }
        }

        if (sum + 11 + (aceCount - 1) > 21)
        {
            sum = sum + aceCount;
            aceCount = 0;
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

    // (update this for splits, since splits CANT be BJ)
    isWinOrLoss() {

        let dealerHandValue = this.getHandValue(dealerCards);

        // check player1
        if (numPlayers >= 1)
        {
            if (numSplits[0] == 0)
            {
                if (didPlayersSurrender[0])
                {
                    // hand loses (surrender) (money already handled earlier)
                    player1CardDisplay.setTint(0xFFA500);
                }
                else if (this.isBust(playerCards[0]))
                {
                    // hand loses
                    player1CardDisplay.setTint(0x8E1600);
                }
                else if (this.isBlackjack(dealerCards) && !this.isBlackjack(playerCards[0]))
                {
                    // hand loses
                    player1CardDisplay.setTint(0x8E1600);
                }
                else if (this.isBlackjack(playerCards[0]) && this.isBlackjack(dealerCards))
                {
                    //push
                    player1CardDisplay.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player1Bet;
                }
                else if (this.isBlackjack(playerCards[0]))
                {
                    // blackjack
                    player1CardDisplay.setTint(0xFFD700);
                    playerCurrency = playerCurrency + (1.5 * player1Bet) + player1Bet;
                }
                else if ((this.getHandValue(playerCards[0]) > dealerHandValue && this.getHandValue(playerCards[0]) < 22) || (this.getHandValue(playerCards[0]) < 22 && dealerHandValue > 21))
                {
                    // hand wins
                    player1CardDisplay.setTint(0x00FF00);
                    playerCurrency = playerCurrency + (2 * player1Bet);
                }
                else if (this.getHandValue(playerCards[0]) == dealerHandValue)
                {
                    // push
                    player1CardDisplay.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player1Bet;
                }
                else
                {
                    // hand loses
                    player1CardDisplay.setTint(0x8E1600);
                }


            }
            else if (numSplits[0] == 1)
            {
                // first hand
                if (this.splitIsBust(player1Hands[0]))
                {
                    // hand loses
                    player1Hand1Display.setTint(0x8E1600);
                }
                else if (this.isBlackjack(dealerCards) && this.splitGetHandValue(player1Hands[0]) != 21)
                {
                    // hand loses
                    player1Hand1Display.setTint(0x8E1600);
                }
                else if (this.splitGetHandValue(player1Hands[0]) == 21 && this.isBlackjack(dealerCards))
                {
                    //push
                    player1Hand1Display.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player1HandBets[0];
                }
                else if ((this.splitGetHandValue(player1Hands[0]) > dealerHandValue && this.splitGetHandValue(player1Hands[0]) < 22) || (this.splitGetHandValue(player1Hands[0]) < 22 && dealerHandValue > 21))
                {
                    // hand wins
                    player1Hand1Display.setTint(0x00FF00);
                    playerCurrency = playerCurrency + (2 * player1HandBets[0]);
                }
                else if (this.splitGetHandValue(player1Hands[0]) == dealerHandValue)
                {
                    // push
                    player1Hand1Display.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player1HandBets[0];
                }
                else
                {
                    // hand loses
                    player1Hand1Display.setTint(0x8E1600);
                }
                
                // second hand
                if (this.splitIsBust(player1Hands[1]))
                {
                    // hand loses
                    player1Hand2Display.setTint(0x8E1600);
                }
                else if (this.isBlackjack(dealerCards) && this.splitGetHandValue(player1Hands[1]) != 21)
                {
                    // hand loses
                    player1Hand2Display.setTint(0x8E1600);
                }
                else if (this.splitGetHandValue(player1Hands[1]) == 21 && this.isBlackjack(dealerCards))
                {
                    //push
                    player1Hand2Display.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player1HandBets[1];
                }
                else if ((this.splitGetHandValue(player1Hands[1]) > dealerHandValue && this.splitGetHandValue(player1Hands[1]) < 22) || (this.splitGetHandValue(player1Hands[1]) < 22 && dealerHandValue > 21))
                {
                    // hand wins
                    player1Hand2Display.setTint(0x00FF00);
                    playerCurrency = playerCurrency + (2 * player1HandBets[1]);
                }
                else if (this.splitGetHandValue(player1Hands[1]) == dealerHandValue)
                {
                    // push
                    player1Hand2Display.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player1HandBets[1];
                }
                else
                {
                    // hand loses
                    player1Hand2Display.setTint(0x8E1600);
                }
                
            }
        }

        // check player2
        if (numPlayers >= 2)
        {
            if (numSplits[1] == 0)
            {
                if (didPlayersSurrender[1])
                {
                    // hand loses (surrender) (money already handled earlier)
                    player2CardDisplay.setTint(0xFFA500);
                }
                else if (this.isBust(playerCards[1]))
                {
                    // hand loses
                    player2CardDisplay.setTint(0x8E1600);
                }
                else if (this.isBlackjack(dealerCards) && !this.isBlackjack(playerCards[1]))
                {
                    // hand loses
                    player2CardDisplay.setTint(0x8E1600);
                }
                else if (this.isBlackjack(playerCards[1]) && this.isBlackjack(dealerCards))
                {
                    //push
                    player2CardDisplay.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player2Bet;
                }
                else if (this.isBlackjack(playerCards[1]))
                {
                    // blackjack
                    player2CardDisplay.setTint(0xFFD700);
                    playerCurrency = playerCurrency + (1.5 * player2Bet) + player2Bet;
                }
                else if ((this.getHandValue(playerCards[1]) > dealerHandValue && this.getHandValue(playerCards[1]) < 22) || (this.getHandValue(playerCards[1]) < 22 && dealerHandValue > 21))
                {
                    // hand wins
                    player2CardDisplay.setTint(0x00FF00);
                    playerCurrency = playerCurrency + (2 * player2Bet);
                }
                else if (this.getHandValue(playerCards[1]) == dealerHandValue)
                {
                    // push
                    player2CardDisplay.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player2Bet;
                }
                else
                {
                    // hand loses
                    player2CardDisplay.setTint(0x8E1600);
                }

            }
            else if (numSplits[1] == 1)
            {
                // first hand
                if (this.splitIsBust(player2Hands[0]))
                {
                    // hand loses
                    player2Hand1Display.setTint(0x8E1600);
                }
                else if (this.isBlackjack(dealerCards) && this.splitGetHandValue(player2Hands[0]) != 21)
                {
                    // hand loses
                    player2Hand1Display.setTint(0x8E1600);
                }
                else if (this.splitGetHandValue(player2Hands[0]) == 21 && this.isBlackjack(dealerCards))
                {
                    //push
                    player2Hand1Display.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player2HandBets[0];
                }
                else if ((this.splitGetHandValue(player2Hands[0]) > dealerHandValue && this.splitGetHandValue(player2Hands[0]) < 22) || (this.splitGetHandValue(player2Hands[0]) < 22 && dealerHandValue > 21))
                {
                    // hand wins
                    player2Hand1Display.setTint(0x00FF00);
                    playerCurrency = playerCurrency + (2 * player2HandBets[0]);
                }
                else if (this.splitGetHandValue(player2Hands[0]) == dealerHandValue)
                {
                    // push
                    player2Hand1Display.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player2HandBets[0];
                }
                else
                {
                    // hand loses
                    player2Hand1Display.setTint(0x8E1600);
                }
            
                // second hand
                if (this.splitIsBust(player2Hands[1]))
                {
                    // hand loses
                    player2Hand2Display.setTint(0x8E1600);
                }
                else if (this.isBlackjack(dealerCards) && this.splitGetHandValue(player2Hands[1]) != 21)
                {
                    // hand loses
                    player2Hand2Display.setTint(0x8E1600);
                }
                else if (this.splitGetHandValue(player2Hands[1]) == 21 && this.isBlackjack(dealerCards))
                {
                    //push
                    player2Hand2Display.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player2HandBets[1];
                }
                else if ((this.splitGetHandValue(player2Hands[1]) > dealerHandValue && this.splitGetHandValue(player2Hands[1]) < 22) || (this.splitGetHandValue(player2Hands[1]) < 22 && dealerHandValue > 21))
                {
                    // hand wins
                    player2Hand2Display.setTint(0x00FF00);
                    playerCurrency = playerCurrency + (2 * player2HandBets[1]);
                }
                else if (this.splitGetHandValue(player2Hands[1]) == dealerHandValue)
                {
                    // push
                    player2Hand2Display.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player2HandBets[1];
                }
                else
                {
                    // hand loses
                    player2Hand2Display.setTint(0x8E1600);
                }
                
            }
        }

        // check player3
        if (numPlayers >= 3)
        {
            if (numSplits[2] == 0)
            {
                if (didPlayersSurrender[2])
                {
                    // hand loses (surrender) (money already handled earlier)
                    player3CardDisplay.setTint(0xFFA500);
                }
                else if (this.isBust(playerCards[2]))
                {
                    // hand loses
                    player3CardDisplay.setTint(0x8E1600);
                }
                else if (this.isBlackjack(dealerCards) && !this.isBlackjack(playerCards[2]))
                {
                    // hand loses
                    player3CardDisplay.setTint(0x8E1600);
                }
                else if (this.isBlackjack(playerCards[2]) && this.isBlackjack(dealerCards))
                {
                    //push
                    player3CardDisplay.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player3Bet;
                }
                else if (this.isBlackjack(playerCards[2]))
                {
                    // blackjack
                    player3CardDisplay.setTint(0xFFD700);
                    playerCurrency = playerCurrency + (1.5 * player3Bet) + player3Bet;
                }
                else if ((this.getHandValue(playerCards[2]) > dealerHandValue && this.getHandValue(playerCards[2]) < 22) || (this.getHandValue(playerCards[2]) < 22 && dealerHandValue > 21))
                {
                    // hand wins
                    player3CardDisplay.setTint(0x00FF00);
                    playerCurrency = playerCurrency + (2 * player3Bet);
                }
                else if (this.getHandValue(playerCards[2]) == dealerHandValue)
                {
                    // push
                    player3CardDisplay.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player3Bet;
                }
                else
                {
                    // hand loses
                    player3CardDisplay.setTint(0x8E1600);
                }

            }
            else if (numSplits[2] == 1)
            {
                // first hand
                if (this.splitIsBust(player3Hands[0]))
                {
                    // hand loses
                    player3Hand1Display.setTint(0x8E1600);
                }
                else if (this.isBlackjack(dealerCards) && this.splitGetHandValue(player3Hands[0]) != 21)
                {
                    // hand loses
                    player3Hand1Display.setTint(0x8E1600);
                }
                else if (this.splitGetHandValue(player3Hands[0]) == 21 && this.isBlackjack(dealerCards))
                {
                    //push
                    player3Hand1Display.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player3HandBets[0];
                }
                else if ((this.splitGetHandValue(player3Hands[0]) > dealerHandValue && this.splitGetHandValue(player3Hands[0]) < 22) || (this.splitGetHandValue(player3Hands[0]) < 22 && dealerHandValue > 21))
                {
                    // hand wins
                    player3Hand1Display.setTint(0x00FF00);
                    playerCurrency = playerCurrency + (2 * player3HandBets[0]);
                }
                else if (this.splitGetHandValue(player3Hands[0]) == dealerHandValue)
                {
                    // push
                    player3Hand1Display.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player3HandBets[0];
                }
                else
                {
                    // hand loses
                    player3Hand1Display.setTint(0x8E1600);
                }
                
                // second hand
                if (this.splitIsBust(player3Hands[1]))
                {
                    // hand loses
                    player3Hand2Display.setTint(0x8E1600);
                }
                else if (this.isBlackjack(dealerCards) && this.splitGetHandValue(player3Hands[1]) != 21)
                {
                    // hand loses
                    player3Hand2Display.setTint(0x8E1600);
                }
                else if (this.splitGetHandValue(player3Hands[1]) == 21 && this.isBlackjack(dealerCards))
                {
                    //push
                    player3Hand2Display.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player3HandBets[1];
                }
                else if ((this.splitGetHandValue(player3Hands[1]) > dealerHandValue && this.splitGetHandValue(player3Hands[1]) < 22) || (this.splitGetHandValue(player3Hands[1]) < 22 && dealerHandValue > 21))
                {
                    // hand wins
                    player3Hand2Display.setTint(0x00FF00);
                    playerCurrency = playerCurrency + (2 * player3HandBets[1]);
                }
                else if (this.splitGetHandValue(player3Hands[1]) == dealerHandValue)
                {
                    // push
                    player3Hand2Display.setTint(0xFFFFFF);
                    playerCurrency = playerCurrency + player3HandBets[1];
                }
                else
                {
                    // hand loses
                    player3Hand2Display.setTint(0x8E1600);
                }
            }
        }

        // check insurance bets (split or not doesnt matter)
        if (this.isBlackjack(dealerCards) && isPlayerInsured[0] == 1)
        {
            playerCurrency = playerCurrency + (3 * player1InsuranceBet);
        }
        else if (this.isBlackjack(dealerCards) && isPlayerInsured[1] == 1)
        {
            playerCurrency = playerCurrency + (3 * player2InsuranceBet);
        }
        else if (this.isBlackjack(dealerCards) && isPlayerInsured[2] == 1)
        {
            playerCurrency = playerCurrency + (3 * player3InsuranceBet);
        }

        currencyScoreBoard.setText("Currency: $" + playerCurrency);
    };

    // pass true count, can split or not
    baseGameBasicStrategy(currentPlayer, action) {

        // soft = has ace
        var isSoft = 0;

        var isPair = 0;

        // action should be: Hit, Double, Stand, Surrender, Insurance, or Split

        for (let i = 0; i < playerCards[currentPlayer].length; i++)
            if (playerCards[currentPlayer][i] === "A")
                isSoft = 1;

        if (playerCards[currentPlayer][0] === playerCards[currentPlayer][1] && playerCards[currentPlayer].length == 2)
            isPair = 1;

        if (isPair == 1)
        {
            // covers pairs of 2's
            if (playerCards[currentPlayer][0] === "2" && dealerCards[1] === "2" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "2" && dealerCards[1] === "3" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "2" && dealerCards[1] === "4" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "2" && dealerCards[1] === "5" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "2" && dealerCards[1] === "6" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "2" && dealerCards[1] === "7" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "2" && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "2" && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "2" && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "2" && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "2" && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "2" && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "2" && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // covers pairs of 3's
            else if (playerCards[currentPlayer][0] === "3" && dealerCards[1] === "2" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "3" && dealerCards[1] === "3" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "3" && dealerCards[1] === "4" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "3" && dealerCards[1] === "5" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "3" && dealerCards[1] === "6" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "3" && dealerCards[1] === "7" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "3" && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "3" && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "3" && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "3" && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "3" && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "3" && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "3" && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // covers pairs of 4's
            else if (playerCards[currentPlayer][0] === "4" && dealerCards[1] === "2" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "4" && dealerCards[1] === "3" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "4" && dealerCards[1] === "4" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "4" && dealerCards[1] === "5" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "4" && dealerCards[1] === "6" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "4" && dealerCards[1] === "7" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "4" && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "4" && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "4" && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "4" && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "4" && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "4" && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "4" && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // covers pairs of 5's
            else if (playerCards[currentPlayer][0] === "5" && dealerCards[1] === "2" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "5" && dealerCards[1] === "3" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "5" && dealerCards[1] === "4" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "5" && dealerCards[1] === "5" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "5" && dealerCards[1] === "6" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "5" && dealerCards[1] === "7" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "5" && dealerCards[1] === "8" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "5" && dealerCards[1] === "9" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "5" && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "5" && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "5" && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "5" && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "5" && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // covers pairs of 6's
            else if (playerCards[currentPlayer][0] === "6" && dealerCards[1] === "2" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "6" && dealerCards[1] === "3" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "6" && dealerCards[1] === "4" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "6" && dealerCards[1] === "5" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "6" && dealerCards[1] === "6" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "6" && dealerCards[1] === "7" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "6" && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "6" && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "6" && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "6" && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "6" && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "6" && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "6" && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // covers pairs of 7's
            else if (playerCards[currentPlayer][0] === "7" && dealerCards[1] === "2" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "7" && dealerCards[1] === "3" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "7" && dealerCards[1] === "4" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "7" && dealerCards[1] === "5" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "7" && dealerCards[1] === "6" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "7" && dealerCards[1] === "7" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "7" && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "7" && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "7" && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "7" && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "7" && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "7" && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "7" && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // covers pairs of 8's (always split)
            else if (playerCards[currentPlayer][0] === "8" && action === "Split")
                playerPoints = playerPoints + 1;


            // covers pairs of 9's
            else if (playerCards[currentPlayer][0] === "9" && dealerCards[1] === "2" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "9" && dealerCards[1] === "3" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "9" && dealerCards[1] === "4" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "9" && dealerCards[1] === "5" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "9" && dealerCards[1] === "6" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "9" && dealerCards[1] === "7" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "9" && dealerCards[1] === "8" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "9" && dealerCards[1] === "9" && action === "Split")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "9" && dealerCards[1] === "10" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "9" && dealerCards[1] === "J" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "9" && dealerCards[1] === "Q" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "9" && dealerCards[1] === "K" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (playerCards[currentPlayer][0] === "9" && dealerCards[1] === "A" && action === "Stand")
                playerPoints = playerPoints + 1;


            // covers pairs of 10's (or equivalent) (always stand)
            else if ((playerCards[currentPlayer][0] === "10" || playerCards[currentPlayer][0] === "J" ||
                playerCards[currentPlayer][0] === "Q" || playerCards[currentPlayer][0] === "K") && action === "Stand")
                playerPoints = playerPoints + 1;



            // covers pairs of A's (always split)
            else if (playerCards[currentPlayer][0] === "A" && action === "Split")
                playerPoints = playerPoints + 1;

            else
                playerPoints = playerPoints - 1;

        }
        else if (isSoft == 1)
        {
            // soft 12's (always hit)
            if (this.getHandValue(playerCards[currentPlayer]) == 12 && action === "Hit")
                playerPoints = playerPoints + 1;
            

            // soft 13's
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "2" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "3" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "4" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "5" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "6" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "7" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;
            

            // soft 14's
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "2" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "3" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "4" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "5" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "6" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "7" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;



            // soft 15's
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "2" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "3" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "4" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "5" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "6" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "7" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // soft 16's
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "2" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "3" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "4" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "5" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "6" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "7" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // soft 17's
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && dealerCards[1] === "2" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && dealerCards[1] === "3" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && dealerCards[1] === "4" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && dealerCards[1] === "5" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && dealerCards[1] === "6" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && dealerCards[1] === "7" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // soft 18's
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && dealerCards[1] === "2" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && dealerCards[1] === "3" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && dealerCards[1] === "4" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && dealerCards[1] === "5" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && dealerCards[1] === "6" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && dealerCards[1] === "7" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && dealerCards[1] === "8" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // soft 19's (always stand)
            else if (this.getHandValue(playerCards[currentPlayer]) == 19 && action === "Stand")
                playerPoints = playerPoints + 1;


            // soft 20's (always stand)
            else if (this.getHandValue(playerCards[currentPlayer]) == 20 && action === "Stand")
                playerPoints = playerPoints + 1;


            // soft 21's (always stand (BJ))
            else if (this.getHandValue(playerCards[currentPlayer]) == 21 && action === "Stand")
                playerPoints = playerPoints + 1;

            else
                playerPoints = playerPoints - 1;
        }
        else
        {
            // idk if hard 4's are possible


            // hard 5's (always hit)
            if (this.getHandValue(playerCards[currentPlayer]) == 5 && action === "Hit")
                playerPoints = playerPoints + 1;

            // hard 6's (always hit)
            else if (this.getHandValue(playerCards[currentPlayer]) == 6 && action === "Hit")
                playerPoints = playerPoints + 1;


            // hard 7's (always hit)
            else if (this.getHandValue(playerCards[currentPlayer]) == 7 && action === "Hit")
                playerPoints = playerPoints + 1;


            // hard 8's (always hit)
            else if (this.getHandValue(playerCards[currentPlayer]) == 8 && action === "Hit")
                playerPoints = playerPoints + 1;
  

            // hard 9's
            else if (this.getHandValue(playerCards[currentPlayer]) == 9 && dealerCards[1] === "2" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 9 && dealerCards[1] === "3" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 9 && dealerCards[1] === "4" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 9 && dealerCards[1] === "5" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 9 && dealerCards[1] === "6" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 9 && dealerCards[1] === "7" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 9 && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 9 && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 9 && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 9 && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 9 && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 9 && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 9 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // hard 10's
            else if (this.getHandValue(playerCards[currentPlayer]) == 10 && dealerCards[1] === "2" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 10 && dealerCards[1] === "3" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 10 && dealerCards[1] === "4" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 10 && dealerCards[1] === "5" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 10 && dealerCards[1] === "6" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 10 && dealerCards[1] === "7" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 10 && dealerCards[1] === "8" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 10 && dealerCards[1] === "9" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 10 && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 10 && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 10 && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 10 && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 10 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // hard 11's
            else if (this.getHandValue(playerCards[currentPlayer]) == 11 && dealerCards[1] === "2" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 11 && dealerCards[1] === "3" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 11 && dealerCards[1] === "4" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 11 && dealerCards[1] === "5" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 11 && dealerCards[1] === "6" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 11 && dealerCards[1] === "7" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 11 && dealerCards[1] === "8" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 11 && dealerCards[1] === "9" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 11 && dealerCards[1] === "10" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 11 && dealerCards[1] === "J" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 11 && dealerCards[1] === "Q" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 11 && dealerCards[1] === "K" && action === "Double")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 11 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // hard 12's
            else if (this.getHandValue(playerCards[currentPlayer]) == 12 && dealerCards[1] === "2" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 12 && dealerCards[1] === "3" && action === "Hit")
                playerPoints = playerPoints + 1;
            else  if (this.getHandValue(playerCards[currentPlayer]) == 12 && dealerCards[1] === "4" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 12 && dealerCards[1] === "5" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 12 && dealerCards[1] === "6" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 12 && dealerCards[1] === "7" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 12 && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 12 && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 12 && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 12 && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 12 && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 12 && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 12 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // hard 13's
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "2" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "3" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "4" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "5" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "6" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "7" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 13 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // hard 14's
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "2" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "3" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "4" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "5" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "6" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "7" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 14 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // hard 15's
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "2" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "3" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "4" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "5" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "6" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "7" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 15 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // hard 16's
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "2" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "3" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "4" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "5" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "6" && action === "Stand")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "7" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "8" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "9" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "10" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "J" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "Q" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "K" && action === "Hit")
                playerPoints = playerPoints + 1;
            else if (this.getHandValue(playerCards[currentPlayer]) == 16 && dealerCards[1] === "A" && action === "Hit")
                playerPoints = playerPoints + 1;


            // hard 17's (always stand)
            else if (this.getHandValue(playerCards[currentPlayer]) == 17 && action === "Stand")
                playerPoints = playerPoints + 1;


            // hard 18's (always stand)
            else if (this.getHandValue(playerCards[currentPlayer]) == 18 && action === "Stand")
                playerPoints = playerPoints + 1;


            // hard 19's (always stand)
            else if (this.getHandValue(playerCards[currentPlayer]) == 19 && action === "Stand")
                playerPoints = playerPoints + 1;



            // hard 20's (always stand)
            else if (this.getHandValue(playerCards[currentPlayer]) == 20 && action === "Stand")
                playerPoints = playerPoints + 1;



            // hard 21's (always stand)
            else if (this.getHandValue(playerCards[currentPlayer]) == 21 && action === "Stand")
                playerPoints = playerPoints + 1;


            else
                playerPoints = playerPoints - 1;
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
        playerSurrender.disableInteractive();

        playerHit.setTexture('lockedButton');
        playerDouble.setTexture('lockedButton');
        playerStand.setTexture('lockedButton');
        playerSurrender.setTexture('lockedButton');

        playerHit.on('pointerover', function(){
            playerHit.setTexture('lockedButton');
        })

        playerDouble.on('pointerover', function(){
            playerDouble.setTexture('lockedButton');
        })

        playerStand.on('pointerover', function(){
            playerStand.setTexture('lockedButton');
        })

        playerSurrender.on('pointerover', function(){
            playerSurrender.setTexture('lockedButton');
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

        playerSurrender.on('pointerout', function(){
            playerSurrender.setTexture('lockedButton');
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

        playerSurrender.on('pointerup', function(){
            playerSurrender.setTexture('lockedButton');
        })
    };

    enableActionButtons(){
        playerHit.setInteractive({ useHandCursor: true });
        playerDouble.setInteractive({ useHandCursor: true });
        playerStand.setInteractive({ useHandCursor: true });
        playerSurrender.setInteractive({ useHandCursor: true});

        playerHit.setTexture('normalButton');
        playerDouble.setTexture('normalButton');
        playerStand.setTexture('normalButton');
        playerSurrender.setTexture('normalButton');

        playerHit.on('pointerover', function(){
            playerHit.setTexture('hoveredButton');
        })

        playerDouble.on('pointerover', function(){
            playerDouble.setTexture('hoveredButton');
        })

        playerStand.on('pointerover', function(){
            playerStand.setTexture('hoveredButton');
        })

        playerSurrender.on('pointerover', function(){
            playerSurrender.setTexture('hoveredButton');
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

        playerSurrender.on('pointerout', function(){
            playerSurrender.setTexture('normalButton');
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

        playerSurrender.on('pointerup', function(){
            playerSurrender.setTexture('hoveredButton');
        })
    };

    disableStandButton() {

        playerStand.disableInteractive();

        playerStand.setTexture('lockedButton');

        playerStand.on('pointerover', function(){
            playerStand.setTexture('lockedButton');
        })

        playerStand.on('pointerout', function(){
            playerStand.setTexture('lockedButton');
        })

        // idk if these below are needed
        playerStand.on('pointerup', function(){
            playerStand.setTexture('lockedButton');
        })
    };

    enableStandButton() {

        playerStand.setInteractive({ useHandCursor: true});

        playerStand.setTexture('normalButton');

        playerStand.on('pointerover', function(){
            playerStand.setTexture('hoveredButton');
        })

        playerStand.on('pointerout', function(){
            playerStand.setTexture('normalButton');
        })

        // idk if these below are needed
        playerStand.on('pointerup', function(){
            playerStand.setTexture('hoveredButton');
        })
    };

    disableDoubleButton(){

        playerDouble.disableInteractive();

        playerDouble.setTexture('lockedButton');

        playerDouble.on('pointerover', function(){
            playerDouble.setTexture('lockedButton');
        })

        playerDouble.on('pointerout', function(){
            playerDouble.setTexture('lockedButton');
        })

        // idk if these below are needed
        playerDouble.on('pointerup', function(){
            playerDouble.setTexture('lockedButton');
        })

    };

    enableDoubleButton(){

        playerDouble.setInteractive({ useHandCursor: true});

        playerDouble.setTexture('normalButton');

        playerDouble.on('pointerover', function(){
            playerDouble.setTexture('hoveredButton');
        })

        playerDouble.on('pointerout', function(){
            playerDouble.setTexture('normalButton');
        })

        // idk if these below are needed
        playerDouble.on('pointerup', function(){
            playerDouble.setTexture('hoveredButton');
        })
    };

    disableSurrenderButton(){

        playerSurrender.disableInteractive();

        playerSurrender.setTexture('lockedButton');

        playerSurrender.on('pointerover', function(){
            playerSurrender.setTexture('lockedButton');
        })

        playerSurrender.on('pointerout', function(){
            playerSurrender.setTexture('lockedButton');
        })

        // idk if these below are needed
        playerSurrender.on('pointerup', function(){
            playerSurrender.setTexture('lockedButton');
        })
    };

    enableSurrenderButton(){

        playerSurrender.setInteractive({ useHandCursor: true});

        playerSurrender.setTexture('normalButton');

        playerSurrender.on('pointerover', function(){
            playerSurrender.setTexture('hoveredButton');
        })

        playerSurrender.on('pointerout', function(){
            playerSurrender.setTexture('normalButton');
        })

        // idk if these below are needed
        playerSurrender.on('pointerup', function(){
            playerSurrender.setTexture('hoveredButton');
        })
    };

    disableInsuranceButton(){

        playerInsurance.disableInteractive();

        playerInsurance.setTexture('lockedButton');

        playerInsurance.on('pointerover', function(){
            playerInsurance.setTexture('lockedButton');
        })

        playerInsurance.on('pointerout', function(){
            playerInsurance.setTexture('lockedButton');
        })

        // idk if these below are needed
        playerInsurance.on('pointerup', function(){
            playerInsurance.setTexture('lockedButton');
        })
    };

    enableInsuranceButton(){

        playerInsurance.setInteractive({ useHandCursor: true});

        playerInsurance.setTexture('normalButton');

        playerInsurance.on('pointerover', function(){
            playerInsurance.setTexture('hoveredButton');
        })

        playerInsurance.on('pointerout', function(){
            playerInsurance.setTexture('normalButton');
        })

        // idk if these below are needed
        playerInsurance.on('pointerup', function(){
            playerInsurance.setTexture('hoveredButton');
        })
    };

    disableSplitButton(){

        playerSplit.disableInteractive();

        playerSplit.setTexture('lockedButton');

        playerSplit.on('pointerover', function(){
            playerSplit.setTexture('lockedButton');
        })

        playerSplit.on('pointerout', function(){
            playerSplit.setTexture('lockedButton');
        })

        // idk if these below are needed
        playerSplit.on('pointerup', function(){
            playerSplit.setTexture('lockedButton');
        })

    };

    enableSplitButton(){

        playerSplit.setInteractive({ useHandCursor: true});

        playerSplit.setTexture('normalButton');

        playerSplit.on('pointerover', function(){
            playerSplit.setTexture('hoveredButton');
        })

        playerSplit.on('pointerout', function(){
            playerSplit.setTexture('normalButton');
        })

        // idk if these below are needed
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

    disableMenuButton(){
        menuButton.disableInteractive();
        menuButton.setTexture('MenuLocked');

        menuButton.on('pointerover', function(){
            menuButton.setTexture('MenuLocked');
        })

        menuButton.on('pointeron', function(){
            menuButton.setTexture('MenuLocked');
        })

        menuButton.on('pointerout', function(){
            menuButton.setTexture('MenuLocked');
        })

        menuButton.on('pointerup', function(){
            menuButton.setTexture('MenuLocked');
        })
    };

    enableMenuButton(){
        menuButton.setInteractive({ useHandCursor: true });
        menuButton.setTexture('MenuNormal');

        menuButton.on('pointerover', function(){
            menuButton.setTexture('MenuHovered');
        })

        menuButton.on('pointerout', function(){
            menuButton.setTexture('MenuNormal');
        })

        menuButton.on('pointerup', function(){
            menuButton.setTexture('MenuHovered');
        })
    };

    disableSettingsButtons() {
        // numPlayers
        numPlayersMinusButton.disableInteractive();
        numPlayersPlusButton.disableInteractive();

        numPlayersMinusButton.setTexture('minusButtonLocked');
        numPlayersPlusButton.setTexture('plusButtonLocked');

        // numDecks
        numDecksMinusButton.disableInteractive();
        numDecksPlusButton.disableInteractive();

        numDecksMinusButton.setTexture('minusButtonLocked');
        numDecksPlusButton.setTexture('plusButtonLocked');

        // deckPen
        deckPenMinusButton.disableInteractive();
        deckPenPlusButton.disableInteractive();

        deckPenMinusButton.setTexture('minusButtonLocked');
        deckPenPlusButton.setTexture('plusButtonLocked');

        // minBet
        minBetMinusButton.disableInteractive();
        minBetPlusButton.disableInteractive();

        minBetMinusButton.setTexture('minusButtonLocked');
        minBetPlusButton.setTexture('plusButtonLocked');

        // maxBet
        maxBetMinusButton.disableInteractive();
        maxBetPlusButton.disableInteractive();

        maxBetMinusButton.setTexture('minusButtonLocked');
        maxBetPlusButton.setTexture('plusButtonLocked');

        // countSpoiler
        countSpoilerMinusButton.disableInteractive();
        countSpoilerPlusButton.disableInteractive();

        countSpoilerMinusButton.setTexture('minusButtonLocked');
        countSpoilerPlusButton.setTexture('plusButtonLocked');

        // apply button
        applySettingsButton.disableInteractive();

        applySettingsButton.setTexture('lockedButton');
    };

    enableSettingsButtons() {

        // numPlayers
        if (settingsNumPlayers > 1)
        {
            numPlayersMinusButton.setInteractive({ useHandCursor: true });
            numPlayersMinusButton.setTexture('minusButtonNormal');

            numPlayersMinusButton.on('pointerover', function(){
                numPlayersMinusButton.setTexture('minusButtonHovered');
            })

            numPlayersMinusButton.on('pointerout', function(){
                numPlayersMinusButton.setTexture('minusButtonNormal');
            })

            numPlayersMinusButton.on('pointerup', function(){
                numPlayersMinusButton.setTexture('minusButtonHovered');
            })
        }
        else
        {
            numPlayersMinusButton.disableInteractive();
            numPlayersMinusButton.setTexture('minusButtonLocked');

            numPlayersMinusButton.on('pointerover', function(){
                numPlayersMinusButton.setTexture('minusButtonLocked');
            })

            numPlayersMinusButton.on('pointerout', function(){
                numPlayersMinusButton.setTexture('minusButtonLocked');
            })

            numPlayersMinusButton.on('pointerup', function(){
                numPlayersMinusButton.setTexture('minusButtonLocked');
            })
        }

        if (settingsNumPlayers < 3)
        {
            numPlayersPlusButton.setInteractive({ useHandCursor: true });
            numPlayersPlusButton.setTexture('plusButtonNormal');

            numPlayersPlusButton.on('pointerover', function(){
                numPlayersPlusButton.setTexture('plusButtonHovered');
            })

            numPlayersPlusButton.on('pointerout', function(){
                numPlayersPlusButton.setTexture('plusButtonNormal');
            })

            numPlayersPlusButton.on('pointerup', function(){
                numPlayersPlusButton.setTexture('plusButtonHovered');
            })
        }
        else
        {
            numPlayersPlusButton.disableInteractive();
            numPlayersPlusButton.setTexture('plusButtonLocked');

            numPlayersPlusButton.on('pointerover', function(){
                numPlayersPlusButton.setTexture('plusButtonLocked');
            })

            numPlayersPlusButton.on('pointerout', function(){
                numPlayersPlusButton.setTexture('plusButtonLocked');
            })

            numPlayersPlusButton.on('pointerup', function(){
                numPlayersPlusButton.setTexture('plusButtonLocked');
            })
        }


        // numDecks
        if (settingsNumDecks > 1)
        {
            numDecksMinusButton.setInteractive({ useHandCursor: true });
            numDecksMinusButton.setTexture('minusButtonNormal');

            numDecksMinusButton.on('pointerover', function(){
                numDecksMinusButton.setTexture('minusButtonHovered');
            })

            numDecksMinusButton.on('pointerout', function(){
                numDecksMinusButton.setTexture('minusButtonNormal');
            })

            numDecksMinusButton.on('pointerup', function(){
                numDecksMinusButton.setTexture('minusButtonHovered');
            })
        }
        else
        {
            numDecksMinusButton.disableInteractive();
            numDecksMinusButton.setTexture('minusButtonLocked');

            numDecksMinusButton.on('pointerover', function(){
                numDecksMinusButton.setTexture('minusButtonLocked');
            })

            numDecksMinusButton.on('pointerout', function(){
                numDecksMinusButton.setTexture('minusButtonLocked');
            })

            numDecksMinusButton.on('pointerup', function(){
                numDecksMinusButton.setTexture('minusButtonLocked');
            })
        }

        if (settingsNumDecks < 8)
        {
            numDecksPlusButton.setInteractive({ useHandCursor: true });
            numDecksPlusButton.setTexture('plusButtonNormal');

            numDecksPlusButton.on('pointerover', function(){
                numDecksPlusButton.setTexture('plusButtonHovered');
            })

            numDecksPlusButton.on('pointerout', function(){
                numDecksPlusButton.setTexture('plusButtonNormal');
            })

            numDecksPlusButton.on('pointerup', function(){
                numDecksPlusButton.setTexture('plusButtonHovered');
            })
        }
        else
        {
            numDecksPlusButton.disableInteractive();
            numDecksPlusButton.setTexture('plusButtonLocked');

            numDecksPlusButton.on('pointerover', function(){
                numDecksPlusButton.setTexture('plusButtonLocked');
            })

            numDecksPlusButton.on('pointerout', function(){
                numDecksPlusButton.setTexture('plusButtonLocked');
            })

            numDecksPlusButton.on('pointerup', function(){
                numDecksPlusButton.setTexture('plusButtonLocked');
            })
        }


        // deckPen
        if (settingsDeckPen > .25)
        {
            deckPenMinusButton.setInteractive({ useHandCursor: true });
            deckPenMinusButton.setTexture('minusButtonNormal');

            deckPenMinusButton.on('pointerover', function(){
                deckPenMinusButton.setTexture('minusButtonHovered');
            })

            deckPenMinusButton.on('pointerout', function(){
                deckPenMinusButton.setTexture('minusButtonNormal');
            })

            deckPenMinusButton.on('pointerup', function(){
                deckPenMinusButton.setTexture('minusButtonHovered');
            })
        }
        else
        {
            deckPenMinusButton.disableInteractive();
            deckPenMinusButton.setTexture('minusButtonLocked');

            deckPenMinusButton.on('pointerover', function(){
                deckPenMinusButton.setTexture('minusButtonLocked');
            })

            deckPenMinusButton.on('pointerout', function(){
                deckPenMinusButton.setTexture('minusButtonLocked');
            })

            deckPenMinusButton.on('pointerup', function(){
                deckPenMinusButton.setTexture('minusButtonLocked');
            })
        }

        if (settingsDeckPen < 1)
        {
            deckPenPlusButton.setInteractive({ useHandCursor: true });
            deckPenPlusButton.setTexture('plusButtonNormal');

            deckPenPlusButton.on('pointerover', function(){
                deckPenPlusButton.setTexture('plusButtonHovered');
            })

            deckPenPlusButton.on('pointerout', function(){
                deckPenPlusButton.setTexture('plusButtonNormal');
            })

            deckPenPlusButton.on('pointerup', function(){
                deckPenPlusButton.setTexture('plusButtonHovered');
            })
        }
        else
        {
            deckPenPlusButton.disableInteractive();
            deckPenPlusButton.setTexture('plusButtonLocked');

            deckPenPlusButton.on('pointerover', function(){
                deckPenPlusButton.setTexture('plusButtonLocked');
            })

            deckPenPlusButton.on('pointerout', function(){
                deckPenPlusButton.setTexture('plusButtonLocked');
            })

            deckPenPlusButton.on('pointerup', function(){
                deckPenPlusButton.setTexture('plusButtonLocked');
            })
        }



        // minBet
        if (settingsMinBet > 5)
        {
            minBetMinusButton.setInteractive({ useHandCursor: true });
            minBetMinusButton.setTexture('minusButtonNormal');

            minBetMinusButton.on('pointerover', function(){
                minBetMinusButton.setTexture('minusButtonHovered');
            })

            minBetMinusButton.on('pointerout', function(){
                minBetMinusButton.setTexture('minusButtonNormal');
            })

            minBetMinusButton.on('pointerup', function(){
                minBetMinusButton.setTexture('minusButtonHovered');
            })
        }
        else
        {
            minBetMinusButton.disableInteractive();
            minBetMinusButton.setTexture('minusButtonLocked');

            minBetMinusButton.on('pointerover', function(){
                minBetMinusButton.setTexture('minusButtonLocked');
            })

            minBetMinusButton.on('pointerout', function(){
                minBetMinusButton.setTexture('minusButtonLocked');
            })

            minBetMinusButton.on('pointerup', function(){
                minBetMinusButton.setTexture('minusButtonLocked');
            })
        }
        
        if (settingsMinBet < 100)
        {
            minBetPlusButton.setInteractive({ useHandCursor: true });
            minBetPlusButton.setTexture('plusButtonNormal');

            minBetPlusButton.on('pointerover', function(){
                minBetPlusButton.setTexture('plusButtonHovered');
            })

            minBetPlusButton.on('pointerout', function(){
                minBetPlusButton.setTexture('plusButtonNormal');
            })

            minBetPlusButton.on('pointerup', function(){
                minBetPlusButton.setTexture('plusButtonHovered');
            })
        }
        else
        {
            minBetPlusButton.disableInteractive();
            minBetPlusButton.setTexture('plusButtonLocked');

            minBetPlusButton.on('pointerover', function(){
                minBetPlusButton.setTexture('plusButtonLocked');
            })

            minBetPlusButton.on('pointerout', function(){
                minBetPlusButton.setTexture('plusButtonLocked');
            })

            minBetPlusButton.on('pointerup', function(){
                minBetPlusButton.setTexture('plusButtonLocked');
            })
        }



        // maxBet
        if (settingsMaxBet > 250)
        {
            maxBetMinusButton.setInteractive({ useHandCursor: true });
            maxBetMinusButton.setTexture('minusButtonNormal');

            maxBetMinusButton.on('pointerover', function(){
                maxBetMinusButton.setTexture('minusButtonHovered');
            })

            maxBetMinusButton.on('pointerout', function(){
                maxBetMinusButton.setTexture('minusButtonNormal');
            })

            maxBetMinusButton.on('pointerup', function(){
                maxBetMinusButton.setTexture('minusButtonHovered');
            })
        }
        else
        {
            maxBetMinusButton.disableInteractive();
            maxBetMinusButton.setTexture('minusButtonLocked');

            maxBetMinusButton.on('pointerover', function(){
                maxBetMinusButton.setTexture('minusButtonLocked');
            })

            maxBetMinusButton.on('pointerout', function(){
                maxBetMinusButton.setTexture('minusButtonLocked');
            })

            maxBetMinusButton.on('pointerup', function(){
                maxBetMinusButton.setTexture('minusButtonLocked');
            })
        }

        if (settingsMaxBet < 2500)
        {
            maxBetPlusButton.setInteractive({ useHandCursor: true });
            maxBetPlusButton.setTexture('plusButtonNormal');

            maxBetPlusButton.on('pointerover', function(){
                maxBetPlusButton.setTexture('plusButtonHovered');
            })

            maxBetPlusButton.on('pointerout', function(){
                maxBetPlusButton.setTexture('plusButtonNormal');
            })

            maxBetPlusButton.on('pointerup', function(){
                maxBetPlusButton.setTexture('plusButtonHovered');
            })
        }
        else
        {
            maxBetPlusButton.disableInteractive();
            maxBetPlusButton.setTexture('plusButtonLocked');

            maxBetPlusButton.on('pointerover', function(){
                maxBetPlusButton.setTexture('plusButtonLocked');
            })

            maxBetPlusButton.on('pointerout', function(){
                maxBetPlusButton.setTexture('plusButtonLocked');
            })

            maxBetPlusButton.on('pointerup', function(){
                maxBetPlusButton.setTexture('plusButtonLocked');
            })
        }



        // countSpoiler
        if (settingsCountSpoiler > 0)
        {
            countSpoilerMinusButton.setInteractive({ useHandCursor: true });
            countSpoilerMinusButton.setTexture('minusButtonNormal');

            countSpoilerMinusButton.on('pointerover', function(){
                countSpoilerMinusButton.setTexture('minusButtonHovered');
            })

            countSpoilerMinusButton.on('pointerout', function(){
                countSpoilerMinusButton.setTexture('minusButtonNormal');
            })

            countSpoilerMinusButton.on('pointerup', function(){
                countSpoilerMinusButton.setTexture('minusButtonHovered');
            })
        }
        else
        {
            countSpoilerMinusButton.disableInteractive();
            countSpoilerMinusButton.setTexture('minusButtonLocked');

            countSpoilerMinusButton.on('pointerover', function(){
                countSpoilerMinusButton.setTexture('minusButtonLocked');
            })

            countSpoilerMinusButton.on('pointerout', function(){
                countSpoilerMinusButton.setTexture('minusButtonLocked');
            })

            countSpoilerMinusButton.on('pointerup', function(){
                countSpoilerMinusButton.setTexture('minusButtonLocked');
            })
        }

        if (settingsCountSpoiler < 1)
        {
            countSpoilerPlusButton.setInteractive({ useHandCursor: true });
            countSpoilerPlusButton.setTexture('plusButtonNormal');

            countSpoilerPlusButton.on('pointerover', function(){
                countSpoilerPlusButton.setTexture('plusButtonHovered');
            })

            countSpoilerPlusButton.on('pointerout', function(){
                countSpoilerPlusButton.setTexture('plusButtonNormal');
            })

            countSpoilerPlusButton.on('pointerup', function(){
                countSpoilerPlusButton.setTexture('plusButtonHovered');
            })
        }
        else
        {
            countSpoilerPlusButton.disableInteractive();
            countSpoilerPlusButton.setTexture('plusButtonLocked');

            countSpoilerPlusButton.on('pointerover', function(){
                countSpoilerPlusButton.setTexture('plusButtonLocked');
            })

            countSpoilerPlusButton.on('pointerout', function(){
                countSpoilerPlusButton.setTexture('plusButtonLocked');
            })

            countSpoilerPlusButton.on('pointerup', function(){
                countSpoilerPlusButton.setTexture('plusButtonLocked');
            })
        }



        // apply button
        applySettingsButton.setInteractive({ useHandCursor: true });
        applySettingsButton.setTexture('normalButton');

        applySettingsButton.on('pointerover', function(){
            applySettingsButton.setTexture('hoveredButton');
        })

        applySettingsButton.on('pointerout', function(){
            applySettingsButton.setTexture('normalButton');
        })

        applySettingsButton.on('pointerup', function(){
            applySettingsButton.setTexture('hoveredButton');
        })
    };

    moveButtonsAway() {

        whiteChip_1_Button.setY(1500);
        redChip_5_Button.setY(1500);
        blueChip_10_Button.setY(1500);
        greenChip_25_Button.setY(1500);
        blackChip_100_Button.setY(1500);

        nextRoundButton.setY(1500);
        nextBettorButton.setY(1500);

        playerHit.setY(1500);
        playerDouble.setY(1500);
        playerStand.setY(1500);
        playerSurrender.setY(1500);
        playerSplit.setY(1500);
        playerInsurance.setY(1500);

    };

    moveButtonsBack() {

        whiteChip_1_Button.setY(915);
        redChip_5_Button.setY(915);
        blueChip_10_Button.setY(915);
        greenChip_25_Button.setY(915);
        blackChip_100_Button.setY(915);

        nextRoundButton.setY(915);
        nextBettorButton.setY(915);

        playerHit.setY(845);
        playerDouble.setY(845);
        playerStand.setY(845);
        playerSurrender.setY(845);
        playerSplit.setY(845);
        playerInsurance.setY(845);
    };

    resetBoard() {

        numDecks = confirmedSettingsNumDecks;
        numPlayers = confirmedSettingsNumPlayers;
        deckPen = confirmedSettingsDeckPen;
        minBet = confirmedSettingsMinBet;
        maxBet = confirmedSettingsMaxBet;
        countSpoiler = confirmedSettingsCountSpoiler;

        peekingOption = confirmedSettingsPeekingOption;
        blackjackPayout = confirmedSettingsBlackjackPayout;
        hitSplitAces = confirmedSettingsHitSplitAces;
        doubleAfterSplit = confirmedSettingsDoubleAfterSplit;
        hitStandSoft17 = confirmedSettingsHitStandSoft17;
        doubleOption = confirmedSettingsDoubleOption;
        

        dealerCardDisplay.setText("Dealer Cards: \n");
        if (numPlayers >= 1)
        {
            player1CardDisplay.setText("Seat1 Cards: \n");
            player1CardDisplay.setTint(0xFFFFFF);

            player1Hand1Display.setText("");
            player1Hand1Display.setTint(0xFFFFFF);
            player1Hand2Display.setText("");
            player1Hand2Display.setTint(0xFFFFFF);
            // player1Hand3Display.setText("");
            // player1Hand3Display.setTint(0xFFFFFF);
            // player1Hand4Display.setText("");
            // player1Hand4Display.setTint(0xFFFFFF);

        }

        if (numPlayers >= 2)
        {
            player2CardDisplay.setText("Seat2 Cards: \n");
            player2CardDisplay.setTint(0xFFFFFF);

            player2Hand1Display.setText("");
            player2Hand1Display.setTint(0xFFFFFF);
            player2Hand2Display.setText("");
            player2Hand2Display.setTint(0xFFFFFF);
            // player2Hand3Display.setText("");
            // player2Hand3Display.setTint(0xFFFFFF);
            // player2Hand4Display.setText("");
            // player2Hand4Display.setTint(0xFFFFFF);
        }

        if (numPlayers >= 3)
        {
            player3CardDisplay.setText("Seat3 Cards: \n");
            player3CardDisplay.setTint(0xFFFFFF);

            player3Hand1Display.setText("");
            player3Hand1Display.setTint(0xFFFFFF);
            player3Hand2Display.setText("");
            player3Hand2Display.setTint(0xFFFFFF);
            // player3Hand3Display.setText("");
            // player3Hand3Display.setTint(0xFFFFFF);
            // player3Hand4Display.setText("");
            // player3Hand4Display.setTint(0xFFFFFF);
        }

        if (numPlayers == 1)
        {
            player2CardDisplay.setText("");
            player2Hand1Display.setText("");
            player2Hand2Display.setText("");

            player3CardDisplay.setText("");
            player3Hand1Display.setText("");
            player3Hand2Display.setText("");
        }

        if (numPlayers == 2)
        {
            player3CardDisplay.setText("");
            player3Hand1Display.setText("");
            player3Hand2Display.setText("");
        }

        player1TurnIndicator.fillColor = 0x8E1600;
        player2TurnIndicator.fillColor = 0xFFFFFF;
        player3TurnIndicator.fillColor = 0xFFFFFF;

        if (confirmedSettingsCountSpoiler == 1)
        {
            runningCountSpoiler.visible = true;
            trueCountSpoiler.visible = true;

            runningCountSpoiler.on("pointerover", () => { runningCountSpoiler.visible = false; });
            runningCountSpoiler.on("pointerout", () => { runningCountSpoiler.visible = true; });
    
            trueCountSpoiler.on("pointerover", () => { trueCountSpoiler.visible = false; });
            trueCountSpoiler.on("pointerout", () => { trueCountSpoiler.visible = true; });
        }
        else if (confirmedSettingsCountSpoiler == 0)
        {
            runningCountSpoiler.visible = false;
            trueCountSpoiler.visible = false;
        }

        this.disableNextRoundButton();

        dealerCard.setPosition(deckCoords[0], deckCoords[1]);
        dealerCard.visible = true;

        playerCards = [[], [], []];
        dealerCards = [];
        didPlayersSurrender = [0, 0, 0];

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

        for (let i = 0; i < player1DoubleChipCount.length; i++)
        {
            player1DoubleChipCount[i].destroy(true);
        }

        for (let i = 0; i < player2DoubleChipCount.length; i++)
        {
            player2DoubleChipCount[i].destroy(true);
        }

        for (let i = 0; i < player3DoubleChipCount.length; i++)
        {
            player3DoubleChipCount[i].destroy(true);
        }

        for (let i = 0; i < player1InsuranceChips.length; i++)
        {
            player1InsuranceChips[i].destroy(true);
        }

        for (let i = 0; i < player2InsuranceChips.length; i++)
        {
            player2InsuranceChips[i].destroy(true);
        }

        for (let i = 0; i < player3InsuranceChips.length; i++)
        {
            player3InsuranceChips[i].destroy(true);
        }

        for (let i = 0; i < 4; i++)
        {
            for (let j = 0; j < player1ChipArrays[i].length; j++)
                player1ChipArrays[i][j].destroy(true);

            for (let j = 0; j < player2ChipArrays[i].length; j++)
                player2ChipArrays[i][j].destroy(true);

            for (let j = 0; j < player3ChipArrays[i].length; j++)
                player3ChipArrays[i][j].destroy(true);

            for (let j = 0; j < player1DoubleChipArrays[i].length; j++)
                player1DoubleChipArrays[i][j].destroy(true);

            for (let j = 0; j < player2DoubleChipArrays[i].length; j++)
                player2DoubleChipArrays[i][j].destroy(true);

            for (let j = 0; j < player3DoubleChipArrays[i].length; j++)
                player3DoubleChipArrays[i][j].destroy(true);
        }

        player1Bet = minBet;
        player2Bet = minBet;
        player3Bet = minBet;
        player1InsuranceBet = 0;
        player2InsuranceBet = 0;
        player3InsuranceBet = 0;
        player1ChipCount = [];
        player2ChipCount = [];
        player3ChipCount = [];
        player1DoubleChipCount = [];
        player2DoubleChipCount = [];
        player3DoubleChipCount = [];
        player1InsuranceChips = [];
        player2InsuranceChips = [];
        player3InsuranceChips = [];
        didPlayersSurrender = [0, 0, 0];
        isPlayerInsured = [0, 0, 0];
        insuranceRound = 0;
        numChips = 0;
        currentBet = minBet;

        numSplits = [0, 0, 0];
        player1Hands = [[], [], [], []];
        player2Hands = [[], [], [], []];
        player3Hands = [[], [], [], []];
        player1Sprites = [[], [], [], []];
        player2Sprites = [[], [], [], []];
        player3Sprites = [[], [], [], []];
        player1HandBets = [];
        player2HandBets = [];
        player3HandBets = [];
        currentHand = 0;
        handIndicator.setVisible(false);

        player1ChipArrays = [[], [], [], []];
        player2ChipArrays = [[], [], [], []];
        player3ChipArrays = [[], [], [], []];
        player1DoubleChipArrays = [[], [], [], []];
        player2DoubleChipArrays = [[], [], [], []];
        player3DoubleChipArrays = [[], [], [], []];
        currentPlayer = 0;

        // check if player has enough currency to go another round
        if (playerCurrency < minBet * numPlayers)
        {
            // dont let them do anything, put up a warning, and stop the game (infinite loop or something)
            this.disableActionButtons();
            this.disableBettingButtons();
            this.disableNextRoundButton();
            this.disableNextBettorButton();

            // put warning here
            currencyWarningShape.visible = true;
            currencyWarningText.visible = true;

            // stops the game
            // this.scene.pause("GameScene");
        }
        else
        {
            // give minbet worth of chips to all current players
            playerCurrency = playerCurrency - (minBet * numPlayers);

            if (numPlayers >= 1)
            {
                player1Bet = minBet;
                currentBet = minBet;

                placeholderBet = currentBet;
                var k = 0;

                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player1ChipCount.length; i++)
                    {
                        player1ChipCount[i].destroy(true);
                    }

                    numChips = player1ChipCount.length;

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
                this.enableNextBettorButton();
            }

            if (numPlayers >= 2)
            {
                player2Bet = minBet;

                placeholderBet = currentBet;
                var k = 0;

                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player2ChipCount.length; i++)
                    {
                        player2ChipCount[i].destroy(true);
                    }

                    numChips = player2ChipCount.length;

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
                this.enableNextBettorButton();
            }

            if (numPlayers >= 3)
            {
                player3Bet = minBet;

                placeholderBet = currentBet;
                var k = 0;

                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player3ChipCount.length; i++)
                    {
                        player3ChipCount[i].destroy(true);
                    }

                    numChips = player3ChipCount.length;

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
                this.enableNextBettorButton();
            }

            updateInfo();
            this.enableBettingButtons();
        }

        if (applyDeckSettingsFlag == 1)
        {
            cardIndex = 0;
            // shuffledDeck = this.scene.initializeDeck(numDecks);
            // cardInts = this.scene.shuffleInts(numDecks);
            this.initializeDeck(numDecks);
            this.shuffleInts(numDecks);
            runningCount = 0;
            trueCount = 0;
            runningCountScoreBoard.setText('Running Count: 0');
            trueCountScoreBoard.setText('True Count: 0');

            this.anims.create({
                key: "shuffle",
                frameRate: 3,
                frames: this.anims.generateFrameNumbers("shufflingAnim", {start:0, end:2}),
                repeat: 2,
                showOnStart: true,
                hideOnComplete: true
            });
    
            // play a shuffle animation as a test
            shuffleAnimation.play("shuffle");
        }

        applySettingsFlag = 0;
        applyDeckSettingsFlag = 0;
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

                spriteIndex[j][i] = shuffledDeck[cardInts[cardIndex]];

                cardIndex++;
            }

            // deals to the dealer
            dealerCards[i] = (this.getValue(cardInts, cardIndex));

            // console.log(dealerCards[i]);
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

            // let insuranceOption = 0; // 1 = late, 0 = early
            // CHECK FOR A or 10 VALUE CARD HERE AND DO THINGS FOR EARLY VS LATE SURRENDER
            // IF DEALER HAS BJ, THEY AUTO WIN UNLESS A PLAYER ALSO HAS BJ, THEN ITS PUSH

            // Early Surrender = dealer checks for blackjack after all players make moves (what I currenly have)

            // Late Surrender = dealer check for BJ after all bets are made 
            // (when cards are first dealt and before any players make any moves), players can only surrender after that

            // for late insurance, all players have to choose 'insurance' or 'stand' if the dealer shows an A
            // then the dealer checks for BJ
            // then players play their actual turn

            // peekingOption, 0 = no peeking, 1 = peeking
            // peeking is advantagous for player

            // check if dealers upcard is an Ace
            if (insuranceOption == 0)
            {
                if (dealerCards[1] === "A")
                {
                    if (playerCurrency >= player1Bet * .5)
                        this.enableInsuranceButton();

                        if (playerCurrency >= player1Bet)
                            this.enableDoubleButton();
                        else
                            this.disableDoubleButton();
        
                        if (playerCards[0][0] === playerCards[0][1] && playerCurrency >= player1Bet)
                            this.enableSplitButton();
                        else
                            this.disableSplitButton();
                }
                else if ((dealerCards[1] === "10" || dealerCards[1] === "J" || dealerCards[1] === "Q" || dealerCards[1] === "K") && peekingOption == 1)
                {
                    if (this.isBlackjack(dealerCards))
                    {
                        // reveal dealer cards
                        // go to iswinorloss
                        dealerCard.visible = false;
                        shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                        this.revealDealerInfo(dealerCards);
                        this.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                        cardIndex = cardIndex + dealerCards.length - 2;
                        this.isWinOrLoss();
                        this.disableActionButtons();
                        this.disableInsuranceButton();
                        this.disableSplitButton();
                    }
                    else
                    {
                        if (playerCurrency >= player1Bet)
                            this.enableDoubleButton();
                        else
                            this.disableDoubleButton();

                        if (playerCards[0][0] === playerCards[0][1] && playerCurrency >= player1Bet)
                            this.enableSplitButton();
                        else
                            this.disableSplitButton();
                    }
                }
            }
            else if (insuranceOption == 1)
            {
                // if dealer upcard = A, go through each player and ask Insurance or Stand
                if (dealerCards[1] === "A")
                {
                    // disable all buttons that arent insurance/stand/next bettor
                    this.disableBettingButtons();
                    this.disableSplitButton();
                    this.disableSurrenderButton();
                    this.disableActionButtons();

                    if (playerCurrency >= player1Bet * .5)
                        this.enableInsuranceButton();

                    // enable stand
                    this.enableStandButton();

                    insuranceRound = 1;
                }
                else if ((dealerCards[1] === "10" || dealerCards[1] === "J" || dealerCards[1] === "Q" || dealerCards[1] === "K") && peekingOption == 1)
                {
                    if (this.isBlackjack(dealerCards))
                    {
                        // reveal dealer cards
                        // go to iswinorloss
                        dealerCard.visible = false;
                        shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                        this.revealDealerInfo(dealerCards);
                        this.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                        cardIndex = cardIndex + dealerCards.length - 2;
                        this.isWinOrLoss();
                        this.disableActionButtons();
                        this.disableInsuranceButton();
                        this.disableSplitButton();
                    }
                }

            }

        }, this);

    };

    // Load assets
    preload() {

        // load background and other assets
        this.load.image('background', '/static/assets/table_layout1.png');
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

        this.load.image('spoiler', '/static/assets/spoilers.png');
        this.load.image('spoiler2', '/static/assets/spoilers.png');

        // menu button
        this.load.image('MenuNormal', '/static/assets/MenuNormal.png');
        this.load.image('MenuLocked', '/static/assets/MenuLocked.png');
        this.load.image('MenuClicked', '/static/assets/MenuClicked.png');
        this.load.image('MenuHovered', '/static/assets/MenuHovered.png');

        // menu background
        this.load.image('MenuScreen', '/static/assets/MenuScreen.jpg');

        // menu buttons
        this.load.image('minusButtonNormal', '/static/assets/minusButtonNormal.png');
        this.load.image('minusButtonLocked', '/static/assets/minusButtonLocked.png');
        this.load.image('minusButtonClicked', '/static/assets/minusButtonClicked.png');
        this.load.image('minusButtonHovered', '/static/assets/minusButtonHovered.png');

        this.load.image('plusButtonNormal', '/static/assets/plusButtonNormal.png');
        this.load.image('plusButtonLocked', '/static/assets/plusButtonLocked.png');
        this.load.image('plusButtonClicked', '/static/assets/plusButtonClicked.png');
        this.load.image('plusButtonHovered', '/static/assets/plusButtonHovered.png');

        // branding stuff
        this.load.image('logoURL', '/static/assets/url_overlay.png');
        this.load.image('logo', '/static/assets/SDBlackjack_logo.png');

        // chips
        this.load.image('half_chip', '/static/assets/half_chip.png');
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
        this.load.image('chip_500', '/static/assets/500Chip.png');

        // for splits
        this.load.image('handIndication', '/static/assets/handIndicator.png');

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
        // dealerCardDisplay = this.add.text(1175, 125, "Dealer Cards: \n", {fontSize: '20px', fill: '#fff'});
        dealerCardDisplay = this.add.text(25, 50, "Dealer Cards: \n", {fontSize: '20px', fill: '#fff'});

        player1CardDisplay = this.add.text(25, 150, "Seat1 Cards: \n", {fontSize: '20px', fill: '#fff'});
        player1Hand1Display = this.add.text(25, 150, "", {fontSize: '20px', fill: '#fff'});
        player1Hand2Display = this.add.text(25, 200, "", {fontSize: '20px', fill: '#fff'});
    
        player2CardDisplay = this.add.text(25, 325, "Seat2 Cards: \n", {fontSize: '20px', fill: '#fff'});
        player2Hand1Display = this.add.text(25, 325, "", {fontSize: '20px', fill: '#fff'});
        player2Hand2Display = this.add.text(25, 375, "", {fontSize: '20px', fill: '#fff'});

        player3CardDisplay = this.add.text(25, 500, "Seat3 Cards: \n", {fontSize: '20px', fill: '#fff'});
        player3Hand1Display = this.add.text(25, 500, "", {fontSize: '20px', fill: '#fff'});
        player3Hand2Display = this.add.text(25, 550, "", {fontSize: '20px', fill: '#fff'});

        if (numPlayers == 1)
        {
            player2CardDisplay.setText("");
            player2Hand1Display.setText("");
            player2Hand2Display.setText("");

            player3CardDisplay.setText("");
            player3Hand1Display.setText("");
            player3Hand2Display.setText("");
        }

        if (numPlayers == 2)
        {
            player3CardDisplay.setText("");
            player3Hand1Display.setText("");
            player3Hand2Display.setText("");
        }

        // places controlPanel
        controlPanel = this.add.rectangle(700, 875, 1400, 275, 0x008b8b);

        // places settings menu bar on bottom of control panel
        settingsMenuBar = this.add.rectangle(700, 980, 1400, 40, 0xC0C0C0);
        // little black bar to look cool
        this.add.rectangle(700, 960, 1400, 2, 0x000000);
        // lidl logo
        logoURL = this.add.image(700, 982, 'logoURL');
        logoURL.scale = .5;

        // gets a shuffled deck
        //shuffledDeck = this.initializeDeck(numDecks);
        // cardInts = this.shuffleInts(numDecks);

        this.initializeDeck(numDecks);
        this.shuffleInts(numDecks);

        dealerCard = this.add.image(deckCoords[0], deckCoords[1], 'face_down_card');
        dealerCard.scale = .1325;

        // places deck on table, will get replaced by boot later on
        deck = this.add.image(deckCoords[0], deckCoords[1], 'face_down_card');
        deck.scale = .135;
        deck.setDepth(1000000);

        // places betting buttons
        whiteChip_1_Button = this.add.image(500, 915, 'chip_1');
        whiteChip_1_Button.scale = .075;
        redChip_5_Button = this.add.image(600, 915, 'chip_5');
        redChip_5_Button.scale = .075;
        blueChip_10_Button = this.add.image(700, 915, 'chip_10');
        blueChip_10_Button.scale = .075;
        greenChip_25_Button = this.add.image(800, 915, 'chip_25');
        greenChip_25_Button.scale = .075;
        blackChip_100_Button = this.add.image(900, 915, 'chip_100');
        blackChip_100_Button.scale = .075;

        // places next round button
        nextRoundButton = this.add.image(1000, 915, 'nextRoundButtonLocked');
        nextRoundButton.scale = 1.25;

        // places next bettor button
        nextBettorButton = this.add.image(400, 915, 'nextBettorButtonNormal');
        nextBettorButton.scale = 1.25;

        // places menu button
        menuButton = this.add.image(1375, 980, 'MenuNormal');
        menuButton.setDepth(1000000000000);
        this.enableMenuButton();

        // menuScreen = this.add.rectangle(1400/2, 1000/2, 1400, 1000, 0xC0C0C0);
        menuScreen = this.add.image(1400/2, 1000/2, 'MenuScreen');
        menuScreen.scale = .926;
        menuScreen.setDepth(1000000000);
        menuScreen.tint = 0xA9A9A9;
        menuScreen.visible = false;

        // decorative circles
        let circley1 = this.add.circle(1400/2, 150, 5, 5);
        circley1.setDepth(2000000000000);
        circley1.visible = false;

        let circley2 = this.add.circle(300, 150, 5, 5);
        circley2.setDepth(2000000000000);
        circley2.visible = false;

        let circley3 = this.add.circle(1100, 150, 5, 5);
        circley3.setDepth(2000000000000);
        circley3.visible = false;

        // settings menu header
        settingsHeader = this.add.text(540, 50, "Settings Menu", {fontSize: '40px', fill: '#fff'});
        settingsHeader.setDepth(2000000000000);
        settingsHeader.visible = false;

        settingsDisclaimer = this.add.text(230, 100, "Settings will be applied after the current round is over.", {fontSize: '28px', fill: '#fff'});
        settingsDisclaimer.setDepth(2000000000000);
        settingsDisclaimer.visible = false;

        // numplayers buttons + display
        numPlayersHeader = this.add.text(388, 200, "Num. Players", {fontSize: '24px', fill: '#fff'});
        numPlayersMinusButton = this.add.sprite(400, 250, 'minusButtonNormal');
        numPlayersMinusButton.scale = 1;
        numPlayersPlusButton = this.add.sprite(550, 250, 'plusButtonNormal');
        numPlayersPlusButton.scale = 1;
        numPlayersDisplay = this.add.rectangle(475, 250, 100, 40, 0x000000);
        numPlayersText = this.add.text(466, 240, numPlayers, {fontSize: '28px', fill: '#fff'});

        numPlayersHeader.setDepth(2000000000000);
        numPlayersMinusButton.setDepth(2000000000000);
        numPlayersPlusButton.setDepth(2000000000000);
        numPlayersDisplay.setDepth(2000000000000);
        numPlayersText.setDepth(2000000000000);

        numPlayersHeader.visible = false;
        numPlayersMinusButton.visible = false;
        numPlayersPlusButton.visible = false;
        numPlayersDisplay.visible = false;
        numPlayersText.visible = false;

        // numdecks buttons + display
        numDecksHeader = this.add.text(405, 300, "Num. Decks", {fontSize: '24px', fill: '#fff'});
        numDecksMinusButton = this.add.sprite(400, 350, 'minusButtonNormal');
        numDecksMinusButton.scale = 1;
        numDecksPlusButton = this.add.sprite(550, 350, 'plusButtonNormal');
        numDecksPlusButton.scale = 1;
        numDecksDisplay = this.add.rectangle(475, 350, 100, 40, 0x000000);
        numDecksText = this.add.text(466, 340, numDecks, {fontSize: '28px', fill: '#fff'});

        numDecksHeader.setDepth(2000000000000);
        numDecksMinusButton.setDepth(2000000000000);
        numDecksPlusButton.setDepth(2000000000000);
        numDecksDisplay.setDepth(2000000000000);
        numDecksText.setDepth(2000000000000);

        numDecksHeader.visible = false;
        numDecksMinusButton.visible = false;
        numDecksPlusButton.visible = false;
        numDecksDisplay.visible = false;
        numDecksText.visible = false;

        // deckpen buttons + display
        deckPenHeader = this.add.text(412, 400, "Deck Pen.", {fontSize: '24px', fill: '#fff'});
        deckPenMinusButton = this.add.sprite(400, 450, 'minusButtonNormal');
        deckPenMinusButton.scale = 1;
        deckPenPlusButton = this.add.sprite(550, 450, 'plusButtonNormal');
        deckPenPlusButton.scale = 1;
        deckPenDisplay = this.add.rectangle(475, 450, 100, 40, 0x000000);

        if (deckPen == .25)
        {
            deckPenText = this.add.text(440, 440, deckPen, {fontSize: '28px', fill: '#fff', align: 'center'});
        }
        else if (deckPen == .33)
        {
            deckPenText = this.add.text(440, 440, deckPen, {fontSize: '28px', fill: '#fff', align: 'center'});
        }
        else if (deckPen == .5)
        {
            deckPenText = this.add.text(450, 440, deckPen, {fontSize: '28px', fill: '#fff', align: 'center'});
        }
        else if (deckPen == .66)
        {
            deckPenText = this.add.text(440, 440, deckPen, {fontSize: '28px', fill: '#fff', align: 'center'});
        }
        else if (deckPen == .75)
        {
            deckPenText = this.add.text(440, 440, deckPen, {fontSize: '28px', fill: '#fff', align: 'center'});
        }
        else if (deckPen == 1)
        {
            deckPenText = this.add.text(468, 440, deckPen, {fontSize: '28px', fill: '#fff', align: 'center'});
        }

        deckPenHeader.setDepth(2000000000000);
        deckPenMinusButton.setDepth(2000000000000);
        deckPenPlusButton.setDepth(2000000000000);
        deckPenDisplay.setDepth(2000000000000);
        deckPenText.setDepth(2000000000000);

        deckPenHeader.visible = false;
        deckPenMinusButton.visible = false;
        deckPenPlusButton.visible = false;
        deckPenDisplay.visible = false;
        deckPenText.visible = false;

        // minbet buttons + display
        minBetHeader = this.add.text(420, 500, "Min. Bet", {fontSize: '24px', fill: '#fff'});
        minBetMinusButton = this.add.sprite(400, 550, 'minusButtonNormal');
        minBetMinusButton.scale = 1;
        minBetPlusButton = this.add.sprite(550, 550, 'plusButtonNormal');
        minBetPlusButton.scale = 1;
        minBetDisplay = this.add.rectangle(475, 550, 100, 40, 0x000000);

        if (minBet > 9 && minBet < 100)
        {
            minBetText = this.add.text(460, 540, minBet, {fontSize: '28px', fill: '#fff'});
        }
        else if (minBet == 100)
        {
            minBetText = this.add.text(450, 540, minBet, {fontSize: '28px', fill: '#fff'});
        }
        else if (minBet < 10 && minBet > 0)
        {
            minBetText = this.add.text(466, 540, minBet, {fontSize: '28px', fill: '#fff'});
        }

        minBetHeader.setDepth(2000000000000);
        minBetMinusButton.setDepth(2000000000000);
        minBetPlusButton.setDepth(2000000000000);
        minBetDisplay.setDepth(2000000000000);
        minBetText.setDepth(2000000000000);

        minBetHeader.visible = false;
        minBetMinusButton.visible = false;
        minBetPlusButton.visible = false;
        minBetDisplay.visible = false;
        minBetText.visible = false;



        // maxbet buttons + display
        maxBetHeader = this.add.text(420, 600, "Max. Bet", {fontSize: '24px', fill: '#fff'});
        maxBetMinusButton = this.add.sprite(400, 650, 'minusButtonNormal');
        maxBetMinusButton.scale = 1;
        maxBetPlusButton = this.add.sprite(550, 650, 'plusButtonNormal');
        maxBetPlusButton.scale = 1;
        maxBetDisplay = this.add.rectangle(475, 650, 100, 40, 0x000000);


        if (maxBet >= 1000)
        {
            maxBetText = this.add.text(441, 640, maxBet, {fontSize: '28px', fill: '#fff'});
        }
        else if (maxBet >= 500 && maxBet < 1000)
        {
            maxBetText = this.add.text(450, 640, maxBet, {fontSize: '28px', fill: '#fff'});
        }
        

        maxBetHeader.setDepth(2000000000000);
        maxBetMinusButton.setDepth(2000000000000);
        maxBetPlusButton.setDepth(2000000000000);
        maxBetDisplay.setDepth(2000000000000);
        maxBetText.setDepth(2000000000000);

        maxBetHeader.visible = false;
        maxBetMinusButton.visible = false;
        maxBetPlusButton.visible = false;
        maxBetDisplay.visible = false;
        maxBetText.visible = false;


        // spoiler stuff
        if (countSpoiler == 0)
        {
            runningCountSpoiler = this.add.sprite(1370, 85, 'spoiler').setInteractive();
            runningCountSpoiler.scale = .15;
            trueCountSpoiler = this.add.sprite(1340, 110, 'spoiler2').setInteractive();
            trueCountSpoiler.scale = .15;

            runningCountSpoiler.visible = false;
            trueCountSpoiler.visible = false;
        }
        else if (countSpoiler == 1)
        {
            runningCountSpoiler = this.add.sprite(1370, 85, 'spoiler').setInteractive();
            runningCountSpoiler.scale = .15;
            trueCountSpoiler = this.add.sprite(1340, 110, 'spoiler2').setInteractive();
            trueCountSpoiler.scale = .15;

            runningCountSpoiler.visible = true;
            trueCountSpoiler.visible = true;
        }

        // countSpoiler buttons + display
        countSpoilerHeader = this.add.text(370, 700, "Count Spoilers", {fontSize: '24px', fill: '#fff'});
        countSpoilerMinusButton = this.add.sprite(400, 750, 'minusButtonNormal');
        countSpoilerMinusButton.scale = 1;
        countSpoilerPlusButton = this.add.sprite(550, 750, 'plusButtonNormal');
        countSpoilerPlusButton.scale = 1;
        countSpoilerDisplay = this.add.rectangle(475, 750, 100, 40, 0x000000);

        if (countSpoiler == 0)
        {
            countSpoilerText = this.add.text(451, 740, "Off", {fontSize: '28px', fill: '#fff'});
        }
        else if (countSpoiler == 1)
        {
            countSpoilerText = this.add.text(459, 740, "On", {fontSize: '28px', fill: '#fff'});
        }

        countSpoilerHeader.setDepth(2000000000000);
        countSpoilerMinusButton.setDepth(2000000000000);
        countSpoilerPlusButton.setDepth(2000000000000);
        countSpoilerDisplay.setDepth(2000000000000);
        countSpoilerText.setDepth(2000000000000);

        countSpoilerHeader.visible = false;
        countSpoilerMinusButton.visible = false;
        countSpoilerPlusButton.visible = false;
        countSpoilerDisplay.visible = false;
        countSpoilerText.visible = false;

        // let peekingOption = 1; // 1 = peeking, 0 = no peeking, 2 = no surrender at all / peeking is advantagous for player (ALWAYS KEEP PEEKING 1) (this is equivalent to early/late surrender, 1 = late surrender, 0 = early surrender)
        // let blackjackPayout = 3/2;
        // let hitSplitAces = 1; // 1 = yes, 0 = no
        // let doubleAfterSplit = 1; // 1 = yes, 0 = no
        // let hitStandSoft17 = 0; // 1 = hit, 0 = stand
        // let doubleOption = 0; // 0 = double on any first 2 cards, 1 = 9-11 only, 2 = 9-10

  
        // surrender buttons + display
        peekingOptionHeader = this.add.text(805, 200, "Surrender Options", {fontSize: '24px', fill: '#fff'});
        peekingOptionMinusButton = this.add.sprite(850, 250, 'minusButtonNormal');
        peekingOptionMinusButton.scale = 1;
        peekingOptionPlusButton = this.add.sprite(1000, 250, 'plusButtonNormal');
        peekingOptionPlusButton.scale = 1;
        peekingOptionDisplay = this.add.rectangle(925, 250, 100, 40, 0x000000);
        peekingOptionText = this.add.text(916, 240, peekingOption, {fontSize: '28px', fill: '#fff'});

        peekingOptionHeader.setDepth(2000000000000);
        peekingOptionMinusButton.setDepth(2000000000000);
        peekingOptionPlusButton.setDepth(2000000000000);
        peekingOptionDisplay.setDepth(2000000000000);
        peekingOptionText.setDepth(2000000000000);

        peekingOptionHeader.visible = false;
        peekingOptionMinusButton.visible = false;
        peekingOptionPlusButton.visible = false;
        peekingOptionDisplay.visible = false;
        peekingOptionText.visible = false;

        // double buttons + display
        doubleOptionHeader = this.add.text(818, 300, "Double Options", {fontSize: '24px', fill: '#fff'});
        doubleOptionMinusButton = this.add.sprite(850, 350, 'minusButtonNormal');
        doubleOptionMinusButton.scale = 1;
        doubleOptionPlusButton = this.add.sprite(1000, 350, 'plusButtonNormal');
        doubleOptionPlusButton.scale = 1;
        doubleOptionDisplay = this.add.rectangle(925, 350, 100, 40, 0x000000);
        doubleOptionText = this.add.text(918, 340, doubleOption, {fontSize: '28px', fill: '#fff'});

        doubleOptionHeader.setDepth(2000000000000);
        doubleOptionMinusButton.setDepth(2000000000000);
        doubleOptionPlusButton.setDepth(2000000000000);
        doubleOptionDisplay.setDepth(2000000000000);
        doubleOptionText.setDepth(2000000000000);

        doubleOptionHeader.visible = false;
        doubleOptionMinusButton.visible = false;
        doubleOptionPlusButton.visible = false;
        doubleOptionDisplay.visible = false;
        doubleOptionText.visible = false;

        // hitSplitAces buttons + display
        hitSplitAcesHeader = this.add.text(823, 400, "Hit Split Aces", {fontSize: '24px', fill: '#fff'});
        hitSplitAcesMinusButton = this.add.sprite(850, 450, 'minusButtonNormal');
        hitSplitAcesMinusButton.scale = 1;
        hitSplitAcesPlusButton = this.add.sprite(1000, 450, 'plusButtonNormal');
        hitSplitAcesPlusButton.scale = 1;
        hitSplitAcesDisplay = this.add.rectangle(925, 450, 100, 40, 0x000000);
        hitSplitAcesText = this.add.text(918, 440, hitSplitAces, {fontSize: '28px', fill: '#fff'});

        hitSplitAcesHeader.setDepth(2000000000000);
        hitSplitAcesMinusButton.setDepth(2000000000000);
        hitSplitAcesPlusButton.setDepth(2000000000000);
        hitSplitAcesDisplay.setDepth(2000000000000);
        hitSplitAcesText.setDepth(2000000000000);

        hitSplitAcesHeader.visible = false;
        hitSplitAcesMinusButton.visible = false;
        hitSplitAcesPlusButton.visible = false;
        hitSplitAcesDisplay.visible = false;
        hitSplitAcesText.visible = false;

        // doubleAfterSplit buttons + display
        doubleAfterSplitHeader = this.add.text(780, 500, "Doubling After Split", {fontSize: '24px', fill: '#fff'});
        doubleAfterSplitMinusButton = this.add.sprite(850, 550, 'minusButtonNormal');
        doubleAfterSplitMinusButton.scale = 1;
        doubleAfterSplitPlusButton = this.add.sprite(1000, 550, 'plusButtonNormal');
        doubleAfterSplitPlusButton.scale = 1;
        doubleAfterSplitDisplay = this.add.rectangle(925, 550, 100, 40, 0x000000);
        doubleAfterSplitText = this.add.text(918, 540, doubleAfterSplit, {fontSize: '28px', fill: '#fff'});

        doubleAfterSplitHeader.setDepth(2000000000000);
        doubleAfterSplitMinusButton.setDepth(2000000000000);
        doubleAfterSplitPlusButton.setDepth(2000000000000);
        doubleAfterSplitDisplay.setDepth(2000000000000);
        doubleAfterSplitText.setDepth(2000000000000);

        doubleAfterSplitHeader.visible = false;
        doubleAfterSplitMinusButton.visible = false;
        doubleAfterSplitPlusButton.visible = false;
        doubleAfterSplitDisplay.visible = false;
        doubleAfterSplitText.visible = false;

        // hitStandSoft17 buttons + display
        hitStandSoft17Header = this.add.text(760, 600, "Hit or Stand on Soft 17", {fontSize: '24px', fill: '#fff'});
        hitStandSoft17MinusButton = this.add.sprite(850, 650, 'minusButtonNormal');
        hitStandSoft17MinusButton.scale = 1;
        hitStandSoft17PlusButton = this.add.sprite(1000, 650, 'plusButtonNormal');
        hitStandSoft17PlusButton.scale = 1;
        hitStandSoft17Display = this.add.rectangle(925, 650, 100, 40, 0x000000);
        hitStandSoft17Text = this.add.text(918, 640, hitStandSoft17, {fontSize: '28px', fill: '#fff'});

        hitStandSoft17Header.setDepth(2000000000000);
        hitStandSoft17MinusButton.setDepth(2000000000000);
        hitStandSoft17PlusButton.setDepth(2000000000000);
        hitStandSoft17Display.setDepth(2000000000000);
        hitStandSoft17Text.setDepth(2000000000000);

        hitStandSoft17Header.visible = false;
        hitStandSoft17MinusButton.visible = false;
        hitStandSoft17PlusButton.visible = false;
        hitStandSoft17Display.visible = false;
        hitStandSoft17Text.visible = false;

        // blackjackPayout buttons + display
        blackjackPayoutHeader = this.add.text(808, 700, "Blackjack Payout", {fontSize: '24px', fill: '#fff'});
        blackjackPayoutMinusButton = this.add.sprite(850, 750, 'minusButtonNormal');
        blackjackPayoutMinusButton.scale = 1;
        blackjackPayoutPlusButton = this.add.sprite(1000, 750, 'plusButtonNormal');
        blackjackPayoutPlusButton.scale = 1;
        blackjackPayoutDisplay = this.add.rectangle(925, 750, 100, 40, 0x000000);
        blackjackPayoutText = this.add.text(902, 740, blackjackPayout, {fontSize: '28px', fill: '#fff'});

        blackjackPayoutHeader.setDepth(2000000000000);
        blackjackPayoutMinusButton.setDepth(2000000000000);
        blackjackPayoutPlusButton.setDepth(2000000000000);
        blackjackPayoutDisplay.setDepth(2000000000000);
        blackjackPayoutText.setDepth(2000000000000);

        blackjackPayoutHeader.visible = false;
        blackjackPayoutMinusButton.visible = false;
        blackjackPayoutPlusButton.visible = false;
        blackjackPayoutDisplay.visible = false;
        blackjackPayoutText.visible = false;


        // BUTTON BUG IS MOST DEFINETELY RELATED TO THE Y COORD. THE LOWER THE Y, THE MORE ACCURATE THE BUTTON

        // apply settings button
        applySettingsButton = this.add.sprite(700, 900, 'normalButton');
        applySettingsButton.setDepth(2000000000000);
        applySettingsButton.scale = 2;
        applySettingsText = this.add.text(673, 885, "Apply", textStyle);
        applySettingsText.setDepth(2000000000001);

        applySettingsButton.visible = false;
        applySettingsText.visible = false;

        this.disableNextRoundButton();
        this.disableNextBettorButton();

        // placing player turn indicators
        player3TurnIndicator = this.add.circle(450, 775, 15, 0xFFFFFF);
        player2TurnIndicator = this.add.circle(700, 775, 15, 0xFFFFFF);
        player1TurnIndicator = this.add.circle(950, 775, 15, 0x8E1600);

        handIndicator = this.add.image(975, 775, 'handIndication');
        handIndicator.setVisible(false);
        handIndicator.setDepth(1000000);

        // placing player action buttons
        playerHit = this.add.sprite(200, 845, 'lockedButton');
        playerHit.scale = 2;
        hitText = this.add.text(185, 830, "Hit", textStyle);

        playerDouble = this.add.sprite(400, 845, 'lockedButton');
        playerDouble.scale = 2;
        doubleText = this.add.text(363, 830, "Double", textStyle);

        playerStand = this.add.sprite(600, 845, 'lockedButton');
        playerStand.scale = 2;
        standText = this.add.text(568, 830, "Stand", textStyle);

        playerSurrender = this.add.sprite(800, 845, 'lockedButton');
        playerSurrender.scale = 2;
        surrenderText = this.add.text(748, 830, "Surrender", textStyle);

        playerInsurance = this.add.sprite(1000, 845, 'lockedButton');
        playerInsurance.scale = 2;
        insuranceText = this.add.text(948, 830, "Insurance", textStyle);

        playerSplit = this.add.sprite(1200, 845, 'lockedButton');
        playerSplit.scale = 2;
        splitText = this.add.text(1178, 830, "Split", textStyle);

        // WIP Disclaimer
        disclaimer = this.add.text(25, 25, "Work In Progress", {fontSize: '20px', fill: '#fff'});

        currencyWarningShape = this.add.graphics();
        currencyWarningShape.fillStyle(0xFFFFFF, 1);
        // length, width, x-center, y-center, rounded radius
        currencyWarningShape.fillRoundedRect(350, 325, 700, 300, 32);
        currencyWarningShape.setDepth(100000000);
        
        currencyWarningText = this.add.text(730/2, 395, "It appears that you do not have \nenough currency to start a new round. \nLower the number of players \nor the minimum bet if possible, \nor wait until 8 am EST \nfor a daily currency deposit of $500.", {fontSize: '30px', fill: '#8E1600', align: 'center'});
        currencyWarningText.setDepth(10000000001);

        currencyWarningShape.visible = false;
        currencyWarningText.visible = false;

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
        numChips = 1;
        currentBet = minBet;
        player1Bet = minBet;
        player2Bet = minBet;
        player3Bet = minBet;
        player1InsuranceBet = 0;
        player2InsuranceBet = 0;
        player3InsuranceBet = 0;
        player1ChipCount = [];
        player2ChipCount = [];
        player3ChipCount = [];

        this.enableBettingButtons();
        this.enableNextBettorButton();

        // check if player has enough currency to go another round
        if (playerCurrency < minBet * numPlayers)
        {
            // dont let them do anything, put up a warning, and stop the game (infinite loop or something)
            this.disableActionButtons();
            this.disableBettingButtons();
            this.disableNextRoundButton();
            this.disableNextBettorButton();

            // put warning here
            currencyWarningShape.visible = true;
            currencyWarningText.visible = true;

            // stops the game
            // this.pause("GameScene");
        }
        else
        {
            currencyWarningShape.visible = false;
            currencyWarningText.visible = false;

            // give minbet worth of chips to all current players
            playerCurrency = playerCurrency - (minBet * numPlayers);
            if (numPlayers >= 1)
            {
                player1Bet = minBet;
                currentBet = minBet;

                placeholderBet = currentBet;
                var k = 0;

                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player1ChipCount.length; i++)
                    {
                        player1ChipCount[i].destroy(true);
                    }

                    numChips = player1ChipCount.length;

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
                this.enableNextBettorButton();
            }

            if (numPlayers >= 2)
            {
                player2Bet = minBet;

                placeholderBet = currentBet;
                var k = 0;

                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player2ChipCount.length; i++)
                    {
                        player2ChipCount[i].destroy(true);
                    }

                    numChips = player2ChipCount.length;

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
                this.enableNextBettorButton();
            }

            if (numPlayers >= 3)
            {
                player3Bet = minBet;

                placeholderBet = currentBet;
                var k = 0;

                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player3ChipCount.length; i++)
                    {
                        player3ChipCount[i].destroy(true);
                    }

                    numChips = player3ChipCount.length;

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
                this.enableNextBettorButton();
            }

            updateInfo();
        }

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
                    this.scene.enableBettingButtons();
                    this.scene.enableNextBettorButton();
                    numChips = player2ChipCount.length;
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
                    this.scene.enableBettingButtons();
                    this.scene.enableNextBettorButton();
                    numChips = player3ChipCount.length;
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

            // currentBet = 5;
            currentBet = minBet;
            // numChips = 1;
            // this.scene.disableNextBettorButton();
            // this.scene.enableBettingButtons();
        });

        whiteChip_1_Button.on('pointerdown', function(){

            // if (!(currentBet + 1 > maxBet) && ((playerCurrency - 1 > 0 && currentPlayer != numPlayers) || (playerCurrency - 1 >= 0 && currentPlayer + 1 === numPlayers)))
            if (!(currentBet + 1 > maxBet) && (playerCurrency - 1 >= 0))
            {
                currentBet = currentBet + 1;
                playerCurrency = playerCurrency - 1;
                updateInfo();
                if (currentPlayer == 0)
                {
                    player1ChipCount[numChips] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_1');
                    player1ChipCount[numChips].scale = chipScaling;
                    player1ChipCount[numChips].setDepth(100 + numChips);
                }
                else if (currentPlayer == 1)
                {
                    player2ChipCount[numChips] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_1');
                    player2ChipCount[numChips].scale = chipScaling;
                    player2ChipCount[numChips].setDepth(100 + numChips);
                }
                else if (currentPlayer == 2)
                {
                    player3ChipCount[numChips] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_1');
                    player3ChipCount[numChips].scale = chipScaling;
                    player3ChipCount[numChips].setDepth(100 + numChips);
                }
                numChips = numChips + 1;
            }

            // make loop that finds highest value chips 
            
            placeholderBet = currentBet;
            var k = 0;

            if (currentPlayer == 0)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player1ChipCount.length; i++)
                    {
                        player1ChipCount[i].destroy(true);
                    }

                    numChips = player1ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }
            else if (currentPlayer == 1)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player2ChipCount.length; i++)
                    {
                        player2ChipCount[i].destroy(true);
                    }

                    numChips = player2ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }
            else if (currentPlayer == 2)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player3ChipCount.length; i++)
                    {
                        player3ChipCount[i].destroy(true);
                    }

                    numChips = player3ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }

            if (currentBet >= minBet)
            {
                this.scene.enableNextBettorButton();
            }
        });

        redChip_5_Button.on('pointerdown', function(){

            // if (!(currentBet + 5 > maxBet) && ((playerCurrency - 5 > 0 && currentPlayer != numPlayers) || (playerCurrency - 5 >= 0 && currentPlayer + 1 === numPlayers)))
            if (!(currentBet + 5 > maxBet) && (playerCurrency - 5 >= 0))
            {
                currentBet = currentBet + 5;
                playerCurrency = playerCurrency - 5;
                updateInfo();
                if (currentPlayer == 0)
                {
                    player1ChipCount[numChips] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_5');
                    player1ChipCount[numChips].scale = chipScaling;
                    player1ChipCount[numChips].setDepth(100 + numChips);
                }
                else if (currentPlayer == 1)
                {
                    player2ChipCount[numChips] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_5');
                    player2ChipCount[numChips].scale = chipScaling;
                    player2ChipCount[numChips].setDepth(100 + numChips);
                }
                else if (currentPlayer == 2)
                {
                    player3ChipCount[numChips] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_5');
                    player3ChipCount[numChips].scale = chipScaling;
                    player3ChipCount[numChips].setDepth(100 + numChips);
                }
                numChips = numChips + 1;
            }

            placeholderBet = currentBet;
            var k = 0;

            if (currentPlayer == 0)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player1ChipCount.length; i++)
                    {
                        player1ChipCount[i].destroy(true);
                    }

                    numChips = player1ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }
            else if (currentPlayer == 1)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player2ChipCount.length; i++)
                    {
                        player2ChipCount[i].destroy(true);
                    }

                    numChips = player2ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }
            else if (currentPlayer == 2)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player3ChipCount.length; i++)
                    {
                        player3ChipCount[i].destroy(true);
                    }

                    numChips = player3ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }

            if (currentBet >= minBet)
            {
                this.scene.enableNextBettorButton();
            }
        });

        blueChip_10_Button.on('pointerdown', function(){

            // if (!(currentBet + 10 > maxBet) && ((playerCurrency - 10 > 0 && currentPlayer != numPlayers) || (playerCurrency - 10 >= 0 && currentPlayer + 1 === numPlayers)))
            if (!(currentBet + 10 > maxBet) && (playerCurrency - 10 >= 0))
            {
                currentBet = currentBet + 10;
                playerCurrency = playerCurrency - 10;
                updateInfo();
                if (currentPlayer == 0)
                {
                    player1ChipCount[numChips] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_10');
                    player1ChipCount[numChips].scale = chipScaling;
                    player1ChipCount[numChips].setDepth(100 + numChips);
                }
                else if (currentPlayer == 1)
                {
                    player2ChipCount[numChips] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_10');
                    player2ChipCount[numChips].scale = chipScaling;
                    player2ChipCount[numChips].setDepth(100 + numChips);
                }
                else if (currentPlayer == 2)
                {
                    player3ChipCount[numChips] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_10');
                    player3ChipCount[numChips].scale = chipScaling;
                    player3ChipCount[numChips].setDepth(100 + numChips);
                }
                numChips = numChips + 1;
            }

            placeholderBet = currentBet;
            var k = 0;

            if (currentPlayer == 0)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player1ChipCount.length; i++)
                    {
                        player1ChipCount[i].destroy(true);
                    }

                    numChips = player1ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }
            else if (currentPlayer == 1)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player2ChipCount.length; i++)
                    {
                        player2ChipCount[i].destroy(true);
                    }

                    numChips = player2ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }
            else if (currentPlayer == 2)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player3ChipCount.length; i++)
                    {
                        player3ChipCount[i].destroy(true);
                    }

                    numChips = player3ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }

            if (currentBet >= minBet)
            {
                this.scene.enableNextBettorButton();
            }
        });

        greenChip_25_Button.on('pointerdown', function(){

            // if (!(currentBet + 25 > maxBet) && ((playerCurrency - 25 > 0 && currentPlayer != numPlayers) || (playerCurrency - 25 >= 0 && currentPlayer + 1 === numPlayers)))
            if (!(currentBet + 25 > maxBet) && (playerCurrency - 25 >= 0))
            {
                currentBet = currentBet + 25;
                playerCurrency = playerCurrency - 25;
                updateInfo();
                if (currentPlayer == 0)
                {
                    player1ChipCount[numChips] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_25');
                    player1ChipCount[numChips].scale = chipScaling;
                    player1ChipCount[numChips].setDepth(100 + numChips);
                }
                else if (currentPlayer == 1)
                {
                    player2ChipCount[numChips] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_25');
                    player2ChipCount[numChips].scale = chipScaling;
                    player2ChipCount[numChips].setDepth(100 + numChips);
                }
                else if (currentPlayer == 2)
                {
                    player3ChipCount[numChips] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_25');
                    player3ChipCount[numChips].scale = chipScaling;
                    player3ChipCount[numChips].setDepth(100 + numChips);
                }
                numChips = numChips + 1;
            }

            placeholderBet = currentBet;
            var k = 0;

            if (currentPlayer == 0)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player1ChipCount.length; i++)
                    {
                        player1ChipCount[i].destroy(true);
                    }

                    numChips = player1ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }
            else if (currentPlayer == 1)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player2ChipCount.length; i++)
                    {
                        player2ChipCount[i].destroy(true);
                    }

                    numChips = player2ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }
            else if (currentPlayer == 2)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player3ChipCount.length; i++)
                    {
                        player3ChipCount[i].destroy(true);
                    }

                    numChips = player3ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }           

            if (currentBet >= minBet)
            {
                this.scene.enableNextBettorButton();
            }
        });

        blackChip_100_Button.on('pointerdown', function(){

            // if (!(currentBet + 100 > maxBet) && ((playerCurrency - 100 > 0 && currentPlayer != numPlayers) || (playerCurrency - 100 >= 0 && currentPlayer + 1 === numPlayers)))
            if (!(currentBet + 100 > maxBet) && (playerCurrency - 100 >= 0))
            {
                currentBet = currentBet + 100;
                playerCurrency = playerCurrency - 100;
                updateInfo();
                if (currentPlayer == 0)
                {
                    player1ChipCount[numChips] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_100');
                    player1ChipCount[numChips].scale = chipScaling;
                    player1ChipCount[numChips].setDepth(100 + numChips);
                }
                else if (currentPlayer == 1)
                {
                    player2ChipCount[numChips] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_100');
                    player2ChipCount[numChips].scale = chipScaling;
                    player2ChipCount[numChips].setDepth(100 + numChips);
                }
                else if (currentPlayer == 2)
                {
                    player3ChipCount[numChips] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (numChips * 5), 'chip_100');
                    player3ChipCount[numChips].scale = chipScaling;
                    player3ChipCount[numChips].setDepth(100 + numChips);
                }
                numChips = numChips + 1;
            }

            placeholderBet = currentBet;
            var k = 0;

            if (currentPlayer == 0)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player1ChipCount.length; i++)
                    {
                        player1ChipCount[i].destroy(true);
                    }

                    numChips = player1ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player1ChipCount = placeholderChipArray;
                        numChips = player1ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }
            else if (currentPlayer == 1)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player2ChipCount.length; i++)
                    {
                        player2ChipCount[i].destroy(true);
                    }

                    numChips = player2ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player2ChipCount = placeholderChipArray;
                        numChips = player2ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }
            else if (currentPlayer == 2)
            {
                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player3ChipCount.length; i++)
                    {
                        player3ChipCount[i].destroy(true);
                    }

                    numChips = player3ChipCount.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player3ChipCount = placeholderChipArray;
                        numChips = player3ChipCount.length;
                        k++;
                    }
                }
                placeholderChipArray = [];
            }

            if (currentBet >= minBet)
            {
                this.scene.enableNextBettorButton();
            }
        });

        // player chooses to hit
        playerHit.on('pointerdown', function(){

            if (numSplits[currentPlayer] == 0)
            {

                if(!this.scene.isBust(playerCards[currentPlayer]))
                {
                    playerHit.setTexture('clickedButton');
                    // ADDING THIS NEW LINE RIGHT HERE BELOW THIS COMMENT
                    this.scene.baseGameBasicStrategy(currentPlayer, "Hit");
                    playerCards[currentPlayer][playerCards[currentPlayer].length] = (this.scene.getValue(cardInts, cardIndex, this));
                    spriteIndex[currentPlayer][playerCards[currentPlayer].length] = shuffledDeck[cardInts[cardIndex]];
                    this.scene.hitCard(cardInts[cardIndex], shuffledDeck, playerCards[currentPlayer].length-1, currentPlayer, this);
                    cardIndex++;

                    this.scene.disableSurrenderButton();
                    this.scene.disableDoubleButton();
                    this.scene.disableInsuranceButton();
                    // playerCards[currentPlayer][playerCards[currentPlayer].length + 1]
                    // to dynamically hit cards

                    if (currentPlayer == 0)
                    {
                        if (this.scene.isBlackjack(playerCards[currentPlayer]) == 0 && this.scene.isBust(playerCards[currentPlayer]) == 0 && didPlayersSurrender[currentPlayer] == 0)
                        {
                            player1CardDisplay.setTint(0xFFFFFF);
                        }
                    }
                    else if (currentPlayer == 1)
                    {
                        if (this.scene.isBlackjack(playerCards[currentPlayer]) == 0 && this.scene.isBust(playerCards[currentPlayer]) == 0 && didPlayersSurrender[currentPlayer] == 0)
                        {
                            player2CardDisplay.setTint(0xFFFFFF);
                        }
                    }
                    else if (currentPlayer == 2)
                    {
                        if (this.scene.isBlackjack(playerCards[currentPlayer]) == 0 && this.scene.isBust(playerCards[currentPlayer]) == 0 && didPlayersSurrender[currentPlayer] == 0)
                        {
                            player3CardDisplay.setTint(0xFFFFFF);
                        }
                    }

                    if (currentPlayer == 0)
                    {
                        updateInfo(playerCards[currentPlayer].length-1, currentPlayer);
                        if (this.scene.isBust(playerCards[currentPlayer]))
                            player1CardDisplay.setTint(0x8E1600);
                    }
                    else if (currentPlayer == 1)
                    {
                        updateInfo(playerCards[currentPlayer].length-1, currentPlayer);
                        if (this.scene.isBust(playerCards[currentPlayer]))
                            player2CardDisplay.setTint(0x8E1600);
                    }
                    else if (currentPlayer == 2)
                    {
                        updateInfo(playerCards[currentPlayer].length-1, currentPlayer);
                        if (this.scene.isBust(playerCards[currentPlayer]))
                            player3CardDisplay.setTint(0x8E1600);
                    }
                    
                    if (this.scene.isBust(playerCards[currentPlayer]))
                    {
                        if (currentPlayer == 0)
                        {
                            if (numPlayers != 1)
                            {
                                player1TurnIndicator.fillColor = 0xFFFFFF;
                                player2TurnIndicator.fillColor = 0x8E1600;
                                currentPlayer = currentPlayer + 1;
                                currentHand = 0;
                                this.scene.enableSurrenderButton();

                                if (playerCurrency >= player2Bet)
                                    this.scene.enableDoubleButton();
                                else
                                    this.scene.disableDoubleButton();

                                if (playerCurrency >= player2Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                                    this.scene.enableInsuranceButton();
                                else
                                    this.scene.disableInsuranceButton();

                                if (playerCards[1][0] === playerCards[1][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player2Bet)
                                    this.scene.enableSplitButton();
                                else
                                    this.scene.disableSplitButton();

                                if (numSplits[currentPlayer] == 0)
                                    this.scene.enableSurrenderButton();
                                else
                                    this.scene.disableSurrenderButton();
                            }
                            else
                            {
                                // plus more stuff since if its the last player
                                currentHand = 0;
                                dealerCard.visible = false;
                                shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                                this.scene.revealDealerInfo(dealerCards);
                                // dealer needs to draw to 16, and stand on 17
                                this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                                cardIndex = cardIndex + dealerCards.length - 2;
                                this.scene.isWinOrLoss();
                                this.scene.disableActionButtons();
                                this.scene.disableInsuranceButton();
                                this.scene.disableSplitButton();
                            }
                        }
                        else if (currentPlayer == 1)
                        {
                            if (numPlayers != 2)
                            {
                                player2TurnIndicator.fillColor = 0xFFFFFF;
                                player3TurnIndicator.fillColor = 0x8E1600;
                                currentPlayer = currentPlayer + 1;
                                currentHand = 0;
                                this.scene.enableSurrenderButton();

                                if (playerCurrency >= player3Bet)
                                    this.scene.enableDoubleButton();
                                else
                                    this.scene.disableDoubleButton();

                                if (playerCurrency >= player3Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                                    this.scene.enableInsuranceButton();
                                else
                                    this.scene.disableInsuranceButton();

                                if (playerCards[2][0] === playerCards[2][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player3Bet)
                                    this.scene.enableSplitButton();
                                else
                                    this.scene.disableSplitButton();

                                if (numSplits[currentPlayer] == 0)
                                    this.scene.enableSurrenderButton();
                                else
                                    this.scene.disableSurrenderButton();
                            }
                            else
                            {
                                player2TurnIndicator.fillColor = 0xFFFFFF;
                                player1TurnIndicator.fillColor = 0x8E1600;
                                currentPlayer = 0;
                                currentHand = 0;

                                // plus more stuff since if its the last player
                                dealerCard.visible = false;
                                shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                                this.scene.revealDealerInfo(dealerCards);
                                // dealer needs to draw to 16, and stand on 17
                                this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                                cardIndex = cardIndex + dealerCards.length - 2;
                                this.scene.isWinOrLoss();
                                this.scene.disableActionButtons();
                                this.scene.disableInsuranceButton();
                                this.scene.disableSplitButton();
                            }
                        }
                        else if (currentPlayer == 2)
                        {
                            player3TurnIndicator.fillColor = 0xFFFFFF;
                            player1TurnIndicator.fillColor = 0x8E1600;
                            currentPlayer = 0;
                            currentHand = 0;

                            // plus more stuff since if its the last player
                            dealerCard.visible = false;
                            shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                            this.scene.revealDealerInfo(dealerCards);
                            // dealer needs to draw to 16, and stand on 17
                            this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                            cardIndex = cardIndex + dealerCards.length - 2;
                            this.scene.isWinOrLoss();
                            this.scene.disableActionButtons();
                            this.scene.disableInsuranceButton();
                            this.scene.disableSplitButton();
                        }
                    }

                }
            }
            else if (numSplits[currentPlayer] == 1)
            {

                // playercards[currentPlayer][currentlength] = player1Hands[currentHand][currentLength]
                if ((currentPlayer == 0 && numPlayers >= 1 && !this.scene.splitIsBust(player1Hands[currentHand - 1])) || (currentPlayer == 1 && numPlayers >= 2 && !this.scene.splitIsBust(player2Hands[currentHand - 1])) || (currentPlayer == 2 && numPlayers >= 3 && !this.scene.splitIsBust(player3Hands[currentHand - 1])))
                {
                    playerHit.setTexture('clickedButton');
                    // ADDING THIS NEW LINE RIGHT HERE BELOW THIS COMMENT
                    this.scene.baseGameBasicStrategy(currentPlayer, "Hit");

                    //player3Hands[1][1] = (this.scene.getValue(cardInts, cardIndex, this));
                    //player3Sprites[1][1] = shuffledDeck[cardInts[cardIndex]];
                    //this.scene.hitSplitCard(cardInts[cardIndex], shuffledDeck, player3Hands[1].length-1, currentPlayer, 2, this);

                    if (currentPlayer == 0)
                    {
                        player1Hands[currentHand - 1][player1Hands[currentHand - 1].length] = (this.scene.getValue(cardInts, cardIndex, this));
                        player1Sprites[currentHand - 1][player1Hands[currentHand - 1].length] = shuffledDeck[cardInts[cardIndex]];
                        this.scene.hitSplitCard(cardInts[cardIndex], shuffledDeck, player1Hands[currentHand - 1].length-1, currentPlayer, currentHand, this);
                    }
                    else if (currentPlayer == 1)
                    {
                        player2Hands[currentHand - 1][player2Hands[currentHand - 1].length] = (this.scene.getValue(cardInts, cardIndex, this));
                        player2Sprites[currentHand - 1][player2Hands[currentHand - 1].length] = shuffledDeck[cardInts[cardIndex]];
                        this.scene.hitSplitCard(cardInts[cardIndex], shuffledDeck, player2Hands[currentHand - 1].length-1, currentPlayer, currentHand, this);
                    }
                    else if (currentPlayer == 2)
                    {
                        player3Hands[currentHand - 1][player3Hands[currentHand - 1].length] = (this.scene.getValue(cardInts, cardIndex, this));
                        player3Sprites[currentHand - 1][player3Hands[currentHand - 1].length] = shuffledDeck[cardInts[cardIndex]];
                        this.scene.hitSplitCard(cardInts[cardIndex], shuffledDeck, player3Hands[currentHand - 1].length-1, currentPlayer, currentHand, this);
                    }


                    cardIndex++;

                    this.scene.disableSurrenderButton();
                    this.scene.disableDoubleButton();
                    this.scene.disableInsuranceButton();
                    // playerCards[currentPlayer][playerCards[currentPlayer].length + 1]
                    // to dynamically hit cards

                    if (currentPlayer == 0)
                    {
                        // check both hands
                        if (currentHand == 1 && this.scene.splitIsBust(player1Hands[currentHand - 1]) == 0)
                        {
                            player1Hand1Display.setTint(0xFFFFFF);
                        }
                        else if (currentHand == 2 && this.scene.splitIsBust(player1Hands[currentHand - 1]) == 0)
                        {
                            player1Hand2Display.setTint(0xFFFFFF);
                        }

                    }
                    else if (currentPlayer == 1)
                    {
                        // check both hands
                        if (currentHand == 1 && this.scene.splitIsBust(player2Hands[currentHand - 1]) == 0)
                        {
                            player2Hand1Display.setTint(0xFFFFFF);
                        }
                        else if (currentHand == 2 && this.scene.splitIsBust(player2Hands[currentHand - 1]) == 0)
                        {
                            player2Hand2Display.setTint(0xFFFFFF);
                        }
                    }
                    else if (currentPlayer == 2)
                    {
                        // check both hands
                        if (currentHand == 1 && this.scene.splitIsBust(player3Hands[currentHand - 1]) == 0)
                        {
                            player3Hand1Display.setTint(0xFFFFFF);
                        }
                        else if (currentHand == 2 && this.scene.splitIsBust(player3Hands[currentHand - 1]) == 0)
                        {
                            player3Hand2Display.setTint(0xFFFFFF);
                        }
                    }
                    
                    if ((currentPlayer == 0 && this.scene.splitIsBust(player1Hands[currentHand - 1])) || (currentPlayer == 1 && this.scene.splitIsBust(player2Hands[currentHand - 1])) || (currentPlayer == 2 && this.scene.splitIsBust(player3Hands[currentHand - 1])))
                    {
                        if (currentPlayer == 0)
                        {
                            updateInfo(player1Hands[currentHand-1].length-1, currentHand-1);
                            if (this.scene.splitIsBust(player1Hands[0]))
                                player1Hand1Display.setTint(0x8E1600);

                            if (this.scene.splitIsBust(player1Hands[1]))
                                player1Hand2Display.setTint(0x8E1600);
                        }
                        else if (currentPlayer == 1)
                        {
                            updateInfo(player2Hands[currentHand-1].length-1, currentHand-1);
                            if (this.scene.splitIsBust(player2Hands[0]))
                                player2Hand1Display.setTint(0x8E1600);

                            if (this.scene.splitIsBust(player2Hands[1]))
                                player2Hand2Display.setTint(0x8E1600);
                        }
                        else if (currentPlayer == 2)
                        {
                            updateInfo(player3Hands[currentHand-1].length-1, currentHand-1);
                            if (this.scene.splitIsBust(player3Hands[0]))
                                player3Hand1Display.setTint(0x8E1600);

                            if (this.scene.splitIsBust(player3Hands[1]))
                                player3Hand2Display.setTint(0x8E1600);
                        }

                        if (currentPlayer == 0 && numSplits[currentPlayer] == 1)
                        {
                            // first hand out of 2
                            if (currentHand != numSplits[currentPlayer] + 1)
                            {
                                handIndicator.setPosition(cardX[0][0] - splitSpacing, cardY[0][0] + handIndicatorSpacing);
                                currentHand = currentHand + 1;

                                if (playerCurrency >= player1Bet)
                                    this.scene.enableDoubleButton();
                                else
                                    this.scene.disableDoubleButton();
                            }
                            else
                            {
                                // last hand of the split
                                handIndicator.setVisible(false);

                                if (numPlayers != 1)
                                {
                                    player1TurnIndicator.fillColor = 0xFFFFFF;
                                    player2TurnIndicator.fillColor = 0x8E1600;
                                    currentPlayer = currentPlayer + 1;
                                    this.scene.enableSurrenderButton();

                                    if (playerCurrency >= player2Bet)
                                        this.scene.enableDoubleButton();
                                    else
                                        this.scene.disableDoubleButton();

                                    if (playerCurrency >= player2Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                                        this.scene.enableInsuranceButton();
                                    else
                                        this.scene.disableInsuranceButton();

                                    if (playerCards[1][0] === playerCards[1][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player2Bet)
                                        this.scene.enableSplitButton();
                                    else
                                        this.scene.disableSplitButton();

                                    if (numSplits[currentPlayer] == 0)
                                        this.scene.enableSurrenderButton();
                                    else
                                        this.scene.disableSurrenderButton();
                                }
                                else
                                {
                                    // plus more stuff since if its the last player
                                    currentHand = 0;
                                    dealerCard.visible = false;
                                    shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                                    this.scene.revealDealerInfo(dealerCards);
                                    // dealer needs to draw to 16, and stand on 17
                                    this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                                    cardIndex = cardIndex + dealerCards.length - 2;
                                    this.scene.isWinOrLoss();
                                    this.scene.disableActionButtons();
                                    this.scene.disableInsuranceButton();
                                    this.scene.disableSplitButton();
                                }
                            }
                        }
                        else if (currentPlayer == 1 && numSplits[currentPlayer] == 1)
                        {
                            // first hand out of 2
                            if (currentHand != numSplits[currentPlayer] + 1)
                            {
                                handIndicator.setPosition(cardX[0][1] - splitSpacing, cardY[0][1] + handIndicatorSpacing);
                                currentHand = currentHand + 1;

                                if (playerCurrency >= player2Bet)
                                    this.scene.enableDoubleButton();
                                else
                                    this.scene.disableDoubleButton();
                            }
                            else
                            {
                                // last hand of the split
                                handIndicator.setVisible(false);

                                if (numPlayers != 2)
                                {
                                    player2TurnIndicator.fillColor = 0xFFFFFF;
                                    player3TurnIndicator.fillColor = 0x8E1600;
                                    currentPlayer = currentPlayer + 1;
                                    this.scene.enableSurrenderButton();

                                    if (playerCurrency >= player3Bet)
                                        this.scene.enableDoubleButton();
                                    else
                                        this.scene.disableDoubleButton();

                                    if (playerCurrency >= player3Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                                        this.scene.enableInsuranceButton();
                                    else
                                        this.scene.disableInsuranceButton();

                                    if (playerCards[2][0] === playerCards[2][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player3Bet)
                                        this.scene.enableSplitButton();
                                    else
                                        this.scene.disableSplitButton();

                                    if (numSplits[currentPlayer] == 0)
                                        this.scene.enableSurrenderButton();
                                    else
                                        this.scene.disableSurrenderButton();
                                }
                                else
                                {
                                    // plus more stuff since if its the last player
                                    currentHand = 0;
                                    dealerCard.visible = false;
                                    shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                                    this.scene.revealDealerInfo(dealerCards);
                                    // dealer needs to draw to 16, and stand on 17
                                    this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                                    cardIndex = cardIndex + dealerCards.length - 2;
                                    this.scene.isWinOrLoss();
                                    this.scene.disableActionButtons();
                                    this.scene.disableInsuranceButton();
                                    this.scene.disableSplitButton();
                                }
                            }
                        }
                        else if (currentPlayer == 2 && numSplits[currentPlayer] == 1)
                        {
                            // first hand out of 2
                            if (currentHand != numSplits[currentPlayer] + 1)
                            {
                                handIndicator.setPosition(cardX[0][2] - splitSpacing, cardY[0][2] + handIndicatorSpacing);
                                currentHand = currentHand + 1;

                                if (playerCurrency >= player3Bet)
                                    this.scene.enableDoubleButton();
                                else
                                    this.scene.disableDoubleButton();
                            }
                            else
                            {
                                // last hand of the split
                                handIndicator.setVisible(false);

                                player3TurnIndicator.fillColor = 0xFFFFFF;
                                player1TurnIndicator.fillColor = 0x8E1600;
                                currentPlayer = 0;

                                // plus more stuff since if its the last player
                                currentHand = 0;
                                dealerCard.visible = false;
                                shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                                this.scene.revealDealerInfo(dealerCards);
                                // dealer needs to draw to 16, and stand on 17
                                this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                                cardIndex = cardIndex + dealerCards.length - 2;
                                this.scene.isWinOrLoss();
                                this.scene.disableActionButtons();
                                this.scene.disableInsuranceButton();
                                this.scene.disableSplitButton();
                            }
                        }
                    }

                }
            }
        });

        // player chooses to double
        playerDouble.on('pointerdown', function(){

            if (numSplits[currentPlayer] == 0)
            {
                if(!this.scene.isBust(playerCards[currentPlayer]))
                {
                    playerDouble.setTexture('clickedButton');
                    // ADDING THIS NEW LINE RIGHT HERE BELOW THIS COMMENT
                    this.scene.baseGameBasicStrategy(currentPlayer, "Double");
                    playerCards[currentPlayer][playerCards[currentPlayer].length] = (this.scene.getValue(cardInts, cardIndex, this));
                    spriteIndex[currentPlayer][playerCards[currentPlayer].length] = shuffledDeck[cardInts[cardIndex]];
                    this.scene.hitCard(cardInts[cardIndex], shuffledDeck, playerCards[currentPlayer].length-1, currentPlayer, this);
                    cardIndex++;

                    // playerCards[currentPlayer][playerCards[currentPlayer].length + 1]
                    // to dynamically hit cards

                    if (currentPlayer == 0)
                    {
                        if (this.scene.isBlackjack(playerCards[currentPlayer]) == 0 && this.scene.isBust(playerCards[currentPlayer]) == 0 && didPlayersSurrender[currentPlayer] == 0)
                        {
                            player1CardDisplay.setTint(0xFFFFFF);
                        }
                    }
                    else if (currentPlayer == 1)
                    {
                        if (this.scene.isBlackjack(playerCards[currentPlayer]) == 0 && this.scene.isBust(playerCards[currentPlayer]) == 0 && didPlayersSurrender[currentPlayer] == 0)
                        {
                            player2CardDisplay.setTint(0xFFFFFF);
                        }
                    }
                    else if (currentPlayer == 2)
                    {
                        if (this.scene.isBlackjack(playerCards[currentPlayer]) == 0 && this.scene.isBust(playerCards[currentPlayer]) == 0 && didPlayersSurrender[currentPlayer] == 0)
                        {
                            player3CardDisplay.setTint(0xFFFFFF);
                        }
                    }


                    if (currentPlayer == 0)
                    {
                        updateInfo(playerCards[currentPlayer].length-1, currentPlayer);
                        if (this.scene.isBust(playerCards[currentPlayer]))
                            player1CardDisplay.setTint(0x8E1600);
                    }
                    else if (currentPlayer == 1)
                    {
                        updateInfo(playerCards[currentPlayer].length-1, currentPlayer);
                        if (this.scene.isBust(playerCards[currentPlayer]))
                            player2CardDisplay.setTint(0x8E1600);
                    }
                    else if (currentPlayer == 2)
                    {
                        updateInfo(playerCards[currentPlayer].length-1, currentPlayer);
                        if (this.scene.isBust(playerCards[currentPlayer]))
                            player3CardDisplay.setTint(0x8E1600);
                    }

                    // since this is a double, player can only hit once and their turn is over
                    if (currentPlayer == 0)
                    {
                        placeholderBet = player1Bet;
                        playerCurrency = playerCurrency - player1Bet;
                        var k = 0;
            
                        while (placeholderBet > 0)
                        {
                            for (let i = 0; i < player1DoubleChipCount.length; i++)
                            {
                                player1DoubleChipCount[i].destroy(true);
                            }
        
                            numChips = player1DoubleChipCount.length;

                            while (placeholderBet - 500 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_500');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 500;
        
                                player1DoubleChipCount = placeholderChipArray;
                                numChips = player1DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 100 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_100');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 100;
        
                                player1DoubleChipCount = placeholderChipArray;
                                numChips = player1DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 25 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_25');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 25;
        
                                player1DoubleChipCount = placeholderChipArray;
                                numChips = player1DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 10 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_10');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 10;
        
                                player1DoubleChipCount = placeholderChipArray;
                                numChips = player1DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 5 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_5');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 5;
        
                                player1DoubleChipCount = placeholderChipArray;
                                numChips = player1DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 1 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_1');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 1;
        
                                player1DoubleChipCount = placeholderChipArray;
                                numChips = player1DoubleChipCount.length;
                                k++;
                            }
                        }
                        placeholderChipArray = [];

                        player1Bet = player1Bet * 2;

                        if (numPlayers != 1)
                        {
                            player1TurnIndicator.fillColor = 0xFFFFFF;
                            player2TurnIndicator.fillColor = 0x8E1600;
                            currentPlayer = currentPlayer + 1;
                            this.scene.enableSurrenderButton();

                            if (playerCurrency >= player2Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();

                            if (playerCurrency >= player2Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                                this.scene.enableInsuranceButton();
                            else
                                this.scene.disableInsuranceButton();

                            if (playerCards[1][0] === playerCards[1][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player2Bet)
                                this.scene.enableSplitButton();
                            else
                                this.scene.disableSplitButton();

                            if (numSplits[currentPlayer] == 0)
                                this.scene.enableSurrenderButton();
                            else
                                this.scene.disableSurrenderButton();
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
                            this.scene.disableInsuranceButton();
                            this.scene.disableSplitButton();
                        }
                    }
                    else if (currentPlayer == 1)
                    {

                        placeholderBet = player2Bet;
                        playerCurrency = playerCurrency - player2Bet;
                        var k = 0;
            
                        while (placeholderBet > 0)
                        {
                            for (let i = 0; i < player2DoubleChipCount.length; i++)
                            {
                                player2DoubleChipCount[i].destroy(true);
                            }
        
                            numChips = player2DoubleChipCount.length;

                            while (placeholderBet - 500 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_500');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 500;
        
                                player2DoubleChipCount = placeholderChipArray;
                                numChips = player2DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 100 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_100');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 100;
        
                                player2DoubleChipCount = placeholderChipArray;
                                numChips = player2DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 25 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_25');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 25;
        
                                player2DoubleChipCount = placeholderChipArray;
                                numChips = player2DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 10 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_10');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 10;
        
                                player2DoubleChipCount = placeholderChipArray;
                                numChips = player2DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 5 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_5');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 5;
        
                                player2DoubleChipCount = placeholderChipArray;
                                numChips = player2DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 1 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_1');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 1;
        
                                player2DoubleChipCount = placeholderChipArray;
                                numChips = player2DoubleChipCount.length;
                                k++;
                            }
                        }
                        placeholderChipArray = [];

                        player2Bet = player2Bet * 2;

                        if (numPlayers != 2)
                        {
                            player2TurnIndicator.fillColor = 0xFFFFFF;
                            player3TurnIndicator.fillColor = 0x8E1600;
                            currentPlayer = currentPlayer + 1;
                            this.scene.enableSurrenderButton();

                            if (playerCurrency >= player3Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();

                            if (playerCurrency >= player3Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                                this.scene.enableInsuranceButton();
                            else
                                this.scene.disableInsuranceButton();

                            if (playerCards[2][0] === playerCards[2][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player3Bet)
                                this.scene.enableSplitButton();
                            else
                                this.scene.disableSplitButton();

                            if (numSplits[currentPlayer] == 0)
                                this.scene.enableSurrenderButton();
                            else
                                this.scene.disableSurrenderButton();
                        }
                        else
                        {
                            player2TurnIndicator.fillColor = 0xFFFFFF;
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
                            this.scene.disableInsuranceButton();
                            this.scene.disableSplitButton();
                        }
                    }
                    else if (currentPlayer == 2)
                    {

                        placeholderBet = player3Bet;
                        playerCurrency = playerCurrency - player3Bet;
                        var k = 0;
            
                        while (placeholderBet > 0)
                        {
                            for (let i = 0; i < player3DoubleChipCount.length; i++)
                            {
                                player3DoubleChipCount[i].destroy(true);
                            }
        
                            numChips = player3DoubleChipCount.length;

                            while (placeholderBet - 500 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_500');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 500;
        
                                player3DoubleChipCount = placeholderChipArray;
                                numChips = player3DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 100 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_100');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 100;
        
                                player3DoubleChipCount = placeholderChipArray;
                                numChips = player3DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 25 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_25');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 25;
        
                                player3DoubleChipCount = placeholderChipArray;
                                numChips = player3DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 10 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_10');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 10;
        
                                player3DoubleChipCount = placeholderChipArray;
                                numChips = player3DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 5 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_5');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 5;
        
                                player3DoubleChipCount = placeholderChipArray;
                                numChips = player3DoubleChipCount.length;
                                k++;
                            }
        
                            while (placeholderBet - 1 >= 0)
                            {
                                placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords + 45, playerChipYCoords + 25 - (k * 5), 'chip_1');
                                placeholderChipArray[k].scale = chipScaling;
                                placeholderChipArray[k].setDepth(100 + k);
                                placeholderBet = placeholderBet - 1;
        
                                player3DoubleChipCount = placeholderChipArray;
                                numChips = player3DoubleChipCount.length;
                                k++;
                            }
                        }
                        placeholderChipArray = [];

                        player3Bet = player3Bet * 2;

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
                        this.scene.disableInsuranceButton();
                        this.scene.disableSplitButton();
                    }

                }
            }
            if (numSplits[currentPlayer] == 1)
            {
                if ((currentPlayer == 0 && numPlayers >= 1 && !this.scene.splitIsBust(player1Hands[currentHand - 1])) || (currentPlayer == 1 && numPlayers >= 2 && !this.scene.splitIsBust(player2Hands[currentHand - 1])) || (currentPlayer == 2 && numPlayers >= 3 && !this.scene.splitIsBust(player3Hands[currentHand - 1])))
                {
                    playerDouble.setTexture('clickedButton');
                    // ADDING THIS NEW LINE RIGHT HERE BELOW THIS COMMENT
                    this.scene.baseGameBasicStrategy(currentPlayer, "Double");;
                    
                    if (currentPlayer == 0)
                    {
                        player1Hands[currentHand - 1][player1Hands[currentHand - 1].length] = (this.scene.getValue(cardInts, cardIndex, this));
                        player1Sprites[currentHand - 1][player1Hands[currentHand - 1].length] = shuffledDeck[cardInts[cardIndex]];
                        this.scene.hitSplitCard(cardInts[cardIndex], shuffledDeck, player1Hands[currentHand - 1].length-1, currentPlayer, currentHand, this);
                    }
                    else if (currentPlayer == 1)
                    {
                        player2Hands[currentHand - 1][player2Hands[currentHand - 1].length] = (this.scene.getValue(cardInts, cardIndex, this));
                        player2Sprites[currentHand - 1][player2Hands[currentHand - 1].length] = shuffledDeck[cardInts[cardIndex]];
                        this.scene.hitSplitCard(cardInts[cardIndex], shuffledDeck, player2Hands[currentHand - 1].length-1, currentPlayer, currentHand, this);
                    }
                    else if (currentPlayer == 2)
                    {
                        player3Hands[currentHand - 1][player3Hands[currentHand - 1].length] = (this.scene.getValue(cardInts, cardIndex, this));
                        player3Sprites[currentHand - 1][player3Hands[currentHand - 1].length] = shuffledDeck[cardInts[cardIndex]];
                        this.scene.hitSplitCard(cardInts[cardIndex], shuffledDeck, player3Hands[currentHand - 1].length-1, currentPlayer, currentHand, this);
                    }

                    cardIndex++;

                    this.scene.disableSurrenderButton();
                    this.scene.disableDoubleButton();
                    this.scene.disableInsuranceButton();
                    // playerCards[currentPlayer][playerCards[currentPlayer].length + 1]
                    // to dynamically hit cards

                    if (currentPlayer == 0)
                    {
                        updateInfo(player1Hands[currentHand-1].length-1, currentHand-1);
                        if (this.scene.splitIsBust(player1Hands[0]))
                            player1Hand1Display.setTint(0x8E1600);

                        if (this.scene.splitIsBust(player1Hands[1]))
                            player1Hand2Display.setTint(0x8E1600);
                    }
                    else if (currentPlayer == 1)
                    {
                        updateInfo(player2Hands[currentHand-1].length-1, currentHand-1);
                        if (this.scene.splitIsBust(player2Hands[0]))
                            player2Hand1Display.setTint(0x8E1600);

                        if (this.scene.splitIsBust(player2Hands[1]))
                            player2Hand2Display.setTint(0x8E1600);
                    }
                    else if (currentPlayer == 2)
                    {
                        updateInfo(player3Hands[currentHand-1].length-1, currentHand-1);
                        if (this.scene.splitIsBust(player3Hands[0]))
                            player3Hand1Display.setTint(0x8E1600);

                        if (this.scene.splitIsBust(player3Hands[1]))
                            player3Hand2Display.setTint(0x8E1600);
                    }

                    if (currentPlayer == 0)
                    {
                        // check both hands
                        if (currentHand == 1 && this.scene.splitIsBust(player1Hands[currentHand - 1]) == 0)
                        {
                            player1Hand1Display.setTint(0xFFFFFF);
                        }
                        else if (currentHand == 2 && this.scene.splitIsBust(player1Hands[currentHand - 1]) == 0)
                        {
                            player1Hand2Display.setTint(0xFFFFFF);
                        }

                    }
                    else if (currentPlayer == 1)
                    {
                        // check both hands
                        if (currentHand == 1 && this.scene.splitIsBust(player2Hands[currentHand - 1]) == 0)
                        {
                            player2Hand1Display.setTint(0xFFFFFF);
                        }
                        else if (currentHand == 2 && this.scene.splitIsBust(player2Hands[currentHand - 1]) == 0)
                        {
                            player2Hand2Display.setTint(0xFFFFFF);
                        }
                    }
                    else if (currentPlayer == 2)
                    {
                        // check both hands
                        if (currentHand == 1 && this.scene.splitIsBust(player3Hands[currentHand - 1]) == 0)
                        {
                            player3Hand1Display.setTint(0xFFFFFF);
                        }
                        else if (currentHand == 2 && this.scene.splitIsBust(player3Hands[currentHand - 1]) == 0)
                        {
                            player3Hand2Display.setTint(0xFFFFFF);
                        }
                    }

                    if (currentPlayer == 0 && numSplits[currentPlayer] == 1)
                    {
                        if (currentHand != numSplits[currentPlayer] + 1)
                        {
                            // first hand
                            placeholderBet = player1Bet;
                            playerCurrency = playerCurrency - player1Bet;
                            var k = 0;
                
                            while (placeholderBet > 0)
                            {
                                for (let i = 0; i < player1DoubleChipArrays[currentHand-1].length; i++)
                                {
                                    player1DoubleChipArrays[currentHand-1][i].destroy(true);
                                }
            
                                numChips = player1DoubleChipArrays[currentHand-1].length;

                                while (placeholderBet - 500 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_500');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 500;
            
                                    player1DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player1DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 100 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_100');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 100;
            
                                    player1DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player1DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 25 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_25');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 25;
            
                                    player1DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player1DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 10 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_10');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 10;
            
                                    player1DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player1DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 5 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_5');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 5;
            
                                    player1DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player1DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 1 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_1');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 1;
            
                                    player1DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player1DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
                            }
                            placeholderChipArray = [];

                            player1HandBets[currentHand - 1] = player1Bet * 2;

                            if (playerCurrency >= player1Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();

                            handIndicator.setPosition(cardX[0][0] - splitSpacing, cardY[0][0] + handIndicatorSpacing);
                            currentHand = currentHand + 1;
                        }
                        else
                        {
                            // second hand
                            placeholderBet = player1Bet;
                            playerCurrency = playerCurrency - player1Bet;
                            var k = 0;
                
                            while (placeholderBet > 0)
                            {
                                for (let i = 0; i < player1DoubleChipArrays[currentHand-1].length; i++)
                                {
                                    player1DoubleChipArrays[currentHand-1][i].destroy(true);
                                }
            
                                numChips = player1DoubleChipArrays[currentHand-1].length;

                                while (placeholderBet - 500 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_500');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 500;
            
                                    player1DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player1DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 100 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_100');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 100;
            
                                    player1DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player1DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 25 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_25');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 25;
            
                                    player1DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player1DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 10 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_10');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 10;
            
                                    player1DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player1DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 5 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_5');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 5;
            
                                    player1DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player1DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 1 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_1');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 1;
            
                                    player1DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player1DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
                            }
                            placeholderChipArray = [];

                            player1HandBets[currentHand - 1] = player1Bet * 2;
                            handIndicator.setVisible(false);
                            currentHand = 0;

                            if (numPlayers != 1)
                            {
                                player1TurnIndicator.fillColor = 0xFFFFFF;
                                player2TurnIndicator.fillColor = 0x8E1600;
                                currentPlayer = currentPlayer + 1;
                                this.scene.enableSurrenderButton();

                                if (playerCurrency >= player2Bet)
                                    this.scene.enableDoubleButton();
                                else
                                    this.scene.disableDoubleButton();

                                if (playerCurrency >= player2Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                                    this.scene.enableInsuranceButton();
                                else
                                    this.scene.disableInsuranceButton();

                                if (playerCards[1][0] === playerCards[1][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player2Bet)
                                    this.scene.enableSplitButton();
                                else
                                    this.scene.disableSplitButton();

                                if (numSplits[currentPlayer] == 0)
                                    this.scene.enableSurrenderButton();
                                else
                                    this.scene.disableSurrenderButton();
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
                                this.scene.disableInsuranceButton();
                                this.scene.disableSplitButton();
                            }
                        }
                    }
                    else if (currentPlayer == 1 && numSplits[currentPlayer] == 1)
                    {
                        if (currentHand != numSplits[currentPlayer] + 1)
                        {
                            // first hand
                            placeholderBet = player2Bet;
                            playerCurrency = playerCurrency - player2Bet;
                            var k = 0;
                
                            while (placeholderBet > 0)
                            {
                                for (let i = 0; i < player2DoubleChipArrays[currentHand-1].length; i++)
                                {
                                    player2DoubleChipArrays[currentHand-1][i].destroy(true);
                                }
            
                                numChips = player2DoubleChipArrays[currentHand-1].length;

                                while (placeholderBet - 500 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_500');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 500;
            
                                    player2DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player2DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 100 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_100');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 100;
            
                                    player2DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player2DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 25 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_25');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 25;
            
                                    player2DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player2DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 10 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_10');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 10;
            
                                    player2DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player2DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 5 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_5');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 5;
            
                                    player2DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player2DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 1 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_1');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 1;
            
                                    player2DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player2DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
                            }
                            placeholderChipArray = [];

                            player2HandBets[currentHand - 1] = player2Bet * 2;

                            if (playerCurrency >= player2Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();

                            handIndicator.setPosition(cardX[0][1] - splitSpacing, cardY[0][1] + handIndicatorSpacing);
                            currentHand = currentHand + 1;
                        }
                        else
                        {
                            // second hand
                            placeholderBet = player1Bet;
                            playerCurrency = playerCurrency - player2Bet;
                            var k = 0;
                
                            while (placeholderBet > 0)
                            {
                                for (let i = 0; i < player2DoubleChipArrays[currentHand-1].length; i++)
                                {
                                    player2DoubleChipArrays[currentHand-1][i].destroy(true);
                                }
            
                                numChips = player2DoubleChipArrays[currentHand-1].length;

                                while (placeholderBet - 500 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_500');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 500;
            
                                    player2DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player2DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 100 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_100');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 100;
            
                                    player2DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player2DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 25 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_25');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 25;
            
                                    player2DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player2DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 10 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_10');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 10;
            
                                    player2DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player2DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 5 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_5');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 5;
            
                                    player2DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player2DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 1 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_1');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 1;
            
                                    player2DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player2DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
                            }
                            placeholderChipArray = [];

                            player2HandBets[currentHand - 1] = player2Bet * 2;
                            handIndicator.setVisible(false);
                            currentHand = 0;

                            if (numPlayers != 2)
                            {
                                player2TurnIndicator.fillColor = 0xFFFFFF;
                                player3TurnIndicator.fillColor = 0x8E1600;
                                currentPlayer = currentPlayer + 1;
                                this.scene.enableSurrenderButton();

                                if (playerCurrency >= player3Bet)
                                    this.scene.enableDoubleButton();
                                else
                                    this.scene.disableDoubleButton();

                                if (playerCurrency >= player3Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                                    this.scene.enableInsuranceButton();
                                else
                                    this.scene.disableInsuranceButton();

                                if (playerCards[2][0] === playerCards[2][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player3Bet)
                                    this.scene.enableSplitButton();
                                else
                                    this.scene.disableSplitButton();

                                if (numSplits[currentPlayer] == 0)
                                    this.scene.enableSurrenderButton();
                                else
                                    this.scene.disableSurrenderButton();
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
                                this.scene.disableInsuranceButton();
                                this.scene.disableSplitButton();
                            }
                        }
                    }
                    else if (currentPlayer == 2 && numSplits[currentPlayer] == 1)
                    {
                        if (currentHand != numSplits[currentPlayer] + 1)
                        {
                            // first hand
                            placeholderBet = player3Bet;
                            playerCurrency = playerCurrency - player3Bet;
                            var k = 0;
                
                            while (placeholderBet > 0)
                            {
                                for (let i = 0; i < player3DoubleChipArrays[currentHand-1].length; i++)
                                {
                                    player3DoubleChipArrays[currentHand-1][i].destroy(true);
                                }
            
                                numChips = player3DoubleChipArrays[currentHand-1].length;

                                while (placeholderBet - 500 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_500');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 500;
            
                                    player3DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player3DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 100 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_100');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 100;
            
                                    player3DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player3DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 25 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_25');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 25;
            
                                    player3DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player3DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 10 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_10');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 10;
            
                                    player3DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player3DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 5 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_5');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 5;
            
                                    player3DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player3DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 1 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_1');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 1;
            
                                    player3DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player3DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
                            }
                            placeholderChipArray = [];

                            player3HandBets[currentHand - 1] = player3Bet * 2;

                            if (playerCurrency >= player3Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();

                            handIndicator.setPosition(cardX[0][2] - splitSpacing, cardY[0][2] + handIndicatorSpacing);
                            currentHand = currentHand + 1;
                        }
                        else
                        {
                            // second hand
                            placeholderBet = player3Bet;
                            playerCurrency = playerCurrency - player3Bet;
                            var k = 0;
                
                            while (placeholderBet > 0)
                            {
                                for (let i = 0; i < player3DoubleChipArrays[currentHand-1].length; i++)
                                {
                                    player3DoubleChipArrays[currentHand-1][i].destroy(true);
                                }
            
                                numChips = player3DoubleChipArrays[currentHand-1].length;

                                while (placeholderBet - 500 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords + (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_500');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 500;
            
                                    player3DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player3DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 100 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_100');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 100;
            
                                    player3DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player3DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 25 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_25');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 25;
            
                                    player3DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player3DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 10 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_10');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 10;
            
                                    player3DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player3DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 5 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_5');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 5;
            
                                    player3DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player3DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
            
                                while (placeholderBet - 1 >= 0)
                                {
                                    placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords - (splitChipSpacing + 45), playerChipYCoords + 25 - (k * 5), 'chip_1');
                                    placeholderChipArray[k].scale = chipScaling;
                                    placeholderChipArray[k].setDepth(100 + k);
                                    placeholderBet = placeholderBet - 1;
            
                                    player3DoubleChipArrays[currentHand-1] = placeholderChipArray;
                                    numChips = player3DoubleChipArrays[currentHand-1].length;
                                    k++;
                                }
                            }
                            placeholderChipArray = [];

                            player3HandBets[currentHand - 1] = player3Bet * 2;
                            handIndicator.setVisible(false);
                            currentHand = 0;
                            
                            // plus more stuff since if its the last player
                            dealerCard.visible = false;
                            shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                            this.scene.revealDealerInfo(dealerCards);
                            // dealer needs to draw to 16, and stand on 17
                            this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                            cardIndex = cardIndex + dealerCards.length - 2;
                            this.scene.isWinOrLoss();
                            this.scene.disableActionButtons();
                            this.scene.disableInsuranceButton();
                            this.scene.disableSplitButton();
                        }
                    }
                }
            }
        });

        // player chooses to stand
        playerStand.on('pointerdown', function(){

            playerStand.setTexture('clickedButton');
            // ADDING THIS NEW LINE RIGHT HERE BELOW THIS COMMENT

            if (insuranceRound == 1)
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
                        insuranceRound = 2;
                        if (this.scene.isBlackjack(dealerCards))
                        {
                            // reveal dealer cards
                            // go to iswinorloss
                            dealerCard.visible = false;
                            shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                            this.scene.revealDealerInfo(dealerCards);
                            this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                            cardIndex = cardIndex + dealerCards.length - 2;
                            this.scene.isWinOrLoss();
                            this.scene.disableActionButtons();
                            this.scene.disableInsuranceButton();
                            this.scene.disableSplitButton();
                        }
                        else
                        {
                            // play normal
                            currentPlayer = 0;
                            player1TurnIndicator.fillColor = 0x8E1600;
                            player2TurnIndicator.fillColor = 0xFFFFFF;
                            player3TurnIndicator.fillColor = 0xFFFFFF;

                            this.scene.enableActionButtons();

                            if (playerCurrency >= player1Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();

                            if (playerCards[0][0] === playerCards[0][1] && playerCurrency >= player1Bet)
                                this.scene.enableSplitButton();
                            else
                                this.scene.disableSplitButton();

                            this.scene.disableInsuranceButton();
                        }
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
                        insuranceRound = 2;
                        if (this.scene.isBlackjack(dealerCards))
                        {
                            // reveal dealer cards
                            // go to iswinorloss
                            dealerCard.visible = false;
                            shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                            this.scene.revealDealerInfo(dealerCards);
                            this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                            cardIndex = cardIndex + dealerCards.length - 2;
                            this.scene.isWinOrLoss();
                            this.scene.disableActionButtons();
                            this.scene.disableInsuranceButton();
                            this.scene.disableSplitButton();
                        }
                        else
                        {
                            // play normal
                            currentPlayer = 0;
                            player1TurnIndicator.fillColor = 0x8E1600;
                            player2TurnIndicator.fillColor = 0xFFFFFF;
                            player3TurnIndicator.fillColor = 0xFFFFFF;

                            this.scene.enableActionButtons();

                            if (playerCurrency >= player1Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();

                            if (playerCards[0][0] === playerCards[0][1] && playerCurrency >= player1Bet)
                                this.scene.enableSplitButton();
                            else
                                this.scene.disableSplitButton();

                            this.scene.disableInsuranceButton();
                        }
                    }
                }
                else if (currentPlayer == 2)
                {
                    insuranceRound = 2;
                    if (this.scene.isBlackjack(dealerCards))
                    {
                        // reveal dealer cards
                        // go to iswinorloss
                        dealerCard.visible = false;
                        shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                        this.scene.revealDealerInfo(dealerCards);
                        this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                        cardIndex = cardIndex + dealerCards.length - 2;
                        this.scene.isWinOrLoss();
                        this.scene.disableActionButtons();
                        this.scene.disableInsuranceButton();
                        this.scene.disableSplitButton();
                    }
                    else
                    {
                        // play normal
                        currentPlayer = 0;
                        player1TurnIndicator.fillColor = 0x8E1600;
                        player2TurnIndicator.fillColor = 0xFFFFFF;
                        player3TurnIndicator.fillColor = 0xFFFFFF;

                        this.scene.enableActionButtons();

                        if (playerCurrency >= player1Bet)
                            this.scene.enableDoubleButton();
                        else
                            this.scene.disableDoubleButton();

                        if (playerCards[0][0] === playerCards[0][1] && playerCurrency >= player1Bet)
                            this.scene.enableSplitButton();
                        else
                            this.scene.disableSplitButton();

                        this.scene.disableInsuranceButton();
                    }
                }
            }
            else
            {
                if (numSplits[currentPlayer] == 0)
                {
                    this.scene.baseGameBasicStrategy(currentPlayer, "Stand");
                    updateInfo();

                    if (currentPlayer == 0)
                    {
                        if (numPlayers != 1)
                        {
                            player1TurnIndicator.fillColor = 0xFFFFFF;
                            player2TurnIndicator.fillColor = 0x8E1600;
                            currentPlayer = currentPlayer + 1;
                            this.scene.enableSurrenderButton();

                            if (playerCurrency >= player2Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();

                            if (playerCurrency >= player2Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                                this.scene.enableInsuranceButton();
                            else
                                this.scene.disableInsuranceButton();

                            if (playerCards[1][0] === playerCards[1][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player2Bet)
                                this.scene.enableSplitButton();
                            else
                                this.scene.disableSplitButton();

                            if (numSplits[currentPlayer] == 0)
                                this.scene.enableSurrenderButton();
                            else
                                this.scene.disableSurrenderButton();
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
                            this.scene.disableInsuranceButton();
                            this.scene.disableSplitButton();
                        }
                    }
                    else if (currentPlayer == 1)
                    {
                        if (numPlayers != 2)
                        {
                            player2TurnIndicator.fillColor = 0xFFFFFF;
                            player3TurnIndicator.fillColor = 0x8E1600;
                            currentPlayer = currentPlayer + 1;
                            this.scene.enableSurrenderButton();

                            if (playerCurrency >= player3Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();

                            if (playerCurrency >= player3Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                                this.scene.enableInsuranceButton();
                            else
                                this.scene.disableInsuranceButton();

                            if (playerCards[2][0] === playerCards[2][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player3Bet)
                                this.scene.enableSplitButton();
                            else
                                this.scene.disableSplitButton();

                            if (numSplits[currentPlayer] == 0)
                                this.scene.enableSurrenderButton();
                            else
                                this.scene.disableSurrenderButton();
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
                            this.scene.disableInsuranceButton();
                            this.scene.disableSplitButton();
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
                        this.scene.disableInsuranceButton();
                        this.scene.disableSplitButton();
                    }
                }
                else if (numSplits[currentPlayer] == 1)
                {
                    this.scene.baseGameBasicStrategy(currentPlayer, "Stand");
                    updateInfo();

                    if (currentPlayer == 0)
                    {
                        // first hand out of 2
                        if (currentHand != numSplits[currentPlayer] + 1)
                        {
                            handIndicator.setPosition(cardX[0][0] - splitSpacing, cardY[0][0] + handIndicatorSpacing);
                            currentHand = currentHand + 1;

                            if (playerCurrency >= player1Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();
                        }
                        else
                        {
                            // last hand of the split
                            handIndicator.setVisible(false);

                            if (numPlayers != 1)
                            {
                                player1TurnIndicator.fillColor = 0xFFFFFF;
                                player2TurnIndicator.fillColor = 0x8E1600;
                                currentPlayer = currentPlayer + 1;
                                this.scene.enableSurrenderButton();

                                if (playerCurrency >= player2Bet)
                                    this.scene.enableDoubleButton();
                                else
                                    this.scene.disableDoubleButton();

                                if (playerCurrency >= player2Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                                    this.scene.enableInsuranceButton();
                                else
                                    this.scene.disableInsuranceButton();

                                if (playerCards[1][0] === playerCards[1][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player2Bet)
                                    this.scene.enableSplitButton();
                                else
                                    this.scene.disableSplitButton();

                                if (numSplits[currentPlayer] == 0)
                                    this.scene.enableSurrenderButton();
                                else
                                    this.scene.disableSurrenderButton();
                            }
                            else
                            {
                                // plus more stuff since if its the last player
                                currentHand = 0;
                                dealerCard.visible = false;
                                shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                                this.scene.revealDealerInfo(dealerCards);
                                // dealer needs to draw to 16, and stand on 17
                                this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                                cardIndex = cardIndex + dealerCards.length - 2;
                                this.scene.isWinOrLoss();
                                this.scene.disableActionButtons();
                                this.scene.disableInsuranceButton();
                                this.scene.disableSplitButton();
                            }
                        }
                    }
                    else if (currentPlayer == 1)
                    {
                        // first hand out of 2
                        if (currentHand != numSplits[currentPlayer] + 1)
                        {
                            handIndicator.setPosition(cardX[0][1] - splitSpacing, cardY[0][1] + handIndicatorSpacing);
                            currentHand = currentHand + 1;

                            if (playerCurrency >= player2Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();
                        }
                        else
                        {
                            // last hand of the split
                            handIndicator.setVisible(false);

                            if (numPlayers != 2)
                            {
                                player2TurnIndicator.fillColor = 0xFFFFFF;
                                player3TurnIndicator.fillColor = 0x8E1600;
                                currentPlayer = currentPlayer + 1;
                                this.scene.enableSurrenderButton();

                                if (playerCurrency >= player3Bet)
                                    this.scene.enableDoubleButton();
                                else
                                    this.scene.disableDoubleButton();

                                if (playerCurrency >= player3Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                                    this.scene.enableInsuranceButton();
                                else
                                    this.scene.disableInsuranceButton();

                                if (playerCards[2][0] === playerCards[2][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player3Bet)
                                    this.scene.enableSplitButton();
                                else
                                    this.scene.disableSplitButton();

                                if (numSplits[currentPlayer] == 0)
                                    this.scene.enableSurrenderButton();
                                else
                                    this.scene.disableSurrenderButton();
                            }
                            else
                            {
                                // plus more stuff since if its the last player
                                currentHand = 0;
                                dealerCard.visible = false;
                                shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                                this.scene.revealDealerInfo(dealerCards);
                                // dealer needs to draw to 16, and stand on 17
                                this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                                cardIndex = cardIndex + dealerCards.length - 2;
                                this.scene.isWinOrLoss();
                                this.scene.disableActionButtons();
                                this.scene.disableInsuranceButton();
                                this.scene.disableSplitButton();
                            }
                        }
                    }
                    else if (currentPlayer == 2)
                    {
                        // first hand out of 2
                        if (currentHand != numSplits[currentPlayer] + 1)
                        {
                            handIndicator.setPosition(cardX[0][2] - splitSpacing, cardY[0][2] + handIndicatorSpacing);
                            currentHand = currentHand + 1;

                            if (playerCurrency >= player3Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();
                        }
                        else
                        {
                            // last hand of the split
                            handIndicator.setVisible(false);

                            player3TurnIndicator.fillColor = 0xFFFFFF;
                            player1TurnIndicator.fillColor = 0x8E1600;
                            currentPlayer = 0;

                            // plus more stuff since if its the last player
                            currentHand = 0;
                            dealerCard.visible = false;
                            shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                            this.scene.revealDealerInfo(dealerCards);
                            // dealer needs to draw to 16, and stand on 17
                            this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                            cardIndex = cardIndex + dealerCards.length - 2;
                            this.scene.isWinOrLoss();
                            this.scene.disableActionButtons();
                            this.scene.disableInsuranceButton();
                            this.scene.disableSplitButton();
                        }
                    }

                }
            }

        });

        // player chooses to surrender
        playerSurrender.on('pointerdown', function(){

            playerSurrender.setTexture('clickedButton');

            if (currentPlayer == 0)
            {
                if (numPlayers != 1)
                {
                    playerCurrency = playerCurrency + (.5 * player1Bet);
                    didPlayersSurrender[0] = 1;
                    player1CardDisplay.setTint(0xFFA500);
                    updateInfo();
                    player1TurnIndicator.fillColor = 0xFFFFFF;
                    player2TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = currentPlayer + 1;

                    if (playerCurrency >= player2Bet)
                        this.scene.enableDoubleButton();
                    else
                        this.scene.disableDoubleButton();

                    if (playerCurrency >= player2Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                        this.scene.enableInsuranceButton();
                    else
                        this.scene.disableInsuranceButton();

                    if (playerCards[1][0] === playerCards[1][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player2Bet)
                        this.scene.enableSplitButton();
                    else
                        this.scene.disableSplitButton();

                    if (numSplits[currentPlayer] == 0)
                        this.scene.enableSurrenderButton();
                    else
                        this.scene.disableSurrenderButton();
                }
                else
                {
                    playerCurrency = playerCurrency + (.5 * player1Bet);
                    didPlayersSurrender[0] = 1;
                    player1CardDisplay.setTint(0xFFA500);
                    updateInfo();
                    // plus more stuff since if its the last player
                    dealerCard.visible = false;
                    shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                    this.scene.revealDealerInfo(dealerCards);
                    // dealer needs to draw to 16, and stand on 17
                    this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                    cardIndex = cardIndex + dealerCards.length - 2;
                    this.scene.isWinOrLoss();
                    this.scene.disableActionButtons();
                    this.scene.disableInsuranceButton();
                    this.scene.disableSplitButton();
                }
            }
            else if (currentPlayer == 1)
            {
                if (numPlayers != 2)
                {
                    playerCurrency = playerCurrency + (.5 * player2Bet);
                    didPlayersSurrender[1] = 1;
                    player2CardDisplay.setTint(0xFFA500);
                    updateInfo();
                    player2TurnIndicator.fillColor = 0xFFFFFF;
                    player3TurnIndicator.fillColor = 0x8E1600;
                    currentPlayer = currentPlayer + 1;

                    if (playerCurrency >= player3Bet)
                        this.scene.enableDoubleButton();
                    else
                        this.scene.disableDoubleButton();

                    if (playerCurrency >= player3Bet * .5 && dealerCards[1] === "A" && numSplits[currentPlayer] == 0 && insuranceRound != 2)
                        this.scene.enableInsuranceButton();
                    else
                        this.scene.disableInsuranceButton();

                    if (playerCards[2][0] === playerCards[2][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player3Bet)
                        this.scene.enableSplitButton();
                    else
                        this.scene.disableSplitButton();

                    if (numSplits[currentPlayer] == 0)
                        this.scene.enableSurrenderButton();
                    else
                        this.scene.disableSurrenderButton();
                }
                else
                {
                    playerCurrency = playerCurrency + (.5 * player2Bet);
                    didPlayersSurrender[1] = 1;
                    player2CardDisplay.setTint(0xFFA500);
                    updateInfo();
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
                    this.scene.disableInsuranceButton();
                    this.scene.disableSplitButton();
                }
            }
            else if (currentPlayer == 2)
            {
                playerCurrency = playerCurrency + (.5 * player3Bet);
                didPlayersSurrender[2] = 1;
                player3CardDisplay.setTint(0xFFA500);
                updateInfo();
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
                this.scene.disableInsuranceButton();
                this.scene.disableSplitButton();
            }

        });

        // player chooses insurance
        playerInsurance.on('pointerdown', function(){

            playerInsurance.setTexture('clickedButton');

            if (insuranceRound == 0)
                this.scene.disableInsuranceButton();

            if (currentPlayer == 0)
            {
                placeholderBet = player1Bet * .5;
                player1InsuranceBet = player1Bet * .5;
                isPlayerInsured[0] = 1;
                playerCurrency = playerCurrency - player1InsuranceBet;
                currencyScoreBoard.setText("Currency: $" + playerCurrency);
                var k = 0;

                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player1InsuranceChips.length; i++)
                    {
                        player1InsuranceChips[i].destroy(true);
                    }

                    numChips = player1InsuranceChips.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player1InsuranceChips = placeholderChipArray;
                        numChips = player1InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player1InsuranceChips = placeholderChipArray;
                        numChips = player1InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player1InsuranceChips = placeholderChipArray;
                        numChips = player1InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player1InsuranceChips = placeholderChipArray;
                        numChips = player1InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player1InsuranceChips = placeholderChipArray;
                        numChips = player1InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player1InsuranceChips = placeholderChipArray;
                        numChips = player1InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - .5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player1ChipXCoords, playerChipYCoords + 50 - (k * 5), 'half_chip');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - .5;

                        player1InsuranceChips = placeholderChipArray;
                        numChips = player1InsuranceChips.length;
                        k++;
                    }

                }
                placeholderChipArray = [];

                if (insuranceRound == 0)
                {
                    if (playerCurrency >= player1Bet)
                        this.scene.enableDoubleButton();
                    else
                        this.scene.disableDoubleButton();

                    if (playerCards[0][0] === playerCards[0][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player1Bet)
                        this.scene.enableSplitButton();
                    else
                        this.scene.disableSplitButton();
                }
            }
            else if (currentPlayer == 1)
            {
                placeholderBet = player2Bet * .5;
                player2InsuranceBet = player2Bet * .5;
                isPlayerInsured[1] = 1;
                playerCurrency = playerCurrency - player2InsuranceBet;
                currencyScoreBoard.setText("Currency: $" + playerCurrency);
                var k = 0;

                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player2InsuranceChips.length; i++)
                    {
                        player2InsuranceChips[i].destroy(true);
                    }

                    numChips = player2InsuranceChips.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player2InsuranceChips = placeholderChipArray;
                        numChips = player2InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player2InsuranceChips = placeholderChipArray;
                        numChips = player2InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player2InsuranceChips = placeholderChipArray;
                        numChips = player2InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player2InsuranceChips = placeholderChipArray;
                        numChips = player2InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player2InsuranceChips = placeholderChipArray;
                        numChips = player2InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player2InsuranceChips = placeholderChipArray;
                        numChips = player2InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - .5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player2ChipXCoords, playerChipYCoords + 50 - (k * 5), 'half_chip');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - .5;

                        player2InsuranceChips = placeholderChipArray;
                        numChips = player2InsuranceChips.length;
                        k++;
                    }
                }
                placeholderChipArray = [];

                if (insuranceRound == 0)
                {
                    if (playerCurrency >= player2Bet)
                        this.scene.enableDoubleButton();
                    else
                        this.scene.disableDoubleButton();

                    if (playerCards[1][0] === playerCards[1][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player2Bet)
                        this.scene.enableSplitButton();
                    else
                        this.scene.disableSplitButton();
                }
            }
            else if (currentPlayer == 2)
            {
                placeholderBet = player3Bet * .5;
                player3InsuranceBet = player3Bet * .5;
                isPlayerInsured[2] = 1;
                playerCurrency = playerCurrency - player3InsuranceBet;
                currencyScoreBoard.setText("Currency: $" + playerCurrency);
                var k = 0;

                while (placeholderBet > 0)
                {
                    for (let i = 0; i < player3InsuranceChips.length; i++)
                    {
                        player3InsuranceChips[i].destroy(true);
                    }

                    numChips = player3InsuranceChips.length;

                    while (placeholderBet - 500 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_500');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 500;

                        player3InsuranceChips = placeholderChipArray;
                        numChips = player3InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 100 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_100');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 100;

                        player3InsuranceChips = placeholderChipArray;
                        numChips = player3InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 25 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_25');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 25;

                        player3InsuranceChips = placeholderChipArray;
                        numChips = player3InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 10 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_10');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 10;

                        player3InsuranceChips = placeholderChipArray;
                        numChips = player3InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_5');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 5;

                        player3InsuranceChips = placeholderChipArray;
                        numChips = player3InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - 1 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords + 50 - (k * 5), 'chip_1');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - 1;

                        player3InsuranceChips = placeholderChipArray;
                        numChips = player3InsuranceChips.length;
                        k++;
                    }

                    while (placeholderBet - .5 >= 0)
                    {
                        placeholderChipArray[k] = this.scene.add.image(player3ChipXCoords, playerChipYCoords + 50 - (k * 5), 'half_chip');
                        placeholderChipArray[k].scale = chipScaling;
                        placeholderChipArray[k].setDepth(100 + k);
                        placeholderBet = placeholderBet - .5;

                        player3InsuranceChips = placeholderChipArray;
                        numChips = player3InsuranceChips.length;
                        k++;
                    }
                }
                placeholderChipArray = [];

                if (insuranceRound == 0)
                {
                    if (playerCurrency >= player3Bet)
                        this.scene.enableDoubleButton();
                    else
                        this.scene.disableDoubleButton();

                    if (playerCards[2][0] === playerCards[2][1] && numSplits[currentPlayer] < maxSplits && playerCurrency >= player3Bet)
                        this.scene.enableSplitButton();
                    else
                        this.scene.disableSplitButton();
                }
            }

            if (insuranceRound == 1)
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
                        insuranceRound = 2;
                        if (this.scene.isBlackjack(dealerCards))
                        {
                            // reveal dealer cards
                            // go to iswinorloss
                            dealerCard.visible = false;
                            shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                            this.scene.revealDealerInfo(dealerCards);
                            this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                            cardIndex = cardIndex + dealerCards.length - 2;
                            this.scene.isWinOrLoss();
                            this.scene.disableActionButtons();
                            this.scene.disableInsuranceButton();
                            this.scene.disableSplitButton();
                        }
                        else
                        {
                            // play normal
                            currentPlayer = 0;
                            player1TurnIndicator.fillColor = 0x8E1600;
                            player2TurnIndicator.fillColor = 0xFFFFFF;
                            player3TurnIndicator.fillColor = 0xFFFFFF;

                            this.scene.enableActionButtons();

                            if (playerCurrency >= player1Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();

                            if (playerCards[0][0] === playerCards[0][1] && playerCurrency >= player1Bet)
                                this.scene.enableSplitButton();
                            else
                                this.scene.disableSplitButton();

                            this.scene.disableInsuranceButton();
                        }
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
                        insuranceRound = 2;
                        if (this.scene.isBlackjack(dealerCards))
                        {
                            // reveal dealer cards
                            // go to iswinorloss
                            dealerCard.visible = false;
                            shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                            this.scene.revealDealerInfo(dealerCards);
                            this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                            cardIndex = cardIndex + dealerCards.length - 2;
                            this.scene.isWinOrLoss();
                            this.scene.disableActionButtons();
                            this.scene.disableInsuranceButton();
                            this.scene.disableSplitButton();
                        }
                        else
                        {
                            // play normal
                            currentPlayer = 0;
                            player1TurnIndicator.fillColor = 0x8E1600;
                            player2TurnIndicator.fillColor = 0xFFFFFF;
                            player3TurnIndicator.fillColor = 0xFFFFFF;

                            this.scene.enableActionButtons();

                            if (playerCurrency >= player1Bet)
                                this.scene.enableDoubleButton();
                            else
                                this.scene.disableDoubleButton();

                            if (playerCards[0][0] === playerCards[0][1] && playerCurrency >= player1Bet)
                                this.scene.enableSplitButton();
                            else
                                this.scene.disableSplitButton();

                            this.scene.disableInsuranceButton();
                        }
                    }
                }
                else if (currentPlayer == 2)
                {
                    insuranceRound = 2;
                    if (this.scene.isBlackjack(dealerCards))
                    {
                        // reveal dealer cards
                        // go to iswinorloss
                        dealerCard.visible = false;
                        shuffledDeck[cardInts[dealerIndex]].setDepth(1);
                        this.scene.revealDealerInfo(dealerCards);
                        this.scene.drawDealerCards(dealerCards, cardIndex, cardInts, dealerCards.length);
                        cardIndex = cardIndex + dealerCards.length - 2;
                        this.scene.isWinOrLoss();
                        this.scene.disableActionButtons();
                        this.scene.disableInsuranceButton();
                        this.scene.disableSplitButton();
                    }
                    else
                    {
                        // play normal
                        currentPlayer = 0;
                        player1TurnIndicator.fillColor = 0x8E1600;
                        player2TurnIndicator.fillColor = 0xFFFFFF;
                        player3TurnIndicator.fillColor = 0xFFFFFF;

                        this.scene.enableActionButtons();

                        if (playerCurrency >= player1Bet)
                            this.scene.enableDoubleButton();
                        else
                            this.scene.disableDoubleButton();

                        if (playerCards[0][0] === playerCards[0][1] && playerCurrency >= player1Bet)
                            this.scene.enableSplitButton();
                        else
                            this.scene.disableSplitButton();

                        this.scene.disableInsuranceButton();
                    }
                }
            }

        });

        // player chooses splits
        playerSplit.on('pointerdown', function(){

            playerSplit.setTexture('clickedButton');
            this.scene.disableSplitButton();
            this.scene.disableInsuranceButton();
            this.scene.disableSurrenderButton();
            // will need to change something with the dictionary since were using new arrays with splits
            // this.scene.baseGameBasicStrategy(currentPlayer, "Split");

            // need to cover situations when: (need to handle these 4 situations for all actions (except insurance and surrender))
            // split = 0 (1 current hand)
            // split = 1 (2 current hands)
            // split = 2 (3 current hands)
            // if split = 3, disable it (split button) before they can even click it

            // double the bet (2 stacks) (move chips)
            // make new thing on scoreboard
            // make new arrays to hold new hand

            // updateinfo for splits
            // [card][hand]
            if (currentPlayer == 0)
            {
                if (numSplits[currentPlayer] == 0)
                {
                    numSplits[currentPlayer] = numSplits[currentPlayer] + 1;
                    // [hand][card]
                    // hand 1
                    player1Hands[0][0] = playerCards[0][0];
                    // hand 2 
                    player1Hands[1][0] = playerCards[0][1];

                    player1Sprites[0][0] = spriteIndex[0][0];
                    player1Sprites[1][0] = spriteIndex[0][1];

                    player1Sprites[0][0].setPosition(cardX[0][0] + splitSpacing, cardY[0][0]);
                    player1Sprites[1][0].setPosition(cardX[0][0] - splitSpacing, cardY[0][0]);

                    player1HandBets[0] = player1Bet;
                    player1HandBets[1] = player1Bet;

                    // deal with scoreboard
                    player1CardDisplay.setText("");

                    player1Hand1Display.setText("Seat" + (currentPlayer + 1) + "Hand1 Cards:\n[" + player1Hands[0][0] + "]");
                    player1Hand2Display.setText("Seat" + (currentPlayer + 1) + "Hand2 Cards:\n[" + player1Hands[1][0] + "]");

                    // deal with chips
                    for (let i = 0; i < player1ChipCount.length; i++)
                    {
                        player1ChipCount[i].destroy(true);
                    }

                    placeholderBet = player1Bet;
                    playerCurrency = playerCurrency - player1Bet;
                    updateInfo();
                    var k = 0;

                    //player1ChipArrays[hand][stackofchips]
        
                    while (placeholderBet > 0)
                    {
                        for (let i = 0; i < player1ChipArrays[0].length; i++)
                        {
                            player1ChipArrays[0][i].destroy(true);
                        }
    
                        numChips = player1ChipArrays[0].length;

                        while (placeholderBet - 500 >= 0)
                        {
                            player1ChipArrays[0][k] = this.scene.add.image(player1ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_500');
                            player1ChipArrays[0][k].scale = chipScaling;
                            player1ChipArrays[0][k].setDepth(100 + k);

                            player1ChipArrays[1][k] = this.scene.add.image(player1ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_500');
                            player1ChipArrays[1][k].scale = chipScaling;
                            player1ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 500;
                            numChips = player1ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 100 >= 0)
                        {
                            player1ChipArrays[0][k] = this.scene.add.image(player1ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_100');
                            player1ChipArrays[0][k].scale = chipScaling;
                            player1ChipArrays[0][k].setDepth(100 + k);

                            player1ChipArrays[1][k] = this.scene.add.image(player1ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_100');
                            player1ChipArrays[1][k].scale = chipScaling;
                            player1ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 100;
                            numChips = player1ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 25 >= 0)
                        {
                            player1ChipArrays[0][k] = this.scene.add.image(player1ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_25');
                            player1ChipArrays[0][k].scale = chipScaling;
                            player1ChipArrays[0][k].setDepth(100 + k);

                            player1ChipArrays[1][k] = this.scene.add.image(player1ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_25');
                            player1ChipArrays[1][k].scale = chipScaling;
                            player1ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 25;
                            numChips = player1ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 10 >= 0)
                        {
                            player1ChipArrays[0][k] = this.scene.add.image(player1ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_10');
                            player1ChipArrays[0][k].scale = chipScaling;
                            player1ChipArrays[0][k].setDepth(100 + k);

                            player1ChipArrays[1][k] = this.scene.add.image(player1ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_10');
                            player1ChipArrays[1][k].scale = chipScaling;
                            player1ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 10;
                            numChips = player1ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 5 >= 0)
                        {
                            player1ChipArrays[0][k] = this.scene.add.image(player1ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_5');
                            player1ChipArrays[0][k].scale = chipScaling;
                            player1ChipArrays[0][k].setDepth(100 + k);

                            player1ChipArrays[1][k] = this.scene.add.image(player1ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_5');
                            player1ChipArrays[1][k].scale = chipScaling;
                            player1ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 5;
                            numChips = player1ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 1 >= 0)
                        {
                            player1ChipArrays[0][k] = this.scene.add.image(player1ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_1');
                            player1ChipArrays[0][k].scale = chipScaling;
                            player1ChipArrays[0][k].setDepth(100 + k);

                            player1ChipArrays[1][k] = this.scene.add.image(player1ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_1');
                            player1ChipArrays[1][k].scale = chipScaling;
                            player1ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 1;
                            numChips = player1ChipArrays[0].length;
                            k++;
                        }
                    }

                    // deal cards to new hands
                    currentHand = 1;
                    player1Hands[0][1] = (this.scene.getValue(cardInts, cardIndex, this));
                    player1Sprites[0][1] = shuffledDeck[cardInts[cardIndex]];
                    this.scene.hitSplitCard(cardInts[cardIndex], shuffledDeck, player1Hands[0].length-1, currentPlayer, 1, this);

                    cardIndex = cardIndex + 1;
                    updateInfo(1, 0);
                    currentHand = 2;

                    player1Hands[1][1] = (this.scene.getValue(cardInts, cardIndex, this));
                    player1Sprites[1][1] = shuffledDeck[cardInts[cardIndex]];
                    this.scene.hitSplitCard(cardInts[cardIndex], shuffledDeck, player1Hands[1].length-1, currentPlayer, 2, this);
                    
                    cardIndex = cardIndex + 1;
                    updateInfo(1, 1);

                    // place hand indicator on first hand
                    handIndicator.setPosition(cardX[0][0] + splitSpacing, cardY[0][0] + handIndicatorSpacing);
                    handIndicator.setVisible(true);
                    currentHand = 1;

                    if (playerCurrency >= player1Bet)
                        this.scene.enableDoubleButton();
                    else
                        this.scene.disableDoubleButton();
                }
            }
            else if (currentPlayer == 1)
            {
  
                if (numSplits[currentPlayer] == 0)
                {
                    numSplits[currentPlayer] = numSplits[currentPlayer] + 1;

                    // [hand][card]
                    player2Hands[0][0] = playerCards[1][0];
                    player2Hands[1][0] = playerCards[1][1];

                    player2Sprites[0][0] = spriteIndex[1][0];
                    player2Sprites[1][0] = spriteIndex[1][1];

                    player2Sprites[0][0].setPosition(cardX[0][1] + splitSpacing, cardY[0][1]);
                    player2Sprites[1][0].setPosition(cardX[0][1] - splitSpacing, cardY[0][1]);

                    player2HandBets[0] = player2Bet;
                    player2HandBets[1] = player2Bet;

                    // deal with scoreboard
                    player2CardDisplay.setText("");

                    player2Hand1Display.setText("Seat" + (currentPlayer + 1) + "Hand1 Cards:\n[" + player2Hands[0][0] + "]");
                    player2Hand2Display.setText("Seat" + (currentPlayer + 1) + "Hand2 Cards:\n[" + player2Hands[1][0] + "]");

                    // deal with chips
                    for (let i = 0; i < player2ChipCount.length; i++)
                    {
                        player2ChipCount[i].destroy(true);
                    }

                    placeholderBet = player2Bet;
                    playerCurrency = playerCurrency - player2Bet;
                    updateInfo();
                    var k = 0;

                    //player1ChipArrays[hand][stackofchips]
        
                    while (placeholderBet > 0)
                    {
                        for (let i = 0; i < player2ChipArrays[0].length; i++)
                        {
                            player2ChipArrays[0][i].destroy(true);
                        }
    
                        numChips = player2ChipArrays[0].length;

                        while (placeholderBet - 500 >= 0)
                        {
                            player2ChipArrays[0][k] = this.scene.add.image(player2ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_500');
                            player2ChipArrays[0][k].scale = chipScaling;
                            player2ChipArrays[0][k].setDepth(100 + k);

                            player2ChipArrays[1][k] = this.scene.add.image(player2ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_500');
                            player2ChipArrays[1][k].scale = chipScaling;
                            player2ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 500;
                            numChips = player2ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 100 >= 0)
                        {
                            player2ChipArrays[0][k] = this.scene.add.image(player2ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_100');
                            player2ChipArrays[0][k].scale = chipScaling;
                            player2ChipArrays[0][k].setDepth(100 + k);

                            player2ChipArrays[1][k] = this.scene.add.image(player2ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_100');
                            player2ChipArrays[1][k].scale = chipScaling;
                            player2ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 100;
                            numChips = player2ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 25 >= 0)
                        {
                            player2ChipArrays[0][k] = this.scene.add.image(player2ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_25');
                            player2ChipArrays[0][k].scale = chipScaling;
                            player2ChipArrays[0][k].setDepth(100 + k);

                            player2ChipArrays[1][k] = this.scene.add.image(player2ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_25');
                            player2ChipArrays[1][k].scale = chipScaling;
                            player2ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 25;
                            numChips = player2ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 10 >= 0)
                        {
                            player2ChipArrays[0][k] = this.scene.add.image(player2ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_10');
                            player2ChipArrays[0][k].scale = chipScaling;
                            player2ChipArrays[0][k].setDepth(100 + k);

                            player2ChipArrays[1][k] = this.scene.add.image(player2ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_10');
                            player2ChipArrays[1][k].scale = chipScaling;
                            player2ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 10;
                            numChips = player2ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 5 >= 0)
                        {
                            player2ChipArrays[0][k] = this.scene.add.image(player2ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_5');
                            player2ChipArrays[0][k].scale = chipScaling;
                            player2ChipArrays[0][k].setDepth(100 + k);

                            player2ChipArrays[1][k] = this.scene.add.image(player2ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_5');
                            player2ChipArrays[1][k].scale = chipScaling;
                            player2ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 5;
                            numChips = player2ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 1 >= 0)
                        {
                            player2ChipArrays[0][k] = this.scene.add.image(player2ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_1');
                            player2ChipArrays[0][k].scale = chipScaling;
                            player2ChipArrays[0][k].setDepth(100 + k);

                            player2ChipArrays[1][k] = this.scene.add.image(player2ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_1');
                            player2ChipArrays[1][k].scale = chipScaling;
                            player2ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 1;
                            numChips = player2ChipArrays[0].length;
                            k++;
                        }
                    }

                    // deal cards to new hands
                    currentHand = 1;
                    player2Hands[0][1] = (this.scene.getValue(cardInts, cardIndex, this));
                    player2Sprites[0][1] = shuffledDeck[cardInts[cardIndex]];
                    this.scene.hitSplitCard(cardInts[cardIndex], shuffledDeck, player2Hands[0].length-1, currentPlayer, 1, this);

                    cardIndex = cardIndex + 1;
                    updateInfo(1, 0);
                    currentHand = 2;

                    player2Hands[1][1] = (this.scene.getValue(cardInts, cardIndex, this));
                    player2Sprites[1][1] = shuffledDeck[cardInts[cardIndex]];
                    this.scene.hitSplitCard(cardInts[cardIndex], shuffledDeck, player2Hands[1].length-1, currentPlayer, 2, this);
                    
                    cardIndex = cardIndex + 1;
                    updateInfo(1, 1);

                    // place hand indicator on first hand
                    handIndicator.setPosition(cardX[0][1] + splitSpacing, cardY[0][1] + handIndicatorSpacing);
                    handIndicator.setVisible(true);
                    currentHand = 1;

                    if (playerCurrency >= player2Bet)
                        this.scene.enableDoubleButton();
                    else
                        this.scene.disableDoubleButton();
                }
            }
            else if (currentPlayer == 2)
            {

                if (numSplits[currentPlayer] == 0)
                {
                    numSplits[currentPlayer] = numSplits[currentPlayer] + 1;

                    // [hand][card]
                    player3Hands[0][0] = playerCards[2][0];
                    player3Hands[1][0] = playerCards[2][1];

                    player3Sprites[0][0] = spriteIndex[2][0];
                    player3Sprites[1][0] = spriteIndex[2][1];

                    player3Sprites[0][0].setPosition(cardX[0][2] + splitSpacing, cardY[0][2]);
                    player3Sprites[1][0].setPosition(cardX[0][2] - splitSpacing, cardY[0][2]);

                    player3HandBets[0] = player3Bet;
                    player3HandBets[1] = player3Bet;

                    // deal with scoreboard
                    player3CardDisplay.setText("");

                    player3Hand1Display.setText("Seat" + (currentPlayer + 1) + "Hand1 Cards:\n[" + player3Hands[0][0] + "]");
                    player3Hand2Display.setText("Seat" + (currentPlayer + 1) + "Hand2 Cards:\n[" + player3Hands[1][0] + "]");

                    // deal with chips
                    for (let i = 0; i < player3ChipCount.length; i++)
                    {
                        player3ChipCount[i].destroy(true);
                    }

                    placeholderBet = player3Bet;
                    playerCurrency = playerCurrency - player3Bet;
                    updateInfo();
                    var k = 0;

                    //player1ChipArrays[hand][stackofchips]
        
                    while (placeholderBet > 0)
                    {
                        for (let i = 0; i < player3ChipArrays[0].length; i++)
                        {
                            player3ChipArrays[0][i].destroy(true);
                        }
    
                        numChips = player3ChipArrays[0].length;

                        while (placeholderBet - 500 >= 0)
                        {
                            player3ChipArrays[0][k] = this.scene.add.image(player3ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_500');
                            player3ChipArrays[0][k].scale = chipScaling;
                            player3ChipArrays[0][k].setDepth(100 + k);

                            player3ChipArrays[1][k] = this.scene.add.image(player3ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_500');
                            player3ChipArrays[1][k].scale = chipScaling;
                            player3ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 500;
                            numChips = player3ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 100 >= 0)
                        {
                            player3ChipArrays[0][k] = this.scene.add.image(player3ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_100');
                            player3ChipArrays[0][k].scale = chipScaling;
                            player3ChipArrays[0][k].setDepth(100 + k);

                            player3ChipArrays[1][k] = this.scene.add.image(player3ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_100');
                            player3ChipArrays[1][k].scale = chipScaling;
                            player3ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 100;
                            numChips = player3ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 25 >= 0)
                        {
                            player3ChipArrays[0][k] = this.scene.add.image(player3ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_25');
                            player3ChipArrays[0][k].scale = chipScaling;
                            player3ChipArrays[0][k].setDepth(100 + k);

                            player3ChipArrays[1][k] = this.scene.add.image(player3ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_25');
                            player3ChipArrays[1][k].scale = chipScaling;
                            player3ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 25;
                            numChips = player3ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 10 >= 0)
                        {
                            player3ChipArrays[0][k] = this.scene.add.image(player3ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_10');
                            player3ChipArrays[0][k].scale = chipScaling;
                            player3ChipArrays[0][k].setDepth(100 + k);

                            player3ChipArrays[1][k] = this.scene.add.image(player3ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_10');
                            player3ChipArrays[1][k].scale = chipScaling;
                            player3ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 10;
                            numChips = player3ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 5 >= 0)
                        {
                            player3ChipArrays[0][k] = this.scene.add.image(player3ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_5');
                            player3ChipArrays[0][k].scale = chipScaling;
                            player3ChipArrays[0][k].setDepth(100 + k);

                            player3ChipArrays[1][k] = this.scene.add.image(player3ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_5');
                            player3ChipArrays[1][k].scale = chipScaling;
                            player3ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 5;
                            numChips = player3ChipArrays[0].length;
                            k++;
                        }
    
                        while (placeholderBet - 1 >= 0)
                        {
                            player3ChipArrays[0][k] = this.scene.add.image(player3ChipXCoords + splitChipSpacing, playerChipYCoords - (k * 5), 'chip_1');
                            player3ChipArrays[0][k].scale = chipScaling;
                            player3ChipArrays[0][k].setDepth(100 + k);

                            player3ChipArrays[1][k] = this.scene.add.image(player3ChipXCoords - splitChipSpacing, playerChipYCoords - (k * 5), 'chip_1');
                            player3ChipArrays[1][k].scale = chipScaling;
                            player3ChipArrays[1][k].setDepth(100 + k);

                            placeholderBet = placeholderBet - 1;
                            numChips = player3ChipArrays[0].length;
                            k++;
                        }
                    }

                    // deal cards to new hands
                    currentHand = 1;
                    player3Hands[0][1] = (this.scene.getValue(cardInts, cardIndex, this));
                    player3Sprites[0][1] = shuffledDeck[cardInts[cardIndex]];
                    this.scene.hitSplitCard(cardInts[cardIndex], shuffledDeck, player3Hands[0].length-1, currentPlayer, 1, this);

                    cardIndex = cardIndex + 1;
                    updateInfo(1, 0);
                    currentHand = 2;

                    player3Hands[1][1] = (this.scene.getValue(cardInts, cardIndex, this));
                    player3Sprites[1][1] = shuffledDeck[cardInts[cardIndex]];
                    this.scene.hitSplitCard(cardInts[cardIndex], shuffledDeck, player3Hands[1].length-1, currentPlayer, 2, this);
                    
                    cardIndex = cardIndex + 1;
                    updateInfo(1, 1);

                    // place hand indicator on first hand
                    handIndicator.setPosition(cardX[0][2] + splitSpacing, cardY[0][2] + handIndicatorSpacing);
                    handIndicator.setVisible(true);
                    currentHand = 1;

                    if (playerCurrency >= player3Bet)
                        this.scene.enableDoubleButton();
                    else
                        this.scene.disableDoubleButton();
                }

            }

        });

        // player wants to start a new round
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
            // this.scene.enableBettingButtons();
        });

        // player wants to open the menu
        menuButton.on('pointerdown', function(){
            menuButton.setTexture('MenuClicked');

            if (menuScreen.visible == true)
            {

                this.scene.moveButtonsBack();

                circley1.visible = false;
                circley2.visible = false;
                circley3.visible = false;
                menuScreen.visible = false;
                settingsHeader.visible = false;
                settingsDisclaimer.visible = false;
                applySettingsButton.visible = false;
                applySettingsText.visible = false;
                this.scene.disableSettingsButtons();

                numPlayersHeader.visible = false;
                numPlayersMinusButton.visible = false;
                numPlayersPlusButton.visible = false;
                numPlayersDisplay.visible = false;
                numPlayersText.visible = false;

                numDecksHeader.visible = false;
                numDecksMinusButton.visible = false;
                numDecksPlusButton.visible = false;
                numDecksDisplay.visible = false;
                numDecksText.visible = false;

                deckPenHeader.visible = false;
                deckPenMinusButton.visible = false;
                deckPenPlusButton.visible = false;
                deckPenDisplay.visible = false;
                deckPenText.visible = false;

                minBetHeader.visible = false;
                minBetMinusButton.visible = false;
                minBetPlusButton.visible = false;
                minBetDisplay.visible = false;
                minBetText.visible = false;

                maxBetHeader.visible = false;
                maxBetMinusButton.visible = false;
                maxBetPlusButton.visible = false;
                maxBetDisplay.visible = false;
                maxBetText.visible = false;

                countSpoilerHeader.visible = false;
                countSpoilerMinusButton.visible = false;
                countSpoilerPlusButton.visible = false;
                countSpoilerDisplay.visible = false;
                countSpoilerText.visible = false;

                peekingOptionHeader.visible = false;
                peekingOptionMinusButton.visible = false;
                peekingOptionPlusButton.visible = false;
                peekingOptionDisplay.visible = false;
                peekingOptionText.visible = false;

                doubleOptionHeader.visible = false;
                doubleOptionMinusButton.visible = false;
                doubleOptionPlusButton.visible = false;
                doubleOptionDisplay.visible = false;
                doubleOptionText.visible = false;

                hitSplitAcesHeader.visible = false;
                hitSplitAcesMinusButton.visible = false;
                hitSplitAcesPlusButton.visible = false;
                hitSplitAcesDisplay.visible = false;
                hitSplitAcesText.visible = false;

                doubleAfterSplitHeader.visible = false;
                doubleAfterSplitMinusButton.visible = false;
                doubleAfterSplitPlusButton.visible = false;
                doubleAfterSplitDisplay.visible = false;
                doubleAfterSplitText.visible = false;

                hitStandSoft17Header.visible = false;
                hitStandSoft17MinusButton.visible = false;
                hitStandSoft17PlusButton.visible = false;
                hitStandSoft17Display.visible = false;
                hitStandSoft17Text.visible = false;

                blackjackPayoutHeader.visible = false;
                blackjackPayoutMinusButton.visible = false;
                blackjackPayoutPlusButton.visible = false;
                blackjackPayoutDisplay.visible = false;
                blackjackPayoutText.visible = false;
            }
            else if (menuScreen.visible == false)
            {

                this.scene.moveButtonsAway();

                circley1.visible = true;
                circley2.visible = true;
                circley3.visible = true;
                menuScreen.visible = true;

                settingsHeader.visible = true;
                settingsDisclaimer.visible = true;
                applySettingsButton.visible = true;
                applySettingsText.visible = true;
                this.scene.enableSettingsButtons();

                numPlayersHeader.visible = true;
                numPlayersMinusButton.visible = true;
                numPlayersPlusButton.visible = true;
                numPlayersDisplay.visible = true;
                numPlayersText.visible = true;

                numDecksHeader.visible = true;
                numDecksMinusButton.visible = true;
                numDecksPlusButton.visible = true;
                numDecksDisplay.visible = true;
                numDecksText.visible = true;

                deckPenHeader.visible = true;
                deckPenMinusButton.visible = true;
                deckPenPlusButton.visible = true;
                deckPenDisplay.visible = true;
                deckPenText.visible = true;

                minBetHeader.visible = true;
                minBetMinusButton.visible = true;
                minBetPlusButton.visible = true;
                minBetDisplay.visible = true;
                minBetText.visible = true;

                maxBetHeader.visible = true;
                maxBetMinusButton.visible = true;
                maxBetPlusButton.visible = true;
                maxBetDisplay.visible = true;
                maxBetText.visible = true;

                countSpoilerHeader.visible = true;
                countSpoilerMinusButton.visible = true;
                countSpoilerPlusButton.visible = true;
                countSpoilerDisplay.visible = true;
                countSpoilerText.visible = true;

                peekingOptionHeader.visible = true;
                peekingOptionMinusButton.visible = true;
                peekingOptionPlusButton.visible = true;
                peekingOptionDisplay.visible = true;
                peekingOptionText.visible = true;

                doubleOptionHeader.visible = true;
                doubleOptionMinusButton.visible = true;
                doubleOptionPlusButton.visible = true;
                doubleOptionDisplay.visible = true;
                doubleOptionText.visible = true;   

                hitSplitAcesHeader.visible = true;
                hitSplitAcesMinusButton.visible = true;
                hitSplitAcesPlusButton.visible = true;
                hitSplitAcesDisplay.visible = true;
                hitSplitAcesText.visible = true;

                doubleAfterSplitHeader.visible = true;
                doubleAfterSplitMinusButton.visible = true;
                doubleAfterSplitPlusButton.visible = true;
                doubleAfterSplitDisplay.visible = true;
                doubleAfterSplitText.visible = true;

                hitStandSoft17Header.visible = true;
                hitStandSoft17MinusButton.visible = true;
                hitStandSoft17PlusButton.visible = true;
                hitStandSoft17Display.visible = true;
                hitStandSoft17Text.visible = true;

                blackjackPayoutHeader.visible = true;
                blackjackPayoutMinusButton.visible = true;
                blackjackPayoutPlusButton.visible = true;
                blackjackPayoutDisplay.visible = true;
                blackjackPayoutText.visible = true;
            }

            // do this when changing numDecks or deck pen
            // cardIndex = 0;
            // // shuffledDeck = this.scene.initializeDeck(numDecks);
            // // cardInts = this.scene.shuffleInts(numDecks);
            // this.scene.initializeDeck(numDecks);
            // this.scene.shuffleInts(numDecks);
            // runningCount = 0;
            // trueCount = 0;
            // runningCountScoreBoard.setText('Running Count: 0');
            // trueCountScoreBoard.setText('True Count: 0');







        });

        numPlayersMinusButton.on('pointerdown', function(){
            if (settingsNumPlayers > 1)
            {
                numPlayersMinusButton.setTexture('minusButtonClicked');
                settingsNumPlayers = settingsNumPlayers - 1;
                numPlayersText.setText(settingsNumPlayers);
            }

            if (settingsNumPlayers > 1)
            {
                numPlayersMinusButton.setInteractive({ useHandCursor: true });
                numPlayersMinusButton.setTexture('minusButtonNormal');

                numPlayersMinusButton.on('pointerover', function(){
                    numPlayersMinusButton.setTexture('minusButtonHovered');
                })

                numPlayersMinusButton.on('pointerout', function(){
                    numPlayersMinusButton.setTexture('minusButtonNormal');
                })

                numPlayersMinusButton.on('pointerup', function(){
                    numPlayersMinusButton.setTexture('minusButtonHovered');
                })
            }
            else
            {
                numPlayersMinusButton.disableInteractive();
                numPlayersMinusButton.setTexture('minusButtonLocked');

                numPlayersMinusButton.on('pointerover', function(){
                    numPlayersMinusButton.setTexture('minusButtonLocked');
                })

                numPlayersMinusButton.on('pointerout', function(){
                    numPlayersMinusButton.setTexture('minusButtonLocked');
                })

                numPlayersMinusButton.on('pointerup', function(){
                    numPlayersMinusButton.setTexture('minusButtonLocked');
                })
            }

            if (settingsNumPlayers < 3)
            {
                numPlayersPlusButton.setInteractive({ useHandCursor: true });
                numPlayersPlusButton.setTexture('plusButtonNormal');

                numPlayersPlusButton.on('pointerover', function(){
                    numPlayersPlusButton.setTexture('plusButtonHovered');
                })

                numPlayersPlusButton.on('pointerout', function(){
                    numPlayersPlusButton.setTexture('plusButtonNormal');
                })

                numPlayersPlusButton.on('pointerup', function(){
                    numPlayersPlusButton.setTexture('plusButtonHovered');
                })
            }
            else
            {
                numPlayersPlusButton.disableInteractive();
                numPlayersPlusButton.setTexture('plusButtonLocked');

                numPlayersPlusButton.on('pointerover', function(){
                    numPlayersPlusButton.setTexture('plusButtonLocked');
                })

                numPlayersPlusButton.on('pointerout', function(){
                    numPlayersPlusButton.setTexture('plusButtonLocked');
                })

                numPlayersPlusButton.on('pointerup', function(){
                    numPlayersPlusButton.setTexture('plusButtonLocked');
                })
            }
        });

        numPlayersPlusButton.on('pointerdown', function(){
            if (settingsNumPlayers < 3)
            {
                numPlayersPlusButton.setTexture('plusButtonClicked');
                settingsNumPlayers = settingsNumPlayers + 1;
                numPlayersText.setText(settingsNumPlayers);
            }

            if (settingsNumPlayers > 1)
            {
                numPlayersMinusButton.setInteractive({ useHandCursor: true });
                numPlayersMinusButton.setTexture('minusButtonNormal');

                numPlayersMinusButton.on('pointerover', function(){
                    numPlayersMinusButton.setTexture('minusButtonHovered');
                })

                numPlayersMinusButton.on('pointerout', function(){
                    numPlayersMinusButton.setTexture('minusButtonNormal');
                })

                numPlayersMinusButton.on('pointerup', function(){
                    numPlayersMinusButton.setTexture('minusButtonHovered');
                })
            }
            else
            {
                numPlayersMinusButton.disableInteractive();
                numPlayersMinusButton.setTexture('minusButtonLocked');

                numPlayersMinusButton.on('pointerover', function(){
                    numPlayersMinusButton.setTexture('minusButtonLocked');
                })

                numPlayersMinusButton.on('pointerout', function(){
                    numPlayersMinusButton.setTexture('minusButtonLocked');
                })

                numPlayersMinusButton.on('pointerup', function(){
                    numPlayersMinusButton.setTexture('minusButtonLocked');
                })
            }

            if (settingsNumPlayers < 3)
            {
                numPlayersPlusButton.setInteractive({ useHandCursor: true });
                numPlayersPlusButton.setTexture('plusButtonNormal');

                numPlayersPlusButton.on('pointerover', function(){
                    numPlayersPlusButton.setTexture('plusButtonHovered');
                })

                numPlayersPlusButton.on('pointerout', function(){
                    numPlayersPlusButton.setTexture('plusButtonNormal');
                })

                numPlayersPlusButton.on('pointerup', function(){
                    numPlayersPlusButton.setTexture('plusButtonHovered');
                })
            }
            else
            {
                numPlayersPlusButton.disableInteractive();
                numPlayersPlusButton.setTexture('plusButtonLocked');

                numPlayersPlusButton.on('pointerover', function(){
                    numPlayersPlusButton.setTexture('plusButtonLocked');
                })

                numPlayersPlusButton.on('pointerout', function(){
                    numPlayersPlusButton.setTexture('plusButtonLocked');
                })

                numPlayersPlusButton.on('pointerup', function(){
                    numPlayersPlusButton.setTexture('plusButtonLocked');
                })
            }

        });

        numDecksMinusButton.on('pointerdown', function(){
            if (settingsNumDecks > 1)
            {
                numDecksMinusButton.setTexture('minusButtonClicked');
                settingsNumDecks = settingsNumDecks - 1;
                numDecksText.setText(settingsNumDecks);
            }

            if (settingsNumDecks > 1)
            {
                numDecksMinusButton.setInteractive({ useHandCursor: true });
                numDecksMinusButton.setTexture('minusButtonNormal');

                numDecksMinusButton.on('pointerover', function(){
                    numDecksMinusButton.setTexture('minusButtonHovered');
                })

                numDecksMinusButton.on('pointerout', function(){
                    numDecksMinusButton.setTexture('minusButtonNormal');
                })

                numDecksMinusButton.on('pointerup', function(){
                    numDecksMinusButton.setTexture('minusButtonHovered');
                })
            }
            else
            {
                numDecksMinusButton.disableInteractive();
                numDecksMinusButton.setTexture('minusButtonLocked');

                numDecksMinusButton.on('pointerover', function(){
                    numDecksMinusButton.setTexture('minusButtonLocked');
                })

                numDecksMinusButton.on('pointerout', function(){
                    numDecksMinusButton.setTexture('minusButtonLocked');
                })

                numDecksMinusButton.on('pointerup', function(){
                    numDecksMinusButton.setTexture('minusButtonLocked');
                })
            }

            if (settingsNumDecks < 8)
            {
                numDecksPlusButton.setInteractive({ useHandCursor: true });
                numDecksPlusButton.setTexture('plusButtonNormal');

                numDecksPlusButton.on('pointerover', function(){
                    numDecksPlusButton.setTexture('plusButtonHovered');
                })

                numDecksPlusButton.on('pointerout', function(){
                    numDecksPlusButton.setTexture('plusButtonNormal');
                })

                numDecksPlusButton.on('pointerup', function(){
                    numDecksPlusButton.setTexture('plusButtonHovered');
                })
            }
            else
            {
                numDecksPlusButton.disableInteractive();
                numDecksPlusButton.setTexture('plusButtonLocked');

                numDecksPlusButton.on('pointerover', function(){
                    numDecksPlusButton.setTexture('plusButtonLocked');
                })

                numDecksPlusButton.on('pointerout', function(){
                    numDecksPlusButton.setTexture('plusButtonLocked');
                })

                numDecksPlusButton.on('pointerup', function(){
                    numDecksPlusButton.setTexture('plusButtonLocked');
                })
            }
        });

        numDecksPlusButton.on('pointerdown', function(){
            if (settingsNumDecks < 8)
            {
                numDecksPlusButton.setTexture('plusButtonClicked');
                settingsNumDecks = settingsNumDecks + 1;
                numDecksText.setText(settingsNumDecks);
            }

            if (settingsNumDecks > 1)
            {
                numDecksMinusButton.setInteractive({ useHandCursor: true });
                numDecksMinusButton.setTexture('minusButtonNormal');

                numDecksMinusButton.on('pointerover', function(){
                    numDecksMinusButton.setTexture('minusButtonHovered');
                })

                numDecksMinusButton.on('pointerout', function(){
                    numDecksMinusButton.setTexture('minusButtonNormal');
                })

                numDecksMinusButton.on('pointerup', function(){
                    numDecksMinusButton.setTexture('minusButtonHovered');
                })
            }
            else
            {
                numDecksMinusButton.disableInteractive();
                numDecksMinusButton.setTexture('minusButtonLocked');

                numDecksMinusButton.on('pointerover', function(){
                    numDecksMinusButton.setTexture('minusButtonLocked');
                })

                numDecksMinusButton.on('pointerout', function(){
                    numDecksMinusButton.setTexture('minusButtonLocked');
                })

                numDecksMinusButton.on('pointerup', function(){
                    numDecksMinusButton.setTexture('minusButtonLocked');
                })
            }

            if (settingsNumDecks < 8)
            {
                numDecksPlusButton.setInteractive({ useHandCursor: true });
                numDecksPlusButton.setTexture('plusButtonNormal');

                numDecksPlusButton.on('pointerover', function(){
                    numDecksPlusButton.setTexture('plusButtonHovered');
                })

                numDecksPlusButton.on('pointerout', function(){
                    numDecksPlusButton.setTexture('plusButtonNormal');
                })

                numDecksPlusButton.on('pointerup', function(){
                    numDecksPlusButton.setTexture('plusButtonHovered');
                })
            }
            else
            {
                numDecksPlusButton.disableInteractive();
                numDecksPlusButton.setTexture('plusButtonLocked');

                numDecksPlusButton.on('pointerover', function(){
                    numDecksPlusButton.setTexture('plusButtonLocked');
                })

                numDecksPlusButton.on('pointerout', function(){
                    numDecksPlusButton.setTexture('plusButtonLocked');
                })

                numDecksPlusButton.on('pointerup', function(){
                    numDecksPlusButton.setTexture('plusButtonLocked');
                })
            }
        });

        deckPenMinusButton.on('pointerdown', function(){
            if (settingsDeckPen > .25)
            {
                deckPenMinusButton.setTexture('minusButtonClicked');

                if (settingsDeckPen == 1)
                {
                    settingsDeckPen = .75;
                    deckPenText.setPosition(440, 440);
                }
                else if (settingsDeckPen == .75)
                {
                    settingsDeckPen = .66;
                    deckPenText.setPosition(440, 440);
                }
                else if (settingsDeckPen == .66)
                {
                    settingsDeckPen = .5;
                    deckPenText.setPosition(450, 440);
                }
                else if (settingsDeckPen == .5)
                {
                    settingsDeckPen = .33;
                    deckPenText.setPosition(440, 440);
                }
                else if (settingsDeckPen == .33)
                {
                    settingsDeckPen = .25;
                    deckPenText.setPosition(440, 440);
                }

                deckPenText.setText(settingsDeckPen);
            }

            if (settingsDeckPen > .25)
            {
                deckPenMinusButton.setInteractive({ useHandCursor: true });
                deckPenMinusButton.setTexture('minusButtonNormal');

                deckPenMinusButton.on('pointerover', function(){
                    deckPenMinusButton.setTexture('minusButtonHovered');
                })

                deckPenMinusButton.on('pointerout', function(){
                    deckPenMinusButton.setTexture('minusButtonNormal');
                })

                deckPenMinusButton.on('pointerup', function(){
                    deckPenMinusButton.setTexture('minusButtonHovered');
                })
            }
            else
            {
                deckPenMinusButton.disableInteractive();
                deckPenMinusButton.setTexture('minusButtonLocked');

                deckPenMinusButton.on('pointerover', function(){
                    deckPenMinusButton.setTexture('minusButtonLocked');
                })

                deckPenMinusButton.on('pointerout', function(){
                    deckPenMinusButton.setTexture('minusButtonLocked');
                })

                deckPenMinusButton.on('pointerup', function(){
                    deckPenMinusButton.setTexture('minusButtonLocked');
                })
            }

            if (settingsDeckPen < 1)
            {
                deckPenPlusButton.setInteractive({ useHandCursor: true });
                deckPenPlusButton.setTexture('plusButtonNormal');

                deckPenPlusButton.on('pointerover', function(){
                    deckPenPlusButton.setTexture('plusButtonHovered');
                })

                deckPenPlusButton.on('pointerout', function(){
                    deckPenPlusButton.setTexture('plusButtonNormal');
                })

                deckPenPlusButton.on('pointerup', function(){
                    deckPenPlusButton.setTexture('plusButtonHovered');
                })
            }
            else
            {
                deckPenPlusButton.disableInteractive();
                deckPenPlusButton.setTexture('plusButtonLocked');

                deckPenPlusButton.on('pointerover', function(){
                    deckPenPlusButton.setTexture('plusButtonLocked');
                })

                deckPenPlusButton.on('pointerout', function(){
                    deckPenPlusButton.setTexture('plusButtonLocked');
                })

                deckPenPlusButton.on('pointerup', function(){
                    deckPenPlusButton.setTexture('plusButtonLocked');
                })
            }

        });

        deckPenPlusButton.on('pointerdown', function(){
            if (settingsDeckPen < 1)
            {
                deckPenPlusButton.setTexture('plusButtonClicked');
                if (settingsDeckPen == .25)
                {
                    settingsDeckPen = .33;
                    deckPenText.setPosition(440, 440);
                }
                else if (settingsDeckPen == .33)
                {
                    settingsDeckPen = .5;
                    deckPenText.setPosition(450, 440);
                }
                else if (settingsDeckPen == .5)
                {
                    settingsDeckPen = .66;
                    deckPenText.setPosition(440, 440);
                }
                else if (settingsDeckPen == .66)
                {
                    settingsDeckPen = .75;
                    deckPenText.setPosition(440, 440);
                }
                else if (settingsDeckPen == .75)
                {
                    settingsDeckPen = 1.0;
                    deckPenText.setPosition(468, 440);
                }

                deckPenText.setText(settingsDeckPen);
            }

            if (settingsDeckPen > .25)
            {
                deckPenMinusButton.setInteractive({ useHandCursor: true });
                deckPenMinusButton.setTexture('minusButtonNormal');

                deckPenMinusButton.on('pointerover', function(){
                    deckPenMinusButton.setTexture('minusButtonHovered');
                })

                deckPenMinusButton.on('pointerout', function(){
                    deckPenMinusButton.setTexture('minusButtonNormal');
                })

                deckPenMinusButton.on('pointerup', function(){
                    deckPenMinusButton.setTexture('minusButtonHovered');
                })
            }
            else
            {
                deckPenMinusButton.disableInteractive();
                deckPenMinusButton.setTexture('minusButtonLocked');

                deckPenMinusButton.on('pointerover', function(){
                    deckPenMinusButton.setTexture('minusButtonLocked');
                })

                deckPenMinusButton.on('pointerout', function(){
                    deckPenMinusButton.setTexture('minusButtonLocked');
                })

                deckPenMinusButton.on('pointerup', function(){
                    deckPenMinusButton.setTexture('minusButtonLocked');
                })
            }

            if (settingsDeckPen < 1)
            {
                deckPenPlusButton.setInteractive({ useHandCursor: true });
                deckPenPlusButton.setTexture('plusButtonNormal');

                deckPenPlusButton.on('pointerover', function(){
                    deckPenPlusButton.setTexture('plusButtonHovered');
                })

                deckPenPlusButton.on('pointerout', function(){
                    deckPenPlusButton.setTexture('plusButtonNormal');
                })

                deckPenPlusButton.on('pointerup', function(){
                    deckPenPlusButton.setTexture('plusButtonHovered');
                })
            }
            else
            {
                deckPenPlusButton.disableInteractive();
                deckPenPlusButton.setTexture('plusButtonLocked');

                deckPenPlusButton.on('pointerover', function(){
                    deckPenPlusButton.setTexture('plusButtonLocked');
                })

                deckPenPlusButton.on('pointerout', function(){
                    deckPenPlusButton.setTexture('plusButtonLocked');
                })

                deckPenPlusButton.on('pointerup', function(){
                    deckPenPlusButton.setTexture('plusButtonLocked');
                })
            }
        });

        minBetMinusButton.on('pointerdown', function(){

            if (settingsMinBet > 5)
            {
                minBetMinusButton.setTexture('minusButtonClicked');
                settingsMinBet = settingsMinBet - 5;

                if (settingsMinBet > 9 && settingsMinBet < 100)
                {
                    minBetText.setPosition(460, 540);
                }
                else if (settingsMinBet == 100)
                {
                    minBetText.setPosition(450, 540);
                }
                else if (settingsMinBet < 10 && settingsMinBet > 0)
                {
                    minBetText.setPosition(466, 540);
                }

                minBetText.setText(settingsMinBet);
            }

            if (settingsMinBet > 5)
            {
                minBetMinusButton.setInteractive({ useHandCursor: true });
                minBetMinusButton.setTexture('minusButtonNormal');

                minBetMinusButton.on('pointerover', function(){
                    minBetMinusButton.setTexture('minusButtonHovered');
                })

                minBetMinusButton.on('pointerout', function(){
                    minBetMinusButton.setTexture('minusButtonNormal');
                })

                minBetMinusButton.on('pointerup', function(){
                    minBetMinusButton.setTexture('minusButtonHovered');
                })
            }
            else
            {
                minBetMinusButton.disableInteractive();
                minBetMinusButton.setTexture('minusButtonLocked');

                minBetMinusButton.on('pointerover', function(){
                    minBetMinusButton.setTexture('minusButtonLocked');
                })

                minBetMinusButton.on('pointerout', function(){
                    minBetMinusButton.setTexture('minusButtonLocked');
                })

                minBetMinusButton.on('pointerup', function(){
                    minBetMinusButton.setTexture('minusButtonLocked');
                })
            }
            
            if (settingsMinBet < 100)
            {
                minBetPlusButton.setInteractive({ useHandCursor: true });
                minBetPlusButton.setTexture('plusButtonNormal');

                minBetPlusButton.on('pointerover', function(){
                    minBetPlusButton.setTexture('plusButtonHovered');
                })

                minBetPlusButton.on('pointerout', function(){
                    minBetPlusButton.setTexture('plusButtonNormal');
                })

                minBetPlusButton.on('pointerup', function(){
                    minBetPlusButton.setTexture('plusButtonHovered');
                })
            }
            else
            {
                minBetPlusButton.disableInteractive();
                minBetPlusButton.setTexture('plusButtonLocked');

                minBetPlusButton.on('pointerover', function(){
                    minBetPlusButton.setTexture('plusButtonLocked');
                })

                minBetPlusButton.on('pointerout', function(){
                    minBetPlusButton.setTexture('plusButtonLocked');
                })

                minBetPlusButton.on('pointerup', function(){
                    minBetPlusButton.setTexture('plusButtonLocked');
                })
            }

        });

        minBetPlusButton.on('pointerdown', function(){

            if (settingsMinBet < 100)
            {
                minBetPlusButton.setTexture('plusButtonClicked');
                settingsMinBet = settingsMinBet + 5;

                if (settingsMinBet > 9 && settingsMinBet < 100)
                {
                    minBetText.setPosition(460, 540);
                }
                else if (settingsMinBet == 100)
                {
                    minBetText.setPosition(450, 540);
                }
                else if (settingsMinBet < 10 && settingsMinBet > 0)
                {
                    minBetText.setPosition(466, 540);
                }

                minBetText.setText(settingsMinBet);
            }

            if (settingsMinBet > 5)
            {
                minBetMinusButton.setInteractive({ useHandCursor: true });
                minBetMinusButton.setTexture('minusButtonNormal');

                minBetMinusButton.on('pointerover', function(){
                    minBetMinusButton.setTexture('minusButtonHovered');
                })

                minBetMinusButton.on('pointerout', function(){
                    minBetMinusButton.setTexture('minusButtonNormal');
                })

                minBetMinusButton.on('pointerup', function(){
                    minBetMinusButton.setTexture('minusButtonHovered');
                })
            }
            else
            {
                minBetMinusButton.disableInteractive();
                minBetMinusButton.setTexture('minusButtonLocked');

                minBetMinusButton.on('pointerover', function(){
                    minBetMinusButton.setTexture('minusButtonLocked');
                })

                minBetMinusButton.on('pointerout', function(){
                    minBetMinusButton.setTexture('minusButtonLocked');
                })

                minBetMinusButton.on('pointerup', function(){
                    minBetMinusButton.setTexture('minusButtonLocked');
                })
            }
            
            if (settingsMinBet < 100)
            {
                minBetPlusButton.setInteractive({ useHandCursor: true });
                minBetPlusButton.setTexture('plusButtonNormal');

                minBetPlusButton.on('pointerover', function(){
                    minBetPlusButton.setTexture('plusButtonHovered');
                })

                minBetPlusButton.on('pointerout', function(){
                    minBetPlusButton.setTexture('plusButtonNormal');
                })

                minBetPlusButton.on('pointerup', function(){
                    minBetPlusButton.setTexture('plusButtonHovered');
                })
            }
            else
            {
                minBetPlusButton.disableInteractive();
                minBetPlusButton.setTexture('plusButtonLocked');

                minBetPlusButton.on('pointerover', function(){
                    minBetPlusButton.setTexture('plusButtonLocked');
                })

                minBetPlusButton.on('pointerout', function(){
                    minBetPlusButton.setTexture('plusButtonLocked');
                })

                minBetPlusButton.on('pointerup', function(){
                    minBetPlusButton.setTexture('plusButtonLocked');
                })
            }

        });

        maxBetMinusButton.on('pointerdown', function(){

            if (settingsMaxBet > 250)
            {
                maxBetMinusButton.setTexture('minusButtonClicked');
                settingsMaxBet = settingsMaxBet - 50;

                if (settingsMaxBet >= 1000)
                {
                    maxBetText.setPosition(441, 640);
                }
                else if (settingsMaxBet >= 250 && settingsMaxBet < 1000)
                {
                    maxBetText.setPosition(450, 640);
                }

                maxBetText.setText(settingsMaxBet);
            }

            if (settingsMaxBet > 250)
            {
                maxBetMinusButton.setInteractive({ useHandCursor: true });
                maxBetMinusButton.setTexture('minusButtonNormal');

                maxBetMinusButton.on('pointerover', function(){
                    maxBetMinusButton.setTexture('minusButtonHovered');
                })

                maxBetMinusButton.on('pointerout', function(){
                    maxBetMinusButton.setTexture('minusButtonNormal');
                })

                maxBetMinusButton.on('pointerup', function(){
                    maxBetMinusButton.setTexture('minusButtonHovered');
                })
            }
            else
            {
                maxBetMinusButton.disableInteractive();
                maxBetMinusButton.setTexture('minusButtonLocked');

                maxBetMinusButton.on('pointerover', function(){
                    maxBetMinusButton.setTexture('minusButtonLocked');
                })

                maxBetMinusButton.on('pointerout', function(){
                    maxBetMinusButton.setTexture('minusButtonLocked');
                })

                maxBetMinusButton.on('pointerup', function(){
                    maxBetMinusButton.setTexture('minusButtonLocked');
                })
            }

            if (settingsMaxBet < 2500)
            {
                maxBetPlusButton.setInteractive({ useHandCursor: true });
                maxBetPlusButton.setTexture('plusButtonNormal');

                maxBetPlusButton.on('pointerover', function(){
                    maxBetPlusButton.setTexture('plusButtonHovered');
                })

                maxBetPlusButton.on('pointerout', function(){
                    maxBetPlusButton.setTexture('plusButtonNormal');
                })

                maxBetPlusButton.on('pointerup', function(){
                    maxBetPlusButton.setTexture('plusButtonHovered');
                })
            }
            else
            {
                maxBetPlusButton.disableInteractive();
                maxBetPlusButton.setTexture('plusButtonLocked');

                maxBetPlusButton.on('pointerover', function(){
                    maxBetPlusButton.setTexture('plusButtonLocked');
                })

                maxBetPlusButton.on('pointerout', function(){
                    maxBetPlusButton.setTexture('plusButtonLocked');
                })

                maxBetPlusButton.on('pointerup', function(){
                    maxBetPlusButton.setTexture('plusButtonLocked');
                })
            }

        });

        maxBetPlusButton.on('pointerdown', function(){

            if (settingsMaxBet < 2500)
            {
                maxBetPlusButton.setTexture('plusButtonClicked');
                settingsMaxBet = settingsMaxBet + 50;

                if (settingsMaxBet >= 1000)
                {
                    maxBetText.setPosition(441, 640);
                }
                else if (settingsMaxBet >= 250 && settingsMaxBet < 1000)
                {
                    maxBetText.setPosition(450, 640);
                }

                maxBetText.setText(settingsMaxBet);
            }

            if (settingsMaxBet > 250)
            {
                maxBetMinusButton.setInteractive({ useHandCursor: true });
                maxBetMinusButton.setTexture('minusButtonNormal');

                maxBetMinusButton.on('pointerover', function(){
                    maxBetMinusButton.setTexture('minusButtonHovered');
                })

                maxBetMinusButton.on('pointerout', function(){
                    maxBetMinusButton.setTexture('minusButtonNormal');
                })

                maxBetMinusButton.on('pointerup', function(){
                    maxBetMinusButton.setTexture('minusButtonHovered');
                })
            }
            else
            {
                maxBetMinusButton.disableInteractive();
                maxBetMinusButton.setTexture('minusButtonLocked');

                maxBetMinusButton.on('pointerover', function(){
                    maxBetMinusButton.setTexture('minusButtonLocked');
                })

                maxBetMinusButton.on('pointerout', function(){
                    maxBetMinusButton.setTexture('minusButtonLocked');
                })

                maxBetMinusButton.on('pointerup', function(){
                    maxBetMinusButton.setTexture('minusButtonLocked');
                })
            }

            if (settingsMaxBet < 2500)
            {
                maxBetPlusButton.setInteractive({ useHandCursor: true });
                maxBetPlusButton.setTexture('plusButtonNormal');

                maxBetPlusButton.on('pointerover', function(){
                    maxBetPlusButton.setTexture('plusButtonHovered');
                })

                maxBetPlusButton.on('pointerout', function(){
                    maxBetPlusButton.setTexture('plusButtonNormal');
                })

                maxBetPlusButton.on('pointerup', function(){
                    maxBetPlusButton.setTexture('plusButtonHovered');
                })
            }
            else
            {
                maxBetPlusButton.disableInteractive();
                maxBetPlusButton.setTexture('plusButtonLocked');

                maxBetPlusButton.on('pointerover', function(){
                    maxBetPlusButton.setTexture('plusButtonLocked');
                })

                maxBetPlusButton.on('pointerout', function(){
                    maxBetPlusButton.setTexture('plusButtonLocked');
                })

                maxBetPlusButton.on('pointerup', function(){
                    maxBetPlusButton.setTexture('plusButtonLocked');
                })
            }

        });

        countSpoilerMinusButton.on('pointerdown', function(){

            if (settingsCountSpoiler == 1)
            {
                countSpoilerMinusButton.setTexture('minusButtonClicked');
                settingsCountSpoiler = 0;
                countSpoilerText.setPosition(451, 740);
                countSpoilerText.setText("Off");
            }

            if (settingsCountSpoiler > 0)
            {
                countSpoilerMinusButton.setInteractive({ useHandCursor: true });
                countSpoilerMinusButton.setTexture('minusButtonNormal');

                countSpoilerMinusButton.on('pointerover', function(){
                    countSpoilerMinusButton.setTexture('minusButtonHovered');
                })

                countSpoilerMinusButton.on('pointerout', function(){
                    countSpoilerMinusButton.setTexture('minusButtonNormal');
                })

                countSpoilerMinusButton.on('pointerup', function(){
                    countSpoilerMinusButton.setTexture('minusButtonHovered');
                })
            }
            else
            {
                countSpoilerMinusButton.disableInteractive();
                countSpoilerMinusButton.setTexture('minusButtonLocked');

                countSpoilerMinusButton.on('pointerover', function(){
                    countSpoilerMinusButton.setTexture('minusButtonLocked');
                })

                countSpoilerMinusButton.on('pointerout', function(){
                    countSpoilerMinusButton.setTexture('minusButtonLocked');
                })

                countSpoilerMinusButton.on('pointerup', function(){
                    countSpoilerMinusButton.setTexture('minusButtonLocked');
                })
            }

            if (settingsCountSpoiler < 1)
            {
                countSpoilerPlusButton.setInteractive({ useHandCursor: true });
                countSpoilerPlusButton.setTexture('plusButtonNormal');

                countSpoilerPlusButton.on('pointerover', function(){
                    countSpoilerPlusButton.setTexture('plusButtonHovered');
                })

                countSpoilerPlusButton.on('pointerout', function(){
                    countSpoilerPlusButton.setTexture('plusButtonNormal');
                })

                countSpoilerPlusButton.on('pointerup', function(){
                    countSpoilerPlusButton.setTexture('plusButtonHovered');
                })
            }
            else
            {
                countSpoilerPlusButton.disableInteractive();
                countSpoilerPlusButton.setTexture('plusButtonLocked');

                countSpoilerPlusButton.on('pointerover', function(){
                    countSpoilerPlusButton.setTexture('plusButtonLocked');
                })

                countSpoilerPlusButton.on('pointerout', function(){
                    countSpoilerPlusButton.setTexture('plusButtonLocked');
                })

                countSpoilerPlusButton.on('pointerup', function(){
                    countSpoilerPlusButton.setTexture('plusButtonLocked');
                })
            }
        });

        countSpoilerPlusButton.on('pointerdown', function(){

            if (settingsCountSpoiler == 0)
            {
                countSpoilerPlusButton.setTexture('plusButtonClicked');
                settingsCountSpoiler = 1;
                countSpoilerText.setPosition(459, 740);
                countSpoilerText.setText("On");
            }

            if (settingsCountSpoiler > 0)
            {
                countSpoilerMinusButton.setInteractive({ useHandCursor: true });
                countSpoilerMinusButton.setTexture('minusButtonNormal');

                countSpoilerMinusButton.on('pointerover', function(){
                    countSpoilerMinusButton.setTexture('minusButtonHovered');
                })

                countSpoilerMinusButton.on('pointerout', function(){
                    countSpoilerMinusButton.setTexture('minusButtonNormal');
                })

                countSpoilerMinusButton.on('pointerup', function(){
                    countSpoilerMinusButton.setTexture('minusButtonHovered');
                })
            }
            else
            {
                countSpoilerMinusButton.disableInteractive();
                countSpoilerMinusButton.setTexture('minusButtonLocked');

                countSpoilerMinusButton.on('pointerover', function(){
                    countSpoilerMinusButton.setTexture('minusButtonLocked');
                })

                countSpoilerMinusButton.on('pointerout', function(){
                    countSpoilerMinusButton.setTexture('minusButtonLocked');
                })

                countSpoilerMinusButton.on('pointerup', function(){
                    countSpoilerMinusButton.setTexture('minusButtonLocked');
                })
            }

            if (settingsCountSpoiler < 1)
            {
                countSpoilerPlusButton.setInteractive({ useHandCursor: true });
                countSpoilerPlusButton.setTexture('plusButtonNormal');

                countSpoilerPlusButton.on('pointerover', function(){
                    countSpoilerPlusButton.setTexture('plusButtonHovered');
                })

                countSpoilerPlusButton.on('pointerout', function(){
                    countSpoilerPlusButton.setTexture('plusButtonNormal');
                })

                countSpoilerPlusButton.on('pointerup', function(){
                    countSpoilerPlusButton.setTexture('plusButtonHovered');
                })
            }
            else
            {
                countSpoilerPlusButton.disableInteractive();
                countSpoilerPlusButton.setTexture('plusButtonLocked');

                countSpoilerPlusButton.on('pointerover', function(){
                    countSpoilerPlusButton.setTexture('plusButtonLocked');
                })

                countSpoilerPlusButton.on('pointerout', function(){
                    countSpoilerPlusButton.setTexture('plusButtonLocked');
                })

                countSpoilerPlusButton.on('pointerup', function(){
                    countSpoilerPlusButton.setTexture('plusButtonLocked');
                })
            }
        });

        if (countSpoiler == 1)
        {
            runningCountSpoiler.on("pointerover", () => { runningCountSpoiler.visible = false; });
            runningCountSpoiler.on("pointerout", () => { runningCountSpoiler.visible = true; });
    
            trueCountSpoiler.on("pointerover", () => { trueCountSpoiler.visible = false; });
            trueCountSpoiler.on("pointerout", () => { trueCountSpoiler.visible = true; });
        }




        applySettingsButton.on('pointerdown', function(){
            applySettingsButton.setTexture('clickedButton');

            if (settingsDeckPen != confirmedSettingsDeckPen || settingsNumDecks != confirmedSettingsNumDecks)
                applyDeckSettingsFlag = 1;

            confirmedSettingsNumPlayers = settingsNumPlayers;
            confirmedSettingsNumDecks = settingsNumDecks;
            confirmedSettingsDeckPen = settingsDeckPen;
            confirmedSettingsMinBet = settingsMinBet;
            confirmedSettingsMaxBet = settingsMaxBet;
            confirmedSettingsCountSpoiler = settingsCountSpoiler;

            confirmedSettingsPeekingOption = settingsPeekingOption;
            confirmedSettingsBlackjackPayout = settingsBlackjackPayout;
            confirmedSettingsHitSplitAces = settingsHitSplitAces;
            confirmedSettingsDoubleAfterSplit = settingsDoubleAfterSplit;
            confirmedSettingsHitStandSoft17 = settingsHitStandSoft17;
            confirmedSettingsDoubleOption = settingsDoubleOption;

            applySettingsFlag = 1;

            this.scene.moveButtonsBack();

            circley1.visible = false;
            circley2.visible = false;
            circley3.visible = false;
            menuScreen.visible = false;
            settingsHeader.visible = false;
            settingsDisclaimer.visible = false;
            applySettingsButton.visible = false;
            applySettingsText.visible = false;
            this.scene.disableSettingsButtons();

            numPlayersHeader.visible = false;
            numPlayersMinusButton.visible = false;
            numPlayersPlusButton.visible = false;
            numPlayersDisplay.visible = false;
            numPlayersText.visible = false;

            numDecksHeader.visible = false;
            numDecksMinusButton.visible = false;
            numDecksPlusButton.visible = false;
            numDecksDisplay.visible = false;
            numDecksText.visible = false;

            deckPenHeader.visible = false;
            deckPenMinusButton.visible = false;
            deckPenPlusButton.visible = false;
            deckPenDisplay.visible = false;
            deckPenText.visible = false;

            minBetHeader.visible = false;
            minBetMinusButton.visible = false;
            minBetPlusButton.visible = false;
            minBetDisplay.visible = false;
            minBetText.visible = false;

            maxBetHeader.visible = false;
            maxBetMinusButton.visible = false;
            maxBetPlusButton.visible = false;
            maxBetDisplay.visible = false;
            maxBetText.visible = false;

            countSpoilerHeader.visible = false;
            countSpoilerMinusButton.visible = false;
            countSpoilerPlusButton.visible = false;
            countSpoilerDisplay.visible = false;
            countSpoilerText.visible = false;

            peekingOptionHeader.visible = false;
            peekingOptionMinusButton.visible = false;
            peekingOptionPlusButton.visible = false;
            peekingOptionDisplay.visible = false;
            peekingOptionText.visible = false;

            doubleOptionHeader.visible = false;
            doubleOptionMinusButton.visible = false;
            doubleOptionPlusButton.visible = false;
            doubleOptionDisplay.visible = false;
            doubleOptionText.visible = false;

            hitSplitAcesHeader.visible = false;
            hitSplitAcesMinusButton.visible = false;
            hitSplitAcesPlusButton.visible = false;
            hitSplitAcesDisplay.visible = false;
            hitSplitAcesText.visible = false;

            doubleAfterSplitHeader.visible = false;
            doubleAfterSplitMinusButton.visible = false;
            doubleAfterSplitPlusButton.visible = false;
            doubleAfterSplitDisplay.visible = false;
            doubleAfterSplitText.visible = false;

            hitStandSoft17Header.visible = false;
            hitStandSoft17MinusButton.visible = false;
            hitStandSoft17PlusButton.visible = false;
            hitStandSoft17Display.visible = false;
            hitStandSoft17Text.visible = false;

            blackjackPayoutHeader.visible = false;
            blackjackPayoutMinusButton.visible = false;
            blackjackPayoutPlusButton.visible = false;
            blackjackPayoutDisplay.visible = false;
            blackjackPayoutText.visible = false;
        });

    };  

    update() {
        
    };
}
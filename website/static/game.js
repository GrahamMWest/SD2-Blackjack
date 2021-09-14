/*
const player1x = 1061;
const player1y = 269;
const player1a = -48;

const player2x = 961;
const player2y = 349;
const player2a = -48;

const player3x = 961;
const player3y = 349;
const player3a = -48;

const player4x = 961;
const player4y = 349;
const player4a = -48;

const player5x = 961;
const player5y = 349;
const player5a = -48;

const player6x = 961;
const player6y = 349;
const player6a = -48;

const player7x = 961;
const player7y = 349;
const player7a = -48;


// create a new scene
let gameScene = new Phaser.Scene('Game');

// Load assets
gameScene.preload = function(){

    // load background and other assets
    this.load.image('background', '/static/assets/table_layout.png');
    this.load.image('face_down_card', '/static/assets/cards/card_back.png')
    this.load.image('test_card', '/static/assets/cards/2C.jpg')

    this.load.image('test', '/static/assets/CLUB-2.svg')
};

// called a single time after preload ends
gameScene.create = function(){
    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;

    let bg = this.add.image(0, 0, 'background');
    bg.scale = .75;
    bg.setPosition(1400/2, 740/2);

    let test_card = this.add.image(900, 75, 'test_card');
    test_card.scale = .074;

    let test = this.add.image(900, 75, 'test');
    test.scale = .22;

    let deck = this.add.image(900, 75, 'face_down_card');
    deck.scale = .1;
    //deck.setPosition(1200/2, 900/2);

    //deals card to player 1, card 1 position
    var dealCard = this.tweens.add({
        targets: test,
        x: player1x,
        y: player1y,
        angle: player1a,
        ease: 'Linear',
        duration: 400,
        repeat: 0,
        yoyo: false,
    });
    


};

gameScene.update = function(){

};

// set configuration of the game
let config = {
    type: Phaser.AUTO, // uses WebGL if available, otherwise uses canvas
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1400,
        height: 1000,
    },
    scene: gameScene,
};

// create a new game, and pass the configuration
let game = new Phaser.Game(config);



// https://youtu.be/hI_LS8bdkM4?t=2321
*/

// create a new scene
//let gameScene = new Phaser.Scene('Game');

// set configuration of the game
const config = {
    type: Phaser.AUTO, // uses WebGL if available, otherwise uses canvas
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1400,
        height: 1000,
        backgroundColor: "000000"
    },
    scene: [StartScene, GameScene],
};

// create a new game, and pass the configuration
const game = new Phaser.Game(config);
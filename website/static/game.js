// create a new scene
let gameScene = new Phaser.Scene('Game');

// Load assets
gameScene.preload = function(){
    // load background and other assets
    this.load.image('background', '/static/assets/table_layout.png');
};

// called a single time after preload ends
gameScene.create = function(){
    let bg = this.add.sprite(0, 0, 'background');

    // bg.setOrigin(0,0);

    bg.setPosition(1200/2, 990/2);

    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;
};

// set configuration of the game
let config = {
    type: Phaser.AUTO, // uses WebGL if available, otherwise uses canvas
    width: 1200,
    height: 990,
    scene: gameScene,
};

// create a new game, and pass the configuration
let game = new Phaser.Game(config);


// https://youtu.be/hI_LS8bdkM4?t=2321
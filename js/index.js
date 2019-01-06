//create a new scene
let gameScene = new Phaser.Scene('Game');

// initisate scene params
gameScene.init = function () {
    this.moveX = random(0.2, 0.8)
    this.moveY = random(0.2, 0.8)
    this.handMinY = 300;
    this.handMaxY = 450;
    this.handMinX = 200;
    this.handMaxX = 300;
    this.bounce = false
}

// Load assets
gameScene.preload = function () {
    // load images
    // this.load.image('hand', 'assets/HandOrb.png');

    this.load.spritesheet('body', 'assets/SkeleBody.png', {
        frameWidth: 200,
        frameHeight: 150,
    });

    this.load.spritesheet('hand', 'assets/HandOrb.png', {
        frameWidth: 64,
        frameHeight: 64,
    });

    this.load.audio('BGmusic', 'assets/Afterlife.mp3');
}

gameScene.create = function () {
    //BG music
    this.BGmusic = this.sound.add('BGmusic', { volume: 0.1, loop: true });

    this.body = this.add.sprite(0, 0, 'body', 0)

    this.hand = this.add.sprite(300, 400, 'hand', 0)


    this.look = this.anims.create({
        key: 'look',
        frames: this.anims.generateFrameNames('hand', {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }),
        frameRate: 5,
        yoyo: true,
    });

    this.blink = this.anims.create({
        key: 'blink',
        frames: this.anims.generateFrameNames('body', {
            frames: [0, 1, 2, 3, 4, 5]
        }),
        frameRate: 20,
        yoyo: true,
    });

    this.hand.setScale(6)

    this.body.setOrigin(0, 0)
    this.body.setScale(4)

    // play game music
    this.BGmusic.play();


}

gameScene.update = function () {
    let conditionUp = this.hand.y <= this.handMinY
    let conditionDown = this.hand.y >= this.handMaxY

    let conditionLeft = this.hand.x <= this.handMinX
    let conditionRight = this.hand.x >= this.handMaxX

    let conditionBounce = this.hand.x <= this.handMaxX - 30 && this.hand.x >= this.handMinX + 30 || this.hand.y <= this.handMaxY - 50 && this.hand.y >= this.handMinY + 50

    if (conditionBounce) this.bounce = false

    if (conditionUp || conditionDown) {
        this.moveY *= -1;
        if (!this.bounce) {
            this.moveX = random(0.2, 0.8)
            this.bounce = true
            this.hand.anims.play('look');
        }
    }

    if (conditionLeft || conditionRight) {
        this.moveX *= -1;
        if (!this.bounce) {
            this.moveY = random(0.2, 0.8)
            this.bounce = true
            this.body.anims.play('blink');
        }
    }

    this.hand.y += this.moveY
    this.hand.x += this.moveX

    //console.log (this.bounce)


}

let random = function (min, max) {
    console.log(Math.random() * (max - min) + min)
    return Math.random() * (max - min) + min;

}


//set config
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    zoom: 1,
    scene: gameScene,
    parent: 'phaser'

};

// create a new game
let game = new Phaser.Game(config);
let prizes_config = {
    count : 12,
    prizes_names: ["3000 CB CREDITS","35% OFF",
    "HARD LUCK", "70% OFF", "CB SWAGPACK", "100% OFF",  "NETFLIX", "50% OFF", "AMAZON VOUCHER", "2 EXTRA SPIN", "CB TSHIRT", "CB BOOK"],
}

let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    backgroundColor: 0xffbb00,
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

let game = new Phaser.Game(config);

function preload() {
    console.log("Preload");
    // console.log(this);
    //using load objects-load some images
    // console.log(this);

    this.load.image('background', '/spin-and-win/Assets/back.jpg');
    this.load.image('wheel_img', '/spin-and-win/Assets/wheel.png');
    this.load.image('pin', '/spin-and-win/Assets/pin.png');
    this.load.image('stand', '/spin-and-win/Assets/stand.png');
}

function create() {
    // console.log("create");
    w = game.config.width;
    h = game.config.height;
    let background = this.add.sprite(0, 0, 'background');
    background.setPosition(w / 2, h / 2);
    background.setScale(.25);

    let stand = this.add.sprite(0, 0, 'stand');
    stand.setPosition(w / 2, 550);
    stand.setScale(.25);

    let pin = this.add.sprite(0, 0, 'pin');
    pin.setPosition(w / 2, 35);
    pin.setScale(.25);
    pin.depth = 1;
    // console.log("create -> pin", pin);

    this.wheel = this.add.sprite(0, 0, 'wheel_img');
    this.wheel.setPosition(w / 2, h / 2);
    this.wheel.setScale(.25);

    //add event listeners

    //event listener for mouse click
    this.input.on('pointerdown', spinwheel, this);

    //lets create text object
    font_style = {
        font: "bold 25px ARIAL",
        color: "#FFF",
        align: "center"
    }
    this.gametext = this.add.text(10,10,"Welcome to spin and win!",font_style);


}

//Gameloop
function update() {
    console.log("inside update");
    // this.wheel.angle += 1;
    // this.wheel.scaleX += .001;
    // this.wheel.alpha -=0.001;
    // this.wheel.scaleY += .001;
}

function spinwheel() {
    // console.log('You clicked!');
    // this.gametext.setText("You clicked the mouse!");

    let rounds = Phaser.Math.Between(2,4);
    let degrees = Phaser.Math.Between(0,11)*30;

    let total_angle = rounds*360+degrees;
    console.log(total_angle);

    let idx = prizes_config.count-1-Math.floor(degrees/(360/prizes_config.count));

    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,//we have to generate this number randomly
        // delay: 2000,
        ease: "Cubic.easeOut",
        duration: 3000,
        callbackScope: this,
        onComplete: function(){
            this.gametext.setText("You Won " + prizes_config.prizes_names[idx]);
        }
    });

}
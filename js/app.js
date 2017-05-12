
var gameWidth = 600,
    gameHeight = 600;

var game = new Phaser.Game(
    gameWidth, 
    gameHeight, 
    Phaser.AUTO, 
    '', 
    {
    preload: preload, 
    create: create,
    update: update
});

var snakeHead,
    snakeBody = [],
    snakePath = [],
    snakeLength = 0,
    snakeSpacer = 5,
    snakeMax = 1000,
    food,
    cursors,
    score = 0,
    scoreText = "",
    gameOver = false,
    velocitySpeed = snakeSpeed.velocitySpeed;

function preload(){
    game.load.image('water', assets.water);
    game.load.image('snake', assets.snake);
    game.load.image('food', assets.food);
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'water');
       
    createSnake();
    initSnakeBody();
    createFood();

    game.physics.arcade.sortDirection = Phaser.Physics.Arcade.BOTTOM_TOP;
            
    cursors = game.input.keyboard.createCursorKeys();
    
    scoreText = game.add.text(16, 16, 'score: 0', {
        fontSize: '32px', 
        fill: '#FFF'
    });
}

function update(){
  
    if(cursors.left.isDown) {
        snakeHead.body.velocity.x = - velocitySpeed;
        snakeHead.body.velocity.y = 0;
    } else if (cursors.right.isDown) {
        snakeHead.body.velocity.x = velocitySpeed;
        snakeHead.body.velocity.y = 0;
    } else if (cursors.up.isDown) {
        snakeHead.body.velocity.x = 0;
        snakeHead.body.velocity.y = - velocitySpeed;
    } else if (cursors.down.isDown) {
        snakeHead.body.velocity.x = 0;
        snakeHead.body.velocity.y = velocitySpeed;
    }


    game.physics.arcade.collide(snakeHead, food, eatFood, null, this);

    for (var i = 0; i <= snakeLength * snakeSpacer; i++)
    {
        snakePath[i] = new Phaser.Point(snakeHead.x, snakeHead.y);
    }

    for(var i = 0; i < snakeBody.length; i++) {
        game.physics.arcade.collide(snakeHead, snakeBody[i], snakeDie, null, this);
    }
    
}


function eatFood(snakeHead, food) {
    food.reset(game.world.randomX, game.world.randomY - 10);
    snakeLength++;
    velocitySpeed += snakeSpeed.plusSpeed;

    score += scorePoints.scorePoints;
    scoreText.text =  scorePoints.scoreText + score;
    growSnake();
}

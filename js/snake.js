function createSnake() {
    snakeHead = game.add.sprite(game.world.randomX, game.world.randomY - 10, 'snake');
    
    snakeHead.enableBody = true;
    game.physics.arcade.enable(snakeHead);

    game.physics.enable(snakeHead, Phaser.Physics.ARCADE);

    snakeHead.checkWorldBounds = true;    
    snakeHead.events.onOutOfBounds.add(snakeOut, this);
}

function snakeOut(snakeHead){

    if(snakeHead.x < 0) {
        snakeHead.reset(gameWidth - snakeHead.width, snakeHead.y);
        snakeHead.body.velocity.x = -velocitySpeed;
    } else if (snakeHead.x > gameWidth) {
        snakeHead.reset(0, snakeHead.y);
        snakeHead.body.velocity.x = velocitySpeed;
    } else if (snakeHead.y < 0) {
        snakeHead.reset(snakeHead.x, gameHeight - snakeHead.width);
        snakeHead.body.velocity.y = -velocitySpeed;
    } else if (snakeHead.y > gameHeight) {
        snakeHead.reset(snakeHead.x, 0);
        snakeHead.body.velocity.y = velocitySpeed;
    } 

}

var xPlace,
    yPlace,
    snakeBodyPart;


function growSnake() {
    xPlace = snakeHead.x;
    yPlace = snakeHead.y;
    console.log(xPlace);
    if(snakeBody.length != 0) {
        snakeBody.push(snakeBody.length - 1);
        snakeBody[snakeBody.length - 1] = xPlace + snakeHead.width;
        //snakeBody.push(snakeBody.length - 1) =  yPlace + snakeHead.height;
    }

    snakeBodyPart = game.add.sprite(xPlace, yPlace, 'snake');
    game.physics.arcade.enable(snakeBodyPart);
    
    snakeBody.push(snakeBodyPart);
    
}

function initSnakeBody() {
     //  Init snakeSection array
    for (var i = 1; i <= snakeLength; i++)
    {
        snakeBody[i] = game.add.sprite(snakeHead.x, snakeHead.y, 'snake');
        snakeBody[i].anchor.setTo(0.5, 0.5);
        console.log(snakeBody[i]);
    }
    
    //  Init snakePath array
    for (var i = 0; i <= snakeLength * snakeSpacer; i++)
    {
        snakePath[i] = new Phaser.Point(snakeHead.x, snakeHead.y);
    }
}

function snakeDie() {
    console.log('die');
    this.game.state.start("EndState");
    console.log(game.state.end);
}
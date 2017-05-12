function createFood(){
    food = game.add.sprite(game.world.randomX, game.world.randomY - 10, 'food');
    food.scale.setTo(0.8, 0.8);

    game.physics.arcade.enable(food);
    food.body.collideWorldBounds = true;
}


function eatFood(snake, food) {
    food.reset(game.world.randomX, game.world.randomY);
    snakeBody.push(snakeHead);
    snakeHead.body.velocitySpeed += snakeSpeed.plusSpeed;
    

    score += scorePoints.scorePoints;
    scoreText.text =  scorePoints.scoreText + score;
    growSnake();
}
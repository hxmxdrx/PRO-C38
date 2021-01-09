var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver, restart;

var athlete, athlete_running, athlete_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;
function preload(){
  athlete_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  athlete_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
    canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  
  athlete = createSprite(50,180,20,50);
  athlete.addAnimation("running", trex_running);
  athlete.addAnimation("collided",trex_collided);
  athlete.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  
  text("Score:" + score, 500,50);
  
  if(gameState === PLAY){
  score = score + Math.round(getFrameRate()/60);
  ground.velocityX = -(6 + 3*score/100);
  if(keyDown("space") && trex.y >= 159){
    athlete.velocityY = -12;
  }
    athlete.velocityY = athlete.velocityY + 0.8
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
  athlete.collide(invisibleGround);
  spawnObstacles();
  if(obstaclesGroup.isTouching(trex)){
  gameState = END;
    
  }
  }
  
  else if (gameState === END){
  gameOver.visible = true;
  restart.visible = true;
  ground.velocityX = 0;
  athlete.velocityY = 0;
  obstaclesGroup.setVelocityEach(0);
  athlete.changeAnimation("collided",athlete_collided);
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  
  if(mousePressedOver(restart)){
  reset();
  }  
  }

  drawSprites();
}

  function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  athlete.changeAnimation("running",athlete_running);
  score = 0;
  

}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
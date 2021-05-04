var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage= loadImage("banana.png");
  obstacleImage= loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  obstaclesGroup= new Group();
  cloudsGroup= new Group();
}

function draw() { 
  background(0);
  drawSprites();

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacles();
    
    if(cloudsGroup.isTouching(player)){
      cloudsGroup.destroyEach();
      player.scale+=0.05
      score=score+1
    }
  }
  if(obstaclesGroup.isTouching(player)){
    gameState=END;
  }
  else if(gameState===END){
    backgr.velocityX=0
    player.visible=false
    cloudsGroup.destroyEach()
    obstaclesGroup.destroyEach()
    textSize(100)
    text("GAME OVER",200,400);
  }

  
  textSize(25)
  fill("white")
  text("Score:"+score,600,50)

}
function spawnObstacles(){
  if (frameCount % 200 === 0){
    var obstacle = createSprite(600,300,10,40);
    obstacle.velocityX = -6;
    
     //generate random obstacles
     obstacle.addImage("obstacleImage",obstacleImage)
     
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.3;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
 }
 
 function spawnFood() {
   //write code here to spawn the clouds
   if (frameCount % 250 === 0) {
     var cloud = createSprite(600,120,40,10);
     cloud.y = Math.round(random(80,120));
     cloud.addImage(bananaImage);
     cloud.scale = 0.1;
     cloud.velocityX = -3;
     
      //assign lifetime to the variable
     cloud.lifetime = 200;
     
     //adjust the depth
     cloud.depth = player.depth;
     player.depth = player.depth + 1;
     
     //add each cloud to the group
     cloudsGroup.add(cloud);
     
   }
 }
 

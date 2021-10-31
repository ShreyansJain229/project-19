var player, playerImg; 
var obstacle, obstacleImg, obstaclesGroup;
var ground, groundImg;
var score;
var gamestate = "play";
var leftwall, rightwall;

function preload(){
 playerImg = loadImage("player_Img.png");
 groundImg = loadImage("ground_Img.jpg");
 obstacleImg = loadImage("obstacle_Img.png");
}

function setup() {
 createCanvas(400,400);

 ground = createSprite(200,200,400,400);
 ground.addImage("ground",groundImg);
 
 player = createSprite(200,320,20,20);
 player.addImage("player",playerImg);
 player.scale = 0.1;

 leftwall = createSprite(20,200,2,400);
 rightwall = createSprite(380,200,2,400);

 obstaclesGroup = new Group();

 score = 0;
}

function draw() {
 background(0);
 
 player.collide(leftwall);
 player.collide(rightwall);
 
 leftwall.visible = false;
 rightwall.visible = false;
 
 drawSprites();
 
 textSize(20);
 fill("white");
 text("Score:"+score,20,30);
 
if(gamestate === "play"){
 score = score + Math.round(getFrameRate()/60);
 ground.velocityY = 2;
 
 if(ground.y > 400){
   ground.y = 300
 }

 if(keyDown(LEFT_ARROW)){
  player.x -= 3;
 }
 
 if(keyDown(RIGHT_ARROW)){
  player.x += 3;
 }

 if(obstaclesGroup.isTouching(player)){
  gamestate = "end";
 }

 spawnobstacles();
}

else if(gamestate === "end"){
 stroke("white");
 fill("white");
 textSize(20);
 text("GAMEOVER",140,200);

 obstaclesGroup.setVelocityYEach(0);
 obstaclesGroup.setLifetimeEach(-1);
 
 ground.velocityY = 0;
}
}

function spawnobstacles() {
 if(frameCount % 60 === 0){
  obstacle = createSprite(100,-50,20,20);
  obstacle.addImage("obstacle",obstacleImg);
  obstacle.scale = 0.1;
  obstacle.x = Math.round(random(40,380));
  obstacle.velocityY = 5;
  obstacle.lifetime = 100;
  obstaclesGroup.add(obstacle);
 }
}
//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario;
var ground, invisibleGround, groundImage,coing;

var powerg,mariostop;
var EnemysGroup, enemy1, enemy2,enemy3,enemy4

var score;

var gameOver,restart;

function preload(){
  //enemy,mario,power,restart and background imahes

  enemy1=loadAnimation("images/mario s (2).png","images/mario s (3).png");
  enemy2=loadAnimation("images/mario s (1).png","images/mario t (1).png","images/mario t (2).png","images/mario v.png");
  enemy3=loadImage("images/pow (2).png");
  enemy4=loadAnimation("images/enemy41.png","images/enemy42.png");
  
  gameOverImg = loadImage("images/gameOver.png");
  pow=loadImage("images/pow (1).png")
  restartImg = loadImage("images/restart.png");

  mario_running=loadAnimation("images/sprite_0.png","images/sprite_1.png","images/sprite_2.png","images/sprite_3.png","images/sprite_4.png","images/sprite_5.png");
  coina=loadAnimation("images/sprite_00.png","images/sprite_01.png","images/sprite_02.png","images/sprite_03.png","images/sprite_06.png","images/sprite_07.png","images/sprite_08.png","images/sprite_09.png","images/sprite_12.png","images/sprite_13.png","images/sprite_14.png","images/sprite_15.png");
    
  groundImage=loadImage("images/mario g.png");
  mariostop=loadImage("images/sprite_3.png");

  
    }


function setup() {
  createCanvas(displayWidth - 620,displayHeight -550);
 
  //create ground sprite
  ground = createSprite(800,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /4;
 
 
  //invisibleground to help mario not to fall.
  invisibleGround = createSprite(100,330,400,10);
 invisibleGround.visible = false;
  
 //creating groupos
  EnemysGroup = new Group();
  coing=new Group();
  powerg=new Group();
  //gameover and restart button sprites
  gameOver = createSprite(displayWidth/2-300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;
  
  restart = createSprite(displayWidth/2-300,250);
  restart.addImage(restartImg);
  restart.scale = 1;
  restart.visible = false;
  
  //mario and score
  score = 0;
  mario = createSprite(100,330,20,50);
  mario.addAnimation("running", mario_running);
  mario.addAnimation("mario stopped",mariostop);
  mario.scale = 0.7;
}

function draw() {
  background(94,145,254);
 
  if(gameState === PLAY){
    ground.velocityX = -7;
 //camera position
 camera.position.x=mario.x+400;
 //camera.position.y=mario.y;
 //camera.position.y>300;
 
 
 
console.log(mouseY);
  if(keyDown("space") && mario.y>=266) {
    mario.velocityY = -20;
    
  }
  if(mario.y<200){
    camera.position.y=mario.y;
  }
  else{
    camera.position.y=displayHeight-730;
  }
  coin();
  if(mario.isTouching(coing)){
    score=score+1;
    coing.destroyEach();
   // ach.play();
  }
  //console.log(mario.y);
  mario.velocityY = mario.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  mario.collide(invisibleGround);
  
  spawnEnemys();
  if(score%5==0&&score>0&&keyDown("space")){
    
    powers();
  
  } 
  if(powerg.isTouching(EnemysGroup)){
   EnemysGroup.destroyEach();
    powerg.destroyEach();
  }

  

    if(EnemysGroup.isTouching(mario)){
     gameState = END; 
    }
    
  }
   else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of ground,mario and nemysGroup to 0
    ground.velocityX = 0;
    mario.velocityY = 0;
    EnemysGroup.setVelocityXEach(0);
   
  
    
   
   coing.setVelocityXEach(0);
    //change the mario animation
    mario.changeAnimation("mario stopped",mariostop);
    
    if(mousePressedOver(restart)) {
      reset();
    }
    //set lifetime of the enemies,coins etc so that they are never destroyed
    EnemysGroup.setLifetimeEach(-1);
    coing.setLifetimeEach(-1);
  
    
    
  }
  
  
  
  drawSprites();
  textSize(35)
  fill("black");
  text("Score: "+ score, 650,50);
  
}


function coin(){
  //condition so that the coins are spawned at certain intervals
  if(World.frameCount%80==0){
  var coins=createSprite(400,random(150,300));
  coins.addAnimation("coins",coina);
  coins.scale=0.3;
  coins.velocityX=-5;
  coing.add(coins);
  coins.lifetime=(displayWidth-620)/5;
}
}
function spawnEnemys() {
  if(frameCount %120 === 0) {
   // Spawning enemies according to the camera position
    var Enemy = createSprite(camera.position.x+400,270,10,40);
    Enemy.velocityX = -7;
    
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: Enemy.addAnimation("enemy 1",enemy1);
              break;
      case 2: Enemy.addAnimation("enemies",enemy2);
              break;
     case 3: Enemy.addImage(enemy3);
            
              break;

      case 4: Enemy.addAnimation("enemy",enemy4);
              
     
      default: break;
    
      
    }
    
  
    Enemy.scale =0.8;
    Enemy.lifetime = (displayWidth-620)/7;
    //add enemies to the group
    EnemysGroup.add(Enemy);
  }
}
function reset(){
  gameOver.visible = false;
  restart.visible = false;
  
  gameState=PLAY;
  coing.destroyEach();
  EnemysGroup.destroyEach();

  
  score=0;
  
  mario.changeAnimation("running",mario_running);
}
function powers(){
  
  var power=createSprite(mario.x,mario.y);
  power.addImage(pow);
  power.velocityX=8;
  power.scale=0.5;
  powerg.add(power);
  

}
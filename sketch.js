var tower,door,doorsGroup,climber,climbersGroup,ghost;
var towerImg,doorImg,climberImg,ghostImg;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg= loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup=new Group();
  
  ghost = createSprite(200,200);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
}



function draw(){
  
  background(0);
  
  if(gameState==="play"){
    
  
  
  if(tower.y>400){
    tower.y = 300;
  }
  
  if(keyDown("Left_arrow")){
    ghost.x = ghost.x -3;
  }
  if(keyDown("Right_arrow")){
    ghost.x = ghost.x +3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY +0.8;
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY =0
  }
    
  spawndoor();
  
  if(ghost.y>600){
    ghost.destroy();
    gameState = "end"
  }
  drawSprites();
  }
  if(gameState==="end"){
    textSize(30);
    text("GAME OVER", 250,230)
  }
}

function spawndoor(){
  if(frameCount%220===0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    door.lifetime = 800;
    doorsGroup.add(door);
    
    climber = createSprite(200,10);
    climber.addImage(climberImg)
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1
  }
}
var tower,towerimage;
var doorimage;
var doorsGroup;
var door;
var railing,railingimage,railingGroup;
var ghost,ghostimage;
var invisibleBlock,invisibleBlockGroup;
var gameState = "play";
var sound;

function preload()
{
  towerimage = loadImage("tower.png");
  doorimage = loadImage("door.png");
  railingimage = loadImage("climber.png");
  ghostimage = loadImage("ghost-standing.png");
  
  sound = loadSound("spooky.wav");
}


function setup()
{
  createCanvas(600,600);
  sound.loop();
  doorsGroup = new Group();
  railingGroup = new Group();
  invisibleBlockGroup = new Group();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerimage);
  tower.velocityY=1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostimage);
  ghost.scale=0.3;
  
  
  
}


function draw()
{
  if(gameState === "play")
    {
      if(tower.y>400)
    {
      tower.y=300;
    }
  
      
  if(keyDown("LEFT_ARROW"))
    {
      ghost.x=ghost.x-3;
      
    }
  
  
  if(keyDown("RIGHT_ARROW"))
    {
      ghost.x=ghost.x+3;
    }
  
  if(keyDown("space"))
    {
      ghost.velocityY=-5;
      
    }

   ghost.velocityY=ghost.velocityY+0.8;
  
  if(railingGroup.isTouching(ghost))
  {
    ghost.velocityY=0;
  }
   
   if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600)   
     {
      ghost.destroy();
      gameState = "end"; 
     }
      
      
  spawnDoors();
  drawSprites();
      
  }
  if (gameState === "end")
  { 
    stroke("yellow"); 
   fill("yellow"); 
   textSize(30); 
   text("Game Over", 230,250) 
  }

  
  
}


function spawnDoors()
{
  if(frameCount%240===0)
    {
      door = createSprite(200,-50);
      
      invisibleBlock = createSprite(200,15);
      door.addImage("door",doorimage);
      
      railing = createSprite(200,10);
      
      railing.addImage("railing",railingimage);
      railing.velocityY=1;
      railing.lifetime=800;
      invisibleBlock.width=railing.width;
      invisibleBlock.height=2;
      
      railingGroup.add(railing);
    
      
      door.x=Math.round(random(120,400))

      railing.x=door.x;
      invisibleBlock.x=door.x;
      invisibleBlock.velocityY=1;
      invisibleBlock.lifetime=800;
      invisibleBlockGroup.add(invisibleBlock);
      invisibleBlock.debug=true;
      door.velocityY=1;
      door.lifetime=800;
      doorsGroup.add(door);
      
      door.depth=ghost.depth;
      ghost.depth=ghost.depth+1;
      
      
    }
  
  
}
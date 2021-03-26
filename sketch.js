var trex, trex_running, edges;
var ground, groundImage
var invisibileground
var cloud, cloudImage
var ob1,ob2,ob3,ob4,ob5,ob6
var gameState = "play"
var cloudgroup
var obstaclegroup
var gameover
var restart
var gameovers
var restarts
var score = 0
var jumpsound
var diesound
var checkpointsound
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
 groundImage = 
  loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
gameover = loadImage("gameOver.png")
restart = loadImage("restart.png")
jumpsound = loadSound("jump.mp3")
diesound = loadSound("die.mp3")
checkpointsound = loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(600,200);
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
 ground = createSprite(300,188,600,5,);
 ground.addImage("Image", groundImage) 
  trex.scale = 0.5;
  invisibleground = createSprite(300,195,600,5)
  invisibleground.visible = false
  console.log("suhani")
cloudgroup = createGroup()
obstaclegroup = createGroup()
trex.setCollider("circle",0,0,50)
trex.debug = false
gameovers = createSprite(300,50,20,20)
gameovers.addImage("Image", gameover)
restarts = createSprite(300,100,20,20)
restarts.addImage("Image", restart)
restarts.scale = 0.5
} 


function draw(){     

  background("white");
text ("Score:"+score,540,25)
if(gameState == "play"){
 ground.velocityX = -5
 if(ground.x<0)
  {
    ground.x =300
  }
if(score%200==0){
checkpointsound.play()
}
  if(keyDown("space")&&trex.y>=120){
  trex.velocityY= -15
jumpsound.play()
} 
   trex.velocityY= trex.velocityY +1
  makeclouds() 
makeobstacles()
restarts.visible = false
gameovers.visible = false
score = score+1
if(trex.isTouching(obstaclegroup)){
gameState = "end"
diesound.play()
}
}
if(gameState=="end"){
restarts.visible = true
gameovers.visible = true
ground.velocityX = 0 
obstaclegroup.setVelocityXEach(0)
cloudgroup.setVelocityXEach(0)
if(mousePressedOver(restarts)){
reset()

}
}
trex.collide(invisibleground)


  drawSprites();
}
function makeclouds(){
if(frameCount%60==0)
  {
cloud=createSprite(550,random,20,20)
cloud.addImage("Image", cloudImage)
  cloud.y = random(10,80)
cloud.velocityX = -5
cloudgroup.add(cloud)  
   
  }
}
function makeobstacles(){
  if(frameCount%60==0){
  
obstacle=createSprite(570,180,10,5)
  obstacle.velocityX = -6
var s = Math.round(random(1,6))
switch(s)
{
  case 1:obstacle.addImage("ob1", ob1)
  break
  case 2:obstacle.addImage("ob2",ob2)
  break
  case 3:obstacle.addImage("ob3", ob3)
  break
  case 4:obstacle.addImage("ob4", ob4)
  break
  case 5:obstacle.addImage("ob5", ob5)
  break
  case 6:obstacle.addImage("ob6", ob6)
  break
} 
  obstacle.scale = 0.5
  obstaclegroup.add(obstacle)

  
}
}
function reset(){
gameState = "play"
obstaclegroup.destroyEach()
cloudgroup.destroyEach()
score = 0
}
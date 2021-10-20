const PLAY = 1
const END = 0
var gameState = PLAY
var ground,groundImg
var cloudsGroup, obstaclesGroup
var obstacle,ob1,ob2,ob3,ob4,ob5,ob6
var cloud, cloudImg
var invisibleGround
var trex ,trexImg;
var score = 0
var collideImg
var gameOver, gameOverImg
var restart, restartImg
var checkpoint_sound
var jump_sound
var die_sound



function preload(){
  trexImg = loadAnimation("trex1.png","trex3.png","trex4.png")
groundImg = loadImage("ground2.png")
cloudImg = loadImage("cloud.png")
ob1 = loadImage("obstacle1.png")
ob2 = loadImage("obstacle2.png")
ob3 = loadImage("obstacle3.png")
ob4 = loadImage("obstacle4.png")
ob5 = loadImage("obstacle5.png")
ob6 = loadImage("obstacle6.png")
collideImg = loadImage("trex_collided.png")
gameOverImg = loadImage("gameOver.png")
restartImg = loadImage("restart.png")
checkpoint_sound = loadSound("checkpoint.mp3")
jump_sound = loadSound("jump.mp3")
die_sound = loadSound("die.mp3")
}

function setup(){
  createCanvas(600,200)
  trex = createSprite(50,180,20,50)
trex.addAnimation("t",trexImg)
trex.addAnimation("collide",collideImg)
trex.scale = 0.5
 
ground = createSprite(200,180,400,20)
ground.addImage("g", groundImg)

invisibleGround = createSprite(200,190,400,10)
invisibleGround.visible = false

cloudsGroup = createGroup()
obstaclesGroup = createGroup()

gameOver = createSprite(300,100)
gameOver.addImage("GO", gameOverImg)
gameOver.scale = 0.5

restart = createSprite(300,140)
restart.addImage("R", restartImg)
restart.scale = 0.5
}

function draw(){
  background("white")

  text("SCORE: " + score, 500,50)

if (gameState === PLAY){

  gameOver.visible = false
  restart.visible = false

score = score + Math.round (frameCount / 60)
if (score > 0 && score%100 === 0){

checkpoint_sound.play()

}
ground.velocityX = -2

if (ground.x < 0){

  ground.x = ground.width / 2 
  }

  if(keyDown("space") && trex.y > 161.5){


    trex.velocityY = -10
     
jump_sound.play()


    }
    
    console.log(trex.y)
    
    
    trex.velocityY = trex.velocityY + 0.75

    spawnCloud()

    spawnObstacle()

if (trex.isTouching(obstaclesGroup)){
die_sound.play()
gameState = END

}

} else if(gameState === END){

  gameOver.visible = true
  restart.visible = true
trex.velocityY = 0

  trex.changeAnimation("collide", collideImg)
  ground.velocityX = 0
  obstaclesGroup.setVelocityXEach(0)
cloudsGroup.setVelocityXEach(0)


}

  trex.collide(invisibleGround)

drawSprites()
}

function spawnCloud(){

if (frameCount%60 == 0){

cloud = createSprite(600,100,40,10)
cloud.velocityX = -3
cloud.addImage("c", cloudImg)
cloud.scale = 0.5
cloud.y = Math.round(random(10,60))
cloud.depth = trex.depth
trex.depth = trex.depth +1
cloud.lifetime = 600 / 3
cloudsGroup.add(cloud)


}
}

function spawnObstacle(){

if (frameCount%60 == 0){

  obstacle = createSprite(600,165,10,40)
obstacle.velocityX = -6
var rand = Math.round(random(1,6))
obstacle.scale = 0.5
switch (rand){

case 1: obstacle.addImage("1",ob1,)
break

case 2: obstacle.addImage("2",ob2,)
break

case 3: obstacle.addImage("3",ob3,)
break

case 4: obstacle.addImage("4",ob4,)
break

case 5: obstacle.addImage("5",ob5,)
break

case 6: obstacle.addImage("6",ob6,)
break

default:break

}
obstacle.depth = trex.depth
trex.depth = trex.depth +1
obstaclesGroup.add(obstacle)
}

} 
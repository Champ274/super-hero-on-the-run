
var bg1,bg1img
var gamestate="wel"
var bg2,bg2img
var sh,shimg
var ground
var Obstacle,obimg
var score=0
var coinsgroup
var ObstaclesGroup 
var lives=3
//var rand = randomNumber(1,1000);
function preload()
{
bg1img=loadImage("c.png")
bg2img=loadImage("r1.png")
shimg=loadImage("2.png")
obimg=loadImage("aero21.png")
balimg=loadImage("hot1.png")
coinimg=loadImage("coin.png")
bulletimg=loadImage('bullet2.png')
}

function setup() {
	createCanvas(windowWidth,windowHeight);
bg1 = createSprite(width/2,300,800,500)
bg1.addImage(bg1img) 
bg1.scale=2
bg2 = createSprite(width/2,300,800,500)
bg2.addImage(bg2img)
bg2.scale=6
bg2.visible=false
sh= createSprite(width/2,height-40,20,20)
sh.addImage(shimg)
sh.scale=0.92
sh.visible=false
//sh.debug=true

bg2.y=bg2.height/2
ground=createSprite(width/2+300,height-40,20,600)
ground1=createSprite(width/2-310,height-40,20,600)
ground.visible=true
ground1.visible=true

 coinsGroup = new Group();
 ObstaclesGroup = new Group();
 balgroup= new Group();
 bulletgroup=new Group()
}


function draw() {
 
  background(0);
  drawSprites();
 if(keyDown("space")){
	 gamestate="play"
 }
 if(gamestate==="play"){
bg2.visible=true
sh.visible=true
bg2.velocityY=6
spawnObstacles();
spawnbal();
 spawncoin();
sh.bounceOff(ground)
sh.bounceOff(ground1)
if(bg2.y>600){
  bg2.y=bg2.height/4
}
sh.x=mouseX;
// if(keyDown("left")){
//   sh.x=sh.x-5
// }
// if(keyDown("right")){
//   sh.x=sh.x+5
// }
textSize(25)
fill("dark blue")
text("score:"+score,670,30)
text("lives:"+lives,670,70)
if(score>=4){
  spawnbullet()
  ObstaclesGroup.destroyEach()
  balgroup.destroyEach()
  //coinsgroup.destroyEach()

}

if(score>=6){
  gamestate="win"
}



for(var i=0;i<coinsGroup.length;i++){
  if(coinsGroup.get(i).isTouching(sh)){
    score=score+1
    //coinsGroup.destroyEach()
    coinsGroup.get(i).destroy()
  }
} 


for(var i=0;i<ObstaclesGroup.length;i++){
  if(ObstaclesGroup.get(i).isTouching(sh)){
    lives=lives-1
    
    ObstaclesGroup.get(i).destroy()
  }
}


for(var i=0;i<balgroup.length;i++){
  if(balgroup.get(i).isTouching(sh)){
    lives=lives-1
   
    balgroup.get(i).destroy()
  }
}


for(var i=0;i<bulletlgroup.length;i++){
  if(bulletgroup.get(i).isTouching(sh)){
    lives=lives-1
   
    bulletgroup.get(i).destroy()
  }
}



if(lives<=0){
  gamestate="end"
}
 }
  
 if(gamestate==="wel"){ textSize(30)
  stroke("dark blue")
  text("Super Hero On The Run",width/2-100,90)
  text("Press SPACE to start",width/2-80,300)
  text("Dodge obstacles till Score 20 ",width/2-100,400)
 text("Dodge bullets till score 30 in order to win the game",width/2-170,440)
 }


if(gamestate==="win"){
  coinsGroup.destroyEach()
  balgroup.destroyEach()
  ObstaclesGroup.destroyEach()
  bulletgroup.destroyEach()
  textSize(40)
  stroke("dark blue")
  text("YOU WIN!!!GREAT CHAMP",300,300)
bg2.velocityY=0
}


if(gamestate==="end"){
  bg2.velocityY=0
  coinsGroup.destroyEach()
  balgroup.destroyEach()
  ObstaclesGroup.destroyEach()
  textSize(40)
  stroke("dark blue")
  text("GAME OVER!!!Nice Try",300,300)
}
}
 
 function spawnObstacles() {
  if(World.frameCount % 120 === 0) {
    var obstacle = createSprite(20,5,10,40);
    obstacle.velocityY = 8;
    obstacle.addImage(obimg)
   // obstacle.debug=true
    obstacle.setCollider('rectangle',0,0,170,200)
    obstacle.x = random(width/2-200,width/2+200);
    
              
    obstacle.scale = 0.5;
    obstacle.lifetime = 120;
    
  
    ObstaclesGroup.add(obstacle);
  }
 }
 
 function spawnbal() {
  if(World.frameCount % 207 === 0) {
    var bal = createSprite(10,5,10,40);
    bal.velocityY = 8;
    bal.addImage(balimg)
  //bal.debug=true
  bal.setCollider('rectangle',0,0,150,200)
    bal.x=random(width/2-200,width/2+200)
              
    bal.scale = 0.5;
    bal.lifetime = 130;
    balgroup.add(bal)
  
  }
 }
 function spawncoin() {
  if(World.frameCount % 287=== 0) {
    var coin = createSprite(10,5,10,40);
    coin.velocityY = 8;
    coin.addImage(coinimg)
  
    coin.x=random(width/2-200,width/2+200)
              
    coin.scale = 0.15;
    coin.lifetime = 130;
    
  coinsGroup.add(coin)
  }
 }


function spawnbullet(){
  if(World.frameCount % 40===0){
    var bullet=createSprite(10,5,10,40)
    bullet.velocityY=8;
    bullet.addImage(bulletimg)
    bullet.x=random(width/2-200,width/2+200)
    bullet.scale=0.15
    bullet.lifetime= 130
    bulletgroup.add(bullet)
  }
}



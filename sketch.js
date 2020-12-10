var sword;
// Game States
var PLAY = 1;
var END = 0;
var gameState = 1;
var score = 0;
var fruitgroup, enemyGroup;
var fruit, monster;
var knifeSwooshSound;
var gameoverSound;

function preload(){
  swordImage = loadImage ("sword.png");
  fruit1 = loadImage ("fruit1.png");
  fruit2 = loadImage ("fruit2.png");
  fruit3 = loadImage ("fruit3.png");
  fruit4 = loadImage ("fruit4.png");
  monsterImage = loadAnimation ("alien1.png", "alien2.png")
  gameOverImage = loadImage ("gameover.png");
  knifeSwooshSound = loadSound ("knifeSwooshSound.mp3");
  gameoverSound = loadSound ("gameover.mp3")
}

function setup() {
  createCanvas (500, 500)  

  //creating sword
  sword = createSprite (40, 200, 20, 20);
  sword.addImage (swordImage);
  sword.scale=0.7;
  
  fruitgroup = createGroup();
  enemyGroup = createGroup();
  //sword.debug = true;
  score = 0;
}
  

function draw(){
  
  background ("BurlyWood");
  //displaying score
  
  if (gameState === 1) {
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    //call fruits and Enemy function
    fruits();
    Enemy();
    
    // increase score if sword touching fruit
     if (fruitgroup.isTouching(sword)) {
       fruitgroup.destroyEach();
       knifeSwooshSound.play();
       score = score + 2
     }
    
     if (enemyGroup.isTouching(sword)) {
         gameState = END;
         //gameover sound
         gameoverSound.play();
         }
    }
  
  if (gameState === 0 ) {
    // change the animation of sword to gameover and reset its position
    sword.addImage(gameOverImage);
    sword.x = 250;
    sword.y = 250;
    fruit.velocityX = 0;
    monster.velocityX = 0;
  } 
  
  drawSprites();
  
  text("Score: "+ score, 400,50);
}
function fruits(){
  if (World.frameCount%80===0){
    position = (Math.round(random(1,2)));
    fruit = createSprite (400, 200, 20, 20);
    fruit.scale = 0.2;
    //fruit.debug = true;
    r = Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage (fruit2);
    } else if (r == 3) {
      fruit.addImage (fruit3);
    } else {
      fruit.addImage (fruit4);
    }
    
    if (position == 1) {
      fruit.x = 400;
      fruit.velocityX = -(7+(score/4));
    }
    else 
    {
      if (position == 2) {
        fruit.x = 0;
        // increase the velocity of fruit after score === 4
        fruit.velocityX = (7+ (score/4));
      }
    }
    
    fruit.y = Math.round(random(50, 500));
  
    fruit.setLifetime = 100;
    fruitgroup.add(fruit);
  }
}

function Enemy() {
  if (World.frameCount%200 === 0) {
    monster = createSprite (400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -(8+ (score/10));
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}
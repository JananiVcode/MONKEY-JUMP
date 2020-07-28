//DECLARE GLOBAL VARIABLES
var monkey, monkey_running, jungle, jungle_Image, banana;
var obstaclesGroup, bananasGroup, banana_Image, stone_Image;
var score = 0;

//DECLARE THE GAMESTATES
var gameState= 1;
var PLAY =1;
var END =0;



function preload() {

  //LOAD THE IMAGES REQUIRED
  monkey_running = loadAnimation("Monkey_01.png",    "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",  "Monkey_05.png", "Monkey_06.png","Monkey_07.png", "Monkey_08.png", "Monkey_09.png");
  jungle_Image = loadImage("jungle.jpg");
  banana_Image = loadImage("Banana.png");
  groundImage = loadImage("ground.jpg");
  stone_Image = loadImage("stone.png");
}


function setup() {
  createCanvas(400, 300);

  //CREATE THE SPRITES REQUIRED
  
  jungle = createSprite(400, 140, 10, 10);
  jungle.addImage(jungle_Image);
  jungle.scale = 0.8;
  monkey = createSprite(40, 250, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.10;
  ground = createSprite(200, 290, 450, 10);
  obstaclesGroup = new Group();
  bananasGroup = new Group();
  
}

function draw() {
  
  //GAMESTATE PLAY
  if(gameState===1){
    
  //RESET JUNGLE
   if (jungle.x < 0) {
    jungle.x = jungle.width / 3;
  }

  //JUNGLE VELOCITY
  jungle.velocityX = -10;
    
  // CODE FOR THE MONKEY TO JUMP
  if (keyDown("space")) {
    monkey.velocityY = -10;
  }

  //GRAVITY FOR THE MONKEY
  monkey.velocityY = monkey.velocityY + 0.8;
    
  //INVISIBLE GROUND
  monkey.collide(ground);
  ground.visible = false;

  //CODE FOR MONKEY TO NOT GO BEYOND 100 VERTICALLY
  if (monkey.y < 100) {
    monkey.velocityY = 5;
  }

  //INCREASING SCORE WHEN MONKEY TOUCHES THE BANANA
  if (monkey.isTouching(bananasGroup)) {
    score = score + 1;
    bananasGroup.destroyEach();
  }
    
  //SWITCH SCORE CODE
  switch (score) {

    case 5:
      monkey.scale = 0.12;
      break;
    case 10:
      monkey.scale = 0.14;
      break;
    case 15:
      monkey.scale = 0.16;
      break;
    case 20:
      monkey.scale = 0.18;
      break;
    case 25:
      monkey.scale = 0.20;
      break;
    case 30:
      monkey.scale = 0.25;
      break;

    default:break;
  }

  //CODE FOR THE GAME TO END WHEN THE MONKEY TOUCHES THE OBSTACLE
  if (obstaclesGroup.isTouching(monkey)) {
   gameState = END;
  }
}
  
//GAMESTATE END
if(gameState===0){
   monkey.scale = 0.10;
   jungle.velocityX =0;
   obstaclesGroup.setVelocityXEach(0);
   bananasGroup.setVelocityXEach(0);
   bananasGroup.setLifetimeEach(0);
   bananasGroup.destroyEach();
   monkey.velocityY =0;
  }
 
  //DECLARE SPAWN FUNCTIONS
  spawnObstacles();
  spawnBananas();
  
  //DRAWSPRITES
  drawSprites();
  
  //TEXT 
  stroke("white");
  textSize(15);
  fill("black");
  text("SCORE: " + score, 300, 50);
  
  if (gameState===0){
    text("GAME OVER",150,100);
    text("PRESS R TO RESTART",120,120);
    }
  
  //CODE TO RESTART GAME
  if(keyDown("r")){
    gameState = 1;
    obstaclesGroup.destroyEach();
    score=0;
  }
}

//FUNCTION SPAWN OBSTACLES
function spawnObstacles() {

  if (frameCount % 120 === 0) {
    var obstacle = createSprite(460, 270, 50, 50);
    obstacle.addImage(stone_Image);
    obstacle.scale = 0.15;
    obstacle.velocityX = -10;
    obstaclesGroup.add(obstacle);
  }
}

//FUNCTION SPAWN BANANAS
function spawnBananas(){
  if (frameCount % 50 === 0) {
    var banana = createSprite(460, 120, 10, 10);
    banana.addImage(banana_Image);
    banana.scale = 0.10;
    banana.velocityX = -10;
    bananasGroup.add(banana);
  }
}
//VARIABLES GLOBALES 
var PLAY=1;
var END=0;
var gameState= PLAY;
var Trex, Trex_running, Trex_collided;
var suelo, gsuelo, sueloinvisible;
var cloud2;
var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;
var grupobimbo, grupoverde;

var reinicio, reinicioImg;

//Guardar todas las imagenes antes de asignarlas a un sprite
function preload(){
  Trex_running = loadAnimation("trex1.png","trex3.png", "trex4.png");
  Trex_collided = loadAnimation("trex_collided.png");

  gsuelo = loadImage("ground2.png");
  cloud2 = loadImage("cloud.png");

  cactus1=loadImage("Obstacle1.png");
  cactus2=loadImage("Obstacle2.png");
  cactus3=loadImage("Obstacle3.png");
  cactus4=loadImage("Obstacle4.png");
  cactus5=loadImage("Obstacle5.png");
  cactus6=loadImage("Obstacle6.png");

  reinicioImg= loadImage("restart.png");
}

//Ejecuta solo una vez durante tu juego
function setup(){
  Trex= createSprite(25,180,10,20);
  Trex.addAnimation("running",Trex_running);
  Trex.addAnimation("collided", Trex_collided);
  Trex.scale=0.4;

  suelo = createSprite(300,185,300,10);
  suelo.velocityX=-3
  suelo.addImage("ground", gsuelo);
  
  sueloinvisible = createSprite(100,197,200,5);
  sueloinvisible.visible = false;

  reinicio=createSprite(300,100);
  reinicio.addImage(reinicioImg);

  grupobimbo=createGroup();
  grupoverde=createGroup();
 }

//Realiza los movimientos del juego 
function draw(){
  createCanvas(600,200);
  background(180);

  if(gameState == PLAY){
    
    if (suelo.x < 0){
      suelo.x = suelo.width/2;
   }

   if(keyDown("space") && Trex.y >=140){
    Trex.velocityY = -8;
  }
  //Gravedad
  Trex.velocityY = Trex.velocityY + 0.4;

  Nubes();
  Cactuses();

  if(grupoverde.isTouching(Trex)){
    gameState=END;
  }
  }
  
  else if(gameState == END){
    suelo.velocityX=0;

    Trex.changeAnimation("collided", Trex_collided );

    grupobimbo.setLifetimeEach(-1)
    grupoverde.setLifetimeEach(-1)

    grupobimbo.setVelocityXEach(0);
    grupoverde.setVelocityXEach(0);

  }
  Trex.collide(sueloinvisible);
  drawSprites();
}

function Nubes(){
  //Condicion que crea las nubes cada 60 frames/escenas
  if(frameCount % 60 == 0 ){ 
  //Crea el sprite de la nube
  var cloud = createSprite(550,30,20,20);
  //Da velocidad de 3 a la izquierda
  cloud.velocityX= -3;
  //Crea las nubes en posiciones aleatorias de Y entre 10 y 60
  cloud.Y = Math.round(random(10,60));
  //Agrega la imagen al sprite de la nube
  cloud.addImage("nube",cloud2);
  //Reduce su tamaño original
  cloud.scale = 0.5
  cloud.lifetime =200;
  grupobimbo.add(cloud);

  //Misma profundidad
  Trex.depth=cloud.depth
  //Le sumamos uno de profundidad
  Trex.depth+=1
  }
}

function Cactuses(){
  if(frameCount % 50 == 0){
    var cactus = createSprite(600,175,10,40);
    cactus.velocityX= -3;

    var uno= Math.round(random(1,6));

    switch(uno){
      case 1: cactus.addImage(cactus1);
      break;
      case 2: cactus.addImage(cactus2);
      break;
      case 3: cactus.addImage(cactus3);
      break;
      case 4: cactus.addImage(cactus4);
      break;
      case 5: cactus.addImage(cactus5);
      break;
      case 6: cactus.addImage(cactus6);
      break;
      default: break;
    }
    cactus.scale=0.4;
    cactus.lifetime=230;
    grupoverde.add(cactus);
  }
}


function restart(){
  gameState = PLAY;

}


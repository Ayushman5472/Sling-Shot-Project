const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var block1,block2, block3;
var backgroundImg,platform;
var square, slingshot;

var gameState = "attached";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);


    block1 = new Block(810, 200);
    log1 = new Log(810,260,300, PI/2);

    block2 = new Block(810, 200);


    block3 = new Block(810,200)

  square = new Square(200,220);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(square.body,{x:200, y:220});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);

    Engine.update(engine);
    ground.display();
    block1.display();
    log1.display();

    block2.display();
  

    block3.display();
    square.display();

    slingshot.display();   

}

function mouseDragged(){
    if (gameState == "attached"){
        Matter.Body.setPosition(square.body, {x: mouseX , y: mouseY});
    }
}

function mouseReleased(){
    slingshot.fly();
    gameState = "notAttached";
}

function keyPressed(){
    if(keyCode === 82){
       Matter.Body.setPosition(square.body,{x:200,y:50})
        slingshot.attach(square.body);
       gameState = "attached"
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
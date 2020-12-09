var database;
var item;

function preload()
{
 dogimg1 = loadImage("images/sadDog.png");
 dogimg2 = loadImage("images/happyDog.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  dog = createSprite(200, 200, 20, 20);
  dog.addImage(dogimg1);
  dog.scale = 0.5;

  var foodLeft = database.ref('Food');
  foodLeft.on("value", readFood, showError);
}


function draw() {
  
  background("white");

  drawSprites();
  if(keyWentDown(UP_ARROW)){
    writeFood(item);
    dog.addImage(dogimg2);
  }

  text("PRESS UP ARROW KEY TO FEED THE DOG", 400, 300);

}

function writeFood(x){
  x = x - 1;
  if(x < 0){
    x = 0;
  }
  database.ref('/').update({
    Food:x
  })
}


function readFood(data){
  item = data.val();
}

function showError(){
  console.log("errorInReadingDatabase");
}

//clearInterval(game); - остановка игры

const canvas = document.getElementById("game"); //берем данные из snake.html
const ctx = canvas.getContext("2d");

const background = new Image();
background.src="image/background.png";

const foodImg = new Image();
foodImg.src="image/food.png";

let box = 32; //ширина одного квадрата(для food)
let score = 0;
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box, //еда будет появляться в рандомном месте от 1 до 17
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

//SNAKE
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

//коды клавиш
document.addEventListener("keydown", direction);

let dir;

//коды клавиш
function direction(event) {
    if(event.keyCode == 37 && dir !="right")
    dir = "left";
    else if(event.keyCode == 38 && dir !="down")
    dir = "up";
    else if(event.keyCode == 39 && dir !="left")
    dir = "right";
    else if(event.keyCode == 40 && dir !="up")
    dir = "down";
}


//чтобы игра заканчивалась, когда змейка ест свой хвост
function eatTail(head, arr) {
    for(let i = 0; i < arr.lenght; i=i+1) {
    if(head.x == arr[i].x && head.y == arr[i].y)
    clearInterval(game);
  }
}

function drawGame() { //эту функцию будем вызывать каждые 100 милисекунд
    ctx.drawImage(background, 0, 0); //без интервала не показывалась бы картинка

    ctx.drawImage(foodImg, food.x, food.y);

    for(let i = 0; i < snake.length; i=i+1) {
    ctx.fillStyle = i == 0 ? "#41D0BD" : "#FF6C6C"; //цвета змейки
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

//текст
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7)

//передвижение змейки
let snakeX = snake[0].x;
let snakeY = snake[0].y;

//чтобы змейка могла кушать еду
if(snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
        x: Math.floor((Math.random() * 17 + 1)) * box, 
        y: Math.floor((Math.random() * 15 + 3)) * box,
    };
} else {
    snake.pop();
}

//чтобы игра заканчивалась, когда выходим за рамки
if(snakeX < box || snakeX > box * 19.5
    || snakeY < 0.7 * box || snakeY > box* 19)
    clearInterval(game);

// snake.pop();//удаление последнего элемента в массиве

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
      x: snakeX,
      y: snakeY
  };

  eatTail(newHead, snake);
 
  //добавление головы, когда ест еду
  snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);
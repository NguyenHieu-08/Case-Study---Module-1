const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");    //Có nhiều hàm dùng để vẽ hình hộp, hình tròn hay chữ ...

let x = canvas.width / 2; //Để quả banh nằm ở giữa canvas
let y = canvas.height - 30; //Cách đáy khoảng 30;

//Giúp trái banh di chuyển
let dx = 2;     //(+): bên phải. (-): Bên trái
let dy = -2; // (+): Hướng xuống. (-): Hướng lên trên

const BALL_RADIUS = 10; //Bán kính quả bóng
const ANGLE_MOVE = 30; //Góc di chuyển
const SPEED_MOVE = 100; //Tốc độ di chuyển

//Bar
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2; //Điểm bắt đầu.

//Lưu trữ trạng thái nút điều kiển
let rightPressed = false;
let leftPressed = false;

/****************************************************Xử lý sự kiện******************************************************************** */
//Lắng nghe sự kiện phím nhấn
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        leftPressed = false;
    }
}

/*---------------------------------------------------OOP-----------------------------------------------------------------------*/
/*Trái Bóng*/
let Ball = function (xBall, yBall, ANGLE_MOVE, SPEED_MOVE) {
    this.xBall = xBall;
    this.yBall = yBall;
    this.angleMove = ANGLE_MOVE;
    this.speedMove = SPEED_MOVE;

    //Làm quả bóng di chuyển
    this.move = function () {
        x += dx;
        y += dy;
    }

    //Đổi hướng khi va chạm với viền hoạc thanh đỡ
    this.changeDirection = function () {

        /* - BALLRADIUS: Để quả bóng nảy ra khi vừa va chạm vào tường. Nếu không trừ, bức tường sẽ chạm vào tâm trái bóng. */

        // Nảy ra khỏi trên cùng và dưới cùng 
        if (y + dy < BALL_RADIUS) {
            //Thay đổi hướng bay xuống
            dy = -dy;
        } else if (y + dy > canvas.height - BALL_RADIUS) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                if ((y = y - paddleHeight)) {
                    dy = -dy;
                }
            } else {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval); //To End Game
            }
        }

        //Nảy ra khỏi trái và phải
        if (x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) {
            dx = -dx;
        }
    }

    //Vẽ hình tròn
    this.drawBall = function () {
        ctx.beginPath();
        ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

/*Thanh chắn*/
let Bar = function (widthBar, xBar) {
    this.widthBar = widthBar;
    this.heightBar = paddleHeight;
    this.xBar = xBar;
    this.yBar = canvas.height - paddleHeight;


    this.move = function () {
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            this.moveRight();
        } else if (leftPressed && paddleX > 0) {
            this.moveLeft();
        }
    };

    this.moveLeft = function () {
        paddleX -= 7;
    };

    this.moveRight = function () {
        paddleX += 7;
    };

    this.drawPaddle = function () {
        ctx.beginPath();
        ctx.rect(paddleX, this.yBar, this.widthBar, this.heightBar);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}


function drawGame() {
    /*Trái Bóng*/
    let ball = new Ball(x, y, ANGLE_MOVE, SPEED_MOVE)

    //Xóa dấu vết của bóng cũ đã được vẽ trước đó
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.drawBall();
    ball.move();
    ball.changeDirection();

    /*Thanh Bar*/
    let bar = new Bar(paddleX, paddleWidth);
    bar.drawPaddle();
    bar.move();

}

const interval = setInterval(drawGame, 30); //Sau 10s sẽ cập nhật lại bản vẽ


























let GameBoard = function (width, height) { }


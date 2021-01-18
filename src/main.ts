import { SnakeElement } from "./snakeElement"
import { Food } from "./food"

import { KeyCode, keyListener } from "./decorators/keypress"
import { Sprite } from "./sprite";
import { SnakeHead } from "./snakeHead";
import { Score } from "./scoreBoard";
import { SpecialFood } from "./specialFood";

export class Game {


    private snakeHead: SnakeHead;
    private food: Food;
    private specialFood: SpecialFood;
    private score:Score;


    gameArea:HTMLElement;

    constructor() {
        this.snakeHead = new SnakeHead();
        this.food = new Food();
        this.specialFood = new SpecialFood();
        this.score = Score.getInstance();

        this.gameArea = document.getElementById("gameArea"); 
        this.gameArea.appendChild(this.snakeHead);
        this.gameArea.appendChild(this.food);
        this.gameArea.appendChild(this.specialFood);

        this.snakeHead.x = Math.floor(Math.random() * (parseInt(this.gameArea.style.width) - 0 + 1))/2;
        this.snakeHead.y = Math.floor(Math.random() * (parseInt(this.gameArea.style.height) - 0 + 1))/2;
        this.snakeHead.width = 10;
        this.snakeHead.height = 10;

        this.food.x = Math.floor(Math.random() * (parseInt(this.gameArea.style.width) - 0 + 1)) - this.food.width;
        this.food.y = Math.floor(Math.random() * (parseInt(this.gameArea.style.height) - 0 + 1));
        this.food.width = 10;
        this.food.height = 10;
        this.food.className = "food";

        this.specialFood.x = Math.floor(Math.random() * (parseInt(this.gameArea.style.width) - 0 + 1)) - this.food.width;
        this.specialFood.y = Math.floor(Math.random() * (parseInt(this.gameArea.style.height) - 0 + 1));
        this.specialFood.width = 10;
        this.specialFood.height = 10;
        this.specialFood.className = "specialFood";

        document.addEventListener("keydown", (event) => {
            this.upListener(event);
            this.downListener(event);
            this.leftListener(event);
            this.rightListener(event);
        })

        const scoreArea = document.getElementById("scoreArea");
        scoreArea.appendChild(this.score)
    }

    @keyListener(KeyCode.UP)
    public upListener(event: KeyboardEvent) {
        this?.snakeHead
            .rotation(-90)
            .direction(SnakeHead.Directions.UP)
    }

    @keyListener(KeyCode.DOWN)
    downListener(event: KeyboardEvent) {
        this?.snakeHead
            .rotation(90)
            .direction(SnakeHead.Directions.DOWN)
    }

    @keyListener(KeyCode.LEFT)
    leftListener(event: KeyboardEvent) {
        this?.snakeHead
            .rotation(180)
            .direction(SnakeHead.Directions.LEFT)
    }

    @keyListener(KeyCode.RIGHT)
    rightListener(event: KeyboardEvent) {
        this?.snakeHead
            .rotation(0)
            .direction(SnakeHead.Directions.RIGHT)
    }
}

let a = new Game();
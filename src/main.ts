import { SnakeElement } from "./snakeElement"
import { Food } from "./food"

import { KeyCode, keyListener } from "./decorators/keypress"
import { Sprite } from "./sprite";

export class Game {
    components = {
        SnakeElement
    }

    private snakeHead: SnakeElement;
    private food: Food;
    gameArea:HTMLElement;

    constructor() {
        this.snakeHead = new SnakeElement();
        this.food = new Food();

        this.gameArea = document.getElementById("gameArea");
        this.gameArea.appendChild(this.snakeHead);
        this.gameArea.appendChild(this.food);

        this.snakeHead.x = 300;
        this.snakeHead.y = 150;
        this.snakeHead.width = 10;
        this.snakeHead.height = 10;

        this.food.x = Math.floor(Math.random() * (parseInt(this.gameArea.style.width) - 0 + 1)) - this.food.width;
        this.food.y = Math.floor(Math.random() * (parseInt(this.gameArea.style.height) - 0 + 1));
        this.food.width = 10;
        this.food.height = 10;

        document.addEventListener("keydown", (event) => {
            this.upListener(event);
            this.downListener(event);
            this.leftListener(event);
            this.rightListener(event);
        })

        setInterval(() => {
            this.isColliding(this.snakeHead, this.food);
        }, 100)

    }

    isColliding(snakeHead: Sprite, food: Sprite) {
        var object_1 = snakeHead.getBoundingClientRect();
        var object_2 = food.getBoundingClientRect();

        if (object_1.left < object_2.left + object_2.width && object_1.left + object_1.width > object_2.left &&
            object_1.top < object_2.top + object_2.height && object_1.top + object_1.height > object_2.top) {
            this.food.x = Math.floor(Math.random() * (parseInt(this.gameArea.style.width) - 0 + 1)) - this.food.width;
            this.food.y = Math.floor(Math.random() * (parseInt(this.gameArea.style.height) - 0 + 1)) - this.food.height;
            this.snakeHead.eat();
        }
        else {
        }
    }

    @keyListener(KeyCode.UP)
    public upListener(event: KeyboardEvent) {
        this?.snakeHead
            .rotation(-90)
            .direction(SnakeElement.Directions.UP)
    }

    @keyListener(KeyCode.DOWN)
    downListener(event: KeyboardEvent) {
        this?.snakeHead
            .rotation(90)
            .direction(SnakeElement.Directions.DOWN)
    }

    @keyListener(KeyCode.LEFT)
    leftListener(event: KeyboardEvent) {
        this?.snakeHead
            .rotation(180)
            .direction(SnakeElement.Directions.LEFT)
    }

    @keyListener(KeyCode.RIGHT)
    rightListener(event: KeyboardEvent) {
        this?.snakeHead
            .rotation(0)
            .direction(SnakeElement.Directions.RIGHT)
    }
}

let a = new Game();
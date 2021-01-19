import { Component } from "./decorators/components";
import { Food } from "./food";
import { Score } from "./scoreBoard";
import { SnakeElement } from "./snakeElement";
import { SpecialFood } from "./specialFood";
import { Sprite } from "./sprite";

@Component({
    selector: 'snake-head',
    template: `<img style="width:100%; top: 0px; left: 0px; position: absolute;" src="./dist/assets/HEAD.png" />`,
    style: `:host {
      position: absolute;
    }`,
    useShadow: true
})
export class SnakeHead extends SnakeElement {

    public static Directions = {
        LEFT: 'left',
        RIGHT: 'right',
        UP: 'up',
        DOWN: 'down'
    }

    private _direction = SnakeHead.Directions.RIGHT;
    private snakeSize = 2000;
    private eaten = false;
    private speed =4;
    private biteWeight = 1000;

    private gameOver = false;

    private gameLoopInterval: any;


    constructor(isClone: boolean = false, ttl: number = 0) {
        super();
        if (!isClone) {
           this.gameLoopInterval = setInterval(() => {
                this.move();
            }, 100 / this.speed)
        }
    }

    private resetInterval() {
        clearInterval(this.gameLoopInterval);
        this.gameLoopInterval = setInterval(() => {
            this.move();
        }, 100 / this.speed)
    }





    private move() {
        if (this.gameOver)
            return;

        const snakeElement = new SnakeElement(true, this.snakeSize / this.speed);
        snakeElement.x = this.x+this.width/4;
        snakeElement.y = this.y+this.width/4;
        snakeElement.width = this.width/2;
        snakeElement.height = this.height/2;


        setTimeout(() => {
            snakeElement.className = "snakeElement";
        }, 700);
        this.parentElement.prepend(snakeElement);

        if (this.eaten) {
            (<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.height = `${this.height/2 + 2}px`;
            (<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.width = `${this.width/2 + 2}px`;
            snakeElement.x -= 1;
            snakeElement.y -= 1;
            (<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.backgroundColor = '#569c59';

            if(this.numberOfBites == 5) {
                this.numberOfBites = 0;
                const specialFood = (<SpecialFood>document.getElementsByClassName("specialFood")[0]);
                specialFood.display();
                if (this.foodCollision(this, specialFood)) {
                    specialFood.x = (Math.random() * (parseInt(this.parentElement.style.width) - specialFood.width));
                    specialFood.y = (Math.random() * (parseInt(this.parentElement.style.height) - specialFood.height));
                }
            }
                
            this.eaten = false;
        }

        const food = (<Food>document.getElementsByClassName("food")[0]);
        const snakeElements: HTMLCollectionOf<Element> = document.getElementsByClassName("snakeElement");
        if (this.foodCollision(this, food)) {
            food.x = (Math.random() * (parseInt(this.parentElement.style.width) - food.width));
            food.y = (Math.random() * (parseInt(this.parentElement.style.height) - food.height));
            this.eat();
        }

        const specialFood = (<SpecialFood>document.getElementsByClassName("specialFood")[0]);
        if (this.foodCollision(this, specialFood)) {
            specialFood.hide();
            Score.getInstance().addScore(70);
            (<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.height = `${this.height/2 + 2}px`;
            (<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.width = `${this.width/2 + 2}px`;
            snakeElement.x -= 1;
            snakeElement.y -= 1;
            (<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.backgroundColor = '#569c59';
        }

        for (let element of snakeElements) {
            if (this.foodCollision(this, element)) {
                this.gameOver = true;
            }

            if (this.foodCollision(food, element)) {
                food.x = (Math.random() * (parseInt(this.parentElement.style.width) - food.width));
                food.y = (Math.random() * (parseInt(this.parentElement.style.height) - food.height));
            }

            if (specialFood.style.display == "block" && this.foodCollision(specialFood, element)) {
                specialFood.x = (Math.random() * (parseInt(this.parentElement.style.width) - specialFood.width));
                specialFood.y = (Math.random() * (parseInt(this.parentElement.style.height) - specialFood.height));
            }
        }

        

        const score = Score.getInstance().score;

        if(score > 30) {
            Score.getInstance().setSpeed(2);
            if(this.speed != 7)
                this.speed = 7;
            this.resetInterval();
        }

        if(score > 250) {
            Score.getInstance().setSpeed(3);
            if(this.speed != 10)
                this.speed = 10;
            this.resetInterval();
        }

        if(score > 700) {
            Score.getInstance().setSpeed(4);
            if(this.speed != 12)
                this.speed = 15;
            this.resetInterval();
        }

        if(score > 2000) {
            Score.getInstance().setSpeed(5);
            if(this.speed != 14)
                this.speed = 14;
            this.resetInterval();
        }

        switch (this._direction) {

            case SnakeHead.Directions.DOWN:
                if (this.y <= parseInt(this.parentElement.style.height) - this.height) {
                    this.y += this.width / 10;
                } else {
                    this.y = 0;
                }

                break;
            case SnakeHead.Directions.UP:
                if (this.y >= 0) {
                    this.y -= this.width / 10;
                } else {
                    this.y = parseInt(this.parentElement.style.height) - this.height;
                }

                break;
            case SnakeHead.Directions.LEFT:
                if (this.x >= 0) {
                    this.x -= this.width / 10;
                } else {
                    this.x = parseInt(this.parentElement.style.width) - this.width;
                }

                break;
            case SnakeHead.Directions.RIGHT:
                if (this.x <= parseInt(this.parentElement.style.width) - this.width) {
                    this.x += this.width / 10;
                } else {
                    this.x = 0;
                }

                break;

            default:
                break;
        }





    }

    foodCollision(snakeHead: Sprite, object: any) {
        var object_1 = snakeHead.getBoundingClientRect();
        var object_2 = object.getBoundingClientRect();

        if (object_1.left < object_2.left + object_2.width && object_1.left + object_1.width > object_2.left &&
            object_1.top < object_2.top + object_2.height && object_1.top + object_1.height > object_2.top) {
            return true;

        }
        else {
        }
    }


    public direction(direction: string): SnakeHead {
        this._direction = direction;
        return this;
    }


    public rotation(degrees: Number): SnakeHead {
        this.style.transform = `rotate(${degrees}deg)`;
        return this;
    }


    private numberOfBites = 0;
    public eat() {
        this.numberOfBites += 1;
        Score.getInstance().addScore(10);
        this.snakeSize += this.biteWeight;
        this.eaten = true;
    }

}
import { Component } from "./decorators/components";
import { Food } from "./food";
import { SnakeElement } from "./snakeElement";
import { Sprite } from "./sprite";

@Component({
    selector: 'snake-head',
    template: `<div id="zz"></div>`,
    style: `:host {
      position: absolute;
      background: #ff0000;
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
    private snakeSize = 1000;
    private eaten = false;
    private speed = 7;
    private biteWeight = 1000;

    private gameOver = false;


    constructor(isClone: boolean = false, ttl: number = 0) {
        super();

        if (!isClone) {
            setInterval(() => {
                this.move();
            }, 100 / this.speed)
        }
    }



    private move() {
        if(this.gameOver)
            return;

        const snakeElement = new SnakeElement(true, this.snakeSize / this.speed);
        snakeElement.x = this.x;
        snakeElement.y = this.y;
        snakeElement.width = this.width;
        snakeElement.height = this.height;

        
        setTimeout(() => {
            snakeElement.className = "snakeElement";
        }, 700);
        this.parentElement.appendChild(snakeElement);

        if (this.eaten) {
            (<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.height = `${this.height + 2}px`;
            (<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.width = `${this.width + 2}px`;
            snakeElement.x -= 1;
            snakeElement.y -= 1;
            (<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.backgroundColor = '#009cff';

            this.eaten = false;
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


        const food = (<Food>document.getElementsByClassName("food")[0]);
        const snakeElements: HTMLCollectionOf<Element> = document.getElementsByClassName("snakeElement");
        if (this.foodCollision(this, food)) {
            food.x = (Math.random() * (parseInt(this.parentElement.style.width) - food.width));
            food.y = (Math.random() * (parseInt(this.parentElement.style.height) - food.height));
            this.eat();
        }

        for(let element of snakeElements) {
            if(this.foodCollision(this, element)) {
                 this.gameOver = true;
            }
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

    public eat() {
        this.snakeSize += this.biteWeight;
        this.eaten = true;
    }

}
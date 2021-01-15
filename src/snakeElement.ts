import { Component } from "./decorators/components";
import { Sprite } from "./sprite";

@Component({
    selector: 'snake-element',
    template: `<div id="zz"></div>`,
    style: `:host {
      position: absolute;
      background: #009cff;
    }`,
    useShadow: true
})
export class SnakeElement extends Sprite {

    public static Directions = {
        LEFT: 'left',
        RIGHT: 'right',
        UP: 'up',
        DOWN: 'down'
    }

    private _direction = SnakeElement.Directions.RIGHT;

    private snakeSize = 300;

    private eaten = false;

    constructor(isClone: boolean = false, ttl: number = 0) {
        super();

        if (!isClone) {
            setInterval(() => {
                this.move();
            }, 40)

            // setInterval(() => {
            //     console.log("add in size");
            //     this.snakeSize += 200;
            // }, 1500)


        } else {
            setTimeout(() => {
                this.remove();
            }, ttl);
        }

        

    }

    private move() {
        const snakeElement = new SnakeElement(true, this.snakeSize);
        snakeElement.x = this.x;
        snakeElement.y = this.y;
        snakeElement.width = this.width;
        snakeElement.height = this.height;
        
        this.parentElement.appendChild(snakeElement);

        if(this.eaten) {``
            console.log((<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.width);
            console.log((<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.height);

            (<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.height = `${this.height+2}px`;
            (<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.width = `${this.width+2}px`;
            snakeElement.x -= 1;
            snakeElement.y -= 1;
             (<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.backgroundColor = '#009cff';

            console.log((<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.width);
            console.log((<HTMLElement>snakeElement.shadowRoot.querySelector('#zz')).style.height);
            this.eaten = false;
        }
        
        switch (this._direction) {

            case SnakeElement.Directions.DOWN:
                if (this.y <= parseInt(this.parentElement.style.height) - this.height)
                    this.y += this.width/4;
                break;
            case SnakeElement.Directions.UP:
                if (this.y >= 0)
                    this.y -= this.width/4;
                break;
            case SnakeElement.Directions.LEFT:
                if (this.x >= 0)
                    this.x -= this.width/4;
                break;
            case SnakeElement.Directions.RIGHT:
                if (this.x <= parseInt(this.parentElement.style.width) - this.width)
                    this.x += this.width/4;
                break;

            default:
                break;
        }
    }

    public direction(direction: string): SnakeElement {
        this._direction = direction;
        return this;
    }


    public rotation(degrees: Number): SnakeElement {
        this.style.transform = `rotate(${degrees}deg)`;
        return this;
    }

    public eat() {
        this.snakeSize += 300;
        this.eaten = true;
    }


} 
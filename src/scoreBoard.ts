import { Component } from "./decorators/components";
import { Sprite } from "./sprite";

@Component({
    selector: 'score-board',
    template: `<div></div>`,
    style: `:host {
      position: absolute;
      background: #fff;
    }`,
    useShadow: true
})
export class Score extends Sprite {

    private scoreTextElement:HTMLElement;
    public score = 0;
    private speed = 1;

    private static instance: Score;

    constructor () {
        super();
    }

    static getInstance(): Score {
        if (!Score.instance) {
          Score.instance = new Score();
        }
    
        return Score.instance;
      }

    public addScore(amount: number) {
        this.score += amount;
        this.scoreTextElement.innerHTML = `<b>Score</b>: ${this.score} - <b>Speed</b> ${this.speed}/5`;
    }

    public setSpeed(speed: number) {
        this.speed = speed;
        this.scoreTextElement.innerHTML = `<b>Score</b>: ${this.score} - <b>Speed</b> ${this.speed}/5`;
    }


    connectedCallback() {
        this.scoreTextElement = document.createElement('div');
        this.scoreTextElement.style.width = "300px";
        this.scoreTextElement.innerHTML = `<b>Score</b>: ${this.score} - <b>Speed</b> ${this.speed}/5`;
        this.shadowRoot.appendChild(this.scoreTextElement)        
    }
}
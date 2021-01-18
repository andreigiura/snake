import { Component } from "./decorators/components";
import { Sprite } from "./sprite";


@Component({
    selector: 'special-food-component',
    template: `<div ></div>`,
    style: `:host {
      position: absolute;
      background: green;
    }`,
    useShadow: true
})
export class SpecialFood extends Sprite {
    constructor() {
        super();
        this.style.display = "none"
    }

    public display() {
        this.style.display = "block";
        setTimeout(() => {
            this.style.display = "none"
        }, 3500);
    }

    public hide() {
        this.style.display = "none";
    }
}
import { Component } from "./decorators/components";
import { Sprite } from "./sprite";


@Component({
    selector: 'special-food-component',
    template: `<img style="width:100%; top: 0px; left: 0px; position: absolute;" src="./dist/assets/mouse.png" />`,
    style: `:host {
      position: absolute;
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
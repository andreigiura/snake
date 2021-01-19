import { Component } from "./decorators/components";
import { Sprite } from "./sprite";

@Component({
    selector: 'snake-element',
    template: `<div id="zz" style="top: 0px; left: 0px; position: absolute;">
    </div>`,
    style: `:host {
      position: absolute;
      background: #569c59;
    }`,
    useShadow: true
})
export class SnakeElement extends Sprite {

    constructor(isClone: boolean = false, ttl: number = 0) {
        super();
        if (isClone) {
            setTimeout(() => {
                this.remove();
            }, ttl);
        }

    }

} 
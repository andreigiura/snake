import { Component } from "./decorators/components";
import { Sprite } from "./sprite";


@Component({
    selector: 'food-component',
    template: `<div ></div>`,
    style: `:host {
      position: absolute;
      background: #000;
    }`,
    useShadow: true
})
export class Food extends Sprite {

}
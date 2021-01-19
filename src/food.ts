import { Component } from "./decorators/components";
import { Sprite } from "./sprite";


@Component({
    selector: 'food-component',
    template: `<img style="width:100%; top: 0px; left: 0px; position: absolute;" src="./dist/assets/APPLE.png" />`,
    style: `:host {
      position: absolute;
    }`,
    useShadow: true
})
export class Food extends Sprite {

}
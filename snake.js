"use strict";
class Main {
    constructor() {
        console.log("test");
    }
}
const snakeGame = new Main();
System.register("snakeElement", [], function (exports_1, context_1) {
    "use strict";
    var SnakeElement;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            SnakeElement = class SnakeElement {
                constructor() {
                    console.log('this is a snake element');
                }
            };
            exports_1("SnakeElement", SnakeElement);
        }
    };
});

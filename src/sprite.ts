export class Sprite extends HTMLElement{
    
    public get x() : number {
        return this._x;
    }
    public set x(x : number) {
        
        this._x = x;
        this.style.left = `${this._x}px`;
    }
    
    public get y() : number {
        return this._y;
    }
    public set y(y : number) {
        this._y = y;
        this.style.top = `${this._y}px`;
    }

    public get width() : number {
        return this._width;
    }
    public set width(width : number) {
        this._width = width;
        this.style.width = `${this._width}px`;
    }

    public get height() : number {
        return this._height;
    }
    public set height(height : number) {
        this._height = height;
        this.style.height = `${height}px`;
    }
    
    private _x: number;
    private _y: number;

    private _width: number;
    private _height: number;



    // connectedCallback() {
    //     const elm = document.createElement('h3');
    //     elm.textContent = 'Boo!';
    //     this.shadowRoot.appendChild(elm);
    // }
}

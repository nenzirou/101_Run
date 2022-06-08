import * as PIXI from "pixi.js";
// テキスト付きのボタンを作成するクラス
export class CreateText extends PIXI.Text {
    textStyle: PIXI.TextStyle;
    constructor(text: string, fontSize: number, x: number, y: number, center: boolean, parent: PIXI.Container) {
        super(text);
        this.textStyle = new PIXI.TextStyle({
            fontFamily: "Arial", // フォント
            fontSize: fontSize,// フォントサイズ
            fill: 0xffffff, // 色(16進数で定義するので#ffffffと書かずに0xffffffと書く)
            dropShadow: true, // ドロップシャドウを有効にする（右下に影をつける）
            dropShadowDistance: 2, // ドロップシャドウの影の距離
        });
        this.style = this.textStyle;
        if (center) this.anchor.set(0.5);
        this.position.set(x, y);
        this.zIndex = 10;
        parent.addChild(this);
    }
}
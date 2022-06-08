import * as PIXI from "pixi.js";
import { CreateText } from "./createText";

// テキスト付きのボタンを作成するクラス
export class CreateButton extends PIXI.Container {
    background: PIXI.Graphics;
    buttonText: CreateText;
    fontSize: number;
    w: number;
    h: number;
    constructor(text: string, width: number, height: number, x: number, y: number, z: number, color: number, fontSize: number, alpha: number, parent: PIXI.Container) {
        super();
        this.background = new PIXI.Graphics();//ボタンの背景描画オブジェクトの作成
        this.drawButton(width, height, color);//ボタンの背景を描画する
        this.alpha = alpha;//透明度設定
        this.setTouch(true);//タッチ可能にする
        this.addChild(this.background); // 背景をボタンコンテナに追加
        this.setText(text, fontSize);//テキストをボタンにセットする
        parent.addChild(this);
        this.setPosition(x, y)//座標設定
        this.zIndex = z;//深度設定
        // this.on('pointertap', () => {
        //     console.log(this.w);
        // });
    }

    //ボタンの背景を描画する
    drawButton(width: number, height: number, color: number) {
        this.w = width;
        this.h = height;
        this.background.clear();//描画を削除
        this.background.beginFill(color, 1); // 色、透明度を指定して描画開始
        this.background.drawRect(0, 0, this.w, this.h); // 位置(0,0)を左上にして、width,heghtの四角形を描画
        this.background.endFill(); // 描画完了
    }

    //テキストをボタンにセットする
    setText(text: string, fontSize: number) {
        this.fontSize = fontSize;
        this.buttonText = new CreateText(text, fontSize, this.width / 2, this.height / 2, true, this);
    }

    //ボタンのタッチ可否を設定する
    setTouch(touch: boolean) {
        this.interactive = touch; // クリック可能にする
        this.background.interactive = touch; // クリック可能にする
        this.background.buttonMode = touch;//クリック可能なマウスカーソルにする
    }
    //ボタンの座標を指定する
    setPosition(x: number, y: number) {
        this.position.set(x - this.w / 2, y - this.h / 2);
    }
}
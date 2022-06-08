import * as PIXI from "pixi.js";
import { CreateButton } from "./createButton";
import { CreateText } from "./createText";
import { GameController } from "./gameController";
import { Scene } from "./scene";
import { Scene_Manager } from "./scene_manager";
import { Score } from "./score";
import { Stage_Manager } from "./stage_manager";

// シーンの変化を管理するクラス
export class Scene_Title extends Scene {
    titleText: CreateText;
    highScoreText: CreateText;
    highTitleText: CreateText;
    startButton: CreateButton;
    tweetButton: CreateButton;
    toGameScene: boolean;
    constructor() {
        super(10);
        this.toGameScene = false;
        this.titleText = new CreateText("走れ、走れおじさん", 32, this.sW / 2, this.sH / 10, true, this);
        this.highScoreText = new CreateText("ハイ" + Score.getScoreText(), 20, this.sW / 2, this.sH / 10 * 7, true, this);
        this.highTitleText = new CreateText("称号：" + Score.getTitle(Score.highScore), 20, this.sW / 2, this.sH / 10 * 8, true, this);
        this.startButton = new CreateButton("スタート", 130, 60, this.sW / 8 * 2, this.sH / 10 * 9, 1, 0xe83743, 16, 1, this);
        this.tweetButton = new CreateButton("Tweetする", 130, 60, this.sW / 8 * 6, this.sH / 10 * 9, 1, 0x239dda, 16, 1, this);
        //スタートボタンを押したときの処理
        this.startButton.on('pointertap', () => {
            this.toGameScene = true;
        });
        //tweetボタンを押したときの処理
        this.tweetButton.on('pointertap', () => {
            const url = encodeURI(""); // ツイートに載せるURLを指定(文字はエンコードする必要がある)
            window.open("http://twitter.com/intent/tweet?text=「走れ、走れおじさん」で最高" + Score.highScore + "kmケツを振りながら走り、称号：" + Score.getTitle(Score.highScore) + "を入手した！&hashtags=NENの遊び場&url=${url}"); //ハッシュタグをsampleにする
        });
    }

    update() {
    }

    updateScore() {
        this.highScoreText.text = "ハイ" + Score.getScoreText();
        this.highTitleText.text = "称号：" + Score.getTitle(Score.score);
        Score.highScore = Score.score;
        Score.score = 0;
    }
}
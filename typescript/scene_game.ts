import * as PIXI from "pixi.js";
import { CreateButton } from "./createButton";
import { CreateText } from "./createText";
import { Entity } from "./entity";
import { GameController } from "./gameController";
import { Ojisan } from "./player";
import { Scene } from "./scene";
import { Score } from "./score";
import { Stage_Ground } from "./stage_ground";
import { Stage_Manager } from "./stage_manager";

// シーンの変化を管理するクラス
export class Scene_Game extends Scene {
    scoreText: CreateText;
    highScoreText: CreateText;
    jumpButton: CreateButton;
    atackButton: CreateButton;
    player: Ojisan;
    stageManager: Stage_Manager;
    toTitleScene: boolean;
    constructor() {
        super(20);
        this.initialize();
    }

    update() {
        this.player.update();
        this.stageManager.update(this.player);
        this.scoreText.text = Score.getScoreText();
        if (this.player.y > 700) {
            this.toTitleScene = true;
            this.initialize();
        }
    }

    initialize() {
        this.removeChildren();
        this.scoreText = new CreateText(Score.getScoreText(), 20, 0, 0, false, this);
        this.highScoreText = new CreateText("ハイスコア：" + Score.highScore + "km", 20, this.sW / 2, 0, false, this);
        this.jumpButton = new CreateButton("ジャンプ", this.sW / 2, 80, this.sW / 4 * 3, this.sH - 40, 10, 0xe83743, 16, 1, this);
        this.atackButton = new CreateButton("急降下", this.sW / 2, 80, this.sW / 4 * 1, this.sH - 40, 10, 0x239dda, 16, 1, this);
        //ジャンプボタンを押したときの処理
        this.jumpButton.on('pointertap', () => {
            this.player.jump();
        });
        //tweetボタンを押したときの処理
        this.atackButton.on('pointertap', () => {
            this.player.dy = 10;
        });
        this.player = Ojisan.create(100, 200, this);
        this.stageManager = new Stage_Manager(this);
    }
}
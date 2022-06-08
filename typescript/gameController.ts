import * as PIXI from "pixi.js";
import { Entity } from "./entity";
import { Scene } from "./scene";
import { Scene_Game } from "./scene_game";
import { Scene_Manager } from "./scene_manager";
import { Scene_Title } from "./scene_title";
/*
    全てのスプライトを用いるオブジェクトが継承するクラス
*/
export class GameController {
    sceneManager: Scene_Manager;
    player: Entity;
    titleScene: Scene_Title;
    gameScene: Scene_Game;
    static sceneNum: number = 0;
    static dt: number = 0;
    constructor(sceneManager: Scene_Manager) {
        this.sceneManager = sceneManager;
        this.titleScene = new Scene_Title();//タイトルシーンの作成
        this.gameScene = new Scene_Game();//ゲームシーンの作成
        this.sceneManager.registScene(this.titleScene);
    }

    //毎フレームの処理を記述
    update(dt: number) {
        GameController.dt = dt;
        switch (GameController.sceneNum) {
            case 10://タイトル画面
                this.titleScene.update();
                this.checkSceneTransition(this.titleScene.toGameScene, this.gameScene);
                this.titleScene.toGameScene = false;
                break;
            case 20://ゲーム画面
                this.gameScene.update();
                const flag = this.checkSceneTransition(this.gameScene.toTitleScene, this.titleScene);
                if (flag) this.titleScene.updateScore();
                this.gameScene.toTitleScene = false;
                break;
        }
    }

    //画面遷移をチェックする
    checkSceneTransition(flag: Boolean, scene: Scene) {
        if (flag) {
            this.sceneManager.registScene(scene);
        }
        return flag;
    }
}
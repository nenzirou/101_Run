import * as PIXI from "pixi.js";
import { Enemy_Unchi } from "./enemy_unchi";
import { Entity } from "./entity";
import { GameController } from "./gameController";
import { Item_Coin } from "./item_coin";
import { Ojisan } from "./player";
import { Scene } from "./scene";
import { Score } from "./score";
import { Stage_Ground } from "./stage_ground";

export class Stage_Manager {
    preGround: Stage_Ground;
    stage_grounds: Stage_Ground[];
    groundHeight: number;
    gameScene: Scene;
    speed: number;
    bg: PIXI.Container[];
    items: Entity[];
    enemys: Entity[];
    constructor(scene: Scene) {
        this.gameScene = scene;
        this.stage_grounds = [];
        this.items = [];
        this.enemys = [];
        this.speed = 3;
        this.groundHeight = 50;
        this.preGround = new Stage_Ground(300, 500, 600, this.groundHeight);
        this.stage_grounds.push(this.preGround);
        scene.addChild(this.preGround);
        this.makeGround();
        this.bg = [];
        for (let i = 0; i < 2; i++) {
            this.bg.push(new PIXI.Sprite(PIXI.Loader.shared.resources.bg1.texture));
            this.bg[i].position.set(this.bg[i].width * i, -200);
            scene.addChild(this.bg[i]);
        }
    }

    update(player: Ojisan) {
        Score.score += (this.speed * GameController.dt) / 500;//スコア加算
        let hitCnt: number = 0;//あたり判定数カウント
        for (let i = 0; i < this.stage_grounds.length; i++) {//プレイヤーと地面のあたり判定と地面の消滅処理
            this.stage_grounds[i].dx = -this.speed * GameController.dt;
            this.stage_grounds[i].update();
            if (player.detectHitPlayer(this.stage_grounds[i])) {
                hitCnt++;
            }
            if (this.stage_grounds[i].status === "destroy") {
                this.stage_grounds[i].destroy();
                this.stage_grounds.splice(i, 1);
                i--;
            }
        }
        if (hitCnt > 0) {//プレイヤーの接地判定
            player.status = "ground";
        } else {
            player.status = "fly";
        }
        for (let i = 0; i < this.items.length; i++) {//アイテムの処理
            this.items[i].dx = -this.speed * GameController.dt;
            this.items[i].update();
            if (this.items[i].detectHit(player)) {
                this.items[i].destroy();
                this.items.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < this.enemys.length; i++) {//敵の処理
            this.enemys[i].dx = -this.speed * GameController.dt;
            this.enemys[i].update();
            if (this.enemys[i].detectHit(player)) {
                player.damage(1);
            }
        }
        if (this.stage_grounds.length < 4) {//地面の生成処理
            this.makeGround();
        }
        for (let i = 0; i < this.bg.length; i++) {//背景の移動処理
            this.bg[i].x -= this.speed * GameController.dt / 10;
        }
        for (let i = 0; i < this.bg.length; i++) {//背景のループ処理
            if (this.bg[i].x < -this.bg[i].width) {
                this.bg[i].x = this.bg[1 - i].x + this.bg[1 - i].width;
            }
        }
    }
    //pregroundから生成する地面の数値を判断
    makeGround() {
        let w: number = 130 + Math.random() * 300;
        let x: number = this.preGround.x + this.preGround.hW / 2 + w / 2 + 50 + Math.random() * 100;
        let y: number = this.preGround.y + Math.random() * 100 - 50;
        if (y < 350) {
            y = 350;
        } else if (y > 500) {
            y = 500;
        }
        this.preGround = new Stage_Ground(x, y, w, this.groundHeight);//地面生成
        this.gameScene.addChild(this.preGround);
        this.stage_grounds.push(this.preGround);
        for (let i = 0; i < 1; i++) {//アイテム生成
            const item: Item_Coin = Item_Coin.create(x + Math.random() * w - w / 2, y - this.groundHeight - Math.floor(Math.random() * 5) * 10, this.gameScene);
            this.items.push(item);
        }
        for (let i = 0; i < 1; i++) {//敵生成
            const enemy: Enemy_Unchi = Enemy_Unchi.create(x + Math.random() * w - w / 2, y - this.groundHeight / 2, this.gameScene);
            this.enemys.push(enemy);
        }
    }
}
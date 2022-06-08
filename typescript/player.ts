import * as PIXI from "pixi.js";
import { Entity } from "./entity";
import { GameController } from "./gameController";
/*

*/
export type playerStatus = 'ground' | 'fly';
export class Ojisan extends Entity {
    status: playerStatus = "fly";
    flyPoint: number;
    maxFlyPoint: number;
    jumpPower: number;
    maxJumpPower: number;
    HP: number;
    maxHP: number;
    mutekiCnt: number;
    constructor(x: number, y: number) {
        super(PIXI.Loader.shared.resources.oji.texture, x, y, 20, 32, 3, 3);
        this.hW = 10;
        this.hH = 25;
        this.maxFlyPoint = 2;
        this.flyPoint = this.maxFlyPoint;
        this.maxJumpPower = 7;
        this.jumpPower = this.maxJumpPower;
        this.maxHP = 3;
        this.HP = this.maxHP;
        this.mutekiCnt = 0;
        this.zIndex = 100;
    }

    // 毎フレーム処理を記述
    update(): void {
        this.world();
        switch (this.status) {
            case "ground":
                this.flyPoint = this.maxFlyPoint;
                this.dy = 0;
                this.frameTime = 3;
                break;
            case "fly":
                this.dy += 0.3 * GameController.dt;
                if (this.flyPoint == 1) {
                    this.frameTime = 8;
                } else if (this.flyPoint == 0) {
                    this.frameTime = 10000;
                }

                break;
        }
        if (this.mutekiCnt > 0) {//無敵時の処理
            this.mutekiCnt--;
            if (this.mutekiCnt % 10 == 0) {
                this.alpha = 1;
            } else if (this.mutekiCnt % 10 == 5) {
                this.alpha = 0;
            }
        }
        console.log(this.HP);
    }

    //おじさんがジャンプする
    jump() {
        if (this.flyPoint > 0) {
            this.flyPoint--;
            this.dy = -this.jumpPower;
            this.status = "fly";
        }
    }
    //あたり判定を実行する
    detectHitPlayer(obj: Entity) {
        let hit: boolean = false;
        if (this.detectHit(obj)) {
            if (Math.abs(this.y - obj.y) >= obj.hH / 2 && this.y < obj.y) {
                hit = true;
                this.compensateY(obj);
                this.status = "ground";
            } else {
                this.x = obj.x - obj.hW / 2 - this.hW;
            }
        }
        return hit;
    }

    //地表の上に乗るように座標を補正する
    compensateY(obj: Entity) {
        let diff = this.hH / 2 + obj.hH / 2 - Math.abs(this.y - obj.y);
        this.y -= diff;
        this.dy = 0;
    }

    //プレイヤーにダメージを与える
    damage(damage: number) {
        if (this.mutekiCnt == 0) {
            this.HP -= damage;
            this.mutekiCnt = 120;
        }
    }

    //おじさんオブジェクトを生成
    static create(x: number, y: number, parent: PIXI.Container): Ojisan {
        const ojisan: Ojisan = new Ojisan(x, y);
        parent.addChild(ojisan);
        return ojisan;
    }
}
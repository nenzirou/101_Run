import * as PIXI from "pixi.js";
/*
    全てのスプライトを用いるオブジェクトが継承するクラス
*/
export abstract class Entity extends PIXI.TilingSprite {
    tileX: number;
    tileY: number;
    frameNum: number;
    frameTime: number;
    dx: number;
    dy: number;
    hW: number;
    hH: number;
    cnt: number;
    status: string;
    constructor(texture: PIXI.Texture, x: number, y: number, tileX: number, tileY: number, frameNum: number, frameTime: number) {
        super(texture, tileX, tileY);
        this.cnt = 0;
        this.tileX = tileX;
        this.tileY = tileY;
        this.frameNum = frameNum;
        this.frameTime = frameTime;
        this.dx = 0;
        this.dy = 0;
        this.anchor.set(0.5, 0.5);
        this.position.set(x, y);
        this.zIndex = 1;
    }
    //スプライトのアニメーションを行うメソッド
    animate() {
        if (this.cnt % this.frameTime == 0) {
            this.tilePosition.x += this.tileX;
            this.tilePosition.x = this.tilePosition.x % (this.tileX * this.frameNum);
        }
    }

    //オブジェクトの物理法則
    world() {
        if (this.frameNum > 1) {
            this.animate();
        }
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < -500) {
            this.status = "destroy";
        }
        this.cnt++;
    }

    //あたり判定
    detectHit(obj: Entity): boolean {
        let hit: boolean = false;
        if (Math.abs(this.x - obj.x) <= (this.hW / 2 + obj.hW / 2) && Math.abs(this.y - obj.y) <= (this.hH / 2 + obj.hH / 2)) {
            hit = true;
        }
        return hit;
    }
    abstract update();
}
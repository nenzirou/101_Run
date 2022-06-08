import * as PIXI from "pixi.js";
import { CreateButton } from "./createButton";
import { Entity } from "./entity";
/*

*/
export class Stage_Ground extends Entity {
    tileX: number;
    tileY: number;
    frameNum: number;
    frameTime: number;
    cnt: number;
    moving: number;
    constructor(x: number, y: number, width: number, height: number) {
        super(PIXI.Loader.shared.resources.ground.texture, x, y, width, height, 1, 3);
        this.hW = width;
        this.hH = height;
        const r = Math.random();
        if (r < 0.1) this.moving = 1;
        else if (r < 0.8) this.moving = 2;
    }

    // 毎フレーム処理を記述
    update(): void {
        if (this.moving == 1) {
            if (this.cnt % 180 < 90) this.dy = 0.3;
            else this.dy = -0.3;
        } else if (this.moving == 2) {
            if (this.cnt % 180 < 90) this.dx += 0.5;
            else this.dx += -0.5;
        }
        this.world();
    }

    //オブジェクトを生成
    static create(x: number, y: number, width: number, height: number, parent: PIXI.Container): Stage_Ground {
        const entity: Stage_Ground = new Stage_Ground(x, y, width, height);
        parent.addChild(entity);
        return entity;
    }
}
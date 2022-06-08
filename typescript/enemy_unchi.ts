import * as PIXI from "pixi.js";
import { CreateButton } from "./createButton";
import { Entity } from "./entity";
/*

*/
export class Enemy_Unchi extends Entity {
    constructor(x: number, y: number) {
        super(PIXI.Loader.shared.resources.unchi.texture, x, y, 64, 48, 1, 3);
        this.hW = 30;
        this.hH = 30;
    }

    // 毎フレーム処理を記述
    update(): void {
        this.world();
    }

    //オブジェクトを生成
    static create(x: number, y: number, parent: PIXI.Container): Enemy_Unchi {
        const entity: Enemy_Unchi = new Enemy_Unchi(x, y);
        parent.addChild(entity);
        return entity;
    }
}
import * as PIXI from "pixi.js";
import { CreateButton } from "./createButton";
import { Entity } from "./entity";
/*

*/
export class Item_Coin extends Entity {
    constructor(x: number, y: number) {
        super(PIXI.Loader.shared.resources.coin.texture, x, y, 32, 32, 1, 3);
        this.hW = 32;
        this.hH = 32;
    }

    // 毎フレーム処理を記述
    update(): void {
        this.world();
    }

    //オブジェクトを生成
    static create(x: number, y: number, parent: PIXI.Container): Item_Coin {
        const entity: Item_Coin = new Item_Coin(x, y);
        parent.addChild(entity);
        return entity;
    }
}
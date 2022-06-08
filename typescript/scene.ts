import * as PIXI from "pixi.js";
import { Scene_Manager } from "./scene_manager";

// シーンの変化を管理するクラス
export abstract class Scene extends PIXI.Container {
    id: number;
    sW: number;
    sH: number;
    constructor(id: number) {
        super();
        this.id = id;
        this.sW = 400;
        this.sH = 600;
        this.sortableChildren = true;
    }
    abstract update();
}
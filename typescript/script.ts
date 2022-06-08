import * as PIXI from "pixi.js"; // node_modulesから PIXI.jsをインポート
import * as PIXI_SOUND from "pixi-sound";// node_modulesから PIXI_SOUNDをインポート
import { Scene_Manager } from "./scene_manager"; // シーン管理を行うクラスをインポート
import { GameController } from "./gameController";

PIXI_SOUND.default.init();//PIXI_SOUNDの初期化命令
const app = new PIXI.Application({ width: 400, height: 600 });// PIXI.JSアプリケーションを呼び出す
document.body.appendChild(app.view);// index.htmlのbodyにapp.viewを追加する

app.renderer.view.style.position = "relative";
app.renderer.view.style.width = "400px";
app.renderer.view.style.height = "600px";
// app.renderer.view.style.display = "block";
app.renderer.view.autofocus = true;
app.renderer.view.style.border = "2px dashed black";
app.renderer.backgroundColor = 0x000000;// canvasの背景色

// ゲームで使用する画像をあらかじめ読み込んでおく(プリロードという)
// v5.3.2　だと PIXI.Loader.shared.addでプリロードする PIXI.Loader.shared.resources.oji.textureという形でどこからでも呼び出せる
const sound = {
    bgm1: "sound/bgm1.mp3", open: "sound/open.mp3", close: "sound/close.mp3", nSelect: "sound/nSelect.mp3", shop: "sound/shop.mp3", shopButton: "sound/shopButton.mp3", questButton: "sound/questButton.mp3", barButton: "sound/barButton.mp3", mapButton: "sound/mapButton.mp3", building: "sound/building.mp3", complete: "sound/complete.mp3", letsGo: "sound/letsGo.mp3", message: "sound/message.mp3"
};
const image = {
    oji: "oji.png", bg1: "bg1.jpg", ground: "ground.png", coin: "coin.png", unchi: "unchi.png"
};
Object.keys(sound).forEach(key => PIXI.Loader.shared.add(key, sound[key]));//音楽のプリロード
Object.keys(image).forEach(key => PIXI.Loader.shared.add(key, "image/" + image[key]));//画像のプリロード

const sceneManager = new Scene_Manager(app);//シーンマネージャーの生成

// プリロード処理が終わったら呼び出されるイベント
PIXI.Loader.shared.load((loader, resources) => {
    /**
     * ゲームのメインシーンを生成する関数
     */
    function createGameScene() {
        sceneManager.removeAllScene();// シーンの登録を全て削除
        sceneManager.removeAllGameLoops();// 毎フレーム実行される関数の登録を削除
        const gameController: GameController = new GameController(sceneManager);
        function gameLoop() // 毎フレームごとに処理するゲームループの関数
        {
            gameController.update(app.ticker.deltaTime);
        }
        // ゲームループ関数を毎フレーム処理の関数として追加
        sceneManager.addGameLoop(gameLoop);
    }
    // 起動直後はゲームシーンを追加する
    createGameScene();
});

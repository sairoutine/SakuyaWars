
/*

スペルカード使用時のエフェクト
スペルカードのオン・オフ判定

ユニット画像を組み込む
ユニットはアニメーションする

敵画像を組み込む
敵はアニメーションする

ボス、ダメージを受けたときの画像組み込み→これでクラピはdone
攻撃頻度をつける

複数ステージ対応
SE・BGM組み込み
リザルト画面

◆ アイデア
咲夜は選択して生成するんじゃなくて、ランダム生成(ストックされる咲夜は列に並んで表示される)の方がいいかも
→ 咲夜毎にAPは異なる
→ ストックされた咲夜は並び替えることができる

◆ TODO:
敵を倒すとアイテムをドロップする
スペルカードを使うと全体攻撃となる

デバッグ用にユニットや敵のHPを表示したい
デバッグ用にPやBを回復したい
セリフスキップを入れたい
*/

'use strict';

var BaseScene = require('../hakurei').Scene.Base;
var SceneBattleMain = require('./battle/main');
var SceneBattleReady = require('./battle/ready');
var SceneBattleGameover = require('./battle/gameover');

var OpponentManager = require('../logic/opponent_manager');
var Fort = require('../object/fort');

var Clownpiece = require('../object/boss/clownpiece');

var UnitSakuyaNormal = require('../object/unit/sakuya_normal');

var EnemyNormal = require('../object/enemy/normal');

var Container = require('../hakurei').Object.Container;
var Util = require('../hakurei').Util;
var CONSTANT = require('../constant');

var BOSS_CLASSES = [
	Clownpiece,
];

var BACKGROUND_IMAGES = [
	"battle_bg1",
	"battle_bg2",
	"battle_bg3",
	"battle_bg4",
];



var UNIT_CLASSES = [
	UnitSakuyaNormal,
	UnitSakuyaNormal,
	UnitSakuyaNormal,
	UnitSakuyaNormal,
	UnitSakuyaNormal,
];

var ENEMY_CLASSES = [
	EnemyNormal,
];

var Scene = function(core) {
	BaseScene.apply(this, arguments);

	// 自陣
	this.fort = new Fort(this);

	// 敵AI
	this.opponent_manager = new OpponentManager(this);

	// サブシーン
	this.addSubScene("ready", new SceneBattleReady(core));
	this.addSubScene("main", new SceneBattleMain(core));
	this.addSubScene("gameover", new SceneBattleGameover(core));

	// ---

	// ステージNo
	this.stage_no = 0;

	// ボス
	this.boss = null;

	// P ポイントの数
	this.p_num = CONSTANT.P_MAX;

	// ボムの数
	this.b_num = 0;

	// 召喚したユニット一覧
	this.units = new Container(this);

	// 召喚した敵一覧
	this.enemies = new Container(this);

	// 時を止めてる際の残り時間(frame)
	this._remaining_timestop_frame = 0;

	this.addObject(this.fort);
	this.addObject(this.opponent_manager);
	this.addObjects(this.units);
	this.addObjects(this.enemies);
};
Util.inherit(Scene, BaseScene);

Scene.prototype.init = function(stage_no){
	BaseScene.prototype.init.apply(this, arguments);

	this.stage_no = stage_no || 0;

	// 自陣
	this.fort.x(90);
	this.fort.y(416);

	// ボス
	// TODO: コンストラクタですべてのボスを初期化して、ここでは初期化しないようにしたい
	this.boss = new BOSS_CLASSES[this.stage_no](this);
	this.boss.init();
	this.boss.x(726);
	this.boss.y(410);
	this.addObject(this.boss);

	// P ポイントの数
	this.p_num = CONSTANT.P_MAX;

	// ボムの数
	this.b_num = 0;

	// 召喚したユニット一覧 初期化
	this.units.removeAllObject();

	// 召喚した敵一覧 初期化
	this.enemies.removeAllObject();

	// 時を止めてる際の残り時間(frame)
	this._remaining_timestop_frame = 0;

	//this.core.scene_manager.setFadeIn(60, "white");

	this.changeSubScene("ready");
};


Scene.prototype.generateUnit = function(unit_num){
	var unit = new UNIT_CLASSES[unit_num](this);

	// P消費できるかチェック
	if (this.p_num < unit.consumedP()) {
		return;
	}

	// P消費
	this.p_num -= unit.consumedP();

	// ユニット追加
	var x = Util.getRandomInt(CONSTANT.UNIT_GENERATED_AREA_LEFT_X, CONSTANT.UNIT_GENERATED_AREA_RIGHT_X);
	var y = Util.getRandomInt(CONSTANT.UNIT_GENERATED_AREA_UP_Y, CONSTANT.UNIT_GENERATED_AREA_DOWN_Y);

	unit.init();
	unit.x(x);
	unit.y(y);

	this.units.addObject(unit);
};

Scene.prototype.generateEnemy = function(enemy_num){
	var enemy = new ENEMY_CLASSES[enemy_num](this);

	// ユニット追加
	var x = Util.getRandomInt(CONSTANT.ENEMY_GENERATED_AREA_LEFT_X, CONSTANT.ENEMY_GENERATED_AREA_RIGHT_X);
	var y = Util.getRandomInt(CONSTANT.ENEMY_GENERATED_AREA_UP_Y, CONSTANT.ENEMY_GENERATED_AREA_DOWN_Y);

	enemy.init();
	enemy.x(x);
	enemy.y(y);

	this.enemies.addObject(enemy);
};



// スペルカード使用
Scene.prototype.useSpellCard = function() {
	// TODO: 時を止めるアニメ
	// アニメのいい感じのところで、全体にダメージ

	this._remaining_timestop_frame = CONSTANT.TIMESTOP_FRAME;
};

// 時を止めてる最中か否か
Scene.prototype.isTimeStop = function() {
	return this._remaining_timestop_frame > 0;
};

// ゲームクリアになった
Scene.prototype.notifyStageClear = function(){
	// TODO: スコアのデータを渡す
	this.core.scene_manager.changeScene("scenario_end");
};

// ゲームオーバーになった
Scene.prototype.notifyGameover = function(){
	this.changeSubScene("gameover");
};



Scene.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	// P は時間経過で自動回復する
	if (this.frame_count % CONSTANT.FRAME_TO_RECOVER_P === 0) {
		if (this.p_num < CONSTANT.P_MAX) {
			this.p_num += 1;
		}
	}

	// 時を止めてる時間を経過させる
	if (this._remaining_timestop_frame > 0) {
		this._remaining_timestop_frame--;
	}

	// 左クリック位置を出力
	if (CONSTANT.DEBUG) {
		if(this.core.input_manager.isLeftClickPush()) {
			var x = this.core.input_manager.mousePositionX();
			var y = this.core.input_manager.mousePositionY();

			console.log("x: " + x + ", y: " + y);
		}
	}
};

Scene.prototype.draw = function(){
	var ctx = this.core.ctx;

	// 背景
	var bg_name = BACKGROUND_IMAGES[this.stage_no];
	var bg_image = this.core.image_loader.getImage(bg_name);
	ctx.save();
	ctx.translate(this.width/2, this.height/2);
	ctx.drawImage(bg_image, -bg_image.width/2, -bg_image.height/2);
	ctx.restore();

	// Pの表示 現在
	ctx.save();
	ctx.font = "36px 'MyFont'";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	ctx.strokeStyle = Util.hexToRGBString("#FFFFFF");
	ctx.lineWidth = 4.0;
	ctx.strokeText(this.p_num, 639, 36);

	ctx.fillStyle = Util.hexToRGBString("#945ae8");
	ctx.fillText(this.p_num, 639, 36);

	ctx.restore();

	// Pの表示 最大
	ctx.save();
	ctx.font = "36px 'MyFont'";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	ctx.fillStyle = Util.hexToRGBString("#141e46");
	ctx.fillText("/" + CONSTANT.P_MAX + "P", 740, 35);

	ctx.restore();

	BaseScene.prototype.draw.apply(this, arguments);
};

module.exports = Scene;

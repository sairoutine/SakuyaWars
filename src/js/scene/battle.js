
/*
スペルカードを使うと時が止まる
スペルカードを使うと全体攻撃となる

3.2.1 Start って入れる

他のシーンを実装

◆ イラスト組み込み
画像を組み込む
ユニットはアニメーションする
敵はアニメーションする
スペルカード使用時のエフェクト

◆ アイデア
咲夜は選択して生成するんじゃなくて、ランダム生成(ストックされる咲夜は列に並んで表示される)の方がいいかも
→ 咲夜毎にAPは異なる
→ ストックされた咲夜は並び替えることができる

◆ TODO:
敵を倒すとアイテムをドロップする

デバッグ用にユニットや敵のHPを表示したい
デバッグ用にPやBを回復したい
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

	this.addObject(this.fort);
	this.addObject(this.opponent_manager);
	this.addObjects(this.units);
	this.addObjects(this.enemies);
};
Util.inherit(Scene, BaseScene);

Scene.prototype.init = function(stage_num){
	BaseScene.prototype.init.apply(this, arguments);

	stage_num = stage_num || 0;

	// 自陣
	this.fort.x(50);
	this.fort.y(350);

	// ボス
	this.boss = new BOSS_CLASSES[stage_num](this);
	this.boss.init();
	this.boss.x(750);
	this.boss.y(350);
	this.addObject(this.boss);

	// P ポイントの数
	this.p_num = CONSTANT.P_MAX;

	// ボムの数
	this.b_num = 0;

	// 召喚したユニット一覧 初期化
	this.units.removeAllObject();

	// 召喚した敵一覧 初期化
	this.enemies.removeAllObject();

	//this.core.scene_manager.setFadeIn(60, "white");

	this.changeSubScene("main");
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

// ゲームクリアになった
Scene.prototype.notifyStageClear = function(){
	// TODO: スコアのデータを渡す
	this.core.scene_manager.changeScene("result");
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

	ctx.save();
	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, this.width, this.height);
	ctx.restore();

	ctx.save();
	ctx.fillStyle = "black";
	ctx.font = "25px 'MyFont'";
	ctx.textAlign = 'center';

	ctx.fillText(this.p_num + " / " + CONSTANT.P_MAX + " P", 700, 30);

	ctx.restore();

	BaseScene.prototype.draw.apply(this, arguments);
};

module.exports = Scene;


/*
3.2.1 Start って入れる

接触判定はある
Bはスペルカードに使える。→時止め。
ユニットはアニメーションする
敵はアニメーションする

---
Pを消費してユニットを生成する
ユニットは歩く

Pは時間経過で回復する

敵が登場する
敵が歩く
ユニットと敵が接触すると止まる(or 攻撃するときに止まるだけ)
敵は攻撃する
ユニットは攻撃する

ボスを表示する
自陣を表示する

ボスは攻撃する
ボスは攻撃されてダメージを受ける
ボスはHPが0になるとクリア

自陣と敵が接触するとゲームオーバー

敵のHPが0になると死ぬ
ユニットのHPが0になると死ぬ

スペルカードを使うと時が止まる
スペルカードを使うと全体攻撃となる
*/

'use strict';

var BaseScene = require('../hakurei').Scene.Base;
var SceneBattleMain = require('./battle/main');
var SceneBattleReady = require('./battle/ready');

var Fort = require('../object/fort');

var Clownpiece = require('../object/boss/clownpiece');

var Util = require('../hakurei').Util;
var CONSTANT = require('../constant');

var BOSS_CLASSES = [
	Clownpiece,
];

var Scene = function(core) {
	BaseScene.apply(this, arguments);

	// 自陣
	this.fort = new Fort(this);

	// サブシーン
	this.addSubScene("ready", new SceneBattleReady(core));
	this.addSubScene("main", new SceneBattleMain(core));

	// ---

	// ボス
	this.boss = null;

	// P ポイントの数
	this.p_num = CONSTANT.P_MAX;

	// ボムの数
	this.b_num = 0;

	// ユニット一覧のページング位置
	this.current_paging_position = 0;

	// 召喚したユニット一覧
	this.summoned_units = [];

	// 召喚した敵一覧
	this.summoned_enemies = [];
};
Util.inherit(Scene, BaseScene);

Scene.prototype.init = function(stage_num){
	BaseScene.prototype.init.apply(this, arguments);

	stage_num = stage_num || 0;

	// ボス
	this.boss = new BOSS_CLASSES[stage_num](this);

	// P ポイントの数
	this.p_num = CONSTANT.P_MAX;

	// ボムの数
	this.b_num = 0;

	// ユニット一覧のページング位置
	this.current_paging_position = 0;

	// 召喚したユニット一覧
	this.summoned_units = [];

	// 召喚した敵一覧
	this.summoned_enemies = [];

	this.core.scene_manager.setFadeIn(60, "white");

	this.changeSubScene("main");
};

Scene.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	// 左クリック位置を出力
	if (CONSTANT.DEBUG) {
		if(this.core.input_manager.isLeftClickPush()) {
			var x = this.core.input_manager.mousePositionX();
			var y = this.core.input_manager.mousePositionY();

			console.log("x: " + x + ", y: " + y);
		}
	}

	for (var i = 0, len1 = this.summoned_units.length; i < len1; i++) {
		var unit = this.summoned_units[i];
		unit.update();
	}

	for (var j = 0, len2 = this.summoned_enemies.length; j < len2; j++) {
		var enemy = this.summoned_enemies[j];
		enemy.update();
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

	for (var i = 0, len = this.summoned_units.length; i < len; i++) {
		var unit = this.summoned_units[i];
		unit.draw();
	}

	for (var j = 0, len2 = this.summoned_enemies.length; j < len2; j++) {
		var enemy = this.summoned_enemies[j];
		enemy.draw();
	}

	BaseScene.prototype.draw.apply(this, arguments);
};

module.exports = Scene;

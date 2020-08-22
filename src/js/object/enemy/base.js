
/*
→ 敵は攻撃する。咲夜さんに攻撃する
妖精を倒すと P とか  B とか出てくる。

◆ 敵の種類
移動速度が早い・遅い
攻撃力が高い・低い

→ キャラ(妖精・咲夜)毎に、移動はアニメ2枚。攻撃は1＋α枚。ダメージ1枚。

マップは4枚。
→ ランダムで敵が出現する。ボスは固定。


*/
'use strict';

var BaseObject = require('../../hakurei').Object.Base;
var Util = require('../../hakurei').Util;

var Base = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(Base, BaseObject);

// HP
Util.defineProperty(Base, "hp");

Base.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	this.hp(this.maxHP());
};

Base.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);

	// 時が止まってる最中は何も行動できない
	if(this.scene.isTimeStop()) {
		return;
	}

	var is_move = true;

	var enemy = this;
	this.scene.units.forEach(function(unit) {
		if(enemy.intersect(unit)) {

			// 攻撃する
			enemy.attack(unit);

			// 攻撃するときは止まる
			is_move = false;
		}
	});

	// 自陣に到達したらゲームオーバー
	var fort = this.scene.fort;
	if (this.intersect(fort)) {
		// TODO: battle シーンでなければGameOver判定しないようにする
		// そうしないと毎フレーム GameOverシーンへ遷移しつづけてしまう
		this.scene.notifyGameover();
	}

	if (is_move) {
		// TODO: 画面端で止まるようにする
		// キャラが移動する
		this.x(this.x() - this.speed());
	}
};

Base.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 攻撃
Base.prototype.attack = function(unit){
	var damage = this.damage();

	unit.hp(unit.hp() - damage);

	if (unit.hp() <= 0) {
		// 死亡
		unit.die();
	}
};

// 死亡
Base.prototype.die = function(){
	this.scene.enemies.removeObject(this);
};

// 最大HP
Base.prototype.maxHP = function(){
	return 100;
};

// ダメージ力
Base.prototype.damage = function(){
	return 1;
};

// 歩くスピード
Base.prototype.speed = function(){
	return 0;
};

module.exports = Base;

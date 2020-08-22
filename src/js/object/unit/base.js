
/*
近距離攻撃 咲夜さん
遠距離攻撃 咲夜さん
紅茶を入れる咲夜さん
重火器を使う咲夜さん
メーリン(定期的にクリックしないと攻撃しないやつ)
→ メーリンを起こす咲夜(めーさく)
ジョジョみたいに戦う咲夜さん
もっぷを持って往復する咲夜さん
まんどらごらを引き抜いて範囲攻撃するやつ
→ この辺は1mapに1体。
MMDの咲夜さん

めーさくとさくめいで能力が違うとか。

キャラによっては止まりっぱなし
*/
'use strict';

var BaseObject = require('../../hakurei').Object.Base;
var Util = require('../../hakurei').Util;

var UnitBase = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(UnitBase, BaseObject);

// HP
Util.defineProperty(UnitBase, "hp");

UnitBase.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	this.hp(this.maxHP());
};

UnitBase.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);

	var is_move = true;

	var self = this;

	// 敵への攻撃
	this.scene.enemies.forEach(function(enemy) {
		if(self.intersect(enemy)) {

			// 攻撃する
			self.attack(enemy);

			// 攻撃するときは止まる
			is_move = false;
		}
	});

	// ボスへの攻撃
	var boss = this.scene.boss;
	if (self.intersect(boss)) {
		// 攻撃する
		self.attack(boss);

		// 攻撃するときは止まる
		is_move = false;
	}

	if (is_move) {
		// TODO: 画面端で止まるようにする
		// キャラが移動する
		this.x(this.x() + this.speed());
	}
};

UnitBase.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 攻撃
UnitBase.prototype.attack = function(enemy){
	var damage = this.damage();

	enemy.hp(enemy.hp() - damage);

};
UnitBase.prototype.reduceHP = function(damage){
	this.hp(this.hp() - damage);
};

// ダメージを受けたときの処理
UnitBase.prototype.onDamaged = function(){

};

// 死亡
UnitBase.prototype.die = function(){
	this.scene.units.removeObject(this);
};

// 最大HP
UnitBase.prototype.maxHP = function(){
	return 100;
};

// ダメージ力
UnitBase.prototype.damage = function(){
	return 1;
};

// 歩くスピード
UnitBase.prototype.speed = function(){
	return 0;
};

// ユニット生成に必要なPの数
UnitBase.prototype.consumedP = function(){
	return 0;
};

module.exports = UnitBase;

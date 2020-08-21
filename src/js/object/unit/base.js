
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

	var is_move = true;

	var unit = this;
	this.scene.enemies.forEach(function(enemy) {
		if(unit.intersect(enemy)) {

			// 攻撃する
			unit.attack(enemy);

			// 攻撃するときは止まる
			is_move = false;
		}
	});

	if (is_move) {
		// TODO: 画面端で止まるようにする
		// キャラが移動する
		this.x(this.x() + this.speed());
	}
};

Base.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 攻撃
Base.prototype.attack = function(enemy){
	var damage = this.damage();

	enemy.hp(enemy.hp() - damage);

	if (enemy.hp() <= 0) {
		// 死亡
		enemy.die();
	}
};

// 死亡
Base.prototype.die = function(){
	this.scene.units.removeObject(this);
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

// ユニット生成に必要なPの数
Base.prototype.consumedP = function(){
	return 0;
};

module.exports = Base;

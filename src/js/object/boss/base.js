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

	var boss = this;
	this.scene.units.forEach(function(unit) {
		if(boss.intersect(unit)) {

			// 攻撃する
			boss.attack(unit);
		}
	});

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
	this.scene.notifyStageClear();
};

// 最大HP
Base.prototype.maxHP = function(){
	return 0;
};

// ダメージ力
Base.prototype.damage = function(){
	return 0;
};

module.exports = Base;

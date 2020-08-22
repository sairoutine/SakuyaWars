'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var SakuyaNormal = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(SakuyaNormal, BaseObject);

SakuyaNormal.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

SakuyaNormal.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

SakuyaNormal.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 立ち画像
SakuyaNormal.prototype.stoppingImage = function(){
	return "unit_kinkyori_stand";
};

// 攻撃する時の画像1
SakuyaNormal.prototype.attackImage1 = function(){
	return "unit_kinkyori_attack1";
};

// 攻撃する時の画像2
SakuyaNormal.prototype.attackImage2 = function(){
	return "unit_kinkyori_attack2";
};

// 死んだ時の画像
SakuyaNormal.prototype.deadImage = function(){
	return "unit_kinkyori_damage";
};

// 歩くアニメの画像1
SakuyaNormal.prototype.walkImage1 = function(){
	return "unit_kinkyori_walk1";
};

// 歩くアニメの画像2
SakuyaNormal.prototype.walkImage2 = function(){
	return "unit_kinkyori_walk2";
};

SakuyaNormal.prototype.collisionWidth = function(){
	return 100;
};
SakuyaNormal.prototype.collisionHeight = function(){
	return 200;
};

// ユニット生成に必要なPの数
SakuyaNormal.prototype.consumedP = function(){
	return 20;
};

// 最大HP
SakuyaNormal.prototype.maxHP = function(){
	return 100;
};


// ダメージ力
SakuyaNormal.prototype.damage = function(){
	return 1;
};

// 歩くスピード
SakuyaNormal.prototype.speed = function(){
	return 0.5;
};

module.exports = SakuyaNormal;

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
	return "unit_bazooka_stand";
};

// 攻撃する時の画像 一覧
SakuyaNormal.prototype.attackImages = function(){
	return ["unit_bazooka_attack1", "unit_bazooka_attack2"];
};

// 死んだ時の画像
SakuyaNormal.prototype.deadImage = function(){
	return "unit_bazooka_damage";
};

SakuyaNormal.prototype.attackSound = function(){
	return "unit_mmd_or_bazooka_attack1";
};

SakuyaNormal.prototype.collisionWidth = function(){
	return 400;
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
	return 10;
};

// 歩くスピード
SakuyaNormal.prototype.speed = function(){
	return 0.0;
};

module.exports = SakuyaNormal;

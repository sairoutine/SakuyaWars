'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var SakuyaMeisaku = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(SakuyaMeisaku, BaseObject);

SakuyaMeisaku.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

SakuyaMeisaku.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

SakuyaMeisaku.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 立ち画像
SakuyaMeisaku.prototype.stoppingImage = function(){
	return "unit_meisaku_stand";
};

// 攻撃する時の画像 一覧
SakuyaMeisaku.prototype.attackImages = function(){
	return ["unit_meisaku_attack1", "unit_meisaku_attack2", "unit_meisaku_attack3"];
};

// 死んだ時の画像
SakuyaMeisaku.prototype.deadImage = function(){
	return "unit_meisaku_damage";
};


SakuyaMeisaku.prototype.deadSound = function(){
	return "unit_meisaku_damage";
};

SakuyaMeisaku.prototype.collisionWidth = function(){
	return 100;
};
SakuyaMeisaku.prototype.collisionHeight = function(){
	return 200;
};

// ユニット生成に必要なPの数
SakuyaMeisaku.prototype.consumedP = function(){
	return 20;
};

// 最大HP
SakuyaMeisaku.prototype.maxHP = function(){
	return 300;
};


// ダメージ力
SakuyaMeisaku.prototype.damage = function(){
	return 15;
};

// 歩くスピード
SakuyaMeisaku.prototype.speed = function(){
	return 0.0;
};

module.exports = SakuyaMeisaku;

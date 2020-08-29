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
	return "unit_tupai_walk1";
};

// 攻撃する時の画像 一覧
SakuyaNormal.prototype.attackImages = function(){
	return ["unit_tupai_attack1", "unit_tupai_attack2", "unit_tupai_attack3"];
};

// 死んだ時の画像
SakuyaNormal.prototype.deadImage = function(){
	return "unit_tupai_damage";
};

// 歩くアニメの画像1
SakuyaNormal.prototype.walkImage1 = function(){
	return "unit_tupai_walk1";
};

// 歩くアニメの画像2
SakuyaNormal.prototype.walkImage2 = function(){
	return "unit_tupai_walk2";
};

SakuyaNormal.prototype.attackSound = function(){
	return "unit_tupai_attack2";
};

SakuyaNormal.prototype.collisionWidth = function(){
	return 300;
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
	return 150;
};


// ダメージ力
SakuyaNormal.prototype.damage = function(){
	return 10;
};

// 歩くスピード
SakuyaNormal.prototype.speed = function(){
	return 0.5;
};

module.exports = SakuyaNormal;

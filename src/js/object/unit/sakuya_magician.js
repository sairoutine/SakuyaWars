'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');

var SakuyaMagician = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(SakuyaMagician, BaseObject);

SakuyaMagician.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

SakuyaMagician.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

SakuyaMagician.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 立ち画像
SakuyaMagician.prototype.stoppingImage = function(){
	return "unit_magician_walk1";
};

// 攻撃する時の画像 一覧
SakuyaMagician.prototype.attackImages = function(){
	return ["unit_magician_attack1", "unit_magician_attack2"];
};

// 死んだ時の画像
SakuyaMagician.prototype.deadImage = function(){
	return "unit_magician_damage";
};

// 歩くアニメの画像1
SakuyaMagician.prototype.walkImage1 = function(){
	return "unit_magician_walk1";
};

// 歩くアニメの画像2
SakuyaMagician.prototype.walkImage2 = function(){
	return "unit_magician_walk2";
};

// ユニット生成 ボタン画像
SakuyaMagician.buttonImage = function(){
	return "btn_icon_sakuya_magic";
};

SakuyaMagician.prototype.attackSound = function(){
	return "unit_magician_attack2";
};

SakuyaMagician.prototype.deadSound = function(){
	return "unit_magician_damage";
};

// 攻撃の当たり判定
SakuyaMagician.prototype.attackCollisionWidth = function(){
	return 150;
};
SakuyaMagician.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
SakuyaMagician.prototype.bodyCollisionWidth = function(){
	return 100;
};
SakuyaMagician.prototype.bodyCollisionHeight = function(){
	return 200;
};

// ユニットの種類
SakuyaMagician.prototype.type = function(){
	return CONSTANT.UNIT_TYPE_MAGICIAN;
};

// ユニット生成に必要なPの数
SakuyaMagician.consumedP = function(){
	return 20;
};

// 最大HP
SakuyaMagician.prototype.maxHP = function(){
	return 300;
};


// ダメージ力
SakuyaMagician.prototype.damage = function(){
	return 5;
};

// 歩くスピード
SakuyaMagician.prototype.speed = function(){
	return 0.75;
};

module.exports = SakuyaMagician;

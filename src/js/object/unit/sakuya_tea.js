'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');

var SakuyaTea = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(SakuyaTea, BaseObject);

SakuyaTea.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

SakuyaTea.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

SakuyaTea.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 立ち画像
SakuyaTea.prototype.stoppingImage = function(){
	return "unit_tea_stand";
};

// 攻撃する時の画像 一覧
SakuyaTea.prototype.attackImages = function(){
	return ["unit_tea_attack"];
};

// 死んだ時の画像
SakuyaTea.prototype.deadImage = function(){
	return "unit_tea_damage";
};

// ユニット生成 ボタン画像
SakuyaTea.buttonImage = function(){
	return "btn_icon_sakuya_tea";
};

SakuyaTea.prototype.deadSound = function(){
	return "unit_tea_damage";
};

// 攻撃の当たり判定
SakuyaTea.prototype.attackCollisionWidth = function(){
	return 100;
};
SakuyaTea.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
SakuyaTea.prototype.bodyCollisionWidth = function(){
	return 200;
};
SakuyaTea.prototype.bodyCollisionHeight = function(){
	return 200;
};

// ユニットの種類
SakuyaTea.prototype.type = function(){
	return CONSTANT.UNIT_TYPE_TEA;
};

// ユニット生成に必要なPの数
SakuyaTea.consumedP = function(){
	return 20;
};

// 最大HP
SakuyaTea.prototype.maxHP = function(){
	return 500;
};


// ダメージ力
SakuyaTea.prototype.damage = function(){
	return 0;
};

// 歩くスピード
SakuyaTea.prototype.speed = function(){
	return 0.0;
};

module.exports = SakuyaTea;

'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');

var SakuyaMMD = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(SakuyaMMD, BaseObject);

SakuyaMMD.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

SakuyaMMD.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

SakuyaMMD.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 立ち画像
SakuyaMMD.prototype.stoppingImage = function(){
	return "unit_mmd_stand";
};

// 攻撃する時の画像 一覧
SakuyaMMD.prototype.attackImages = function(){
	return ["unit_mmd_attack"];
};

// 死んだ時の画像
SakuyaMMD.prototype.deadImage = function(){
	return "unit_mmd_stand";
};

// 歩くアニメの画像1
SakuyaMMD.prototype.walkImage1 = function(){
	return "unit_mmd_stand";
};

// 歩くアニメの画像2
SakuyaMMD.prototype.walkImage2 = function(){
	return "unit_mmd_stand";
};

// ユニット生成 ボタン画像
SakuyaMMD.buttonImage = function(){
	return "btn_icon_sakuya_mmd";
};

SakuyaMMD.prototype.attackSound = function(){
	return "unit_mmd_attack2";
};

// 攻撃の当たり判定
SakuyaMMD.prototype.attackCollisionWidth = function(){
	return 150;
};
SakuyaMMD.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
SakuyaMMD.prototype.bodyCollisionWidth = function(){
	return 100;
};
SakuyaMMD.prototype.bodyCollisionHeight = function(){
	return 200;
};

// ユニットの種類
SakuyaMMD.prototype.type = function(){
	return CONSTANT.UNIT_TYPE_MMD;
};

// ユニット生成に必要なPの数
SakuyaMMD.consumedP = function(){
	return 10;
};

// 最大HP
SakuyaMMD.prototype.maxHP = function(){
	return 1;
};

// ダメージ力
SakuyaMMD.prototype.damage = function(){
	return 10;
};

// 歩くスピード
SakuyaMMD.prototype.speed = function(){
	return 15.0;
};

module.exports = SakuyaMMD;

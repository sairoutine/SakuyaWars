'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');

var SakuyaYoyomu = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(SakuyaYoyomu, BaseObject);

SakuyaYoyomu.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

SakuyaYoyomu.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

SakuyaYoyomu.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 立ち画像
SakuyaYoyomu.prototype.stoppingImage = function(){
	return "unit_yoyomu_walk1";
};

// 攻撃する時の画像 一覧
SakuyaYoyomu.prototype.attackImages = function(){
	return ["unit_yoyomu_attack1", "unit_yoyomu_attack2"];
};

// 死んだ時の画像
SakuyaYoyomu.prototype.deadImage = function(){
	return "unit_yoyomu_damage";
};

// 歩くアニメの画像1
SakuyaYoyomu.prototype.walkImage1 = function(){
	return "unit_yoyomu_walk1";
};

// 歩くアニメの画像2
SakuyaYoyomu.prototype.walkImage2 = function(){
	return "unit_yoyomu_walk2";
};

// ユニット生成 ボタン画像
SakuyaYoyomu.buttonImage = function(){
	return "btn_icon_sakuya_yoyomu";
};

// 攻撃の当たり判定
SakuyaYoyomu.prototype.attackCollisionWidth = function(){
	return 100;
};
SakuyaYoyomu.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
SakuyaYoyomu.prototype.bodyCollisionWidth = function(){
	return 200;
};
SakuyaYoyomu.prototype.bodyCollisionHeight = function(){
	return 200;
};

// ユニットの種類
SakuyaYoyomu.prototype.type = function(){
	return CONSTANT.UNIT_TYPE_YOYOMU;
};

// ユニット生成に必要なPの数
SakuyaYoyomu.consumedP = function(){
	return 20;
};

// 最大HP
SakuyaYoyomu.prototype.maxHP = function(){
	return 100;
};


// ダメージ力
SakuyaYoyomu.prototype.damage = function(){
	return 3;
};

// 歩くスピード
SakuyaYoyomu.prototype.speed = function(){
	return 1.0;
};

module.exports = SakuyaYoyomu;

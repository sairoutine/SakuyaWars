'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');

var SakuyaTupai = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(SakuyaTupai, BaseObject);

SakuyaTupai.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

SakuyaTupai.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

SakuyaTupai.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 立ち画像
SakuyaTupai.prototype.stoppingImage = function(){
	return "unit_tupai_walk1";
};

// 攻撃する時の画像 一覧
SakuyaTupai.prototype.attackImages = function(){
	return ["unit_tupai_attack1", "unit_tupai_attack2", "unit_tupai_attack3"];
};

// 死んだ時の画像
SakuyaTupai.prototype.deadImage = function(){
	return "unit_tupai_damage";
};

// 歩くアニメの画像1
SakuyaTupai.prototype.walkImage1 = function(){
	return "unit_tupai_walk1";
};

// 歩くアニメの画像2
SakuyaTupai.prototype.walkImage2 = function(){
	return "unit_tupai_walk2";
};

// ユニット生成 ボタン画像
SakuyaTupai.buttonImage = function(){
	return "btn_icon_sakuya_tupai";
};

SakuyaTupai.prototype.attackSound = function(){
	return "unit_tupai_attack2";
};

// 攻撃の当たり判定
SakuyaTupai.prototype.attackCollisionWidth = function(){
	return 300;
};
SakuyaTupai.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
SakuyaTupai.prototype.bodyCollisionWidth = function(){
	return 200;
};
SakuyaTupai.prototype.bodyCollisionHeight = function(){
	return 200;
};

// ユニットの種類
SakuyaTupai.prototype.type = function(){
	return CONSTANT.UNIT_TYPE_TUPAI;
};

// ユニット生成に必要なPの数
SakuyaTupai.consumedP = function(){
	return 20;
};

// 最大HP
SakuyaTupai.prototype.maxHP = function(){
	return 150;
};


// ダメージ力
SakuyaTupai.prototype.damage = function(){
	return 10;
};

// 歩くスピード
SakuyaTupai.prototype.speed = function(){
	return 0.5;
};

module.exports = SakuyaTupai;

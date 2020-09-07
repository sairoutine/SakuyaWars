'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');

var SakuyaNormal2 = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(SakuyaNormal2, BaseObject);

SakuyaNormal2.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

SakuyaNormal2.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

SakuyaNormal2.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 立ち画像
SakuyaNormal2.prototype.stoppingImage = function(){
	return "unit_enkyori_stand";
};

// 攻撃する時の画像 一覧
SakuyaNormal2.prototype.attackImages = function(){
	return ["unit_enkyori_attack1", "unit_enkyori_attack2"];
};

// 死んだ時の画像
SakuyaNormal2.prototype.deadImage = function(){
	return "unit_enkyori_damage";
};

// 歩くアニメの画像1
SakuyaNormal2.prototype.walkImage1 = function(){
	return "unit_enkyori_walk1";
};

// 歩くアニメの画像2
SakuyaNormal2.prototype.walkImage2 = function(){
	return "unit_enkyori_walk2";
};

// ユニット生成 ボタン画像
SakuyaNormal2.buttonImage = function(){
	return "btn_icon_sakuya_normalenkyori";
};

// 攻撃の当たり判定
SakuyaNormal2.prototype.attackCollisionWidth = function(){
	return 400;
};
SakuyaNormal2.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
SakuyaNormal2.prototype.bodyCollisionWidth = function(){
	return 200;
};
SakuyaNormal2.prototype.bodyCollisionHeight = function(){
	return 200;
};

// ユニットの種類
SakuyaNormal2.prototype.type = function(){
	return CONSTANT.UNIT_TYPE_NORMAL2;
};

// ユニット生成に必要なPの数
SakuyaNormal2.consumedP = function(){
	return 20;
};

// 最大HP
SakuyaNormal2.prototype.maxHP = function(){
	return 100;
};


// ダメージ力
SakuyaNormal2.prototype.damage = function(){
	return 5;
};

// 歩くスピード
SakuyaNormal2.prototype.speed = function(){
	return 0.5;
};

module.exports = SakuyaNormal2;

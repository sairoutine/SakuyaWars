'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var SakuyaNormal1 = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(SakuyaNormal1, BaseObject);

SakuyaNormal1.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

SakuyaNormal1.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

SakuyaNormal1.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 立ち画像
SakuyaNormal1.prototype.stoppingImage = function(){
	return "unit_kinkyori_stand";
};

// 攻撃する時の画像 一覧
SakuyaNormal1.prototype.attackImages = function(){
	return ["unit_kinkyori_attack1", "unit_kinkyori_attack2"];
};

// 死んだ時の画像
SakuyaNormal1.prototype.deadImage = function(){
	return "unit_kinkyori_damage";
};

// 歩くアニメの画像1
SakuyaNormal1.prototype.walkImage1 = function(){
	return "unit_kinkyori_walk1";
};

// 歩くアニメの画像2
SakuyaNormal1.prototype.walkImage2 = function(){
	return "unit_kinkyori_walk2";
};

// ユニット生成 ボタン画像
SakuyaNormal1.buttonImage = function(){
	return "btn_icon_sakuya_normalkinkyori";
};

SakuyaNormal1.prototype.attackSound = function(){
	return "unit_normal1_attack2";
};

SakuyaNormal1.prototype.collisionWidth = function(){
	return 100;
};
SakuyaNormal1.prototype.collisionHeight = function(){
	return 200;
};

// ユニット生成に必要なPの数
SakuyaNormal1.consumedP = function(){
	return 20;
};

// 最大HP
SakuyaNormal1.prototype.maxHP = function(){
	return 100;
};


// ダメージ力
SakuyaNormal1.prototype.damage = function(){
	return 5;
};

// 歩くスピード
SakuyaNormal1.prototype.speed = function(){
	return 0.5;
};

module.exports = SakuyaNormal1;

'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');

var SakuyaMandoragora = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(SakuyaMandoragora, BaseObject);

SakuyaMandoragora.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

SakuyaMandoragora.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

SakuyaMandoragora.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 立ち画像
SakuyaMandoragora.prototype.stoppingImage = function(){
	return "unit_mandoragora_walk1";
};

// 攻撃する時の画像 一覧
SakuyaMandoragora.prototype.attackImages = function(){
	return ["unit_mandoragora_attack1", "unit_mandoragora_attack2"];
};

// 攻撃する時の画像3
SakuyaMandoragora.prototype.attackImage3 = function(){
	return "unit_mandoragora_attack3";
};

// 死んだ時の画像
SakuyaMandoragora.prototype.deadImage = function(){
	return "unit_mandoragora_damage";
};

// 歩くアニメの画像1
SakuyaMandoragora.prototype.walkImage1 = function(){
	return "unit_mandoragora_walk1";
};

// 歩くアニメの画像2
SakuyaMandoragora.prototype.walkImage2 = function(){
	return "unit_mandoragora_walk2";
};

// ユニット生成 ボタン画像
SakuyaMandoragora.buttonImage = function(){
	return "btn_icon_sakuya_mandoragora";
};

SakuyaMandoragora.prototype.attackSound = function(){
	return "unit_mandoragora_attack2";
};

SakuyaMandoragora.prototype.collisionWidth = function(){
	return 100;
};
SakuyaMandoragora.prototype.collisionHeight = function(){
	return 200;
};

// ユニットの種類
SakuyaMandoragora.prototype.type = function(){
	return CONSTANT.UNIT_TYPE_MANDORAGORA;
};

// ユニット生成に必要なPの数
SakuyaMandoragora.consumedP = function(){
	return 20;
};

// 最大HP
SakuyaMandoragora.prototype.maxHP = function(){
	return 100;
};


// ダメージ力
SakuyaMandoragora.prototype.damage = function(){
	return 20;
};

// 歩くスピード
SakuyaMandoragora.prototype.speed = function(){
	return 0.25;
};

module.exports = SakuyaMandoragora;

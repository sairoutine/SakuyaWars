'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');

var SakuyaBazooka = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(SakuyaBazooka, BaseObject);

SakuyaBazooka.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

SakuyaBazooka.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

SakuyaBazooka.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 立ち画像
SakuyaBazooka.prototype.stoppingImage = function(){
	return "unit_bazooka_stand";
};

// 攻撃する時の画像 一覧
SakuyaBazooka.prototype.attackImages = function(){
	return ["unit_bazooka_attack1", "unit_bazooka_attack2"];
};

// 死んだ時の画像
SakuyaBazooka.prototype.deadImage = function(){
	return "unit_bazooka_damage";
};

// ユニット生成 ボタン画像
SakuyaBazooka.buttonImage = function(){
	return "btn_icon_sakuya_bazooka";
};

SakuyaBazooka.prototype.attackSound = function(){
	return "unit_mmd_or_bazooka_attack1";
};

// 攻撃の当たり判定
SakuyaBazooka.prototype.attackCollisionWidth = function(){
	return 400;
};
SakuyaBazooka.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
SakuyaBazooka.prototype.bodyCollisionWidth = function(){
	return 200;
};
SakuyaBazooka.prototype.bodyCollisionHeight = function(){
	return 200;
};

// ユニットの種類
SakuyaBazooka.prototype.type = function(){
	return CONSTANT.UNIT_TYPE_BAZOOKA;
};

// ユニット生成に必要なPの数
SakuyaBazooka.consumedP = function(){
	return 20;
};

// 最大HP
SakuyaBazooka.prototype.maxHP = function(){
	return 100;
};


// ダメージ力
SakuyaBazooka.prototype.damage = function(){
	return 10;
};

// 歩くスピード
SakuyaBazooka.prototype.speed = function(){
	return 0.0;
};

module.exports = SakuyaBazooka;

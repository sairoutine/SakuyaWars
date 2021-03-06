'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var EnemyBlueShort = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(EnemyBlueShort, BaseObject);

EnemyBlueShort.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

EnemyBlueShort.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

EnemyBlueShort.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 攻撃する時の画像
EnemyBlueShort.prototype.attackImage = function(){
	return "enemy_blue_short_attack";
};

// 死んだ時の画像
EnemyBlueShort.prototype.deadImage = function(){
	return "enemy_blue_short_damage";
};

// 歩くアニメの画像1
EnemyBlueShort.prototype.walkImage1 = function(){
	return "enemy_blue_short_walk01";
};

// 歩くアニメの画像2
EnemyBlueShort.prototype.walkImage2 = function(){
	return "enemy_blue_short_walk02";
};

// 攻撃の当たり判定
EnemyBlueShort.prototype.attackCollisionWidth = function(){
	return 350;
};
EnemyBlueShort.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
EnemyBlueShort.prototype.bodyCollisionWidth = function(){
	return 100;
};
EnemyBlueShort.prototype.bodyCollisionHeight = function(){
	return 200;
};


// 最大HP
EnemyBlueShort.prototype.maxHP = function(){
	return 100;
};

// ダメージ力
EnemyBlueShort.prototype.damage = function(){
	return 10;
};

// 歩くスピード
EnemyBlueShort.prototype.speed = function(){
	return 0.5;
};

// 出現しやすさ
EnemyBlueShort.emergeCoefficient = function(){
	return 5;
};


module.exports = EnemyBlueShort;

'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var EnemyPinkLong = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(EnemyPinkLong, BaseObject);

EnemyPinkLong.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

EnemyPinkLong.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

EnemyPinkLong.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 攻撃する時の画像
EnemyPinkLong.prototype.attackImage = function(){
	return "enemy_pink_long_attack";
};

// 死んだ時の画像
EnemyPinkLong.prototype.deadImage = function(){
	return "enemy_pink_long_damage";
};

// 歩くアニメの画像1
EnemyPinkLong.prototype.walkImage1 = function(){
	return "enemy_pink_long_walk01";
};

// 歩くアニメの画像2
EnemyPinkLong.prototype.walkImage2 = function(){
	return "enemy_pink_long_walk02";
};

// 攻撃の当たり判定
EnemyPinkLong.prototype.attackCollisionWidth = function(){
	return 100;
};
EnemyPinkLong.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
EnemyPinkLong.prototype.bodyCollisionWidth = function(){
	return 200;
};
EnemyPinkLong.prototype.bodyCollisionHeight = function(){
	return 200;
};

// 最大HP
EnemyPinkLong.prototype.maxHP = function(){
	return 400;
};

// ダメージ力
EnemyPinkLong.prototype.damage = function(){
	return 2;
};

// 歩くスピード
EnemyPinkLong.prototype.speed = function(){
	return 0.25;
};

module.exports = EnemyPinkLong;

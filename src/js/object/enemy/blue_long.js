'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var EnemyBlueLong = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(EnemyBlueLong, BaseObject);

EnemyBlueLong.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

EnemyBlueLong.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

EnemyBlueLong.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 攻撃する時の画像
EnemyBlueLong.prototype.attackImage = function(){
	return "enemy_blue_long_attack";
};

// 死んだ時の画像
EnemyBlueLong.prototype.deadImage = function(){
	return "enemy_blue_long_damage";
};

// 歩くアニメの画像1
EnemyBlueLong.prototype.walkImage1 = function(){
	return "enemy_blue_long_walk01";
};

// 歩くアニメの画像2
EnemyBlueLong.prototype.walkImage2 = function(){
	return "enemy_blue_long_walk02";
};

// 攻撃の当たり判定
EnemyBlueLong.prototype.attackCollisionWidth = function(){
	return 350;
};
EnemyBlueLong.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
EnemyBlueLong.prototype.bodyCollisionWidth = function(){
	return 100;
};
EnemyBlueLong.prototype.bodyCollisionHeight = function(){
	return 200;
};

// 最大HP
EnemyBlueLong.prototype.maxHP = function(){
	return 400;
};

// ダメージ力
EnemyBlueLong.prototype.damage = function(){
	return 1;
};

// 歩くスピード
EnemyBlueLong.prototype.speed = function(){
	return 0.25;
};

module.exports = EnemyBlueLong;

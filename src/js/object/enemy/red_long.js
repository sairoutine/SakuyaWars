'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var EnemyRedLong = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(EnemyRedLong, BaseObject);

EnemyRedLong.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

EnemyRedLong.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

EnemyRedLong.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 攻撃する時の画像
EnemyRedLong.prototype.attackImage = function(){
	return "enemy_red_long_attack";
};

// 死んだ時の画像
EnemyRedLong.prototype.deadImage = function(){
	return "enemy_red_long_damage";
};

// 歩くアニメの画像1
EnemyRedLong.prototype.walkImage1 = function(){
	return "enemy_red_long_walk01";
};

// 歩くアニメの画像2
EnemyRedLong.prototype.walkImage2 = function(){
	return "enemy_red_long_walk02";
};

// 攻撃の当たり判定
EnemyRedLong.prototype.attackCollisionWidth = function(){
	return 350;
};
EnemyRedLong.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
EnemyRedLong.prototype.bodyCollisionWidth = function(){
	return 100;
};
EnemyRedLong.prototype.bodyCollisionHeight = function(){
	return 200;
};

// 最大HP
EnemyRedLong.prototype.maxHP = function(){
	return 200;
};

// ダメージ力
EnemyRedLong.prototype.damage = function(){
	return 2;
};

// 歩くスピード
EnemyRedLong.prototype.speed = function(){
	return 0.25;
};

module.exports = EnemyRedLong;

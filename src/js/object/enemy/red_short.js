'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var EnemyRedShort = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(EnemyRedShort, BaseObject);

EnemyRedShort.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

EnemyRedShort.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

EnemyRedShort.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 攻撃する時の画像
EnemyRedShort.prototype.attackImage = function(){
	return "enemy_red_short_attack";
};

// 死んだ時の画像
EnemyRedShort.prototype.deadImage = function(){
	return "enemy_red_short_damage";
};

// 歩くアニメの画像1
EnemyRedShort.prototype.walkImage1 = function(){
	return "enemy_red_short_walk01";
};

// 歩くアニメの画像2
EnemyRedShort.prototype.walkImage2 = function(){
	return "enemy_red_short_walk02";
};

EnemyRedShort.prototype.collisionWidth = function(){
	return 400;
};
EnemyRedShort.prototype.collisionHeight = function(){
	return 200;
};

// 最大HP
EnemyRedShort.prototype.maxHP = function(){
	return 100;
};

// ダメージ力
EnemyRedShort.prototype.damage = function(){
	return 2;
};

// 歩くスピード
EnemyRedShort.prototype.speed = function(){
	return 0.5;
};

module.exports = EnemyRedShort;

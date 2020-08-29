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

EnemyBlueShort.prototype.collisionWidth = function(){
	return 400;
};
EnemyBlueShort.prototype.collisionHeight = function(){
	return 200;
};

// 最大HP
EnemyBlueShort.prototype.maxHP = function(){
	return 200;
};

// ダメージ力
EnemyBlueShort.prototype.damage = function(){
	return 1;
};

// 歩くスピード
EnemyBlueShort.prototype.speed = function(){
	return 0.5;
};

module.exports = EnemyBlueShort;

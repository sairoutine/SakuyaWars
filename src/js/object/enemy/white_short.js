'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var EnemyWhiteShort = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(EnemyWhiteShort, BaseObject);

EnemyWhiteShort.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

EnemyWhiteShort.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

EnemyWhiteShort.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 攻撃する時の画像
EnemyWhiteShort.prototype.attackImage = function(){
	return "enemy_white_short_attack";
};

// 死んだ時の画像
EnemyWhiteShort.prototype.deadImage = function(){
	return "enemy_white_short_damage";
};

// 歩くアニメの画像1
EnemyWhiteShort.prototype.walkImage1 = function(){
	return "enemy_white_short_walk01";
};

// 歩くアニメの画像2
EnemyWhiteShort.prototype.walkImage2 = function(){
	return "enemy_white_short_walk02";
};

EnemyWhiteShort.prototype.collisionWidth = function(){
	return 100;
};
EnemyWhiteShort.prototype.collisionHeight = function(){
	return 200;
};

// 最大HP
EnemyWhiteShort.prototype.maxHP = function(){
	return 400;
};

// ダメージ力
EnemyWhiteShort.prototype.damage = function(){
	return 1;
};

// 歩くスピード
EnemyWhiteShort.prototype.speed = function(){
	return 0.5;
};

module.exports = EnemyWhiteShort;

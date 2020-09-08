'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var EnemyWhiteLong = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(EnemyWhiteLong, BaseObject);

EnemyWhiteLong.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

EnemyWhiteLong.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

EnemyWhiteLong.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 攻撃する時の画像
EnemyWhiteLong.prototype.attackImage = function(){
	return "enemy_white_long_attack";
};

// 死んだ時の画像
EnemyWhiteLong.prototype.deadImage = function(){
	return "enemy_white_long_damage";
};

// 歩くアニメの画像1
EnemyWhiteLong.prototype.walkImage1 = function(){
	return "enemy_white_long_walk01";
};

// 歩くアニメの画像2
EnemyWhiteLong.prototype.walkImage2 = function(){
	return "enemy_white_long_walk02";
};

// 攻撃の当たり判定
EnemyWhiteLong.prototype.attackCollisionWidth = function(){
	return 100;
};
EnemyWhiteLong.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
EnemyWhiteLong.prototype.bodyCollisionWidth = function(){
	return 100;
};
EnemyWhiteLong.prototype.bodyCollisionHeight = function(){
	return 200;
};

// 最大HP
EnemyWhiteLong.prototype.maxHP = function(){
	return 600;
};

// ダメージ力
EnemyWhiteLong.prototype.damage = function(){
	return 1;
};

// 歩くスピード
EnemyWhiteLong.prototype.speed = function(){
	return 0.25;
};

module.exports = EnemyWhiteLong;

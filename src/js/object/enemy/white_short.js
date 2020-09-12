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

// 攻撃の当たり判定
EnemyWhiteShort.prototype.attackCollisionWidth = function(){
	return 100;
};
EnemyWhiteShort.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
EnemyWhiteShort.prototype.bodyCollisionWidth = function(){
	return 100;
};
EnemyWhiteShort.prototype.bodyCollisionHeight = function(){
	return 200;
};

// 最大HP
EnemyWhiteShort.prototype.maxHP = function(){
	return 200;
};

// ダメージ力
EnemyWhiteShort.prototype.damage = function(){
	return 40;
};

// 歩くスピード
EnemyWhiteShort.prototype.speed = function(){
	return 2.0;
};

// 出現しやすさ
EnemyWhiteShort.emergeCoefficient = function(){
	return 3;
};

module.exports = EnemyWhiteShort;

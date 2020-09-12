'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var EnemyPinkShort = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(EnemyPinkShort, BaseObject);

EnemyPinkShort.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

EnemyPinkShort.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

EnemyPinkShort.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

// 攻撃する時の画像
EnemyPinkShort.prototype.attackImage = function(){
	return "enemy_pink_short_attack";
};

// 死んだ時の画像
EnemyPinkShort.prototype.deadImage = function(){
	return "enemy_pink_short_damage";
};

// 歩くアニメの画像1
EnemyPinkShort.prototype.walkImage1 = function(){
	return "enemy_pink_short_walk01";
};

// 歩くアニメの画像2
EnemyPinkShort.prototype.walkImage2 = function(){
	return "enemy_pink_short_walk02";
};

// 攻撃の当たり判定
EnemyPinkShort.prototype.attackCollisionWidth = function(){
	return 100;
};
EnemyPinkShort.prototype.attackCollisionHeight = function(){
	return 200;
};

// 本体の当たり判定
EnemyPinkShort.prototype.bodyCollisionWidth = function(){
	return 100;
};
EnemyPinkShort.prototype.bodyCollisionHeight = function(){
	return 200;
};


// 最大HP
EnemyPinkShort.prototype.maxHP = function(){
	return 300;
};

// ダメージ力
EnemyPinkShort.prototype.damage = function(){
	return 30;
};

// 歩くスピード
EnemyPinkShort.prototype.speed = function(){
	return 1.5;
};

// 出現しやすさ
EnemyPinkShort.emergeCoefficient = function(){
	return 3;
};



module.exports = EnemyPinkShort;

'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var Lunachild = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(Lunachild, BaseObject);

Lunachild.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

Lunachild.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

Lunachild.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

Lunachild.prototype.collisionWidth = function(){
	return 150;
};
Lunachild.prototype.collisionHeight = function(){
	return 180;
};

// 最大HP
Lunachild.prototype.maxHP = function(){
	return 900;
};

// 通常時の画像
Lunachild.prototype.normalImage = function(){
	return "boss_lunachild_normal";
};

// ダメージを受けた時の画像
Lunachild.prototype.damageImage = function(){
	return "boss_lunachild_damage";
};



module.exports = Lunachild;

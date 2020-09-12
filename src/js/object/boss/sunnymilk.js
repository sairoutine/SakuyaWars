'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var Sunnymilk = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(Sunnymilk, BaseObject);

Sunnymilk.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

Sunnymilk.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

Sunnymilk.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

Sunnymilk.prototype.collisionWidth = function(){
	return 150;
};
Sunnymilk.prototype.collisionHeight = function(){
	return 180;
};

// 最大HP
Sunnymilk.prototype.maxHP = function(){
	return 900;
};

// 通常時の画像
Sunnymilk.prototype.normalImage = function(){
	return "boss_sunnymilk_normal";
};

// ダメージを受けた時の画像
Sunnymilk.prototype.damageImage = function(){
	return "boss_sunnymilk_damage";
};



module.exports = Sunnymilk;

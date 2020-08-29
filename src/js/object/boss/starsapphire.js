'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var Starsapphire = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(Starsapphire, BaseObject);

Starsapphire.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

Starsapphire.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

Starsapphire.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

Starsapphire.prototype.collisionWidth = function(){
	return 180;
};
Starsapphire.prototype.collisionHeight = function(){
	return 180;
};

// 最大HP
Starsapphire.prototype.maxHP = function(){
	return 600;
};

// 通常時の画像
Starsapphire.prototype.normalImage = function(){
	return "boss_starsapphire_normal";
};

// ダメージを受けた時の画像
Starsapphire.prototype.damageImage = function(){
	return "boss_starsapphire_damage";
};



module.exports = Starsapphire;

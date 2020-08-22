'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var ClownPiece = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(ClownPiece, BaseObject);

ClownPiece.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

ClownPiece.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

ClownPiece.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

ClownPiece.prototype.collisionWidth = function(){
	return 180;
};
ClownPiece.prototype.collisionHeight = function(){
	return 180;
};

// 最大HP
ClownPiece.prototype.maxHP = function(){
	return 300;
};

// 通常時の画像
ClownPiece.prototype.normalImage = function(){
	return "boss_lunachild_normal";
};

// ダメージを受けた時の画像
ClownPiece.prototype.damageImage = function(){
	return "boss_lunachild_damage";
};



module.exports = ClownPiece;

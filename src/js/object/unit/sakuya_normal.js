'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var SakuyaNormal = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(SakuyaNormal, BaseObject);

SakuyaNormal.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

SakuyaNormal.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

SakuyaNormal.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);

	var color = 'blue';
	var ctx = this.core.ctx;
	ctx.save();
	ctx.fillStyle = color;
	ctx.globalAlpha = 0.4;
	ctx.translate(this.globalCenterX(),this.globalCenterY());
	ctx.fillRect(
		-this.collisionWidth()/2,
		-this.collisionHeight()/2,
		this.collisionWidth(),
		this.collisionHeight()
	);
	ctx.restore();
};

// ユニット生成に必要なPの数
SakuyaNormal.prototype.consumedP = function(){
	return 20;
};

// 歩くスピード
SakuyaNormal.prototype.speed = function(){
	return 0.5;
};

SakuyaNormal.prototype.collisionWidth = function(){
	return 100;
};
SakuyaNormal.prototype.collisionHeight = function(){
	return 100;
};

module.exports = SakuyaNormal;

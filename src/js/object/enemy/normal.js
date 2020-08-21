'use strict';

var BaseObject = require('./base');
var Util = require('../../hakurei').Util;

var EnemyNormal = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(EnemyNormal, BaseObject);

EnemyNormal.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

EnemyNormal.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

EnemyNormal.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);

	var color = 'red';
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

// 歩くスピード
EnemyNormal.prototype.speed = function(){
	return 0.5;
};

EnemyNormal.prototype.collisionWidth = function(){
	return 100;
};
EnemyNormal.prototype.collisionHeight = function(){
	return 100;
};

module.exports = EnemyNormal;

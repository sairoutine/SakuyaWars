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

	var color = 'yellow';
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

ClownPiece.prototype.collisionWidth = function(){
	return 180;
};
ClownPiece.prototype.collisionHeight = function(){
	return 180;
};

module.exports = ClownPiece;

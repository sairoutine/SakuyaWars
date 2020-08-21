'use strict';

var BaseObject = require('../hakurei').Object.Base;
var Util = require('../hakurei').Util;

var Fort = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(Fort, BaseObject);

Fort.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

Fort.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

Fort.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);

	var color = 'green';
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

Fort.prototype.collisionWidth = function(){
	return 180;
};
Fort.prototype.collisionHeight = function(){
	return 180;
};

module.exports = Fort;

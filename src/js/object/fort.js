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
	var ctx = this.core.ctx;

	var image = this.core.image_loader.getImage("fort");
	ctx.save();
	ctx.translate(this.x(), this.y());
	ctx.drawImage(image, -image.width/2, -image.height/2);
	ctx.restore();

};

Fort.prototype.collisionWidth = function(){
	return 100;
};
Fort.prototype.collisionHeight = function(){
	return 100;
};

module.exports = Fort;

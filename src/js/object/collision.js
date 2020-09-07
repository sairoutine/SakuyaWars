'use strict';

var BaseObject = require('../hakurei').Object.Base;
var Util = require('../hakurei').Util;

var Collision = function(scene, width, height) {
	BaseObject.apply(this, arguments);

	this._width = width;
	this._height = height;
};
Util.inherit(Collision, BaseObject);

Collision.prototype.collisionWidth = function(){
	return this._width;
};
Collision.prototype.collisionHeight = function(){
	return this._height;
};
Collision.prototype.isCollision = function(){
	return this.parent.isCollision();
};
Collision.prototype.x = function(){
	return this.parent.x();
};
Collision.prototype.y = function(){
	return this.parent.y();
};




module.exports = Collision;

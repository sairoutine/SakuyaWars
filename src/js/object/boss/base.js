'use strict';

var BaseObject = require('../../hakurei').Object.Base;
var Util = require('../../hakurei').Util;

var Base = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(Base, BaseObject);

Base.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

Base.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

Base.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

module.exports = Base;

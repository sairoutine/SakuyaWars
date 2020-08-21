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
};

module.exports = Fort;

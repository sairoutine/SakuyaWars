'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;

var SceneBattleReady = function(core) {
	BaseScene.apply(this, arguments);
};
Util.inherit(SceneBattleReady, BaseScene);

SceneBattleReady.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);
};


SceneBattleReady.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);
};

SceneBattleReady.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
};

module.exports = SceneBattleReady;
